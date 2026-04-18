# Supernova AI — User Research Synthesis Report

---

## 11. ONE-PAGE EXECUTIVE SUMMARY

- **Calls analyzed**: 17 total — 9 Hindi, 8 Tamil. Buckets: Engaged Trial Dropoff (4), Paid Active Engaged (5), Power Loyalist (2), True Renewal Loyalist (2), Paid but Dormant (1), Churned Non-Renewer (1), Renewed_Only_Ask_AI (1), Unbucketed/Fresh (1).
- **Top finding**: 8 out of 17 users (47%) reported that app content does not map to their specific profession or academic context — making "generic curriculum" the single most widespread pain point across both languages and almost every bucket.
- **Biggest revenue lever**: Fix mic/speech bugs and STT accuracy for Tamil Paid Active and Renewal Loyalist users (5 of 8 Tamil users affected, combined revenue ₹24,000+ in this sample alone) — these are paying users being pushed toward churn by technical failures, not product gaps.
- **Most urgent fix**: Mic recording bug (cancels mid-activity, spins endlessly, resets progress) — reported by 5 out of 17 users at severity 3, directly breaks the daily streak loop that is the primary engagement driver for paying users.
- **Most surprising insight**: Vinisha completed 24 activities without ever discovering the AI conversation feature — her #1 need is speaking practice. Suggests the app's information architecture is hiding its highest-value feature from users who need it most.
- **This week's recommended action**: Ship mic recording bug fix to 100% (if 1.91 addresses it) and audit whether it resolves the issue across low-end devices + Jio connectivity — this single fix has the highest severity × revenue × frequency score in this batch.

---

## 0. Sample Summary

17 calls analyzed: 9 Hindi-speaking users, 8 Tamil-speaking users. Bucket breakdown: Engaged Trial Dropoff (4, all Hindi), Paid Active Engaged (5 — 1 Hindi, 4 Tamil), Power Loyalist (2, both Hindi), True Renewal Loyalist (2, both Tamil), Paid but Dormant (1, Hindi), Churned Non-Renewer (1, Tamil), Renewed_Only_Ask_AI (1, Tamil), Unbucketed/Fresh Trial (1, Hindi). **Sampling caveat**: Trial Dropoff representation is entirely Hindi; Tamil churned/dormant users are underrepresented (only 1 Churned Non-Renewer). No Hindi churned users in this batch. The parent-as-buyer segment has only 1 data point (Tamil). Results should be treated as directional, not population-level claims, at n=17.

---

## 1. TOP PAIN POINTS (ranked by frequency x severity x revenue impact)

### 1. App content not personalized to user's profession/role/academic context

- **Frequency**: 8 out of 17 calls (47%)
- **Severity**: Average 2.4 (range 2-3)
- **Buckets affected**: Engaged Trial Dropoff, Paid but Dormant, Paid Active Engaged, Power Loyalist
- **Languages affected**: Both (5 Hindi, 3 Tamil)
- **Representative quotes**:
  - *"Ma'am, jaise client ko hume convince karna hota hai, baat karni hoti hai. Ki makeup ke liye unhe batana padta hai... ki kya kya hum provide kar rahe hain unhe"* — Saiba, freelance makeup artist
  - *"Ivunga ketka sonnanga, enna field try panna poringanu? ... Appove kuduthirundhen ma software engineer dhan try panna poren. Testing field office-la vandhu communicate panra mari dhan irukanum. Adhellam kuduthiruken. But andha related-a enaku adhuve kudukanum."* — Narmatha, software testing professional
  - *"Writing skill chahiye, ma'am... confidently main ekdam baat kar sakoon bahut acche se, fluent hoke."* — Divyani, civil services aspirant
- **Pattern strength**: Strong (8 calls)
- **Estimated revenue impact**: **High** — spans every bucket from Trial Dropoff to Power Loyalist. The 3 Tamil Paid Active users in this cluster represent ₹13,500 in current revenue. Trial Dropoffs here represent ₹0 in lost conversion.

Users affected: Saiba (beauty/salon), Narendra (teacher presentations), Akash (B.Com/CA exams), Divyani (civil services writing), Savita (medical consultation), Deb (interview/GD/academic), Narmatha (software testing), Dineshbabu (IT/order management).

---

### 2. Cannot produce spoken English despite comprehension / in-app to real-world transfer gap

- **Frequency**: 6 out of 17 calls (35%)
- **Severity**: Average 2.7 (range 2-3)
- **Buckets affected**: Power Loyalist, Paid Active Engaged, Engaged Trial Dropoff
- **Languages affected**: Both (4 Hindi, 2 Tamil)
- **Representative quotes**:
  - *"main speak nahi kar paati, main connect nahi kar paati sentences ko"* — Gungun, Power Loyalist with 126 activities
  - *"Avanga kudukkumbodhu form-u ennalla andha task-a complete panna mudiyudhu. Aana enaku adhaiye veliya pesanum na, struggle-a iruku."* — Narmatha, 124 activities completed
  - *"Samajhne mein koi problem nahi hai... bas bolte samay thoda अटक si kayi baar"* — Savita, retired gynecologist
- **Pattern strength**: Strong (6 calls)
- **Estimated revenue impact**: **High** — 2 Power Loyalists and 2 Paid Active users in this group. This gap is invisible in engagement metrics (users complete activities) but surfaces as a silent churn risk at renewal.

---

### 3. Mic recording bugs / speech-to-text accuracy failures

