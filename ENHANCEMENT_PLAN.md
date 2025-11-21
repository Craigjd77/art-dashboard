# FRT Dashboard Enhancement Plan
## Focused improvements for institutional investors (CalSTRS, SBAFLA, Mass PRIM)

### Current State
- Client Status Reports with tabbed sections (Settled, Antitrust, Non-US)
- Account Manager Dashboard
- Eligibility & Filings page
- Basic export functionality

---

## Priority Enhancements (High Value, Low Complexity)

### 1. **Executive Summary Dashboard** ⭐
**Purpose:** Quick high-level view for executives/board meetings

**Add to Client Status Reports:**
- KPI cards at top showing:
  - Total Recovered (current period + YTD)
  - Recovery Rate (% of potential)
  - Active Claims Count
  - Pending Recovery Amount
- Period-over-period comparison (vs last month/quarter)
- Visual indicators (↑↓) showing trends

**Implementation:** Add section above report tabs with 4-5 metric cards

---

### 2. **Period Comparison View**
**Purpose:** Help clients understand performance trends

**Enhancement:**
- Add comparison toggle: "vs Previous Period" / "vs Same Period Last Year"
- Show side-by-side or percentage change indicators
- Highlight significant changes (e.g., >10% increase in recoveries)

**Implementation:** Add period selector with comparison option

---

### 3. **Deadline Risk Alerts**
**Purpose:** Prevent missed filing deadlines (critical for large institutions)

**Add Alert Section:**
- Red/yellow status indicators for approaching deadlines
- List of cases with deadlines within 30/60/90 days
- Action required checklist

**Implementation:** New section in Client Status Reports showing upcoming deadlines

---

### 4. **Recovery Efficiency Metrics**
**Purpose:** Demonstrate value and ROI to clients

**New Metrics:**
- Recovery Rate: $ Recovered / FRT Damages (or Settlement Fund)
- Average Recovery per Claim
- FRT Fee as % of Recovery (shows cost efficiency)
- Time to Recovery (from filing to payment)

**Implementation:** Add to summary tables as calculated columns

---

### 5. **Export to PDF** (not just CSV)
**Purpose:** Professional reports for board meetings and records

**Enhancement:**
- "Export to PDF" button alongside Excel export
- Include FRT branding, charts, and formatted tables
- Multi-page support with proper headers/footers

**Implementation:** Use jsPDF or similar library for PDF generation

---

### 6. **Portfolio-Wide Aggregation**
**Purpose:** View all accounts under parent client (e.g., all CalSTRS sub-accounts)

**Enhancement:**
- When parent client selected, show aggregate totals
- Allow drill-down to individual account/sub-account
- Show distribution across sub-accounts in summary

**Implementation:** Enhance client selector to show hierarchy, aggregate calculations

---

### 7. **Historical Trend Charts**
**Purpose:** Visual representation of recovery trends over time

**Enhancement:**
- Time series chart showing recovery amounts by month/quarter
- Cumulative recovery trend line
- Breakdown by recovery type (Settled vs Antitrust vs Non-US)

**Implementation:** Enhance existing charts with historical data

---

### 8. **Action Items Summary**
**Purpose:** Clear list of what needs attention

**New Section:**
- Cases requiring attention (deadlines, missing info)
- Recently paid (for reconciliation)
- Newly filed (for tracking)
- Sortable/filterable list

**Implementation:** Add new section to Client Status Reports

---

### 9. **Enhanced Filtering & Search**
**Purpose:** Easier navigation for large datasets

**Enhancement:**
- Search box for company names, case numbers, CUSIPs
- Filter by date range, recovery amount, status
- Save filter presets for common views

**Implementation:** Add search/filter controls above data tables

---

### 10. **Benchmarking Indicators**
**Purpose:** Context for performance (if industry data available)

**Enhancement:**
- Show recovery rate vs industry average (if available)
- Indicate if performance is above/below average
- Confidence intervals for estimates

**Implementation:** Add comparative metrics where data available

---

## Implementation Priority

### Phase 1 (Quick Wins - 1-2 days each):
1. Executive Summary Dashboard with KPI cards
2. Period comparison view
3. Deadline risk alerts section

### Phase 2 (Medium effort - 3-5 days each):
4. Recovery efficiency metrics
5. Export to PDF
6. Enhanced filtering & search

### Phase 3 (More complex - 1-2 weeks each):
7. Portfolio-wide aggregation
8. Historical trend charts enhancement
9. Action items summary

---

## Design Principles
- **Keep it clean:** Don't clutter with too many metrics
- **Actionable:** Every metric should help decision-making
- **Professional:** Design for board-level presentations
- **Institutional tone:** Serious, data-driven, trustworthy
- **Mobile-friendly:** Responsive for iPad/tablet viewing during meetings

---

## Technical Considerations
- Use existing Chart.js for visualizations
- Maintain current color scheme/branding
- Ensure export functions work with large datasets
- Consider performance with 1000+ row tables (virtualization if needed)
- Keep shared styles consistent

---

## Questions to Consider
- Do we have historical data going back multiple years?
- Are there industry benchmarks we can compare against?
- What reporting frequency do clients need? (Monthly, Quarterly, Annual)
- Should we add user preferences for default views?

---

## Notes
- Focus on what institutional investors actually need for reporting/decision-making
- Avoid "feature creep" - each enhancement should solve a real problem
- Test with actual client feedback when possible
- Keep performance in mind - these pages may have large datasets

