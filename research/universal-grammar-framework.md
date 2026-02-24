# A universal grammar framework for 100 languages

**Every human language expresses who did what to whom, when, and whether it really happened — but the machinery varies wildly.** This framework distills cross-linguistic research from WALS (2,600+ languages), Greenberg's 45 universals, and modern typological data into a practical system of **14 grammatical dimensions** that capture the structural space of the world's top 50–100 languages. It is designed for two uses: auditing any language-learning curriculum for completeness, and generating structural translation prompts between any two languages. The core insight is that **semantic categories are near-universal while formal mechanisms are not** — every language can express past time, but only ~60% mark it on the verb.

---

## The 14 dimensions that span all human grammar

The framework rests on a matrix: 14 grammatical dimensions × 4 realization types. Every dimension represents a meaning that all or most languages express. The realization type tells you *how* a given language encodes it — via morphology (affixes on words), syntax (word order or particles), lexicon (separate words), or pragmatics (context). A language-learning curriculum must teach every dimension relevant to the target language. A translation prompt must map the realization type of dimension X in Language A to the realization type in Language B.

| # | Dimension | Universality | Realization varies by |
|---|-----------|-------------|----------------------|
| 1 | **Temporal reference** (past/present/future) | Universal semantic need; ~60% grammaticalize past tense, ~50% grammaticalize future | Verb morphology, auxiliaries, particles, adverbs, or context |
| 2 | **Aspect** (perfective/imperfective/progressive/habitual) | Near-universal; more widely grammaticalized than tense | Verb morphology, particles, auxiliary verbs, or verb pairs |
| 3 | **Mood and modality** (realis/irrealis, epistemic/deontic) | Universal; imperative in all languages | Mood inflection, modal verbs, particles, adverbs |
| 4 | **Polarity** (affirmative/negative) | Truly universal — every known language negates | Particles, affixes, negative verbs, or word-order change |
| 5 | **Voice** (active/passive/causative) | Widespread; passive in ~80% of languages | Morphological, periphrastic, or particle-based |
| 6 | **Person and number reference** | Universal (all languages have ≥3 persons × 2 numbers in pronouns) | Verb agreement, pronouns, or context (pro-drop) |
| 7 | **Nominal classification** (gender/class/classifier) | ~44% have gender; ~20% have classifiers; ~40% have neither | Noun affixes, articles, agreement, or classifier words |
| 8 | **Case / grammatical role marking** | Universal need; ~62% use morphological case | Case affixes, word order, adpositions, or verb agreement |
| 9 | **Definiteness and specificity** | Universal concept; ~35% have distinct articles | Articles, affixes, word order, demonstratives, or context |
| 10 | **Number marking** (singular/plural/dual) | ~98% of languages; but ~30% mark it optionally or not at all on nouns | Noun affixes, reduplication, numerals, or context |
| 11 | **Modification** (attribution + comparison) | Universal — all languages modify nouns and compare | Adjectives (pre/post-nominal), stative verbs, or relative clauses |
| 12 | **Clause combining** (and/or/but/because/if) | Universal semantic categories | Conjunctions, particles, serial verb constructions, juxtaposition |
| 13 | **Information questions** (who/what/where/when/why/how) | Universal | WH-movement, WH-in-situ, particles, verb morphology |
| 14 | **Politeness / social register** | Universal social need; grammaticalized in ~25% of languages | Pronouns (T-V), verb morphology, honorific vocabulary |

---

## Temporal reference and aspect are the hardest translation problem

The single greatest source of cross-linguistic mismatch is **tense-aspect-mood (TAM)**. English has 12 tense-aspect combinations. Mandarin has zero grammatical tenses. Slavic languages organize their entire verb system around perfective/imperfective aspect pairs. The framework must separate tense from aspect — conflating them (as English curricula often do) breaks when applied to Mandarin, Russian, or Hindi.