- **Frequency**: 5 out of 17 calls (29%)
- **Severity**: Average 2.8 (range 1-3; 4 of 5 at severity 3)
- **Buckets affected**: True Renewal Loyalist, Paid Active Engaged, Renewed_Only_Ask_AI
- **Languages affected**: Primarily Tamil (4 of 5 users)
- **Representative quotes**:
  - *"Namma pesara koodiya andha audio suthikitte irukkum... Apdi round aagitte irukkum. Adhu romba late aagum... Andha sila naal la mudikka mudiyadhu."* — Sumathi, True Renewal Loyalist, ₹4,002 paid
  - *"Hang aayirudhu. Oru samayam andha speech adhuve apdiye stuck aayineerudhu... thirumba ulla vandhu paatthaa thirumba first-la irundhu varanum."* — Suresh, Paid Active, ₹4,500 paid
  - *"'metric ton'-nu naan solrom-na, adhu 'metric into 100' numerical-a eduthukudhu... 'Nair Vasudev Street'-na adhu vandhu 'Lawyer Vasudev Street'-nu eduthukudhu."* — Vasu, Renewed, ₹5,000+ paid
- **Pattern strength**: Strong (5 calls)
- **Estimated revenue impact**: **Critical** — this exclusively hits *paying* users (combined ₹18,000+ in sample). Mic bugs directly break the daily activity loop and streak mechanic. STT errors undermine the mail draft feature that is Vasu's sole reason for keeping the app.

---

### 4. Onboarding fails to capture and use user profile for content personalization

- **Frequency**: 5 out of 17 calls (29%)
- **Severity**: Average 2.2 (range 2-3)
- **Buckets affected**: Engaged Trial Dropoff, Paid but Dormant, Paid Active Engaged
- **Languages affected**: Both (3 Hindi, 2 Tamil)
- **Representative quotes**:
  - *"Nahi, woh toh yaad nahi hai. Woh select nahi kiya tha maine."* — Arshad, possibly on wrong profile (kids vs. adults)
  - *"Agar mujhe koi aisa topic jo padhna hoga, toh main aapko message kar dungi. Toh fir aap usko kaise padhayenge?"* — Divyani, no mechanism to request topics
  - *"Samajhne mein koi problem nahi hai... bas bolte samay thoda अटक si"* — Savita, misclassified at A1 despite medical-English literacy
- **Pattern strength**: Moderate (5 calls)
- **Estimated revenue impact**: **High** — this pain point cascades into Pain Point #1 (generic content). Fixing onboarding personalization is the upstream lever for the #1 pain point.

---

### 5. Time constraints / inability to sustain consistent usage

- **Frequency**: 6 out of 17 calls (35%)
- **Severity**: Average 2.0 (range 1-3)
- **Buckets affected**: Paid Active Engaged, Power Loyalist, Churned Non-Renewer, True Renewal Loyalist, Renewed_Only_Ask_AI
- **Languages affected**: Both (2 Hindi, 4 Tamil)
- **Representative quotes**:
  - *"Aanaa naan time spend pannaana adha ennaala reach pannamudiyum-nu enakku theriyudhu. But time spend panradhukum enakku inge time illadhundradhu dhaan periya problem-e."* — Nirosha, Churned, ₹5,000 paid, 16 activities
  - *"Daily oru 15 nimisham maadhu spent pannanumttaanga. Aana enakku andha 15 nimisham kooda enakku vandhu enakku theriyala."* — Vasu, accountant with 10-7 job + clients
  - *"Enakku andha 20 minutes enna panna mudiyum?"* — Suresh, lunch-break-only user
- **Pattern strength**: Strong (6 calls) but lower severity
- **Estimated revenue impact**: **Medium** — drives dormancy and churn but is partly outside the app's control. The actionable lever is micro-learning format (5-20 min sessions) and smarter time-slot-based engagement.

---

### 6. App performance issues (loading delays, crashes, hangs)

- **Frequency**: 3 out of 17 calls (18%)
- **Severity**: Average 3.0 (all severity 3)
- **Buckets affected**: True Renewal Loyalist, Paid Active Engaged
- **Languages affected**: Tamil (all 3)
- **Representative quotes**:
  - *"Week 1 nu mattum kaattum. Andha screen apdiye black color la nirkum. Oru 40 seconds kalichu dhaan adhu konjam konjama load aagudhu."* — Sumathi
  - *"Namma close nu solli kuduthutom na fulla poyirum. Wait nu solli kuduthom na adhu apdiye stun aagi"* — Sumathi, OS-level close/wait dialog triggered by app hang
