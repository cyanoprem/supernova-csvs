# PRD: Personalized Learning Track for Hindi A1/A2 Work Users

## Document Info
- **Author**: Product Team
- **Date**: April 2026
- **Status**: Draft
- **Target Segment**: Hindi, A1/A2 Persona, Work Occupation, Monthly Plan Users

---

## 1. Context & Problem Statement

### The Segment

Hindi is Supernova's largest language by paid users (~140K total paid). Within Hindi, "Work" is the largest adult occupation segment at 26.9K monthly users (31% of the Hindi monthly base). A1/A2 (pre-intermediate + intermediate) are the most actionable personas — users who know enough English to engage meaningfully but still have clear professional communication gaps.

**Target cohort (Jan 2025+, monthly plans, A1/A2):** 18,408 second-paid users.

### The Problem

Hindi A1/A2 Work users have the **worst 3rd-pay conversion** among all major language × occupation segments:

| Language | 2nd Pay % | 3rd Pay % | 3rd/2nd % |
|----------|-----------|-----------|-----------|
| Malayalam | 59.5% | 39.1% | **65.8%** |
| Kannada | 57.2% | 34.3% | 60.0% |
| Telugu | 52.8% | 30.4% | 57.6% |
| **Hindi** | **42.7%** | **23.4%** | **54.8%** |

The 3rd/2nd pay ratio for Hindi Work is **54.8%** vs Malayalam Work at **65.8%** — an 11pp gap. This means that even among users who renew once, Hindi Work users are significantly less likely to stick around for a third payment.

### Why This Isn't a Price or Persona Problem

- **Price**: Monthly plans at ₹199, ₹249, ₹299 all cluster at 23-27% 3rd pay. Not a pricing issue.
- **Persona level**: The Hindi-vs-Malayalam gap is a uniform 15-17pp across A0/A1/A2/A3. Not a difficulty problem.
- **Occupation**: The gap exists across every occupation. It's systemic to Hindi.

### Root Cause: Content-Market Fit

Hindi users have **100x more free English-learning alternatives** than Malayalam users. Thread analysis of 2,845 users shows:
- "Translate to English" is the #1 AI speak scenario by 5x (11,961 threads)
- "Write an Email/Message" has 3,108 threads
- "Conversation Practice" is used by 74% of the cohort

But the structured curriculum serves **generic grammar** — past tense, present tense, articles, prepositions — the same path as every other user. Sample user messages reveal: a govt staff nurse practicing self-introductions for work, a quality analyst needing to deal with Chinese clients, users asking about SOPs, someone so frustrated she threatened to delete the app.

**The content doesn't match their professional need.** They told us "I need English for work" — we're feeding them generic grammar.

### User Memory Coverage Gap

Of 18,408 users in this segment:
- Only **879 (4.8%)** currently have AI-extracted memories
- Total memory entries: 30,730 (non-archived)
- Breakdown: `learnt_concepts` (52.2%), `identity_and_motivation` (27.3%), `learning_preferences` (20.0%), `users_personal_facts` (0.5%)

Memory extraction is currently limited to scenarios with `user_memory_groups` configured in their `private_data`. The extraction cron runs every 30 minutes, processing only threads updated in that window. **The cron is currently paused.**

---

## 2. Solution Overview

Build a **personalized learning track** that uses `user_memories` to generate tailored vocabulary, grammar structures, and roleplay conversations specific to each user's work context.

### Core Hypothesis

> If we personalize activities to a user's real work context (their job, their clients, their communication gaps), we can increase the 3rd/2nd pay ratio from 54.8% toward 60%+ by making the product indispensable — not interchangeable with free alternatives.

### Three Activity Types

1. **Vocabulary Builder** — Teaches one contextually relevant English word per activity, drawn from the user's professional domain
2. **Sentence Structure** — Teaches a grammar pattern using workplace-relevant examples derived from the user's job context and known weaknesses
3. **Roleplay Conversation** — Puts the user in a simulated work conversation (client call, team meeting, email discussion) based on their actual professional context

### Key Architecture Decisions

- Activities are generated **dynamically by prompts** that consume `{{SYSTEM_USER_MEMORY_GROUPS__*}}` template variables
- Memory extraction shifts from **batch cron (every 30 min)** to **real-time post-activity** via Inngest event
- Track is delivered via the existing `course_config` → `sections` → `activities` system
- Segment targeting via the `course_v2` experiment system

