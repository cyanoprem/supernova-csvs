# Tech tasks — Personalised Work Track (Hindi A1/A2)

Tasks are grouped by your four asks. Supporting tasks from PRD §8 are listed under "Also required" so nothing is missed.

## Prompt names (final)

| Activity | `prompts.name` to use |
|---|---|
| Vocabulary | `Learn a new Word - Personalised Work Track (Hi A1/A2)` |
| Sentence Structure | `Sentence Structure - Personalised Work Track (Hi A1/A2)` |
| Roleplay | `Practice Conversation - Personalised Work Track (Hi A1/A2)` |
| Memory extraction (update existing row) | `[SYSTEM] - User Memory Extraction` — unchanged |

All four rows use `parameters.model = "vertex:gemini-2.5-flash"`.

---

## Ask 1 — Store post-payment form answers as memories, using the SAME extraction prompt, immediately after form submission

**Task 1.1 — Backend: fire memory extraction on form submission**
- Trigger: `form_submissions` row insert where `is_completed = true` and the form is the post-payment personalisation form (whatever `forms.name` you finalise — currently the one producing the `personalisation_post_payment_form_submissions` CSV).
- Implementation: new Inngest event `API_POST_PAYMENT_FORM_MEMORY_EXTRACTION` fired from the form-submit handler (same place `is_completed=true` is written). Consumer function:
  1. Pulls the `form_submissions.data` JSONB (keys → question IDs, values → transcribed text).
  2. Concatenates the 3 voice answers into a single `conversation` string in this shape (exactly — the v2 prompt detects this as `POST_PAYMENT_FORM` mode):
     ```
     Q1 (When did you last speak English?): user answered "<transcript_q1>"
     Q2 (What did you talk about?): user answered "<transcript_q2>"
     Q3 (Who do you usually speak English with?): user answered "<transcript_q3>"
     ```
  3. Calls `extractAndUpdateUserMemory(threadId=null-or-synthetic, userId, memoryGroup, scenarioId=null-or-"post_payment_form_v1")` FOR EACH of the 4 memory groups (identity_and_motivation, learning_preferences, users_personal_facts, learnt_concepts). Reuses `getMemoryActionsForConversation` / `executeMemoryActions` from `packages/server/src/usecases/user-memories/core.ts` — no new prompt, SAME `EXTRACT_USER_MEMORY` row (`f6995bc5-0a70-4aa8-9636-500c9d173b56`).
  4. Dedupes: if this user already has memories from an earlier form submission with `scenarioId = 'post_payment_form_v1'`, the noise_filter + dependency_rules in the v2 prompt handle overwrites.

**Task 1.2 — Schema: confirm we can write form-origin memories**
- `user_memories.scenarioId` is currently non-null and references `speak_scenarios`. Post-payment form has no scenario. Two options:
  - (a) Relax the FK/nullable-constraint on `user_memories.scenario_id` to allow NULL for form-origin memories.
  - (b) Reserve a sentinel `speak_scenarios` row, e.g. `post_payment_form_v1`, and attribute form-origin memories to it. (Preferred — keeps analytics simple and the column non-null.)
- The v2 prompt body works with either.

**Task 1.3 — Prompt: update `[SYSTEM] - User Memory Extraction` to v2**
- File: `/home/ubuntu/personalised_work_prompts/EXTRACT_USER_MEMORY_v2.md` (attached).
- Adds `<input_mode>` block so the same prompt handles both dialogue (post-activity) and Q&A (post-payment form).
- No schema / no call-site changes required.

---

## Ask 2 — Use Flash to transcribe the voice-input audio on the post-payment form