- **Pattern strength**: Moderate (3 calls)
- **Estimated revenue impact**: **High** — concentrated among Tamil paying users on low-end devices. Sumathi alone has 3 distinct app performance bugs. Combined with mic bugs (#3), these form a "Tamil technical reliability crisis."

---

### 7. AI conversation practice does not correct grammar mistakes

- **Frequency**: 3 out of 17 calls (18%)
- **Severity**: Average 2.3 (range 2-3)
- **Buckets affected**: Paid Active Engaged (all 3)
- **Languages affected**: Both (1 Hindi, 2 Tamil)
- **Representative quotes**:
  - *"real time conversation andha conversation irukkum bodhu adha andha idathula correct pannalai na ennodha mistake theriyadhu... veliye poyitu pesum bodhu edhaavadhu correct pannittanga na andha idathula romba oru oru maari bad ah feel aagum."* — Dineshbabu, IT professional
  - *"Main aise puchu ki chalo main answer karu. Aur kuch main galat ho toh mere ko woh correct kar de."* — Savita, retired doctor
- **Pattern strength**: Moderate (3 calls)
- **Estimated revenue impact**: **Medium** — affects paid active users who are among the most engaged. Creates a "false confidence trap" where users unknowingly reinforce errors. Dineshbabu specifically proposed a dual-mode (free flow vs. correction mode) solution.

---

### 8. Rigid lesson gating / destructive wrong-answer feedback

- **Frequency**: 3 out of 17 calls (18%)
- **Severity**: Average 2.3 (range 2-3)
- **Buckets affected**: Renewed_Only_Ask_AI, Paid Active Engaged
- **Languages affected**: Tamil (all 3)
- **Representative quotes**:
  - *"Naan edhu pannaalum adhu wrong wrong wrong-nu. Appa naan enna solren vera topic pannuna adhu kudukka maattaan. Idhai mudichaa thaan adutha process pogum."* — Vasu, who spent 1.5 hours at 4 AM, got so frustrated he permanently abandoned activities
  - *"Naan anjaaru thadava thappu pannumbodhu, kadasiya adhuve answer pannirudhu... oru chinna doubt-u Tamil-la sollra maari edhadhu vacha nalla irukkume."* — Suresh
- **Pattern strength**: Moderate (3 calls)
- **Estimated revenue impact**: **High** — Vasu's case is the most dramatic: a ₹5,000+ user who abandoned all structured activities permanently and became a mail-draft-only user. This single UX pattern converted a full-product user into a partial-product user.

---

### 9. Pricing barrier / no installment option

- **Frequency**: 3 out of 17 calls (18%)
- **Severity**: Average 3.0 (all severity 3)
- **Buckets affected**: Engaged Trial Dropoff (Hindi), Paid Active Engaged (Tamil)
- **Languages affected**: Both (1 Hindi, 2 Tamil)
- **Representative quotes**:
  - *"Fees jaasthi means, ennaku fees jaasthi. Yen-na andha alavukku en kitta avvvalavu pannam-lam kidaiyaadhu"* — Suresh
  - *"Avangalukitta sollu, indha maari practice pannittu irukka... amount-a kettonnume shock aaguraanga."* — Suresh, on friends dropping off at price
- **Pattern strength**: Moderate (3 calls; weak evidence for Hindi at this scale)
- **Estimated revenue impact**: **High for Tamil** — Suresh explicitly says the ₹4,100 upfront is his biggest barrier and kills all referral attempts. Tamil pricing has zero intermediate step between trial and ₹3,500-5,000 annual.

---

### 10. No progress visibility / milestone markers

- **Frequency**: 4 out of 17 calls (24%)
- **Severity**: Average 1.75 (range 1-2)
- **Buckets affected**: Engaged Trial Dropoff, Paid Active Engaged, True Renewal Loyalist
- **Languages affected**: Both
- **Representative quotes**:
  - *"Ennoda progress eppadindradhu theriyala. But enakke theriyudhu. Chinna chinna improvement, chinna chinnadaa improvement maariye varudhu."* — Suresh
- **Pattern strength**: Moderate (4 calls)
- **Estimated revenue impact**: **Low-Medium** — this is a diffuse complaint, not a churn trigger. But for users with intrinsic motivation (Deepika, Suresh), visible progress markers could be the difference between renewal and abandonment.

---

## 2. TOP POSITIVE SIGNALS (what's working)

### 1. AI conversation / speaking practice as judgment-free safe space

- **Frequency**: 7 out of 17 calls (41%)
- **Buckets**: Paid Active Engaged (4), Power Loyalist (1), True Renewal Loyalist (1), Engaged Trial Dropoff (1)
- **Languages**: Both (3 Hindi, 4 Tamil)
- **Representative quotes**:
  - *"AI kitta easy ah, chinna, like, odane edhaavadhu doubt kekpaanga. Andha maari kooda endha hesitations um illaama kekka mudiyudhu doubts... romba chinna paiyanuku solli tarra maari nalla solli tarraadhunaley enakku nalla irukku."* — Dineshbabu
  - *"Normal conversation karna chaho toh uske liye bhi hai AI ke through. Aur agar aise practice karna chaho ke grammar bhi strong hona chahiye toh jaise chal raha hai na best hai."* — Narendra
  - *"Correct, perfect ah irukku sir. Nova vandhu correct ah perfect ah pandranga."* — Sumathi
- **Pattern strength**: Strong (7 calls)
- **Why it matters**: This is the product's core differentiator. Sumathi explicitly contrasted it against a peer-calling app where strangers spoke too fast, asked invasive questions, and wasted hours. The AI's patience, non-judgment, and structured correction is a moat. **Do not break this.**

### 2. Perceived grammar and tense improvement is tangible

- **Frequency**: 6 out of 17 calls (35%)
- **Buckets**: Engaged Trial Dropoff (2), Power Loyalist (2), Paid Active Engaged (2)
- **Languages**: Both (4 Hindi, 2 Tamil)
- **Representative quotes**:
  - *"Abhi itna acchi se aa gaya hai matlab isme se agar koi puchenge na toh main turant bol sakta hoon."* — Narendra, 2 days of use
  - *"Jab sochta hu toh English mein bhi main abhi soch sakta hu."* — Deb, 6-7 months of use (thinking in English is a fluency milestone)
  - *"samajh mein bhi aa raha hai aur realise bhi ho raha hai ki haan, ye theek bol raha hu main"* — Akash
- **Pattern strength**: Strong (6 calls)
- **Why it matters**: Users who report tense/grammar improvement are the most likely to attribute value to the app. Deb's "I can think in English now" is a testimonial-grade outcome. The grammar progression is the curriculum's strongest pillar — lean into it for ad creative and onboarding.

### 3. Daily habit formation and sustained engagement

- **Frequency**: 5 out of 17 calls (29%)
- **Buckets**: True Renewal Loyalist (1), Paid Active Engaged (2), Power Loyalist (1), Engaged Trial Dropoff (1)
- **Languages**: Both (2 Hindi, 3 Tamil)
- **Representative quotes**:
  - *"Daily epdi namma saapdurrom? Epdi thoongurrom? Adhae maadhiri. Like avanoda idhu. Innikku naa pannala innum. Naa pannittu dhaan naa thoonguren."* — Mother of Ishanth, comparing app use to eating and sleeping
  - *"Idhula fun-a irukku, jaaliya irukku. Adhanaala dhaan naan innum poittu irukken. Kittathatta moonu maasama naan pannittu irukken."* — Suresh, 3 months continuous
- **Pattern strength**: Strong (5 calls)
- **Why it matters**: For renewals, daily habit > feature satisfaction. The users who formed habits (Mother/Ishanth, Suresh, Dineshbabu) are the least likely to churn. Streaks and gamification were explicitly called out as drivers by Mother/Ishanth and Dineshbabu.

### 4. App's flexibility vs. offline alternatives

- **Frequency**: 4 out of 17 calls (24%)
- **Buckets**: Engaged Trial Dropoff (1), True Renewal Loyalist (1), Renewed_Only_Ask_AI (1), Paid Active Engaged (1)
- **Languages**: Both
- **Representative quotes**:
  - *"Andha class indha class adhellaam summa pongga sir... Avangalukku vandhu edho padichittu vandhavanga solraanga. Adhu boring-ave irukkudhu."* — Vasu, rejecting offline classes
  - *"YouTube-la paakkavida idhu konjam useful-a irukku. Konjam thanithaniyaa puriyudhu."* — Vinisha
- **Pattern strength**: Moderate (4 calls)
- **Why it matters**: Offline English classes and YouTube are the most common prior attempts. Every user who tried offline failed due to logistics or boredom. This is the positioning wedge: structured learning with AI flexibility, no commute, no judgment.

### 5. Mail draft feature as daily professional workhorse

- **Frequency**: 1 out of 17 calls (6%) — BUT this single user (Vasu) has 289 interactions, almost all mail-driven
- **Buckets**: Renewed_Only_Ask_AI
- **Languages**: Tamil
- **Representative quote**:
  - *"Enakku evlo useful-a irukkudhu ennudaiya job promotion-ukku"* — Vasu
- **Pattern strength**: Weak (1 call, but with extraordinary depth of usage)
- **Why it matters**: Vasu's case is an outlier that reveals an underexplored value prop. He abandoned all structured activities but kept the app solely for mail drafting. His office colleagues are impressed by his emails without knowing his source. This suggests a potential "professional writing assistant" positioning for a specific segment.

---

## 3. CROSS-CUTTING THEMES

### Theme 1: Personalization gap is simultaneously the #1 churn driver and the #1 opportunity

- **Evidence**: "Profession-specific content gap" pain point (8 calls) + "Onboarding doesn't capture/use profile" pain point (5 calls) + "AI conversation exceeds expectations" positive signal (7 calls). In total, 13 of 17 calls touch some facet of personalization.
- **Why it matters**: Users who got any degree of role-relevance (Deb practicing mall scenarios, Dineshbabu using AI conversation for work calls) praised it. Users who didn't (Narmatha providing "software testing" at onboarding and getting generic content) felt betrayed at ₹4,500. The app collects profession data during onboarding but doesn't use it. Closing this loop is the single highest-leverage product change possible.

### Theme 2: Comprehension ≠ production — the app builds passive knowledge but doesn't bridge to active speech

- **Evidence**: "Cannot produce speech despite comprehension" pain point (6 calls) + "AI conversation as safe space" positive (7 calls) + "Grammar improvement is tangible" positive (6 calls). Users learn grammar rules and complete exercises but freeze when speaking to humans.
- **Why it matters**: This is the app's long-term retention threat. Gungun has 126 activities and still "can't connect sentences." Narmatha completes all tasks but "can't speak outside." The curriculum successfully builds input skills but the output bridge (structured speaking production drills, not just free-flow AI chat) is missing. Users who don't experience real-world transfer will not renew — and engagement metrics won't catch this until it's too late.

### Theme 3: Tamil paid users face a technical reliability crisis that threatens the highest-revenue segment

- **Evidence**: Mic/STT bugs (5 calls, 4 Tamil) + app performance (3 calls, all Tamil) + pricing barrier (2 Tamil users) = technical failures are concentrated among users paying ₹3,500-10,000. Hindi users reported zero bugs.
- **Why it matters**: Tamil users represent the higher ARPU segment (₹3,500-10,000 vs. Hindi ₹299-1,799). Every technical bug in this batch hit a Tamil user who had already paid significant money. Sumathi (₹4,002), Suresh (₹4,500), Vasu (₹5,000+), Dineshbabu (₹4,500) — that's ₹18,000+ of revenue at risk from bugs in a 17-call sample. This likely correlates with lower-end devices and Jio connectivity common in Tier 2-3 Tamil Nadu.

### Theme 4: Trial-to-paid conversion is a funnel design failure, not a product-market fit failure

- **Evidence**: All 4 Engaged Trial Dropoffs (Saiba: 6 activities; Deepika: 14; Narendra: 26; Akash: 13) reported positive sentiment about the app. Narendra called it "best." Deepika was "quite happy." None reported bugs or dissatisfaction. Yet none converted.
- **Why it matters**: These users validated the product and then... nothing happened. No conversion nudge at peak engagement (Narendra at activity 26), no pricing bridge for intrinsic-motivation users (Deepika), no profession-specific hook in the first session (Saiba). The funnel is leaking engaged, satisfied users — the most fixable type of churn.

### Theme 5: Users hack around the app's gaps using external tools, revealing unmet needs

- **Evidence**: Gungun uses Google Translate as a crutch mid-conversation. Vinisha used ChatGPT to prepare for her UK university interview. Narmatha uses ChatGPT for lookups. Vasu's entire usage is mail drafting because activities failed him. Nirosha expected a live translation tool.
- **Why it matters**: Each external-tool usage is a product gap signal. ChatGPT is the most dangerous competitor — Vinisha defaulted to it for her highest-stakes English moment (university interview) instead of Supernova. The app should either absorb these use cases (interview prep, real-time translation aid, writing practice) or risk losing users to tools that handle them better.

---

## 4. BUCKET-SPECIFIC INSIGHTS

### Engaged Trial Dropoff (n=4, all Hindi)

All 4 users had positive first impressions and completed 6-26 activities. The shared pattern is **no conversion mechanism at peak engagement**: Narendra hit 26 activities in 2 days with no upgrade prompt. The secondary pattern is **no profession-specific content hook in the first session** — Saiba (makeup artist), Narendra (teacher), and Akash (CA student) all have clear professional needs the app didn't surface. This bucket's churn is almost entirely a funnel problem, not a satisfaction problem.

### Paid Active Engaged (n=5 — 1 Hindi, 4 Tamil)

Two sub-patterns: (a) Tamil users in this bucket (Suresh, Dineshbabu, Narmatha, Vinisha) face **technical friction** (mic bugs, STT errors) AND **curriculum gaps** (no profession-specific content). (b) The shared complaint across all 5 is that the app builds passive knowledge but doesn't transfer to real-world speaking. Dineshbabu (50% confidence gain) and Suresh (3 months continuous) show the product works — the gap is the "last mile" to real conversation.

### Power Loyalist (n=2, both Hindi)

Both Gungun (126 activities, ₹499) and Deb (354 activities, ₹897) are high-activity but low-payment. Gungun still can't connect sentences after 126 activities — the curriculum builds vocabulary and grammar but hasn't bridged to sentence production. Deb hit a content ceiling (no interview/GD practice in his course track) and needs cross-course discoverability. **This bucket's loyalty is to the cheap tier, not the premium value.** Upsell path is unclear.

### True Renewal Loyalist (n=2, both Tamil)

Sumathi (₹4,002, 232 activities) and Mother/Ishanth (₹10,001, 326 activities) are the highest-revenue users. Sumathi is being ground down by **multiple technical bugs** (loading delays, mic spinning, progress reset) and **lost 5 months** of subscription due to sales miscommunication. Mother/Ishanth is the brightest success story: daily habit formed, relatives stunned, child treats app like brushing teeth. **For Renewal Loyalists, the risk isn't dissatisfaction — it's death by a thousand technical cuts (Sumathi) or content plateau when gamification novelty fades (Mother).**

### Churned Non-Renewer (n=1, Tamil)

Nirosha (₹5,000, 16 activities) churned due to **time constraints + expectation mismatch**, not product rejection. She expected a real-time conversation translator ("record → get meaning → get reply"), not structured self-study. She explicitly said "if I spend time, I can reach" — the product isn't the problem, her schedule is. **A 5-minute micro-lesson format and smarter re-engagement nudges could have saved this account.**

### Renewed_Only_Ask_AI (n=1, Tamil)

Vasu (₹5,000+, 289 interactions, almost all mail) permanently abandoned activities after a single devastating 1.5-hour session of "wrong wrong wrong" feedback at 4 AM. He now uses the app exclusively as a mail drafting tool. **Rigid lesson gating with no skip option and no constructive feedback converted a full-product user into a partial-product user.** His retention hangs entirely on the mail draft feature and STT accuracy.

---

## 5. CONTRADICTIONS & SURPRISES

### 1. Power Loyalist who can't speak after 126 activities

Gungun has completed 126 activities, is classified as a Power Loyalist, and reports improvement — yet she explicitly says *"main speak nahi kar paati, main connect nahi kar paati sentences ko."* High activity count masks zero production-level fluency. Engagement metrics would flag her as a success; she is not.

### 2. ₹5,000 payer who abandoned all structured activities permanently

Vasu paid ₹5,000+ but uses only mail drafting. A single bad 1.5-hour experience with rigid gating ("wrong wrong wrong") was enough to permanently kill his willingness to attempt activities. He is simultaneously the most integrated daily user (289 mail interactions) and the most disengaged from the core curriculum. His renewal is secure — but only because of a feature that wasn't designed as the primary value prop.

### 3. "Quite happy" user who didn't convert

Deepika completed 14 activities on a ₹9 trial, described herself as "quite happy," and found the app's flexibility superior to offline classes she'd failed with — yet she did not convert. Satisfaction ≠ conversion. For users with purely intrinsic motivation (no job/exam/social pressure), the ₹9→₹299 jump requires perceived *necessity*, not just satisfaction.

### 4. Engaged Trial Dropoff with 26 activities in 48 hours

Narendra completed 26 activities in roughly 2 days, called the app "best," mastered 3 tenses, and is in the Dropoff bucket. This is the clearest conversion design failure in the sample. He was at peak motivation and the funnel did... nothing. He was offered a free month during the research call, which further delays the payment decision.

### 5. Churned user who believes the product works

Nirosha paid ₹5,000, completed only 16 activities, churned — and explicitly said *"Naan time spend pannaana adha ennaala reach pannamudiyum-nu enakku theriyudhu"* (I know if I spend time, I can reach my goal). She didn't churn because the product failed. She churned because the product didn't accommodate her schedule. A micro-learning format would have addressed this directly.

---

## 6. HYPOTHESIS TRACKING

### Strongly Supported

| Hypothesis | Status | Evidence | Recommendation |
|---|---|---|---|
| Generic curriculum fails to surface value for profession-specific users, leading to dropoff/dissatisfaction | **Strongly supported** | 8 of 17 calls across both languages; spans Trial Dropoffs through Power Loyalists | **Accept and act** — build profession-tagged content packs, starting with top 3 declared fields |
| Users who understand English but can't speak face a production gap the app doesn't bridge | **Strongly supported** | 6 of 17 calls; includes Power Loyalists with 100+ activities still stuck | **Accept and act** — build "output-first" speaking drills (Hindi/Tamil prompt → spoken English production) |
| Time-starved users need micro-learning; current session format doesn't fit their schedule | **Strongly supported** | 6 of 17 calls; Nirosha churned, Vasu and Suresh are at risk | **Accept and act** — ship a 5-minute daily plan and micro-lesson format |

### Moderately Supported

| Hypothesis | Status | Evidence | Recommendation |
|---|---|---|---|
| STT/speech recognition accuracy is a top driver of frustration for Indian-accented users | **Moderately supported** | 4 of 17 calls, all Tamil. Vasu's case is extreme (proper nouns, domain terms mangled) | **Continue probing** — quantify STT error rates by language/accent and device |
| High-engagement trial users dropping off = conversion funnel design failure, not PMF failure | **Moderately supported** | 4 of 4 Trial Dropoffs had positive sentiment + 6-26 activities | **Accept and act** — test conversion nudges at activity milestones (15, 25) |
| Tamil users on Jio/low-end devices face disproportionate app performance issues | **Moderately supported** | 3 of 8 Tamil users report severe performance issues; 0 of 9 Hindi users do | **Continue probing** — segment crash/ANR data by device + carrier |
| Users with prior dropout history from other platforms are high churn-risk | **Moderately supported** | 2 of 17 calls (Akash: Masstudy; Sumathi: peer-calling app) | **Continue probing** — add "have you tried other English apps?" to onboarding |

### Mixed

| Hypothesis | Status | Evidence | Recommendation |
|---|---|---|---|
| Free subscription extensions delay rather than accelerate conversion | **Mixed** | 3 calls (Akash, Narendra, Arshad) received free months; no data yet on whether they converted after | **Continue probing** — A/B test free extension vs. limited premium unlock for trial dropoffs |
| ₹9 trial trains users to perceive product as "₹9 worth" | **Insufficient data** | Only Deepika fits this pattern cleanly; others had different dynamics | **Continue probing** — test ₹49 trial vs. ₹9 trial for conversion rates |

### Insufficient Data

| Hypothesis | Status | Evidence | Recommendation |
|---|---|---|---|
| School-age children downloaded by parents create adult content mismatch | **Insufficient data** | Only 1 call (Arshad); Mother/Ishanth is a different pattern | **Continue probing** — sample more parent-as-buyer Hindi users |
| Quarterly/EMI pricing would unlock referral loops in Tamil market | **Insufficient data** | Only 1 explicit request (Suresh) | **Continue probing** — survey Tamil renewals about installment preference |
| Retired professionals with domain English are systematically misclassified at A1 | **Insufficient data** | Only 1 call (Savita) | **Continue probing** — audit level distribution of 40+ age users |

### NEW (emerged from synthesis)

| Hypothesis | Status | Evidence | Recommendation |
|---|---|---|---|
| **NEW**: The AI-to-human confidence transfer gap is the app's biggest long-term retention threat among active users | Emerging | 3 active users (Narmatha 124 activities, Gungun 126, Vinisha 24) report completing tasks but unable to speak to humans | **High priority probe** — add post-renewal survey question: "Have you used English with a real person since starting Supernova?" |
| **NEW**: The app has an undiscovered-feature problem — key features like AI conversation are invisible to users who need them most | Emerging | Vinisha: 24 activities, #1 need is speaking, never found AI conversation. Nirosha: didn't know tablet was an option. Deb: relevant content exists in another course, can't find it. | **Accept and act** — audit feature discoverability in onboarding flow and post-lesson prompts |
| **NEW**: ChatGPT is a direct competitor for high-stakes speaking prep (interviews, presentations) | Emerging | 2 of 17 users (Vinisha, Narmatha) use ChatGPT; Vinisha used it for her most critical English moment (university interview) instead of Supernova | **Continue probing** — understand why users default to ChatGPT for preparation but Supernova for practice |

---

## 7. COMPETITIVE INTELLIGENCE

### Competitor frequency

| Competitor | Mentions | Context |
|---|---|---|
| **Google Translate / Google Search** | 4 calls (Gungun, Dineshbabu, Narmatha, Nirosha) | Vocabulary lookup, word meanings, real-time translation crutch |
| **Offline English classes** | 3 calls (Deepika, Vasu, Sumathi) | All tried and abandoned — logistics, boredom, or regression after stopping |
| **ChatGPT** | 2 calls (Vinisha, Narmatha) | Interview prep (Vinisha), general lookup (Narmatha) |
| **YouTube** | 2 calls (Vinisha, Suresh) | Free English content; Suresh discovered Supernova via Tamil Pokesha channel |
| **Duolingo** | 1 call (Narendra) | Used 2 years ago for 1-2 days; lacked speaking practice |
| **Masstudy** | 1 call (Akash) | Online English platform; dropped off due to inconsistency |
| **Peer-calling English app** | 1 call (Sumathi) | Strangers called to practice; abandoned — invasive, unstructured, time-wasting |
| **School/tuition teachers** | 1 call (Arshad) | Poor quality (tuition teacher's English is bad) |

### Key competitive insight

**ChatGPT is the most dangerous competitor**, not because of frequency (only 2 mentions) but because of *context*: Vinisha used ChatGPT — not Supernova — to prepare for her UK university interview, her single highest-stakes English moment. She generated scripted answers via ChatGPT because she trusted "prepared answers" over "practice-based fluency." This reveals a positioning gap: Supernova is seen as a learning tool, but not as a preparation tool for specific high-stakes moments.

**Google Translate is used ALONGSIDE Supernova** (not instead of), primarily as a real-time crutch during actual conversations. 4 users default to it when they can't recall the English word. This is a product opportunity: a "quick word lookup" feature within the app could capture this usage.

**Offline classes are used INSTEAD OF but abandoned** — every user who tried offline switched to Supernova due to superior flexibility. This is a validated positioning wedge for marketing.

**No user in this batch mentioned any direct app competitor** (like ELSA, Speak, etc.) as a current alternative. Supernova's competitive set, from the user's perspective, is Google Translate + ChatGPT + YouTube + offline classes — not other English learning apps.

---

## 8. CURRICULUM SIGNALS

### Scenario/Role Requests (ranked by frequency)

| Request | Calls | Users |
|---|---|---|
| **Interview preparation** (job, university, civil services) | 5 | Deb, Vasu, Narmatha, Vinisha, Suresh |
| **Professional meeting/client communication** | 4 | Nirosha, Suresh, Dineshbabu, Savita |
| **Academic/classroom English** | 3 | Arshad, Deb, Vinisha |
| **Civil services/competitive exam English** | 2 | Divyani, Sumathi |
| **Homemaker daily life scenarios** | 1 | Deepika |
| **Beauty/salon professional** | 1 | Saiba |
| **Medical consultation** | 1 | Savita |
| **Software testing workplace** | 1 | Narmatha |

**Flag: Interview preparation appeared in 5 calls — this is a curriculum unit to build immediately.** Users range from warehouse job applicants (Suresh) to UK university applicants (Vinisha) to accounting professionals (Vasu) to Masters students (Deb). A modular interview prep path with role-specific variants would serve the widest cross-section.

### Vocabulary Type Requests

| Request | Calls | Users |
|---|---|---|
| **Hindi-to-English / Tamil-to-English real-time word recall drills** | 5 | Savita, Gungun, Divyani, Sumathi, Narmatha |
| **Domain-specific professional vocabulary** (IT, medical, accounting, beauty) | 4 | Dineshbabu, Savita, Vasu, Saiba |
| **Advanced/challenging vocabulary** (not basic words users already know) | 2 | Dineshbabu, Deb |
| **Themed vocabulary clusters** (group related words: eating, sounds, etc.) | 1 | Mother/Ishanth |

**Flag: Hindi/Tamil-to-English word recall drills appeared in 5 calls — potential curriculum unit.** This maps directly to the core user behavior of "I know it in my language but freeze when speaking English." Savita, Gungun, and Narmatha described this exact bottleneck.

### Grammar Topic Requests

| Request | Calls |
|---|---|
| Tenses (full system coverage) | 2 (Narendra, Sumathi) |
| Complex/compound sentence construction | 3 (Akash, Gungun, Sumathi) |
| Active/passive voice conversions | 1 (Mother/Ishanth) |
| Articles, prepositions, phrases | 1 (Sumathi) |

### Format Requests

| Request | Calls |
|---|---|
| Output-first speaking exercises (prompt → produce full spoken response) | 3 (Narmatha, Vasu, Vinisha) |
| Hindi/Tamil-to-English translation drills | 4 (Gungun, Savita, Divyani, Sumathi) |
| Fill-in-the-blank exercises | 1 (Suresh) |
| Writing practice module | 1 (Divyani) |
| 5-minute micro-lessons | 1 (Nirosha) |
| Gamified grammar exercises (not worksheet style) | 1 (Mother/Ishanth) |
| Richer error correction (multiple diverse examples + "why") | 1 (Narmatha) |

---

## 9. RANKED ACTION ITEMS

| # | Action | Owner | Priority | Evidence | Expected Outcome |
|---|---|---|---|---|---|
| 1 | **Fix mic recording bug** (random cancel, infinite spinning, progress loss on restart). Confirm 1.91 addresses it and roll out to 100%. Test on low-end devices with Jio connectivity. | Engineering | **P0** | 5 of 17 calls (Sumathi, Suresh, Dineshbabu, Vasu, Mother), all severity 3. Dineshbabu could not finish today's daily activity. Suresh lost 10 min progress 6 times in 3 months. | Streak completion rate for Tamil paid users should increase measurably within 2 weeks |
| 2 | **Improve STT accuracy for Indian-accented English**, especially proper nouns and domain terms. Consider context-aware STT or user-defined vocabulary. | Engineering / AI | **P0** | 4 of 17 calls (Vasu, Suresh, Dineshbabu, Mother). Vasu's core use case (mail drafting) is undermined — "metric ton" → "10", names mangled. | Reduction in STT-related complaints; Vasu's email correction time drops |
| 3 | **Build profession-tagged conversation scenarios** starting with top declared fields: interview prep (5 calls), IT/corporate communication (2), medical (1), teaching (1), software testing (1). | Curriculum + Product | **P1** | 8 of 17 calls flag generic content as a pain point. Narmatha explicitly provided her field at onboarding and got nothing relevant. | Trial-to-paid conversion should increase for users who select a profession at onboarding |
| 4 | **Build an interview preparation module** — roleplay scenarios for job interviews, university interviews, and civil services interviews with role-specific variants. | Curriculum | **P1** | 5 of 17 calls (Deb, Vasu, Narmatha, Vinisha, Suresh). Vinisha used ChatGPT instead. Vasu needs to be interview-ready in 30-40 days. Suresh failed an AI-conducted interview. | Captures the "high-stakes moment" use case currently lost to ChatGPT |
| 5 | **Ship "correction mode" for AI conversation** — a dual-mode toggle between free-flow and grammar-corrected conversation, or at minimum a post-conversation error summary. | Product / Engineering | **P1** | 3 of 17 calls (Savita, Dineshbabu, Narmatha). Dineshbabu gave an implementable product spec. Lack of correction creates a "false confidence trap." | Reduces real-world embarrassment; increases perceived value of AI feature |
| 6 | **Build "Think in Hindi/Tamil, Speak in English" output drills** — structured exercises where user sees a Hindi/Tamil prompt and must produce the English sentence aloud. | Curriculum | **P1** | 5 of 17 calls request this format (Savita, Gungun, Divyani, Sumathi, Narmatha). Directly addresses the #2 pain point (comprehension ≠ production). | Bridges the passive-to-active gap; moves users from "I know grammar" to "I can speak" |
| 7 | **Allow lesson/activity skipping or adaptive difficulty** — stop gating users on wrong answers without constructive feedback. After 2-3 wrong attempts, provide scaffolded hints, then let them skip. | Product | **P1** | 3 of 17 calls (Vasu, Suresh, Narmatha). Vasu permanently abandoned activities after rigid gating. | Prevents permanent activity abandonment; recovers users like Vasu |
| 8 | **Implement profession-based onboarding** that captures role (teacher, student, professional, homemaker) and surfaces relevant content from Day 1. | Product | **P1** | 5 of 17 calls cite onboarding personalization failure. Narmatha provided her profession and got nothing. Arshad may be on wrong age profile. | Reduces time-to-value for new users; feeds data into profession-tagged content |
| 9 | **Introduce quarterly/EMI payment option for Tamil annual plans** (₹3,500-5,000 upfront). | Growth / Product | **P1** | 2 of 17 calls (Suresh explicitly, Nirosha implicitly). Suresh says friends "shock aaguraanga" at price and drop off, killing referral. | Unlocks referral loops in Tamil market; reduces upfront payment anxiety |
| 10 | **Design a 5-20 minute daily plan preset** for time-constrained users — auto-curate a micro-session blending lesson + mini-conversation. | Product | **P1** | 6 of 17 calls cite time constraints. Suresh has only 20 min. Vasu can't find 15 min. Nirosha completed only 16 activities due to schedule. | Reduces dormancy among time-starved users; keeps Suresh-type users from becoming grammar-only |
| 11 | **Surface AI conversation feature in onboarding and post-lesson prompts.** | Product / UX | **P1** | Vinisha completed 24 activities without discovering it. Deb can't find adjacent course content. | Ensures users with speaking needs discover the highest-value feature early |
| 12 | **Optimize app cold-start loading and prevent OS-level hang dialogs** on low-end Android devices. Test on Jio connectivity. | Engineering | **P1** | 3 of 17 calls (Sumathi: 40-sec load, black screen, OS "close/wait" dialog). All Tamil. | Stabilizes experience for Tier 2-3 Tamil users on budget hardware |
| 13 | **Test conversion nudges at activity milestones** (15th and 25th activity) for trial users with high engagement. | Growth | **P2** | 4 of 4 Trial Dropoffs were engaged but received no conversion prompt at peak. | Captures Narendra-type users at peak motivation |
| 14 | **Implement multi-profile support per phone number** for family accounts. | Product | **P2** | 1 of 17 calls (Mother/Ishanth: 2 children sharing one account). Likely underrepresented in sample. | Accurate per-user analytics; personalized content per child/age/board |

---

## 10. RESEARCH GAPS — WHAT TO PROBE NEXT

1. **Hindi churned users are completely absent from this batch.** Zero Hindi users who paid and then didn't renew were sampled. Next batch must include 5+ Churned Non-Renewer Hindi users to understand whether Hindi churn drivers differ from Tamil (where churn appears driven by time + expectation mismatch + technical issues).

2. **Pricing perception is weakly covered.** Only 2 users (Deepika, Suresh) discussed pricing as a barrier in depth. Next batch should sample more Trial Dropoffs and probe directly: "What price would you pay?" and "What stopped you from subscribing?" For Tamil users specifically, test quarterly pricing appetite.

3. **AI-to-human confidence transfer is an emerging hypothesis with only 3 data points.** Narmatha (124 activities, can complete tasks but can't speak outside), Gungun (126, can't connect sentences), Vinisha (24, can listen but not respond) all exhibit this gap. Need 5+ users in the next batch probed specifically: "Have you spoken English with a real person since starting Supernova? What happened?"

4. **Parent-as-buyer segment has only 1 data point (Mother/Ishanth).** This ₹10,001 account is the highest revenue in the sample and shows extraordinary engagement. Need 5+ parent-buyer accounts sampled to understand: Are streaks/gamification the real driver? Does content plateau after 6 months? Is multi-child sharing common?

5. **The mail-draft-only user pattern (Vasu) is n=1 but revelatory.** Are there other users who abandoned activities but retained the app solely for Ask AI features (mail, translation)? If this is a segment, it has distinct retention and monetization implications. Pull usage data on users with 0 activity completions but high Ask AI usage.
