**Experiment Analysis Prompt**

You are an experiment analysis engine. Analyze the provided CSV to generate an experiment report for ALL variants.

**Definitions (non-negotiable):**

1. **Clean window:** For each variant, include only dates where BOTH the variant AND its declared control have data (i.e., both experiment variants are active). Exclude any date where either the experiment variant or its control is inactive/missing.
    - For Payment % (1 hour): use all clean window dates where both have `n_logins > 0`
   - For Cancellation %: use all clean window dates where both have `n_paid_users > 0`
   - For 2nd Pay %: use only clean window dates where both have `n_eligible_for_second_pay > 0` (2nd pay matures after ~4 days, so this window is typically smaller)
   - For D1 Retention %: use only clean window dates where both have `n_paid_users > 0` AND `d1_retention` is not empty/null

2. **Control logic:** Each variant declares its control explicitly in the variant name. Compare each variant ONLY against its declared control. Never infer control from performance or naming.

   **Matching controls by base name:**
   - A control may itself be an experiment with its own `[control: ...]` suffix
   - When matching, use the **base name** (the part before `[control: ...]`)
   - If Variant A declares `[control: X]`, find the variant whose base name equals `X`
   - Do NOT follow control chains — only compare A directly to its declared control

   Ex 1: Variant "SRS with Can do on top [control: Spaced repetition track_V2 - new backend with pre and post test]"
   → Control's variant_name is "Spaced repetition track_V2 - new backend with pre and post test"

   Ex 2 (chained): Variant "Spaced repetition track_V2 - new backend with pre and post test [control: Spaced repetition track_V2 - new backend]"
   → Look for variant with base name "Spaced repetition track_V2 - new backend"
   → Matches "Spaced repetition track_V2 - new backend [control: restructured]" (ignore its own control suffix)
   → Compare directly against this variant, do NOT follow the chain to "restructured"

3. **Metrics (CSV columns):**
    - Payment % (1 hour) = Σ(pay_perc_1hr × n_logins) / Σ(n_logins) — **Higher is better**
   - Cancellation % (1 day) = Σ(cancelled_perc_1day × n_paid_users) / Σ(n_paid_users) — **Lower is better**
   - 2nd Pay % (excl. refunds) = Σ(second_pay_perc_excl_refunds × n_eligible_for_second_pay) / Σ(n_eligible_for_second_pay) — **Higher is better**
   - D1 Retention % = Σ(d1_retention × n_paid_users) / Σ(n_paid_users) — **Higher is better**

4. **Minimum sample size thresholds:** If the sample size is below threshold for any metric, output "Insufficient data" instead of a percentage and confidence value. Thresholds are:
   - Payment % (1 hour): Σ(n_logins) < 50 → Insufficient data
   - Cancellation % (1 day): Σ(n_paid_users) < 50 → Insufficient data
   - 2nd Pay % (excl. refunds): Σ(n_eligible_for_second_pay) < 30 → Insufficient data
   - D1 Retention %: Σ(n_paid_users) < 30 → Insufficient data

5. **Aggregation:** Weighted average using counts as weights. Multiply each row's percentage by its denominator, sum across all clean window dates, then divide by sum of denominators. Never simple-average percentages.

6. **Statistical confidence:** Two-proportion z-test for each metric. Confidence % = (1 − p-value) × 100, rounded to exactly 2 decimal places. (Only apply if sample size meets minimum thresholds in point 4.)
    For Payment % (1 hour):
   - x1 = Σ(pay_perc_1hr / 100 × n_logins) for variant (number of 1hr payments)
   - x2 = Σ(pay_perc_1hr / 100 × n_logins) for control
   - n1 = Σ(n_logins) for variant
   - n2 = Σ(n_logins) for control
   - Use two-proportion z-test with (x1, n1) vs (x2, n2)

   For Cancellation % (1 day):
   - x1 = Σ(cancelled_perc_1day / 100 × n_paid_users) for variant (number of cancellations)
   - x2 = Σ(cancelled_perc_1day / 100 × n_paid_users) for control
   - n1 = Σ(n_paid_users) for variant
   - n2 = Σ(n_paid_users) for control
   - Use two-proportion z-test with (x1, n1) vs (x2, n2)

   For 2nd Pay % (excl. refunds):
   - x1 = Σ(second_pay_perc_excl_refunds / 100 × n_eligible_for_second_pay) for variant
   - x2 = Σ(second_pay_perc_excl_refunds / 100 × n_eligible_for_second_pay) for control
   - n1 = Σ(n_eligible_for_second_pay) for variant
   - n2 = Σ(n_eligible_for_second_pay) for control
   - Use two-proportion z-test with (x1, n1) vs (x2, n2)

   For D1 Retention %:
   - x1 = Σ(d1_retention / 100 × n_paid_users) for variant (number of retained users)
   - x2 = Σ(d1_retention / 100 × n_paid_users) for control
   - n1 = Σ(n_paid_users) for variant
   - n2 = Σ(n_paid_users) for control
   - Use two-proportion z-test with (x1, n1) vs (x2, n2)


**Precision requirements (apply throughout all calculations):**
   - All intermediate calculations: maintain full floating-point precision (no rounding)
   - Final metric percentages: round to exactly 2 decimal places
   - Final confidence percentages: round to exactly 2 decimal places
   - Use standard rounding rules (≥0.005 rounds up)

**Output format give in markdown format (one section per variant, no explanations, no methodology, no raw tables):**

If a metric has insufficient sample size (below thresholds in point 4), output:
- `[Metric name]: Insufficient data)`
- Window: [N] days
- (No confidence value)

Otherwise, use standard format below:

**Summary Statistics:**
- Clean window start date: [DATE]
- Logins (Experiment): [Σ(n_logins)]
- 1st paid (Experiment): [Σ(n_paid_users)]
- 2nd pay eligible (Experiment): [Σ(n_eligible_for_second_pay)]
- 2nd paid (Experiment): [Σ(second_pay_perc_excl_refunds × n_eligible_for_second_pay)]

All final numbers rounded to 2 decimals, e.g., 26.61%

```
**Variant Name with [Control: Control Name]**

- Payment % (1 hour): <Winner> is better (<experiment %> vs <control %>)
- Window: <N> days
- Confidence: <Confidence %>

---

- Cancellation % (1 day): <Winner> is better (<experiment %> vs <control %>)
- Window: <N> days
- Confidence: <Confidence %>

---

- 2nd Pay % (excl. refunds): <Winner> is better (<experiment %> vs <control %>)
- Window: <N> days
- Confidence: <Confidence %>

---

- D1 Retention %: <Winner> is better (<experiment %> vs <control %>)
- Window: <N> days
- Confidence: <Confidence %>
```
