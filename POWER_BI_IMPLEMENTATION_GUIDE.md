# Power BI Implementation Guide
## FRT Work Tools Dashboard - Step-by-Step Build Instructions

This guide walks you through recreating the HTML dashboard visuals in Power BI Desktop.

---

## Table of Contents
1. [Setup & Data Model](#setup--data-model)
2. [KPI Cards](#kpi-cards)
3. [New Opt-in Opportunities Table](#new-opt-in-opportunities-table)
4. [Document Tracking Table](#document-tracking-table)
5. [Charts (Donut & Bar)](#charts-donut--bar)
6. [Filtering & Slicers](#filtering--slicers)
7. [Conditional Formatting & Risk Colors](#conditional-formatting--risk-colors)
8. [Styling & Theme](#styling--theme)
9. [Export Functionality](#export-functionality)
10. [Case Details Page](#case-details-page)

---

## Setup & Data Model

### 1. Create Data Tables

In Power Query Editor, create or import these tables:

**Client Status Reports** (Main fact table):
- Case ID
- Case Name
- Country
- Organizer Damages
- Deadline Date
- Filed/Participation Date
- # of Accounts
- Claim Status (ELIGIBLE, NOT ELIGIBLE, REQUESTED, CONFIRMED, REGISTERED)
- Account Name
- Recognized Loss
- Document Status fields (ASL, BOT, POA, Trades, Other)

**Case Lookup** (Dimension table):
- Case ID
- Case Name
- Country
- Jurisdiction Risk Level (calculated column)
- Class Period Start
- Class Period End
- CUSIPs
- Organizer Name
- Funder Name
- LESG Scores

### 2. Create Calculated Columns

**Jurisdiction Risk Level** (in Case Lookup):
```DAX
Risk Level = 
SWITCH(
    TRUE(),
    Case Lookup[Country] = "AU" || Case Lookup[Country] = "NL", "Low",
    Case Lookup[Country] = "GB", "High",
    "Medium"
)
```

**Days Until Deadline**:
```DAX
Days Until Deadline = 
DATEDIFF(TODAY(), 'Client Status Reports'[Deadline Date], DAY)
```

**Priority**:
```DAX
Priority = 
SWITCH(
    TRUE(),
    'Client Status Reports'[Organizer Damages] >= 1000000 || 'Client Status Reports'[Days Until Deadline] < 30, "High",
    'Client Status Reports'[Organizer Damages] >= 200000 || 'Client Status Reports'[Country] = "GB", "Medium",
    "Low"
)
```

---

## KPI Cards

### Creating KPI Cards

1. **Insert → Card visual**
2. Drag measure to the **Fields** well
3. Format the card:
   - **Visualizations pane → Format visual**
   - **Card**: Turn on "Category label"
   - **Callout value**: 
     - Font size: 24px
     - Font weight: Semibold
   - **Category label**:
     - Font size: 9px
     - Text: "Total Organizer Damages" (or your label)
     - Uppercase: ON
   - **Background**: White (#FFFFFF)
   - **Border**: 1px solid #EDEBE9
   - **Border radius**: 4px

### Featured KPI Card (Blue Gradient)

1. Create card as above
2. **Format visual → Visual**:
   - **Background**: Gradient
   - **Color 1**: #0078D4
   - **Color 2**: #005A9E
   - **Direction**: Diagonal (135°)
3. **Callout value**:
   - Font color: White
   - Font size: 24px
4. **Category label**:
   - Font color: White (90% opacity)

### Measures for KPI Cards

**Total Organizer Damages**:
```DAX
Total Organizer Damages = 
SUM('Client Status Reports'[Organizer Damages])
```

**New Opt-in Opportunities**:
```DAX
New Opportunities Count = 
CALCULATE(
    DISTINCTCOUNT('Client Status Reports'[Case ID]),
    'Client Status Reports'[Claim Status] IN {"ELIGIBLE", "REQUESTED"},
    'Client Status Reports'[Days Until Deadline] > 0
)
```

**Total Recoveries Received**:
```DAX
Total Recoveries = 
SUM('Client Status Reports'[$ Recovered])
```

**Upcoming Disbursements**:
```DAX
Upcoming Disbursements = 
CALCULATE(
    SUM('Client Status Reports'[Gross Recovery Estimate]),
    'Client Status Reports'[Disbursement Date] >= TODAY(),
    'Client Status Reports'[Disbursement Date] <= TODAY() + 30
)
```

---

## New Opt-in Opportunities Table

### Building the Table

1. **Insert → Table visual**
2. Add columns in this order:
   - Priority (calculated column)
   - Case Name
   - Country
   - Organizer Damages (measure)
   - Deadline Date
   - Days Until Deadline (calculated column)
   - Claim Status
   - Action (placeholder text column)

### Conditional Formatting

**Priority Column**:
1. Select Priority column
2. **Format → Conditional formatting → Background color**
3. Use rules:
   - "High" → #D13438 (Red)
   - "Medium" → #FF8C00 (Orange)
   - "Low" → #107C10 (Green)

**Country Column**:
1. Select Country column
2. **Format → Conditional formatting → Background color**
3. Use field value: `Risk Level` from Case Lookup
4. Rules:
   - "Low" → #E8F5E9 (Light Green)
   - "Medium" → #FFF4E5 (Light Amber)
   - "High" → #FFEBEE (Light Red)

**Days Until Deadline Column**:
1. Select Days Until Deadline column
2. **Format → Conditional formatting → Font color**
3. Use rules:
   - If < 0 → #D13438 (Red, Bold)
   - If < 30 → #FF8C00 (Orange, Bold)
   - If < 90 → #FF8C00 (Orange)
   - Else → Default

**Row Border (Left)**:
1. **Format → Style → Row headers**
2. Use conditional formatting on row background
3. Create measure for border color:
```DAX
Row Border Color = 
SWITCH(
    RELATED('Case Lookup'[Risk Level]),
    "Low", "#107C10",
    "High", "#D13438",
    "#FF8C00"
)
```

### Filtering with Slicers

1. **Insert → Slicer**
2. Add "Claim Status" field
3. Format as **Buttons**:
   - **Format → Slicer settings → Style → Tiles**
   - **Items**: Horizontal
   - **Font size**: 11px
   - **Selected**: Blue background (#0078D4)
   - **Unselected**: White with border

---

## Document Tracking Table

### Building the Table

1. **Insert → Table visual**
2. Add columns:
   - Case Name
   - Claim Status
   - Organizer Damages
   - ASL Status (Yes/No or Checkmark)
   - BOT Status
   - POA Status
   - Trades Status
   - Other Status

### Document Status Icons

**Option 1: Using Unicode Characters**
1. Create calculated column:
```DAX
ASL Icon = 
IF('Client Status Reports'[ASL Complete] = TRUE(), "✓", "⏱")
```

2. Format column:
   - Font: Segoe UI Symbol
   - Conditional formatting:
     - "✓" → Green (#107C10)
     - "⏱" → Orange (#FF8C00)

**Option 2: Using Conditional Formatting with Icons**
1. **Format → Conditional formatting → Icons**
2. Set rules:
   - If ASL Complete = TRUE → Green checkmark
   - Else → Orange clock icon

---

## Charts (Donut & Bar)

### Donut Chart - FRT Damages by Country

1. **Insert → Doughnut chart**
2. **Legend**: Country
3. **Values**: Organizer Damages (sum)
4. **Format**:
   - **Legend**: Position = Right
   - **Data colors**: 
     - Use conditional formatting based on Risk Level
     - Low Risk (AU, NL) → #107C10
     - Medium Risk → #FF8C00
     - High Risk (GB) → #D13438
   - **Data labels**: 
     - Show: ON
     - Position: Outside
     - Format: Currency ($X.XM)
   - **Inner radius**: 60%

### Horizontal Bar Chart - Organizer Damages by Case

1. **Insert → Clustered bar chart**
2. **Y-axis**: Case Name
3. **X-axis**: Organizer Damages (sum)
4. **Format**:
   - **Y-axis**: 
     - Reverse: ON
     - Font size: 10px
   - **X-axis**:
     - Font size: 10px
     - Display units: Millions
     - Value decimal places: 1
   - **Data colors**: 
     - Use conditional formatting by Country → Risk Level
   - **Data labels**: 
     - Show: ON
     - Position: End
     - Format: Currency

---

## Filtering & Slicers

### Client Selector Slicer

1. **Insert → Slicer**
2. Add "Client Name" field
3. Format:
   - **Style**: Dropdown
   - **Font size**: 12px
   - **Border**: 1px solid #EDEBE9

### Status Filter Slicer

1. **Insert → Slicer**
2. Add "Claim Status" field
3. Format as **Buttons**:
   - **Style**: Tiles
   - **Items**: Horizontal
   - **Selected**: Blue (#0078D4)
   - **Unselected**: White with border

### Date Range Slicer

1. **Insert → Slicer**
2. Add "Deadline Date" field
3. Format:
   - **Style**: Between
   - Show date picker: ON

---

## Conditional Formatting & Risk Colors

### Creating Risk Color Measures

**Risk Background Color**:
```DAX
Risk Background Color = 
SWITCH(
    RELATED('Case Lookup'[Risk Level]),
    "Low", "#E8F5E9",
    "High", "#FFEBEE",
    "#FFF4E5"
)
```

**Risk Text Color**:
```DAX
Risk Text Color = 
SWITCH(
    RELATED('Case Lookup'[Risk Level]),
    "Low", "#107C10",
    "High", "#D13438",
    "#FF8C00"
)
```

### Applying to Tables

1. Select Country column
2. **Format → Conditional formatting → Background color**
3. Choose: **Field value**
4. Select: `Risk Background Color` measure
5. Repeat for text color using `Risk Text Color` measure

---

## Styling & Theme

### Creating Custom Theme JSON

1. **View → Themes → Customize current theme**
2. Or create a JSON file:

```json
{
  "name": "FRT Dashboard Theme",
  "dataColors": [
    "#0078D4",  // Primary Blue
    "#FF8C00",  // Orange
    "#107C10",  // Green
    "#D13438",  // Red
    "#8764B8",  // Purple
    "#FFB900",  // Yellow
    "#00BCF2",  // Teal
    "#E3008C"   // Pink
  ],
  "background": "#FAF9F8",
  "foreground": "#323130",
  "tableAccent": "#0078D4",
  "visualStyles": {
    "*": {
      "*": {
        "background": [
          {
            "color": {
              "solid": {
                "color": "#FFFFFF"
              }
            }
          }
        ],
        "border": [
          {
            "color": {
              "solid": {
                "color": "#EDEBE9"
              }
            },
            "show": true,
            "radius": 4
          }
        ]
      }
    },
    "card": {
      "*": {
        "calloutValueFontSize": 24,
        "categoryLabelFontSize": 9,
        "categoryLabelFontWeight": "Semibold"
      }
    },
    "tableEx": {
      "*": {
        "grid": [
          {
            "showVerticalGridlines": false,
            "showHorizontalGridlines": true,
            "rowPadding": 8
          }
        ],
        "header": [
          {
            "fontSize": 9,
            "fontWeight": "Semibold",
            "background": "#FAF9F8"
          }
        ],
        "values": [
          {
            "fontSize": 10
          }
        ]
      }
    }
  }
}
```

### Applying Theme

1. **View → Themes → Browse for themes**
2. Select your JSON file
3. Or manually set colors in **View → Themes → Customize current theme**

---

## Export Functionality

### Power BI Service Export

In Power BI Service (not Desktop), users can:
1. Click **...** (More options) on a visual
2. Select **Export data**
3. Choose CSV or Excel format

### For Power BI Desktop

Create a **Button** that links to Power BI Service:
1. **Insert → Button**
2. Format button: "Export to Excel"
3. **Action**: Web URL
4. Link to Power BI Service report with export enabled

---

## Case Details Page

### Creating Drillthrough Page

1. **Right-click on Case Name → Add drillthrough**
2. Create new page: "Case Details"
3. Add fields to drillthrough:
   - Case ID
   - Case Name
   - All case detail fields

### Case Details Page Layout

**Left Column**:
- **Card**: Case Name (large, 20px)
- **Card**: Case ID, Country, Status
- **Table**: CUSIPs (single column)
- **Table**: Important Dates
- **Table**: Account Level Damages

**Right Column**:
- **Card**: Quick Stats (Organizer Damages, # Accounts)
- **Card**: Organizer Name
- **Card**: Funder Name
- **Card**: LESG Scores (4 separate cards)
- **Card**: Risk Assessment

### LESG Score Cards

Create 4 separate **Card** visuals:
1. Legal Strength Score
2. Economic Viability Score
3. Strategic Value Score
4. Governance Risk Score

Format each with conditional color:
- 8-10: Green (#107C10)
- 6-7.9: Blue (#0078D4)
- 4-5.9: Orange (#FF8C00)
- 0-3.9: Red (#D13438)

---

## Pro Tips

### 1. Use Bookmarks for Filter States
- Create bookmarks for common filter combinations
- Add buttons to jump to bookmarks

### 2. Tooltips
- Create tooltip pages for detailed information
- Hover over visuals to see details

### 3. Buttons for Navigation
- Use buttons to navigate between pages
- Style buttons to match your theme

### 4. Mobile Layout
- Create separate mobile-optimized pages
- Use **View → Mobile layout** to design

### 5. Performance
- Use aggregations for large datasets
- Limit visuals per page (max 8-10)
- Use DirectQuery for real-time data

---

## Color Reference

### Risk Levels
- **Low Risk (Green)**: #107C10, Background: #E8F5E9
- **Medium Risk (Amber)**: #FF8C00, Background: #FFF4E5
- **High Risk (Red)**: #D13438, Background: #FFEBEE

### Status Colors
- **Eligible**: #2E7D32 (Green)
- **Not Eligible**: #C62828 (Red)
- **Requested**: #E65100 (Orange)
- **Confirmed**: #1565C0 (Blue)
- **Registered**: #6A1B9A (Purple)

### Primary Colors
- **Primary Blue**: #0078D4
- **Primary Dark**: #005A9E
- **Background**: #FAF9F8
- **Card Background**: #FFFFFF
- **Border**: #EDEBE9

---

## Next Steps

1. Import your data into Power BI
2. Create the data model with relationships
3. Build visuals page by page
4. Apply conditional formatting
5. Create drillthrough pages
6. Publish to Power BI Service
7. Share with clients

Need help with specific DAX measures or visual configurations? Let me know!