---

## 3. Detailed Requirements

### 3.1 Activity Type 1: Vocabulary Builder

**Objective**: Teach one English word per activity that is directly relevant to the user's professional context.

**Input (from user_memories)**:
- `identity_and_motivation` — user's job role, industry, who they communicate with
- `learnt_concepts` — words/phrases already learned (to avoid repetition)
- `learning_preferences` — preferred learning style, mother tongue support needed

**Prompt Behavior**:
The prompt receives the user's memories and generates:
1. A **single English word** relevant to their work (e.g., "Meticulous" for a quality analyst, "Procurement" for a supply chain worker, "Escalate" for a customer service agent)
2. **Hindi meaning** and transliteration
3. **Pronunciation guide** with phonetic breakdown
4. **3 example sentences** using the word in the user's specific work context
5. **A practice question** — user must use the word in a sentence about their work

**Scenario Type**: `multi_question` with sections:
- Section 1: Word introduction (word_lesson question type) — shows the word, meaning, pronunciation, examples
- Section 2: Usage practice (speak_question) — user speaks a sentence using the word
- Section 3: Contextual MCQ (mcq) — tests comprehension in a work scenario

**Non-Repetition Logic**: The prompt MUST check `learnt_concepts` memories and not repeat any word the user has already learned. After the activity, the new word is added to `learnt_concepts` via memory extraction.

**Example (from sample memories)**:
> User: Industrial commodity quality analyst, deals with China and direct businesses/clients, A2 level
>
> Generated word: "Specification"
> Hindi: "विनिर्देश (Specification)"
> Example: "Please send me the product specification before the meeting with the Chinese supplier."
> Practice: "Tell me about a specification you recently worked with at your job."

---

### 3.2 Activity Type 2: Sentence Structure

**Objective**: Teach a grammar pattern using workplace-relevant content, targeting the user's known weaknesses.

**Input (from user_memories)**:
- `learnt_concepts` — grammar areas where the user struggled or made errors (e.g., "has difficulty with past continuous tense", "needs help with basic grammar and sentence construction")
- `identity_and_motivation` — job context for generating relevant examples
- `learning_preferences` — pace, style, language support needs

**Prompt Behavior**:
The prompt receives memories and generates:
1. A **target grammar structure** based on the user's weaknesses (e.g., "I was + verb-ing" for past continuous)
2. **Pattern explanation** in Hindi + English
3. **3 fill-in-the-blank examples** using the user's work context
4. **2 speak-the-sentence exercises** where the user must produce the structure
5. A **correction exercise** — shows an incorrect sentence from a work context, user identifies and speaks the correct version

**Scenario Type**: `multi_question` with sections:
- Section 1: Grammar pattern introduction (chat_lesson) — explains the structure with bilingual support
- Section 2: Fill-in-the-blank (mcq × 3) — contextual sentences from their work
- Section 3: Speak practice (speak_question × 2) — user produces the grammar structure
- Section 4: Error correction (staged_roleplay) — user corrects a mistake in a work email/message

**Example (from sample memories)**:
> User: Quality analyst, weak in past continuous tense, deals with Chinese clients
>
> Target structure: "I was + verb-ing" (Past Continuous)
> Pattern: "I was inspecting the samples when the client called."
> Fill-in: "I was _______ (check) the product specifications when my manager asked for the report."
> Speak: "Describe what you were doing at work yesterday at 3 PM using 'I was + verb-ing'."
> Error correction: "I was check the quality report when supplier called" → "I was checking the quality report when the supplier called."

---

### 3.3 Activity Type 3: Roleplay Conversation

**Objective**: Simulate a real work conversation the user might have, using their actual professional context.

**Input (from user_memories)**:
- `identity_and_motivation` — job role, company context, who they interact with
- `learnt_concepts` — vocabulary and structures they've recently learned (to reinforce)
- `learning_preferences` — communication style preferences

**Prompt Behavior**:
The prompt generates a roleplay scenario where:
1. The **AI plays a work character** (client, manager, colleague, supplier) relevant to the user's job
2. The **conversation topic** is drawn from the user's actual work context
3. Recently learned **vocabulary and grammar structures are woven in** so the user practices them in context
4. The AI provides **real-time corrections** and **Hindi hints** when the user struggles
5. At the end, the AI gives a **summary of what was practiced** and areas to improve

