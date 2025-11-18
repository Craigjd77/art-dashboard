# KPI Card Drillthrough Guide
## How to Make KPI Cards Clickable in Power BI

This guide shows you how to implement clickable KPI cards that show detailed breakdowns, just like in the HTML sandbox.

---

## Method 1: Drillthrough Pages (Recommended)

### Step 1: Create Detail Pages

1. **Right-click on your report → New page**
2. Name it: "Damages Detail", "Opportunities Detail", etc.
3. Build the detail view with:
   - Summary cards (statistics)
   - Detailed tables
   - Charts if needed

### Step 2: Set Up Drillthrough

1. **Select your KPI Card visual**
2. **Format visual → General → Drillthrough**
3. Turn ON "Keep all filters"
4. Add drillthrough pages:
   - Right-click on card → **Drillthrough → [Your Detail Page]**

### Step 3: Configure Drillthrough Filters

On your detail page:
1. **View → Page information**
2. Add fields to "Drillthrough filters":
   - For "Damages Detail": Add any relevant filters
   - This allows the detail page to receive context from the card

### Step 4: Add Back Button

On detail pages:
1. **Insert → Button**
2. Format button: "← Back to Dashboard"
3. **Button → Action → Page navigation**
4. Select your main dashboard page

---

## Method 2: Tooltips (Quick Details)

### Step 1: Create Tooltip Pages

1. Create new pages (smaller, ~400x300px)
2. Name them: "Damages Tooltip", "Opportunities Tooltip"
3. Add key statistics and mini charts

### Step 2: Configure Tooltip

1. **Select your KPI Card**
2. **Format visual → General → Tooltip**
3. Turn ON "Tooltip"
4. Select your tooltip page

### Step 3: Format Tooltip Page

1. **View → Page size → Tooltip**
2. Set size: 400px width, 300px height
3. Design compact detail view

**Note**: Tooltips show on hover, not click. For clickable details, use Method 1.

---

## Method 3: Bookmarks (Filter States)

### Step 1: Create Filtered Views

1. Set up filters for each KPI detail view
2. Create bookmarks:
   - **View → Bookmarks → Add bookmark**
   - Name: "Show Damages Details", "Show Opportunities Details"

### Step 2: Add Buttons to Cards

1. **Insert → Button** (on top of or near KPI card)
2. Format: Small, transparent
3. **Button → Action → Bookmark**
4. Select your bookmark

### Step 3: Create Detail Section

1. Add a section below KPI cards
2. Show/hide based on bookmark state
3. Use bookmarks to toggle visibility

---

## Recommended: Hybrid Approach

### For Each KPI Card:

1. **Tooltip** (hover) - Quick stats
2. **Drillthrough** (click) - Full detail page
3. **Visual indicator** - Show it's clickable

### Implementation Steps:

#### 1. Create Detail Pages

**Damages Detail Page**:
- Summary cards: Total, by Status, by Country
- Table: Top cases by damages
- Chart: Damages distribution

**Opportunities Detail Page**:
- Summary: Count, Eligible, Requested
- Table: All opportunities with filters
- Chart: Opportunities by risk level

**Recoveries Detail Page**:
- Summary: Total YTD, Count, Average
- Table: All recoveries
- Chart: Recovery timeline

**Disbursements Detail Page**:
- Summary: Total upcoming, Next 30 days
- Table: Disbursement schedule
- Chart: Timeline view

#### 2. Set Up Drillthrough

For each KPI card:
1. Right-click → **Drillthrough → [Detail Page]**
2. Format card to show it's clickable:
   - Add subtle hover effect
   - Add icon (optional)

#### 3. Add Visual Indicators

**Format KPI Card**:
- **Format → General → Effects**
- Add subtle border on hover
- Or add small icon in corner

**DAX for Clickable Indicator**:
```DAX
// Add to card subtitle
"Click for details"
```

#### 4. Style Detail Pages

Match your HTML sandbox styling:
- Same card styling
- Same table formatting
- Same color scheme
- Back button in header

---

## Power BI Specific Tips

### Making Cards Look Clickable

1. **Format → Visual → Effects**
   - Add border on hover
   - Slight shadow increase on hover

2. **Add Icon**:
   - Insert → Text box
   - Add "→" or "Click" text
   - Position in corner

3. **Subtitle Text**:
   - Add "Click to view details" in subtitle
   - Format → Category label → Add text

### Detail Page Layout

Match HTML modal layout:
- Header with title and close button
- Summary stats grid (4-5 cards)
- Detailed table below
- Export button (Power BI Service)

### Navigation

1. **Back Button**:
   - Insert → Button
   - Action: Page navigation
   - Style: Match export buttons

2. **Breadcrumb** (optional):
   - Show current page name
   - Add navigation path

---

## Example: Damages Detail Page

### Layout:
```
┌─────────────────────────────────────┐
│ Damages Detail          [← Back]    │
├─────────────────────────────────────┤
│ [Total] [Eligible] [Requested] ... │
├─────────────────────────────────────┤
│ Top 5 Cases by Damages              │
│ ┌─────────────────────────────────┐ │
│ │ Case Name | Country | Amount     │ │
│ │ ...                              │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### Measures Needed:

**Total Damages by Status**:
```DAX
Damages Eligible = 
CALCULATE(
    SUM('Client Status Reports'[Organizer Damages]),
    'Client Status Reports'[Claim Status] = "ELIGIBLE"
)
```

**Top Cases**:
```DAX
Top Cases = 
TOPN(
    5,
    SUMMARIZE(
        'Client Status Reports',
        'Client Status Reports'[Case Name],
        "Total Damages", SUM('Client Status Reports'[Organizer Damages])
    ),
    [Total Damages],
    DESC
)
```

---

## Testing

1. **In Power BI Desktop**:
   - Click each KPI card
   - Verify drillthrough works
   - Check filters are applied correctly

2. **In Power BI Service**:
   - Test with different users
   - Verify permissions allow drillthrough
   - Test on mobile (drillthrough works on mobile)

---

## Best Practices

1. **Consistent Design**: All detail pages should match
2. **Clear Navigation**: Always include back button
3. **Performance**: Limit visuals per detail page (max 5-6)
4. **Mobile Friendly**: Test on mobile devices
5. **Tooltips**: Use for quick info, drillthrough for full details

---

## Comparison: HTML vs Power BI

| Feature | HTML Sandbox | Power BI |
|---------|-------------|----------|
| Click Action | JavaScript modal | Drillthrough page |
| Detail View | Modal overlay | New page |
| Close Method | X button, Escape, click outside | Back button, browser back |
| Filtering | JavaScript filtering | Native Power BI filters |
| Export | CSV download | Power BI Service export |
| Mobile | Responsive modal | Responsive page |

---

## Next Steps

1. Create detail pages for each KPI
2. Set up drillthrough on cards
3. Add tooltips for quick info
4. Style to match HTML sandbox
5. Test and refine

Need help with specific DAX measures or visual configurations? Reference the main Power BI Implementation Guide!

