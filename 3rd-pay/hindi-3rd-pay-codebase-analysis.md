# Hindi 3rd-Pay Retention: Low-Effort, High-Impact Code Changes

After tracing the 5 problems through the codebase, here's what I found — ranked by effort-to-impact ratio.

---

## Finding 1: `getSystemUserOccupationVars()` throws away all occupation specificity

**The single biggest quick win.**

In `packages/server/src/usecases/prompts/prompt-manager.ts:1302-1359`, when a user's occupation is `"work"`, the LLM gets told:

```
"The user is a working professional"
```

That's it. The `memory.occupation` field (which can contain richer data like "construction supervisor", "freelance makeup artist") is available but **falls through to the same generic string**. The function checks `trimmedOccupation || trimmedMemoryOccupation`, but if the main `occupation` field is `"work"` (which it is for all "Work" users — that's just the category they selected), it hits the `"work"` case and returns the generic string, **never even reading** `memory.occupation`.

Worse: any occupation value not in the hardcoded list (`work`, `college`, `home maker`, `teacher`, `job seeker`, `other`) falls through to:

```
"No occupation information available for the user"
```

**Fix (< 30 min):** Rewrite `getSystemUserOccupationVars` to:
1. If `occupation === "work"` AND `memory.occupation` exists, use `memory.occupation` (the richer field) — e.g. "The user is a working professional. Their specific role: construction supervisor"
2. If `memory.why_use_supernova` exists, append it — e.g. "They use English for: writing progress reports to clients"
3. For any non-hardcoded occupation value, pass it through verbatim instead of returning "No occupation information available"

This makes **every AI conversation** (the freeform Nova chat, speak scenarios, the roleplay prompts) occupation-aware immediately. The prompt template `{{SYSTEM_USER_OCCUPATION}}` is already used in the prompts DB — the LLM just gets garbage data today.

**Impact:** Every AI interaction for Hindi Work users becomes contextually relevant. The user asking "how do I say this in English" gets a response framed for their workplace, not generic household English. Addresses Problems 1 + 4 simultaneously.

---

## Finding 2: `UserMemoryType` has only 3 fields — the richest user context is unused

In `packages/server/src/db/schema/users.ts:56-60`:

```ts
export type UserMemoryType = {
  occupation?: string;
  why_use_supernova?: string;
  other?: string;
};
```

Meanwhile, the `user_memories` table (`packages/server/src/usecases/user-memories/`) has a much richer system with 4 memory groups:
- `users_personal_facts`
- `learning_preferences`
- `identity_and_motivation`
- `learnt_concepts`

These are extracted from conversations by LLM (via `extractAndUpdateUserMemory` in `user-memories/manager.ts`) and stored per-user. But **the prompt system only uses the legacy `users.memory` JSONB field** for `{{SYSTEM_USER_MEMORY}}`. The newer `user_memories` table data is available via `{{SYSTEM_USER_MEMORY_GROUPS__<group>}}` but this requires prompts to explicitly opt into it.

**Fix (1-2 hours):** 
1. Update the prompts used by the main AI speak/chat flows to include `{{SYSTEM_USER_MEMORY_GROUPS__identity_and_motivation}}` and `{{SYSTEM_USER_MEMORY_GROUPS__users_personal_facts}}` — this automatically pulls in rich learned context about the user
2. Or: enrich `getUserMemoryVars()` in `prompt-manager.ts:378-406` to also fetch from the `user_memories` table via `getUserMemoryGroupStrings()`

**Impact:** The AI will remember "this user is a govt staff nurse who needs English for self-introductions" from previous sessions, making every subsequent conversation more relevant.

---

## Finding 3: Course assignment is 100% experiment-driven with zero occupation input

In `packages/server/src/usecases/course-v2-new/manager.ts:100-109`, the course is determined by:

```ts
const experimentVariant = await lookupExperimentVariant(
  "course_v2", userId, appId, platform,
);
```

The `course_v2` experiment criteria (CEL expressions evaluated in `experiments/manager.ts:214`) match on `user.english_persona`, `user.preferences.motherTongue`, etc. — but **never on `user.occupation` or `user.need`**.

The `UserForAuthResponse` object passed to CEL includes `occupation` and `need` fields (confirmed in `lib/users.ts:557-558, 641-642`), so the infrastructure supports it. It's just not being used.

**Fix (1-2 hours, config-only):**
1. Create new `course_v2` experiment set members with CEL criteria like:
   `user.english_persona == "spoken-english-adults-level-1" && user.preferences.motherTongue == "hi" && user.occupation == "work"`
2. Point them to a Hindi Work-specific `course_config_id` that has workplace-relevant scenarios in the first few sections

This is a **config/DB change only** — no code changes needed. The experiment system already supports occupation-based targeting; it's just not being used for course assignment.

**Impact:** Hindi Work users get a different first-30-days course with workplace scenarios instead of generic grammar. Addresses Problem 1 directly.