**Scenario Type**: `ai_speak_anything` or `ai_text_chat` (depending on whether voice or text mode)
- The system prompt includes `{{SYSTEM_USER_MEMORY_GROUPS__identity_and_motivation}}`, `{{SYSTEM_USER_MEMORY_GROUPS__learnt_concepts}}`, and `{{SYSTEM_USER_MEMORY_GROUPS__learning_preferences}}`
- The prompt instructs the AI to roleplay as a specific character from the user's work life

**Example (from sample memories)**:
> User: Quality analyst, designs buses using CATIA software, interested in R&D department, deals with Chinese clients
>
> Roleplay: "You're on a call with your Chinese supplier, Mr. Zhang. He's asking about the updated product specifications for the new bus model. Discuss the quality requirements and delivery timeline."
>
> AI (as Mr. Zhang): "Good morning. I wanted to discuss the specifications for the new model. Can you tell me about the quality standards we need to meet?"
>
> User practices: professional greetings, specification vocabulary, past continuous ("I was reviewing the standards yesterday..."), formal request patterns

---

### 3.4 Track Structure

The track is a sequence of activities delivered via the existing course system:

```
Track: "English for Your Work" (personalized)
│
├── Day 1
│   ├── Activity 1: Vocabulary Builder (word relevant to user's job)
│   └── Activity 2: Sentence Structure (grammar pattern from user's weaknesses)
│
├── Day 2
│   ├── Activity 3: Vocabulary Builder (new word)
│   └── Activity 4: Roleplay Conversation (using Day 1's vocab + grammar)
│
├── Day 3
│   ├── Activity 5: Sentence Structure (next weakness area)
│   └── Activity 6: Vocabulary Builder (new word)
│
├── Day 4
│   ├── Activity 7: Roleplay Conversation (integrating all learned material)
│   └── Activity 8: Vocabulary Builder (new word)
│
└── ... (repeating pattern, each day building on previous memories)
```

**Pattern**: Vocab → Grammar → Vocab → Roleplay (2:1:1 ratio). The roleplay always comes after the user has accumulated enough vocabulary and grammar to practice meaningfully.

**Technical Implementation**:
- Create a `course_config` entry with key `personalized_work_track_hi_a1a2`
- Sections and activities reference scenario IDs for each of the 3 activity types
- Activities use the prompt template system to inject user memories dynamically
- The track is assigned via a `course_v2` experiment variant targeting Hindi A1/A2 Work users

---

## 4. Memory System Changes

### 4.1 Current State (Paused)

The memory extraction system works as follows:
1. **Cron** (`extract-user-memories`): Runs every 30 minutes (`TZ=Asia/Kolkata */30 * * * *`)
2. Queries `speak_scenarios` for scenarios with `private_data ? 'user_memory_groups'`
3. Finds threads updated in last 30 minutes for those scenarios
4. Sends Inngest events (`API_USER_MEMORY_EXTRACTION_FROM_THREAD`) per thread × memory_group
5. Each event triggers `extractMemoriesFromThread` (concurrency limit: 15) which:
   - Extracts conversation text from the thread
   - Gets existing user memories for that group
   - Calls Gemini 2.0 Flash via `EXTRACT_USER_MEMORY` prompt to determine add/remove/no_action
   - Executes the memory actions (insert new memories, archive removed ones)

**Problem**: The cron is paused, and even when running, there's a 30-minute delay. For the personalized track to work, the next activity must have access to memories from the activity that just completed.

### 4.2 Required Change: Real-Time Post-Activity Extraction

**Trigger**: After each activity completion (when `speak_scenario_results` is created or when a thread is completed), fire the memory extraction immediately instead of waiting for the cron.

**Implementation approach**:

1. **New Inngest event trigger**: Add a trigger on `API_SPEAK_SCENARIO_RESULT_ENRICHED_CREATED_EVENT` for scenarios in the personalized track (similar to the existing `extractUserMemory` function in `update-user.ts` which already listens to this event for scenario `d73dbf7f-de1a-4eac-a7e7-f35409fb22a6`)

2. **Extend the existing pattern**: The `extractUserMemory` function in `apps/next/inngest/update-user.ts` (line 349) already has the pattern of listening to scenario result events. Generalize this to trigger for all scenarios in the personalized track.

