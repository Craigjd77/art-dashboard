# Client Remittance Report - Design Proposal
## For Institutional Investors (CalSTRS, SBAFLA, Mass PRIM)

## Core Purpose
Track and reconcile all payments/remittances received from claims administrators, showing what's been paid, what's pending, and reconciliation status.

---

## Page Structure

### 1. **Executive Summary KPIs** (Top Section)
**Purpose:** Quick overview of remittance status

**Metrics:**
- **Total Remitted (YTD)** - All payments received this year
- **Pending Remittances** - Expected payments not yet received
- **This Period Remitted** - Payments received in current period
- **Reconciliation Rate** - % of expected payments that have been received
- **Average Days to Payment** - Time from claim filing to payment

**Visual:** 5 KPI cards with trend indicators

---

### 2. **Remittance Status Breakdown** (Visual Cards)
**Purpose:** Quick status overview

**Cards:**
- **Received** (Green) - Payments confirmed received
- **Pending** (Yellow) - Expected but not yet received
- **Overdue** (Red) - Past expected date, not received
- **In Transit** (Blue) - Payment confirmed by administrator, in process

**Each card shows:** Count and total dollar amount

---

### 3. **Recent Remittances Table** (This Period)
**Purpose:** Show payments received in current period

**Columns:**
- Payment Date
- Case Name / Company
- Settlement Fund
- Gross Recovery Amount
- FRT Fee
- Net to Client
- Payment Method (Wire, Check, ACH)
- Reference/Check Number
- Claims Administrator
- Status (Received, Deposited, Cleared)
- Reconciliation Status (Matched, Unmatched, Pending)

**Features:**
- Sortable by date, amount, status
- Filter by payment method, status, administrator
- Export to Excel/PDF
- Click to view payment details

---

### 4. **Pending Remittances** (Expected Payments)
**Purpose:** Track what's coming

**Columns:**
- Expected Payment Date
- Case Name / Company
- Settlement Fund
- Expected Amount
- Days Until Expected
- Claims Administrator
- Status (Scheduled, Confirmed, Delayed)
- Last Update Date

**Features:**
- Color-coded by urgency (red if overdue, yellow if approaching)
- Filter by date range, administrator
- Alert for overdue payments

---

### 5. **Payment History & Trends** (Charts)
**Purpose:** Visual representation of payment patterns

**Charts:**
- **Remittances by Month** (Bar/Line chart) - Show payment trends
- **Payment Status Distribution** (Donut chart) - Received vs Pending vs Overdue
- **Average Payment Timeline** (Bar chart) - Days from filing to payment by case type
- **Remittances by Administrator** (Bar chart) - Which administrators pay fastest

---

### 6. **Reconciliation Tools**
**Purpose:** Match payments to claims

**Features:**
- **Unmatched Payments** - Payments received but not yet matched to claims
- **Missing Payments** - Claims expected to be paid but no payment received
- **Reconciliation Status** - Overall reconciliation health
- **Bulk Reconciliation** - Match multiple payments at once

**Table:**
- Payment Reference
- Amount
- Date Received
- Suggested Match (AI/rule-based)
- Action (Match, Flag, Hold)

---

### 7. **Payment Details Modal**
**Purpose:** Deep dive into individual payment

**Shows:**
- Payment information (date, amount, method, reference)
- Associated claim(s)
- Payment breakdown (gross, fees, net)
- Payment timeline (filed → paid → deposited → cleared)
- Documents (payment confirmation, bank statement)
- Notes/Internal comments

---

## Key Features

### Filtering & Search
- Search by case name, company, reference number
- Filter by date range, amount range, status, administrator
- Filter by payment method
- Save filter presets

### Export Capabilities
- Export to Excel (detailed reconciliation)
- Export to PDF (payment summary report)
- Export bank reconciliation format (CSV for accounting systems)

### Notifications & Alerts
- Overdue payment alerts
- Large payment notifications
- Unmatched payment warnings
- Reconciliation discrepancies

### Period Comparison
- Compare current period to previous period
- Year-over-year comparison
- Payment trend analysis

---

## Data Points to Track

### Payment Information
- Payment Date (Received)
- Deposit Date
- Clear Date (Bank cleared)
- Payment Amount (Gross)
- FRT Fee Amount
- Net Amount to Client
- Payment Method (Wire, ACH, Check)
- Reference Number / Check Number
- Bank Account (if multiple accounts)
- Claims Administrator
- Case/Settlement Name
- Associated Claim IDs

### Status Tracking
- Payment Status (Pending, Received, Deposited, Cleared, Returned)
- Reconciliation Status (Unmatched, Matched, Flagged)
- Payment Source (Settled Action, Antitrust, Non-US)
- Payment Type (Initial, Supplemental, Final)

### Timeline Data
- Claim Filed Date
- Settlement Date
- Payment Expected Date
- Payment Received Date
- Days to Payment (efficiency metric)

---

## Visual Design

### Color Coding
- **Green:** Received/Cleared payments
- **Yellow:** Pending/In Transit
- **Red:** Overdue/Unmatched
- **Blue:** Scheduled/Confirmed

### Status Badges
- Clear visual indicators for payment status
- Reconciliation status badges
- Urgency indicators (days until/overdue)

### Charts
- Use Chart.js (already in project)
- Consistent with Status Reports styling
- Interactive tooltips

---

## Implementation Priority

### Phase 1 (Core Functionality)
1. Executive Summary KPIs
2. Recent Remittances Table
3. Pending Remittances Table
4. Basic filtering

### Phase 2 (Enhanced Features)
5. Payment History Charts
6. Reconciliation Tools
7. Payment Details Modal
8. Export functionality

### Phase 3 (Advanced)
9. Bulk reconciliation
10. Payment matching AI/suggestions
11. Bank reconciliation export
12. Payment forecasting

---

## Technical Considerations

### Data Structure
- Link payments to claims (many-to-many possible)
- Track payment lifecycle (received → deposited → cleared)
- Support multiple payment methods
- Handle partial payments
- Support multiple bank accounts

### Performance
- Pagination for large payment lists
- Virtual scrolling for tables
- Lazy loading of payment details
- Efficient filtering/search

### Integration Points
- Link to Status Reports (show remittances for specific cases)
- Link to Account Manager Dashboard
- Export formats compatible with accounting systems

---

## User Workflows

### Daily Reconciliation
1. View "Unmatched Payments" section
2. Match payments to claims
3. Flag discrepancies
4. Export reconciliation report

### Monthly Reporting
1. Filter to current month
2. Review payment summary
3. Export PDF for accounting
4. Compare to previous month

### Payment Tracking
1. View "Pending Remittances"
2. Check overdue payments
3. Follow up with administrators
4. Update expected dates

---

## Success Metrics
- **Reconciliation Rate:** % of payments matched to claims
- **Payment Timeliness:** Average days from expected to received
- **Payment Accuracy:** % of payments matching expected amounts
- **Administrator Performance:** Which admins pay fastest/most reliably

---

## Notes
- Design for institutional accounting teams
- Support audit requirements
- Clear audit trail for all payments
- Professional export formats
- Mobile-friendly for quick checks