**Task 2.1 — Transcription pipeline for voice-input form answers**
- Current transcription prompt constant: `TRANSCRIPTION_PROMPT` (see `packages/server/src/usecases/prompts/constants/transcription-prompts.ts`). Tech team already has a transcription prompt running on Flash.
- Work: wire the post-payment `voice_input` form screen to hit that transcription prompt on submit, store the English transcription into `form_submissions.data.<question_id>.transcription`, and fire Task 1.1 AFTER all 3 transcriptions resolve.
- Model: `vertex:gemini-2.5-flash`. (The CSV you shared already contains transcriptions, so this is partly done — confirm it's running on Flash 2.5 and not an older transcription model.)
- Guardrail: if any transcription fails or returns <2 tokens, skip that question (the v2 prompt's `<noise_filter>` will also catch it downstream, but cheaper to short-circuit here).

---

## Ask 3 — Run memory extraction after EVERY scenario (real-time, not cron-delayed)

**Task 3.1 — Generalise `extractUserMemory` in `apps/next/inngest/update-user.ts`**
- Today that function (line 349) only triggers for the single hardcoded sales-coach scenario `d73dbf7f-de1a-4eac-a7e7-f35409fb22a6` on `API_SPEAK_SCENARIO_RESULT_ENRICHED_CREATED_EVENT`.
- Change: fire for ANY `speak_scenario` that has `private_data.user_memory_groups` configured — i.e. use `getScenariosWithUserMemoryGroups` (already exists at `packages/server/src/usecases/user-memories/repo.ts:45`) as the gating set instead of the hardcoded UUID.
- Concurrency: the existing `extractMemoriesFromThread` has `concurrency: { limit: 15 }` which is shared. For the track, extraction for the user who JUST completed activity N must complete before activity N+1 loads. Options:
  - (a) Raise the concurrency limit for this path, OR
  - (b) Give the track a dedicated Inngest function with its own queue so cron-driven extractions can't starve it.
- PRD §4.2 calls this out explicitly.

**Task 3.2 — Unpause the `extract-user-memories` cron as a fallback**
- `apps/next/inngest/functions/crons/extract-user-memories.ts` — currently paused per PRD §4.1. Re-enable as safety net so any missed real-time extractions get picked up within 30 min.

**Task 3.3 — Scenario configuration for the 3 new activity types**
- Each new `speak_scenarios` row needs:
  ```json
  "private_data": {
    "user_memory_groups": [
      "identity_and_motivation",
      "learnt_concepts",
      "learning_preferences",
      "users_personal_facts"
    ]
  }
  ```
- This is what triggers Task 3.1 AND the cron fallback. Without it, memories are never extracted.

---

## Ask 4 — Update `[SYSTEM] - User Memory Extraction` to track a rolling `current_level` (because `english_persona` is set once and users learn fast)

**Task 4.1 — Apply the v2 prompt update**
- File: `/home/ubuntu/personalised_work_prompts/EXTRACT_USER_MEMORY_v2.md` (attached).
- Key additions:
  - `<noise_filter>` — drops garbage at write-time (`"I will beat Anivesh"`, `"string"`, `"NO_ACTIONS_NEEDED"`, raw JSON, etc.). Fixes ~4% production-memory noise we found in the 32K-row audit.
  - `<level_tracking_rules>` — when `memoryGroup = learning_preferences`, maintains a single `current_level: {A1|A2|B1}-{EARLY|PROGRESSING|ACTIVE} (as of YYYY-MM-DD, based on N observations)` memory. Strictly one-notch ramp. **Never drops a tier or stage.** This is what the 3 activity prompts read to pick difficulty — replaces inference from `learnt_concepts` count.
  - `<input_mode>` — lets the same prompt handle both dialogue and Q&A form input (re-used in Ask 1).
- UPDATE the `prompts` row directly: `UPDATE prompts SET prompt = <v2 body> WHERE id = 'f6995bc5-0a70-4aa8-9636-500c9d173b56';`. No schema change, no call-site change.

**Task 4.2 — Code-side model alignment**
- `packages/server/src/usecases/user-memories/core.ts:61` hardcodes `extractionModel: "vertex:gemini-2.0-flash-001"`. The `prompts.parameters.model` column already says `vertex:gemini-2.5-flash`. The hardcode wins.
- Remove the hardcode so the extractor respects the prompt row's `parameters.model` (or flip the hardcode to `vertex:gemini-2.5-flash`). Either way — align the two. Same cost profile, better reasoning on 2.5 for the new level/noise rules.

**Task 4.3 — Per-group context-var additions (small, optional)**
- `prompts.context_vars.user_memories.learning_preferences.extraction_rules`:
  add `"When emitting current_level, follow <level_tracking_rules>. Never emit two current_level memories."`
- `prompts.context_vars.user_memories.learnt_concepts.extraction_rules`:
  add `"Do NOT store the user's practice sentences verbatim if they are hallucinated filler, test input, or off-topic (see <noise_filter>). Store a normalized concept description like 'has learned to use present continuous for ongoing actions' instead."`
- Pure JSONB value edits — no schema change.

**Task 4.4 — Retention / limit check on read**
- `getUserMemoriesByGroups` orders `desc(insertedAt)` and limits to `100` (`packages/server/src/usecases/user-memories/repo.ts:41`). For users with 100+ memories, older but still-relevant entries (like `current_level`) could get truncated out if the most recent 100 are dominated by `learnt_concepts` entries.
- Either (a) raise the limit per-group so every group gets its top-100 (not a global top-100), or (b) guarantee `current_level` and `english_persona` survive truncation by bumping their recency on every update (the v2 prompt already does this via Case 3/4's date-refresh).

---

## Also required from PRD §8 (not in your 4 asks but needed to ship)

**Phase 1 — Foundation**
- Insert the 3 new prompt rows (`Learn a new Word - Personalised Work Track (Hi A1/A2)`, etc.) using the bodies I already delivered in `prompt_1_vocabulary.md`, `prompt_2_sentence_structure.md`, `prompt_3_roleplay.md`. Model `vertex:gemini-2.5-flash`.
- Create the 3 `speak_scenarios` rows (one per activity type), each with `private_data.user_memory_groups` as in Task 3.3.

**Phase 2 — Track assembly**
- `course_config` row with key `personalized_work_track_hi_a1a2`.
- `sections` + `activities` rows laid out in the PRD §3.4 pattern (Vocab → Grammar → Vocab → Roleplay).
- `course_v2` experiment targeting Hindi A1/A2 Work monthly-plan users, variant → the new `course_config`.

**Phase 3 — Testing & rollout**
- Internal QA with sample profiles from the 879 users who already have memories — verify non-repetition, level ramp, noise filtering on real data.
- 10% staged rollout via `course_v2` variant (control = existing curriculum, treatment = personalised track).
- Analytics dashboard: 3rd/2nd pay %, D1/D7 retention, activities-completed-per-user-per-week, track-completion rate. PRD §9 success-metric thresholds.

**Phase 4 — Scale**
- Extend scenarios + prompts to other Hindi occupations (Teacher, Home Maker, College).
- Extend to Telugu / Kannada / Bengali Work using the same four prompt files with translation-rules swapped.

---

## Summary of what tech needs from me / product

1. **Final v2 prompt bodies** — delivered:
   - `prompt_1_vocabulary.md`
   - `prompt_2_sentence_structure.md`
   - `prompt_3_roleplay.md`
   - `EXTRACT_USER_MEMORY_v2.md` (update to `f6995bc5-…`)
2. **Prompt names** — listed at the top of this doc.
3. **Prompt model** — `vertex:gemini-2.5-flash` for all four.
4. **Scenario configuration template** — listed in Task 3.3.
5. **Call-site code changes** — listed in Tasks 1.1, 3.1, 4.2.
6. **Schema decision** — Task 1.2 (NULL-able scenario_id on user_memories, or sentinel scenario row).