3. **Flow**:
   ```
   User completes activity
   → speak_scenario_result created
   → Inngest event fired
   → For each memory_group in scenario's private_data.user_memory_groups:
       → Extract conversation from thread
       → Run EXTRACT_USER_MEMORY prompt
       → Add/remove memories
   → Next activity loads with updated memories
   ```

4. **Cron as fallback**: Keep the cron (un-pause it) as a safety net for any missed extractions, but the primary path is real-time.

5. **Concurrency**: The existing `extractMemoriesFromThread` function has `concurrency: { limit: 15 }`. For the personalized track, ensure the extraction for the completing user is prioritized (consider a separate Inngest function with higher priority or a dedicated queue).

### 4.3 Memory Groups for the Personalized Track

All 4 existing memory groups are relevant:

| Memory Group | Usage in Personalized Track |
|---|---|
| `identity_and_motivation` | Job role, industry, clients — drives scenario generation and word selection |
| `learnt_concepts` | Vocabulary and grammar learned — prevents repetition, enables reinforcement |
| `learning_preferences` | Pace, style, language support — adapts difficulty and bilingual support |
| `users_personal_facts` | Personal context — makes roleplay more relatable |

**New memory group consideration**: `work_communication_patterns` — could capture specific communication scenarios the user encounters (client calls, team meetings, email writing, presentations). This would make activity generation more targeted. However, this can be added in a later iteration — the existing 4 groups provide sufficient signal for v1.

### 4.4 Scenario Configuration

Each scenario in the personalized track must have `user_memory_groups` in its `private_data`:

```json
{
  "user_memory_groups": [
    "identity_and_motivation",
    "learnt_concepts",
    "learning_preferences",
    "users_personal_facts"
  ]
}
```

This ensures:
1. The memory extraction cron (and real-time trigger) processes threads from these scenarios
2. The prompt template system can inject `{{SYSTEM_USER_MEMORY_GROUPS__identity_and_motivation}}` etc.

---

## 5. Prompt Design

### 5.1 Prompt: Vocabulary Builder

**Prompt ID**: To be created in `prompts` table
**Model**: Gemini 2.0 Flash (consistent with existing extraction model)

**Template variables**:
- `{{SYSTEM_USER_MEMORY_GROUPS__identity_and_motivation}}` — user's job context
- `{{SYSTEM_USER_MEMORY_GROUPS__learnt_concepts}}` — already learned words (avoid repetition)
- `{{SYSTEM_USER_MEMORY_GROUPS__learning_preferences}}` — learning style
- `{{SYSTEM_USER_PERSONA}}` — A1 or A2 level
- `{{SYSTEM_USER_OCCUPATION}}` — occupation context

**Key prompt instructions**:
- Generate ONE word that is useful for the user's specific work context
- The word must NOT appear in the user's `learnt_concepts` memories
- Difficulty must match A1/A2 level (common professional vocabulary, not jargon)
- Provide Hindi translation, 3 contextual examples from the user's work domain
- Include a speaking prompt that asks the user to use the word about their own work

### 5.2 Prompt: Sentence Structure

**Template variables**: Same as Vocabulary Builder

**Key prompt instructions**:
- Identify the user's weakest grammar area from `learnt_concepts` (look for error patterns, correction memories)
- If no weakness data exists, follow A1/A2 curriculum sequence (present simple → present continuous → past simple → past continuous → future → modals)
- Generate fill-in-the-blank and speak exercises using the user's work vocabulary
- Ensure progressive difficulty within the A1/A2 range

### 5.3 Prompt: Roleplay Conversation

**Template variables**: Same as above, plus conversation history context

**Key prompt instructions**:
- Create a character from the user's work life (client, manager, colleague) based on `identity_and_motivation`
- Weave in recently learned vocabulary from `learnt_concepts`
- Provide Hindi hints when the user is stuck (based on `learning_preferences`)
- Correct errors gently and reinforce target grammar structures
- End with a brief summary of what was practiced

---

## 6. Cold Start Strategy

### Problem
Only 4.8% (879 of 18,408) of the target segment currently has memories. For new users or users without memories, the personalized track cannot generate tailored content.

### Solution: Progressive Personalization

**Phase 1 — No memories (first session)**:
- Use `occupation` and `english_persona` from user profile (available for all users)
- Generate generic "Work" vocabulary and grammar at the appropriate A1/A2 level
- The roleplay uses a generic professional scenario (self-introduction, asking for directions at office, basic phone call)
- Memory extraction runs after each activity, building the user's profile