**Tense across language families.** Simple past, present, and future are *not* universal grammatical categories — they are universal *semantic* categories. About **40% of the world's languages lack grammatical past-tense marking entirely**, including Mandarin, Cantonese, Thai, Vietnamese, Malay/Indonesian, and Burmese. These languages use aspect particles (Mandarin 了 *le* for completion), time adverbs (Thai จะ *ja* for future), or pure context. Among languages that do mark tense morphologically, the most common system is a two-way past/non-past split (English, German, Finnish, Japanese, Arabic), not a three-way past/present/future split. Full three-way systems exist in Romance languages, Hindi-Bengali, Tamil-Telugu, Turkish, and Swahili.

**The compound tense hierarchy.** Compound tenses follow an implicational hierarchy across languages: if a language has future perfect, it has past perfect; if it has past perfect, it has present perfect; if it has present perfect, it has simple past. This hierarchy maps which tenses a curriculum must cover:

| TAM combination | Languages that grammaticalize it | Languages that don't |
|----------------|--------------------------------|---------------------|
| Simple past/present/future | Romance, Germanic, Indo-Aryan, Dravidian, Turkic, Bantu | Mandarin, Thai, Vietnamese, Malay |
| Progressive (be + V-ing) | English, Hindi, Spanish, Turkish, Korean, Mandarin (在), Thai (กำลัง) | German, French, Russian, Arabic (no distinct progressive) |
| Present perfect vs. simple past | English, German, Spanish (Peninsular), Hindi, Swahili, Turkish | Russian, Japanese, Korean, Arabic, Mandarin |
| Past perfect (pluperfect) | Romance, Germanic, Hindi, Turkish | Russian, Arabic, Japanese, Korean, Mandarin, Thai |
| Future perfect | Romance, English, Hindi, Turkish | Russian, Arabic, Japanese, Korean, Mandarin, Thai, Malay |

**Aspect matters more than tense globally.** The perfective/imperfective distinction is grammaticalized across a wider range of language families than tense is. **Russian and other Slavic languages** organize their entire verb lexicon into aspectual pairs — every verb has a perfective and imperfective partner. **Mandarin** has four aspect particles (了 perfective, 过 experiential, 着 durative, 在 progressive) but zero tense marking. **Hindi** independently marks three aspects (habitual *caltā hai*, progressive *cal rahā hai*, perfective *calā*) crosscut by three tenses. A universal framework must treat tense and aspect as **independent axes**, not collapsed categories.

---

## How nouns work across the world's language families

Nominal systems vary along five independent parameters: gender, number, case, definiteness, and classification. No two language families combine these the same way, and the presence of one feature often predicts the absence of another.

**Gender systems split the world roughly in half.** About **56% of languages have no grammatical gender**, including all Turkic, Sino-Tibetan, Japonic, Koreanic, Uralic, Austronesian, and Dravidian languages. Two-gender systems (masculine/feminine) dominate in Romance, Semitic, and Indo-Aryan families. Three-gender systems (adding neuter) appear in German, Russian, Polish, Greek, and Marathi. Bantu languages like Swahili take this to an extreme with **up to 18 noun classes**, each requiring distinct agreement prefixes on verbs, adjectives, and possessives.

**Gender and classifiers are complementary strategies.** Languages with grammatical gender almost never have numeral classifiers, and vice versa. Classifier languages — Mandarin (~100+ classifiers), Japanese (~500+ counters), Korean, Thai, Vietnamese, Bengali — require a classifier word between any numeral and noun. This creates a major translation gap: English "three books" maps to Mandarin 三本书 (sān **běn** shū, with obligatory classifier 本), while French *trois livres* needs gender agreement (*trois* is invariant, but *bons livres* requires masculine plural adjective agreement).

**Case systems range from 0 to 18+.** English, Mandarin, Thai, Vietnamese, Malay, and most isolating languages have no morphological case. German has 4 cases, Russian and Turkish have 6, Finnish has **15**, and Hungarian has **18**. A critical asymmetry: caseless languages depend on **rigid word order** to mark who did what to whom, while case-rich languages allow **flexible word order** because case suffixes carry the grammatical role information. This is Greenberg's Universal 41: if a language places the object before the verb (SOV), it almost always has a case system.