---

## Finding 4: The `need` field is captured but never influences anything

Users select their "need" during onboarding (speak-to-clients, social, interviews, confidence, govt-exams, abroad, etc.). It's stored in `users.need` and included in `UserForAuthResponse`. But:

- It's **not used in any experiment CEL criteria** for course selection
- It's **not included in any LLM prompt** (neither `SYSTEM_USER_MEMORY` nor `SYSTEM_USER_OCCUPATION` include it)
- It's **not used for scenario filtering or recommendations**

**Fix (30 min):**
Add the `need` field to the `getSystemUserOccupationVars` or `getUserMemoryVars` function:

```ts
// In getSystemUserOccupationVars or a new function:
const needText = user.need ? `User's English learning goal: ${user.need}` : "";
```

And include it in the prompt variable. This way the AI knows "this user needs English for speaking to clients" and can tailor every conversation accordingly.

**Impact:** Combined with Fix 1, the AI now knows both WHAT the user does and WHY they need English. Addresses Problem 1.

---

## Finding 5: Home screen quick_activities are experiment-configured but not personalized by occupation

The simplified home screen (`packages/app/features/home/simplified-screen.tsx`) renders `quick_activities` from the `home_screen_v3` experiment payload. These are defined in `experiments/model.ts:247-304` as a fixed list per experiment variant.

Today, all Hindi Work users see the same quick activities. The experiment system already supports different payloads per variant — it just needs occupation-specific variants.

**Fix (config-only, 1-2 hours):**
Create Hindi Work-specific `home_screen_v3` experiment variants with:
- "Practice a client call" instead of generic "Practice Speaking"
- "Write a work email" instead of generic "Learn Grammar"  
- "Translate for work" as a prominent quick activity (since translate-to-English is already the #1 use case by 5x)

No code changes needed — just new experiment rows in the DB.

---

## Finding 6: Post-activity reports exist but there's no longitudinal progress surface

The report system (`packages/server/src/usecases/reports/manager.ts`) generates per-activity feedback with:
- Pronunciation scores
- Grammar scores
- Words used
- Time spoken

But these are **per-activity only** — there's no aggregation over time. The `report-v2.tsx` and `report-v3.tsx` in `packages/app/features/reports/` show activity-level stats but no "you've improved from X to Y over 30 days" view.

The `ProgressBarExperimentPayload` in `experiments/model.ts:320-331` exists for in-conversation progress bars, but this tracks messages-per-conversation, not learning progress over time.

**Fix (medium effort, 1-2 days for MVP):**
1. Create a new API endpoint that aggregates `speak_scenario_results` over time for a user:
   - Activities completed this month vs last month
   - Average pronunciation score trend
   - Total words spoken
   - Streak data (already tracked)
2. Surface this on the home screen or as a new tab

The data already exists in `speak_scenario_results` — it just needs aggregation and a UI.

**Impact:** Users get evidence to justify renewal. Addresses Problem 5.

---

## Finding 7: The conversation progress bar is already built — extend it to show cumulative progress

The progress bar feature (`packages/app/features/thread/screen.tsx:486-515, progress-button.tsx`) already:
- Counts user audio messages per conversation
- Shows progress toward a "level completion"
- Has localized tooltip messages
- Has a completion modal

**Fix (medium effort, ~1 day):**
Extend the `checkpoint_config.conversation_progress_bar` to include cumulative stats:
- "You've spoken 45 sentences this week (up from 32 last week)"
- "Your pronunciation accuracy improved 12% this month"

The completion modal (`completionModal` in `screen.tsx:514-516`) already supports localized heading/message — just feed it cumulative data instead of per-conversation data.

---

## Summary: Effort vs Impact Matrix

| # | Change | Effort | Impact | Problems Addressed |
|---|--------|--------|--------|-------------------|
| **1** | Fix `getSystemUserOccupationVars` to use rich occupation data + need | 30 min | **Very High** | 1, 4 |
| **2** | Add `user.need` to LLM prompt context | 30 min | **High** | 1, 4 |
| **3** | Create Hindi Work `course_v2` experiment variants (config only) | 1-2 hrs | **Very High** | 1, 3, 4 |
| **4** | Create Hindi Work `home_screen_v3` variants (config only) | 1-2 hrs | **High** | 1, 4 |
| **5** | Include `user_memories` groups in main AI prompts | 1-2 hrs | **High** | 1, 2 |
| **6** | Build longitudinal progress aggregation API + basic UI | 1-2 days | **High** | 5 |
| **7** | Extend progress bar completion modal with cumulative stats | 1 day | **Medium** | 5 |

**Items 1-5 are all < 1 day of work combined and require minimal/no new code — mostly config and small prompt fixes. They directly address the top 3 problems.**

The theme across all findings: **the data exists, the infrastructure exists, but the wiring is missing.** Occupation, need, and rich user memory data are captured and stored but never flow into the systems that determine what content users see and how the AI talks to them.