**Phase 2 — Basic memories (after 2-3 activities)**:
- `identity_and_motivation` captures: name, job role, industry
- `learning_preferences` captures: preferred language support, pace
- Activities become semi-personalized — job-specific vocabulary, but not yet deeply contextual

**Phase 3 — Rich memories (after 5+ activities)**:
- Full personalization: activities reference specific clients, projects, communication patterns
- Roleplay scenarios mirror the user's actual work situations
- Vocabulary targets domain-specific terms the user hasn't yet learned

### Bootstrapping: Voice Input Form (Optional, Phase 2)

The existing `voice_input` form screen type (currently only in `post_login_form_v4`) could be used to bootstrap memories faster:
- Add a voice input screen to the post-payment form or track onboarding: "Tell us about your work — what do you do, who do you talk to in English?"
- Transcribe the response and run memory extraction on it immediately
- This gives us `identity_and_motivation` data before the user even starts their first activity

---

## 7. Expected Impact

### Quantitative Estimate

**Conservative scenario (3pp lift in 3rd/2nd)**: 54.8% → 57.8%
- Incremental 3rd payers: ~550 users (from 18,408 × 42.7% × 3pp)
- Revenue impact: ~₹1.65L/month (at ₹299/month)

**Moderate scenario (5pp lift)**: 54.8% → 59.8%
- Incremental 3rd payers: ~920 users
- Revenue impact: ~₹2.75L/month
- This closes ~half the gap to Malayalam (65.8%)

**Optimistic scenario (8pp lift)**: 54.8% → 62.8%
- Incremental 3rd payers: ~1,470 users
- Revenue impact: ~₹4.4L/month
- This closes ~73% of the gap to Malayalam

### Why These Estimates Are Reasonable

1. **Personalization is a proven lever**: Industry benchmarks show 10-30% improvement in engagement from personalized content. A 5pp lift in conversion is a ~9% relative improvement — conservative for personalization.

2. **The gap is content-fit, not product quality**: Malayalam users (similar product, similar price) convert at 65.8%. The product works — Hindi just needs better content targeting.

3. **User behavior confirms demand**: 74% of the cohort already uses Conversation Practice. They want to practice English for work — they just need content that matches their work.

4. **Memory data validates feasibility**: Sample memories show rich professional context: "designs buses using CATIA software", "deals with Chinese clients", "works in R&D department". This is exactly the signal needed to personalize effectively.

### Qualitative Impact

- **Competitive moat**: No free alternative offers personalized workplace English. This is defensible.
- **Platform effect**: Memories compound over time — the longer a user stays, the better the personalization, creating a switching cost.
- **Expandable**: If this works for Hindi Work A1/A2, the same system can be deployed for Telugu, Kannada, Bengali Work users (all have similar gaps vs Malayalam).

---

## 8. Implementation Plan

### Phase 1: Foundation (Week 1-2)

| # | Task | Owner | Details |
|---|------|-------|---------|
| 1 | Create 3 prompts in `prompts` table | AI/Prompt Team | Vocabulary Builder, Sentence Structure, Roleplay Conversation prompts with `{{SYSTEM_USER_MEMORY_GROUPS__*}}` template variables |
| 2 | Create scenarios for each activity type | Content Team | 3 `speak_scenarios` entries with `private_data.user_memory_groups` configured for all 4 groups |
| 3 | Implement real-time memory extraction | Backend | Add Inngest trigger on activity completion for track scenarios; modify `extractMemoriesFromThread` to support immediate extraction |
| 4 | Un-pause memory extraction cron | Backend | Re-enable `extract-user-memories` cron as fallback safety net |

### Phase 2: Track Assembly (Week 2-3)

| # | Task | Owner | Details |
|---|------|-------|---------|
| 5 | Create `course_config` for the track | Backend/Content | Define section structure: Vocab → Grammar → Vocab → Roleplay pattern |
| 6 | Create sections and activities in DB | Backend | `sections` and `activities` rows referencing the 3 scenario types |
| 7 | Set up `course_v2` experiment | Backend | Experiment targeting Hindi A1/A2 Work users, with variant pointing to new `course_config` |
| 8 | Cold start fallback prompts | AI/Prompt Team | Prompt variants that work with minimal/no memories (use occupation + persona only) |