**Articles are absent from most languages.** Only about **35% of languages have a distinct definite article** (English *the*, French *le/la*, Arabic *al-*, German *der/die/das*). An additional ~15% use demonstratives or affixes for definiteness. A full **32% have no articles at all** — including Russian, Hindi, Japanese, Korean, Mandarin, Turkish, Finnish, Tamil, and all Slavic languages except Bulgarian. These languages express definiteness through word order (Russian puts known information first), case marking (Turkish marks definite objects with accusative), topic markers (Japanese は *wa*), or context.

---

## Word order, questions, and negation follow predictable typological patterns

**SOV and SVO together account for 88% of languages.** WALS data from 1,377 languages shows SOV at **47.5%** and SVO at **41%** of languages with a dominant order. VSO covers ~8% (Arabic, Celtic, Tagalog), and all other orders combined are under 4%. The critical parameter is **head-directionality**: head-final languages (SOV) systematically place modifiers before heads — postpositions instead of prepositions, genitive before noun, relative clause before noun, auxiliary after main verb. Head-initial languages (SVO/VSO) do the reverse. This single parameter predicts a cascade of structural properties, making it the most powerful tool in the translation framework.

| Feature | Head-initial (SVO/VSO) | Head-final (SOV) |
|---------|----------------------|-----------------|
| Adpositions | Prepositions (in, on, to) | Postpositions (に, -da, में) |
| Genitive | After noun (*king of England*) | Before noun (*England's king*) |
| Relative clause | After noun (*the man **who came***) | Before noun (Japanese: **来た**男) |
| Auxiliary verb | Before main verb (*will go*) | After main verb (*gehen **wird***) |
| Question word | Fronted (*What did you buy?*) | In-situ (Mandarin: 你买了**什么**?) |
| Major languages | English, French, Spanish, Mandarin, Arabic, Swahili, Thai | Hindi, Japanese, Korean, Turkish, Tamil, Bengali, Persian |

**Negation is truly universal but position varies.** Every known language can negate. About **70% place the negation marker before the verb** (English *not*, Mandarin 不 *bù*, Russian не *ne*, Spanish *no*). Post-verbal negation appears in Japanese (-ない *-nai*), Turkish (-me-/-ma-), and some other SOV languages. French uses discontinuous negation (*ne...pas*), an example of Jespersen's Cycle where the original negator weakens and a reinforcer is added.

**Question particles are far more common than subject-verb inversion.** Out of ~1,000 languages surveyed, only **13 use word-order change** for yes/no questions (English, German, Dutch, and a handful of others). The dominant strategy worldwide is a **question particle** — Japanese か *ka*, Mandarin 吗 *ma*, Turkish *mI*, Korean -까 *-kka*. For content questions, the WH-movement vs. WH-in-situ split tracks head-directionality: head-initial languages front the question word (*What* did you buy?), while head-final languages leave it in place (你买了**什么**?).

---

## Pronouns, verb morphology, and politeness vary systematically

**All languages distinguish at least 3 persons × 2 numbers in pronouns** (Greenberg's Universal 42). Beyond this minimum, three features vary: **clusivity** (inclusive vs. exclusive "we"), **formality** (T-V distinction in 2nd person), and **gender** (gendered 3rd person pronouns).

Inclusive/exclusive "we" appears in Austronesian (Tagalog *tayo/kami*), Dravidian (Tamil *nām/nāṅkaḷ*), Vietnamese (*chúng ta/chúng tôi*), and many others — but is entirely absent from all European languages, Japanese, Korean, and Semitic languages. Formal/informal "you" exists in most European languages (French *tu/vous*, German *du/Sie*), Hindi-Urdu (three levels: *tū/tum/āp*), and is elaborated into complex speech-level systems in Japanese and Korean. Gender-neutral 3rd person pronouns are the global norm — Turkish *o*, Finnish *hän*, Mandarin spoken *tā*, Tagalog *siya*, Persian او *u*, Bengali সে *she*, Swahili *yeye* — while gendered he/she appears in English, Romance, Germanic, Slavic, and Semitic languages. **Pro-drop** (dropping subject pronouns) is permitted in about 70% of major languages, either through verb agreement (Spanish, Arabic, Turkish, Hindi) or discourse context (Japanese, Korean, Mandarin).

**Verb conjugation spans a spectrum from zero to 50+ forms.** Mandarin, Vietnamese, Thai, and Malay/Indonesian never change verb form — all grammatical information comes from particles, adverbs, and context. English has ~5 forms per verb. Spanish has **50+** conjugated forms per verb. Turkish and Swahili stack **5–6 affixes** on a single verb root in fixed agglutinative order. The copula "to be" is **omitted in the present tense** in about 26% of languages — Russian, Arabic, Mandarin (with adjectives), Hebrew, Hungarian, Turkish, and Indonesian all drop it.

**Modality is semantically universal but formally diverse.** Every language expresses ability (can), permission (may), obligation (must), and probability (might). But only Germanic languages have a closed class of "modal verbs." Romance languages use subjunctive mood inflection. Mandarin uses preverbal auxiliary-like words (能 *néng*, 会 *huì*, 应该 *yīnggāi*). Japanese uses verb suffixes and sentence-final particles. Korean uses auxiliary verb constructions. The framework must map these semantically equivalent but structurally different systems.

---

## The curriculum audit matrix: 14 dimensions × target language

To audit any language-learning curriculum, check each cell in this matrix. A ✓ means the curriculum must explicitly teach this dimension for the target language. A ○ means it should be mentioned as absent/different. An empty cell means the dimension doesn't apply.

| Dimension | English | Spanish | French | German | Hindi | Mandarin | Japanese | Korean | Arabic | Turkish | Russian | Swahili | Thai | Vietnamese | Tamil | Tagalog |
|-----------|---------|---------|--------|--------|-------|----------|----------|--------|--------|---------|---------|---------|------|------------|-------|---------|
| **Tense (morphological)** | ✓ past | ✓ 3-way | ✓ 3-way | ✓ past | ✓ 3-way | ○ none | ✓ 2-way | ✓ 2-way | ✓ 2-way | ✓ 3-way | ✓ 2-way | ✓ rich | ○ none | ○ none | ✓ 3-way | ✓ focus |
| **Aspect** | ✓ prog | ✓ pfv/ipfv | ✓ pfv/ipfv | ○ minimal | ✓ 3-way | ✓ 4 particles | ✓ -te iru | ✓ -go itta | ✓ pfv/ipfv | ✓ prog/aor | ✓ pfv/ipfv pairs | ✓ rich | ✓ particles | ✓ particles | ✓ aspect | ✓ aspect |
| **Subjunctive/irrealis** | ○ vestigial | ✓ full | ✓ full | ✓ Konj I/II | ✓ forms | ○ lexical | ○ lexical | ○ endings | ✓ 3 moods | ✓ optative | ○ minimal | ✓ -e suffix | ○ context | ○ context | ✓ forms | ○ context |
| **Gender** | ○ pronouns | ✓ m/f | ✓ m/f | ✓ m/f/n | ✓ m/f | ○ none | ○ none | ○ none | ✓ m/f | ○ none | ✓ m/f/n | ✓ 18 classes | ○ none | ○ none | ○ none | ○ none |
| **Case** | ○ pronouns | ○ none | ○ none | ✓ 4 | ✓ 2+pp | ○ none | ✓ particles | ✓ particles | ✓ 3 (MSA) | ✓ 6 | ✓ 6 | ○ prefixes | ○ none | ○ none | ✓ 8 | ○ none |
| **Articles** | ✓ the/a | ✓ el/un | ✓ le/un | ✓ der/ein | ○ none | ○ none | ○ none | ○ none | ✓ al- | ○ none | ○ none | ○ none | ○ none | ○ none | ○ none | ✓ ang/ng |
| **Classifiers** | ○ none | ○ none | ○ none | ○ none | ○ none | ✓ 100+ | ✓ 500+ | ✓ system | ○ none | ○ none | ○ none | ○ none | ✓ extensive | ✓ system | ○ none | ○ none |
| **Word order** | SVO | SVO | SVO | V2/SOV | SOV | SVO | SOV | SOV | VSO/SVO | SOV | Free | SVO | SVO | SVO | SOV | VSO/VOS |
| **Pro-drop** | ○ no | ✓ yes | ○ no | ○ no | ✓ yes | ✓ radical | ✓ radical | ✓ radical | ✓ yes | ✓ yes | ✓ yes | ✓ yes | ✓ yes | ✓ yes | ✓ yes | ✓ yes |
| **Politeness grammar** | ○ minimal | ✓ T-V | ✓ T-V | ✓ T-V | ✓ 3-level | ○ lexical | ✓ complex | ✓ complex | ○ lexical | ✓ T-V | ✓ T-V | ○ minimal | ✓ pronouns | ✓ pronouns | ✓ T-V | ✓ pronouns |
| **Negation** | pre-V (do) | pre-V (no) | ne...pas | pre-V (nicht) | pre-V (nahīṃ) | pre-V (bù/méi) | V-suffix (-nai) | pre-V (an) | pre-V (lā/mā) | V-suffix (-me) | pre-V (ne) | prefix (ha-) | pre-V (mâi) | pre-V (không) | V-suffix (-illa) | pre-V (hindi) |
| **Question strategy** | inversion | intonation | est-ce que | inversion | kyā particle | ma particle | ka particle | -kka ending | intonation | mI particle | intonation | je particle | mǎi particle | không particle | -ā suffix | intonation |
| **Evidentiality** | ○ lexical | ○ lexical | ○ lexical | ○ lexical | ○ lexical | ○ lexical | ○ particles | ○ particles | ○ lexical | ✓ -mIş | ○ lexical | ○ lexical | ○ lexical | ○ lexical | ○ lexical | ○ lexical |

**How to use this matrix**: For any target language, ensure your curriculum covers every row where that language has a ✓. Where the cell shows ○, the curriculum should explicitly address *how that language handles this concept differently* — e.g., a Mandarin course must explain that there is no grammatical tense and teach the aspect particle system instead.

---

## The translation prompt framework: mapping any two languages

To translate or create translation prompts between Language A and Language B, the framework identifies **structural mismatches** across the 14 dimensions and generates rewrite rules. Here is the decision algorithm:

**Step 1: Identify the head-directionality mismatch.** If Language A is head-initial (SVO/VSO) and Language B is head-final (SOV), apply the reversal cascade: flip verb-object order, convert prepositions to postpositions, move genitive before noun, move relative clause before noun, move auxiliary after main verb.

**Step 2: Map the TAM system.** Decompose the source sentence into its atomic tense + aspect + mood values:

- **Tense value**: past / present / future / unspecified
- **Aspect value**: perfective / imperfective / progressive / habitual / perfect (anterior) / prospective
- **Mood value**: indicative / imperative / subjunctive / conditional / epistemic / deontic

Then look up how the target language realizes each value. If the target language lacks a grammatical category (e.g., Mandarin lacks tense), the translation prompt must specify: "Express past reference using time adverb + perfective particle 了."

**Step 3: Resolve nominal mismatches.** Check for:

- **Gender**: If source has gender agreement and target doesn't → drop. If target has it and source doesn't → assign gender to each noun and propagate agreement.
- **Case**: If target has case and source doesn't → add appropriate case suffixes to nouns/pronouns. If source has case and target doesn't → rely on word order and adpositions.
- **Articles**: If target lacks articles → drop them; express definiteness via word order or demonstratives if needed. If target has articles and source doesn't → insert appropriate article based on definiteness context.
- **Classifiers**: If target requires classifiers → insert appropriate classifier between every numeral and noun. If source has classifiers and target doesn't → drop them.

**Step 4: Handle pronoun mapping.** Check:

- Does the target language require formal/informal "you"? → Select appropriate form based on social context.
- Does the target distinguish inclusive/exclusive "we"? → Disambiguate based on meaning.
- Is the target pro-drop? → Omit pronouns when verb agreement or context makes them redundant.
- Does the target have gendered 3rd person pronouns? → Map accordingly.

**Step 5: Apply sentence-level structure rules.**

- **Negation**: Place the negative marker in the target language's canonical position (pre-verbal for ~70% of languages, suffixal for Japanese/Turkish/Tamil).
- **Questions**: Use the target language's dominant strategy (particle, inversion, or intonation).
- **Passive**: If target language has restricted passive (e.g., Mandarin), restructure to active voice.
- **Conditionals**: Use the target language's conditional morphology or conjunction.

**Example mapping: English → Japanese**

| English structure | Mismatch | Japanese rewrite rule |
|------------------|----------|----------------------|
| SVO word order | → SOV | Move verb to end; object before verb |
| Prepositions (in Tokyo) | → Postpositions | 東京**に** (Tōkyō **ni**) |
| Articles (the book) | → No articles | Drop; use demonstrative この if definiteness crucial |
| Future tense (will go) | → No future tense | Use non-past form 行く + context or でしょう |
| Subject-verb inversion (Did you go?) | → Question particle | 行きました**か** (ikimashita **ka**) |
| Passive (was eaten) | → Verb suffix | 食べ**られた** (tabe-**rareta**) |
| Relative clause after noun (the man who came) | → Relative clause before noun | **来た**男 (**kita** otoko) |

---

## Practical cheat sheet: the universal minimum grammar

Below are the **truly universal or near-universal** grammatical features — the irreducible core that every language expresses, and which every curriculum and translation prompt must account for:

**Universally present in all known languages:**
- Nouns and verbs as distinct (or distinguishable) categories
- Pronouns with ≥3 persons and ≥2 numbers
- Ability to negate any proposition
- Ability to form questions (interrogation)
- Ability to issue commands (imperative mood)
- Ability to refer to past, present, and future time (by any means)
- Ability to combine clauses (conjunction, causation, conditionality)
- Ability to modify nouns (attribution) and compare (degree)
- Subject precedes object in ~97% of languages with fixed order
- Sentences organized hierarchically (not as flat word sequences)

**Present in most (>65%) but not all languages:**
- Morphological tense marking on verbs (~60%)
- Morphological case marking (~62%)
- Verb agreement for person/number (~80%)
- Adpositions — prepositions or postpositions (~90%)
- Plural marking on nouns (~70% obligatory)
- Passive voice construction (~80%)

**Common but not majority features (language-specific, must be taught when present):**
- Grammatical gender / noun classes (~44%)
- Definite/indefinite articles (~35% have distinct article words)
- Numeral classifiers (~20%)
- Subjunctive mood (productive in ~30–40%)
- Evidentiality (~25%)
- Inclusive/exclusive "we" distinction (~40%)
- Formal/informal "you" (~25% grammaticalize it in pronouns)

---

## Conclusion: three principles for applying this framework

The research converges on three actionable principles. **First, separate what is said from how it is said.** All languages express the same semantic space (time, aspect, modality, roles, definiteness, comparison, questions, negation), but the formal machinery differs so fundamentally that mapping form-to-form between languages fails. The framework maps *meaning dimension to realization strategy*, which is why it works across unrelated language families.

**Second, the head-directionality parameter is the single most powerful predictor.** Knowing whether a language is head-initial or head-final predicts word order, adposition type, genitive position, relative clause position, auxiliary position, and WH-movement vs. WH-in-situ — a cascade of 6+ structural properties from one binary parameter. Any translation prompt should establish this parameter first.

**Third, the "missing category" problem is the core curriculum design challenge.** A Hindi speaker learning English must learn articles (absent in Hindi). An English speaker learning Mandarin must unlearn tense and learn aspect particles and classifiers. A Korean speaker learning Arabic must learn grammatical gender and a different word order. The audit matrix above identifies every such gap systematically. The most productive curriculum design strategy is not to teach grammar categories in isolation, but to **explicitly teach what the target language does differently** from the learner's native language — and this framework provides the exact map of where those differences lie for any language pair among the world's top 100.