### Phase 3: Testing & Rollout (Week 3-4)

| # | Task | Owner | Details |
|---|------|-------|---------|
| 9 | Internal QA with sample user profiles | QA | Test with real memory data from sample users; verify non-repetition, contextual relevance |
| 10 | Staged rollout: 10% of Hindi A1/A2 Work | Product | A/B test: control (existing curriculum) vs treatment (personalized track) |
| 11 | Monitor metrics: D1-D7 retention, activity completion rate, 2nd→3rd pay conversion | Analytics | Dashboard with segment-level tracking |
| 12 | Iterate on prompts based on user feedback | AI/Prompt Team | Review generated activities, adjust prompt instructions |

### Phase 4: Scale (Week 5+)

| # | Task | Owner | Details |
|---|------|-------|---------|
| 13 | Full rollout to Hindi A1/A2 Work | Product | If A/B shows positive signal (>2pp lift in retention or conversion) |
| 14 | Expand to other Hindi occupations | Product | Teacher, Home Maker, College — adapt prompts for non-work contexts |
| 15 | Expand to other languages | Product | Telugu, Kannada, Bengali Work users — same system, different language support |
| 16 | Voice Input bootstrapping form | Product/Frontend | Add `voice_input` screen to post-payment or track onboarding to accelerate memory collection |

---

## 9. Success Metrics

### Primary (North Star)

| Metric | Current | Target (3 months) | Measurement |
|--------|---------|-------------------|-------------|
| 3rd/2nd pay % for Hindi A1/A2 Work | 54.8% | 58-60% | ClickHouse: `mart_user_summary` payment analysis |

### Secondary

| Metric | Current | Target | Measurement |
|--------|---------|--------|-------------|
| Memory coverage (% users with memories) | 4.8% | >50% | Postgres: `user_memories` count |
| D7 retention (post-1st-pay) | TBD | +5pp vs control | ClickHouse: `sn_user_interaction_logs` |
| Activities completed per user per week | TBD | >4 | ClickHouse: `sn_speak_scenario_results` |
| Track completion rate (% completing 8+ activities) | N/A | >40% | Postgres: `user_course_progress` |

### Guardrails

| Metric | Threshold | Action if Breached |
|--------|-----------|-------------------|
| Cancellation within 1 hour of payment | No increase vs control | Pause rollout, investigate |
| NPS / feedback score | No decrease vs control | Review prompt quality |
| Memory extraction latency (p95) | <30 seconds post-activity | Optimize Inngest pipeline |
| LLM cost per user per day | <₹2 | Optimize prompt length, caching |

---

## 10. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Memory quality is too noisy for good personalization | Medium | High | Add a "memory relevance" score; filter low-confidence memories from prompt input |
| Cold start experience is significantly worse than personalized | Low | Medium | Generic Work templates are still better than current generic grammar; measure separately |
| Real-time extraction adds latency to activity transitions | Medium | Medium | Run extraction async (Inngest); user sees a brief loading state; next activity pre-generates |
| LLM hallucinations in generated activities | Medium | High | Add validation layer: check generated word exists in dictionary, grammar pattern is valid, roleplay stays on topic |
| Prompt injection via user memories | Low | High | Sanitize memory content before injecting into prompts; the existing extraction prompt already structures memories as simple text strings |
| Users don't complete enough activities to build useful memories | Medium | Medium | Voice input bootstrapping form; use onboarding data as initial signal |

---

## 11. Technical Architecture Summary

```
┌─────────────────────────────────────────────────────┐
│                    User Journey                      │
│                                                      │
│  User completes Activity N                           │
│         │                                            │
│         ▼                                            │
│  speak_scenario_result created                       │
│         │                                            │
│         ├──► Inngest: extract-memories-from-thread   │
│         │    (real-time, per memory_group)            │
│         │         │                                  │
│         │         ▼                                  │
│         │    user_memories table updated              │
│         │                                            │
│         ▼                                            │
│  User starts Activity N+1                            │
│         │                                            │
│         ▼                                            │
│  Prompt loads with {{SYSTEM_USER_MEMORY_GROUPS__*}}  │
│  → getUserMemoriesByGroups() fetches latest memories │
│  → Activity is personalized to user's context        │
│                                                      │
└─────────────────────────────────────────────────────┘

Existing Infrastructure Used:
├── prompts table (prompt storage with context_vars)
├── speak_scenarios (scenario definitions with private_data)
├── course_config → sections → activities (track structure)
├── course_v2 experiment system (segment targeting)
├── user_memories table (memory storage)
├── EXTRACT_USER_MEMORY prompt (Gemini 2.0 Flash)
├── Inngest functions (event-driven extraction pipeline)
├── {{SYSTEM_USER_MEMORY_GROUPS__*}} template vars (prompt injection)
└── extractAndUpdateUserMemory() (core extraction logic)

New Components:
├── 3 new prompts (Vocabulary, Grammar, Roleplay)
├── 3 new scenarios (one per activity type)
├── 1 new course_config + sections + activities
├── 1 new experiment variant (course_v2 targeting)
├── Real-time extraction trigger (Inngest event on activity completion)
└── Cold start fallback logic in prompts
```

---

## 12. Open Questions

1. **Track length**: How many activities before we cycle back to vocabulary review? Should we implement spaced repetition?
2. **Difficulty progression**: Should the track auto-advance from A1 to A2 content based on performance, or follow the user's assigned persona?
3. **Multi-language support**: Should the roleplay AI respond in Hindi when the user switches to Hindi, or always stay in English?
4. **Memory pruning**: As memories accumulate (current limit: 100 per fetch), should we prioritize recent memories or maintain a curated set?
5. **Offline access**: Should vocabulary words be cached for offline review?
6. **Voice input bootstrapping**: Should we add a voice input screen to the track onboarding before Activity 1? Or rely on organic memory accumulation?

---

## Appendix A: Sample User Memory Data

From the attached sample (100 memory entries across multiple Hindi A1/A2 Work users):

**identity_and_motivation examples**:
- "designs buses using CATIA software at their office"
- "is interested in working in the R&D department because they enjoy design work"
- "is currently working [inferred]"
- "learns investing trading in their free time"

**learnt_concepts examples**:
- "has learned the phrase 'How to address a teacher in English?'"
- "has learned a more professional sentence: 'To ensure accessibility for FDSS, we require an open number frame.'"
- "has learned to use present simple tense to describe daily routines"
- "has learned the sentence 'I will beat Anivesh'" (noise — needs filtering)

**learning_preferences examples**:
- "is comfortable with conversational practice"
- "needs help with basic grammar and sentence construction"
- "needs language support in Bengali" / "needs language support in English"

**users_personal_facts examples**:
- Only 1 entry in sample (very sparse group)

### Key Observation from Sample Data
Some memory entries contain noise (e.g., "extract the given info into the following json" — a prompt leak, or "has learned the sentence 'I will beat Anivesh'" — not professionally relevant). The personalization prompts should include instructions to filter for professionally relevant memories and ignore noise.

---

## Appendix B: Codebase References

| Component | File Location |
|-----------|--------------|
| Memory groups definition | `packages/server/src/usecases/user-memories/model.ts` |
| Memory extraction core | `packages/server/src/usecases/user-memories/core.ts` |
| Memory extraction manager | `packages/server/src/usecases/user-memories/manager.ts` |
| Memory repo (CRUD) | `packages/server/src/usecases/user-memories/repo.ts` |
| Extraction cron | `apps/next/inngest/functions/crons/extract-user-memories.ts` |
| Thread extraction worker | `apps/next/inngest/functions/extract-memory-from-thread.ts` |
| Existing result-based extraction | `apps/next/inngest/update-user.ts` (line 349) |
| Prompt template system | `packages/server/src/usecases/prompts/prompt-manager.ts` |
| Memory template vars (`SYSTEM_USER_MEMORY_GROUPS__*`) | `packages/server/src/usecases/prompts/prompt-manager.ts` (line 305) |
| Course config schema | `packages/server/src/db/schema/course.ts` |
| Sections schema | `packages/server/src/db/schema/sections.ts` |
| Activities schema | `packages/server/src/db/schema/activities.ts` |
| Course v2 manager | `packages/server/src/usecases/course-v2-new/manager.ts` |
| Scenario schema/validation | `packages/server/src/usecases/scenario-validations/schema.ts` |
| Voice input form screen | `packages/app/features/forms/screens/voice-input.tsx` |
| Scenario types available | `multi_question`, `ai_speak_anything`, `ai_text_chat`, `game`, `staged_roleplay`, `roleplay` |
