# Power BI Implementation Guide
## FRT Work Tools Dashboard - Step-by-Step Build Instructions

This guide walks you through recreating the HTML dashboard visuals in Power BI Desktop **to match exactly** what you see in the HTML version.

**Goal**: Build Power BI reports that look identical to the HTML dashboard for client presentations and as a reference for Power BI development.

---

## Table of Contents
1. [Visual Reference - Exact Match Checklist](#visual-reference---exact-match-checklist)
2. [Setup & Data Model](#setup--data-model)
3. [KPI Cards - Exact Styling](#kpi-cards---exact-styling)
4. [New Opt-in Opportunities Table - Pixel Perfect](#new-opt-in-opportunities-table---pixel-perfect)
5. [Document Tracking Table](#document-tracking-table)
6. [Charts (Donut & Bar) - Exact Colors](#charts-donut--bar---exact-colors)
7. [Filtering & Slicers](#filtering--slicers)
8. [Conditional Formatting & Risk Colors](#conditional-formatting--risk-colors)
9. [Styling & Theme JSON](#styling--theme-json)
10. [Export Functionality](#export-functionality)
11. [Case Details Page](#case-details-page)
12. [Layout & Spacing - Exact Measurements](#layout--spacing---exact-measurements)

---

## Visual Reference - Exact Match Checklist

Before building, reference the HTML dashboard to match:

### Page Layout
- [ ] Header: Blue gradient (#0078D4 to #005A9E), 48px height
- [ ] Navigation tabs: White background, 40px height, blue underline for active
- [ ] Main container: 12px padding, 12px gap between cards
- [ ] Left sidebar: 280px width
- [ ] Cards: 4px border radius, white background, subtle shadow
- [ ] Footer: 28px height, white background

### KPI Cards (Top Row)
- [ ] **Total Organizer Damages**: Blue gradient background, white text, 24px value
- [ ] **New Opportunities**: White background, orange left border (4px), orange value
- [ ] **Recoveries**: White background, standard styling
- [ ] **Disbursements**: White background, green left border (4px), green value
- [ ] All cards: 12px padding, 110px min height

### New Opt-in Opportunities Section
- [ ] White card (NOT yellow/orange background)
- [ ] Blue left border (4px solid #0078D4)
- [ ] Header with icon, title, subtitle, and badge
- [ ] Filter badges: Pill-shaped, blue when active
- [ ] Table with priority dots, risk-colored country badges
- [ ] Days Until Deadline column with color coding
- [ ] Export and Print buttons in header

### Typography
- [ ] Font: Segoe UI (or closest Power BI equivalent)
- [ ] Card titles: 11-13px, Semibold
- [ ] Table headers: 9px, Uppercase, Semibold
- [ ] Table data: 10px
- [ ] KPI values: 24px, Semibold
- [ ] KPI labels: 9px, Uppercase

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

## KPI Cards - Exact Styling

### Creating KPI Cards

1. **Insert → Card visual**
2. Drag measure to the **Fields** well
3. Format the card to match exactly:

**General Settings**:
- **Visualizations pane → Format visual → General**
- **Width**: Auto (or set to match grid)
- **Height**: 110px minimum
- **Position X/Y**: Align in 4-column grid
- **Background**: #FFFFFF
- **Border**: 
  - Show: ON
  - Color: #EDEBE9
  - Width: 1px
  - Style: Solid
- **Border radius**: 4px (top-left, top-right, bottom-right, bottom-left)
- **Shadow**: 
  - Show: ON
  - Color: rgba(0, 0, 0, 0.13)
  - Blur: 3.6px
  - X offset: 0px
  - Y offset: 1.6px

**Callout Value**:
- **Format → Callout value**
- Font family: Segoe UI
- Font size: **24px**
- Font weight: **Semibold**
- Font color: #323130 (or white for featured card)
- Horizontal alignment: Center
- Vertical alignment: Center

**Category Label**:
- **Format → Category label**
- Show: ON
- Font family: Segoe UI
- Font size: **9px**
- Font weight: **Semibold**
- Font color: #605E5C
- Text: "TOTAL ORGANIZER DAMAGES" (uppercase)
- Horizontal alignment: Center
- Letter spacing: 0.5px

**Subtitle/Description** (if using):
- Font size: 9px
- Font color: #605E5C
- Position: Below value

### Featured KPI Card (Blue Gradient) - Exact Match

1. Create card as above
2. **Format visual → Visual → Background**:
   - **Style**: Gradient
   - **Color 1**: #0078D4 (top-left)
   - **Color 2**: #005A9E (bottom-right)
   - **Direction**: 135° (diagonal from top-left to bottom-right)
   - **Border**: None (remove border for gradient card)
3. **Callout value**:
   - Font color: #FFFFFF (white)
   - Font size: 24px
   - Font weight: Semibold
4. **Category label**:
   - Font color: #FFFFFF (white, 90% opacity)
   - Font size: 9px
   - Uppercase: ON
5. **Shadow** (for gradient card):
   - Show: ON
   - Color: rgba(0, 120, 212, 0.3) - Blue shadow
   - Blur: 8px
   - Y offset: 2px

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

## New Opt-in Opportunities Table - Pixel Perfect

### Building the Table

1. **Insert → Table visual**
2. Add columns in this exact order:
   - Priority indicator (calculated column - dot icon)
   - Case Name
   - Country
   - Organizer Damages (measure)
   - Deadline Date
   - Days Until Deadline (calculated column)
   - Claim Status
   - Action (button or text)

### Exact Formatting to Match HTML

**General Table Settings**:
- **Format → General**:
  - Background: #FFFFFF
  - Border: 
    - Show: ON
    - Color: #EDEBE9
    - Width: 1px
  - Border radius: 4px (all corners)
  - Shadow: Same as cards (subtle)
  - Padding: 16px (outer padding)

**Header Row**:
- **Format → Column headers**:
  - Font family: Segoe UI
  - Font size: **9px**
  - Font weight: **Semibold**
  - Font color: #323130
  - Background: #FAF9F8 (light gray gradient)
  - Text transform: **UPPERCASE**
  - Letter spacing: 0.5px
  - Padding: 8px vertical, 10px horizontal
  - Border bottom: 2px solid #EDEBE9

**Data Rows**:
- **Format → Values**:
  - Font family: Segoe UI
  - Font size: **10px**
  - Font color: #323130
  - Padding: 8px vertical, 10px horizontal
  - Row padding: 0px (tight spacing)
  - Border bottom: 1px solid #F3F2F1 (very light gray)
  - Row height: Auto (compact)

**Left Border (Risk Color)**:
- Power BI doesn't support per-row left borders directly
- **Workaround**: Use conditional formatting on a thin first column
- Create a measure that returns the risk color
- Apply as background color to first column (30px width)
- Or use a calculated column with Unicode/icon for visual indicator

### Conditional Formatting

**Priority Column (Dot Indicator)**:
1. Create calculated column for priority dot:
```DAX
Priority Dot = 
SWITCH(
    [Priority],
    "High", "●",
    "Medium", "●",
    "Low", "●",
    ""
)
```

2. Format Priority column:
   - Font size: 12px
   - Font family: Segoe UI Symbol
   - Conditional formatting → Font color:
     - "High" → #D13438 (Red)
     - "Medium" → #FF8C00 (Orange)
     - "Low" → #107C10 (Green)
   - Horizontal alignment: Center
   - Column width: 30px

**Country Column (Badge Style)**:
1. Select Country column
2. **Format → Values**:
   - Font size: 9px
   - Font weight: Semibold
   - Horizontal alignment: Center
3. **Conditional formatting → Background color**:
   - Use field value: `Risk Level` from Case Lookup
   - Rules:
     - "Low" → #E8F5E9 (Light Green)
     - "Medium" → #FFF4E5 (Light Amber)
     - "High" → #FFEBEE (Light Red)
4. **Conditional formatting → Font color**:
   - Use field value: `Risk Level`
   - Rules:
     - "Low" → #107C10 (Dark Green)
     - "Medium" → #FF8C00 (Orange)
     - "High" → #D13438 (Red)
5. **Cell elements → Padding**:
   - Top: 2px
   - Bottom: 2px
   - Left: 8px
   - Right: 8px
   - This creates the "badge" look with padding

**Days Until Deadline Column**:
1. Select Days Until Deadline column
2. **Format → Values**:
   - Font size: 10px
   - Horizontal alignment: Left
3. **Conditional formatting → Font color**:
   - Use rules based on value:
     - If value < 0 → #D13438 (Red)
     - If value < 30 → #FF8C00 (Orange)
     - If value < 90 → #FF8C00 (Orange, lighter)
     - Else → #323130 (Default)
4. **Conditional formatting → Font weight**:
   - If value < 0 → Bold
   - If value < 30 → Semibold
   - Else → Regular
5. Create calculated column for display text:
```DAX
Days Until Deadline Display = 
VAR Days = [Days Until Deadline]
RETURN
IF(
    Days < 0,
    "OVERDUE (" & ABS(Days) & " days)",
    Days & " days"
)
```

**Row Border (Left) - Workaround**:
Power BI doesn't support per-row left borders. Use one of these methods:

**Method 1: First Column as Border Indicator**
1. Add a thin (8px width) first column
2. Use conditional formatting for background color based on risk
3. This creates the visual effect of a left border

**Method 2: Use Icons Column**
1. Create an icon column (8px width)
2. Use Unicode characters or icons
3. Color code based on risk level

**Method 3: Row Striping with Risk Colors**
1. Use conditional formatting on entire row background
2. Very subtle background tint based on risk
3. Less prominent but still visible

### Filtering with Slicers - Exact Match

1. **Insert → Slicer**
2. Add "Claim Status" field
3. Format as **Buttons** to match filter badges:
   - **Format → Slicer settings → Style → Tiles**
   - **Items**: Horizontal
   - **Font family**: Segoe UI
   - **Font size**: 10px
   - **Font weight**: Medium (500)
   - **Selected**: 
     - Background: #0078D4 (Blue)
     - Font color: White
     - Border: None
   - **Unselected**: 
     - Background: #FAF9F8 (Light gray)
     - Font color: #605E5C
     - Border: 1px solid #EDEBE9
   - **Border radius**: 12px (pill shape)
   - **Padding**: 4px vertical, 10px horizontal
   - **Spacing**: 8px between items

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

## Layout & Spacing - Exact Measurements

### Page Layout Settings

**Main Container**:
- **View → Page size → Custom**
- Width: 1920px (or your screen width)
- Height: Auto
- **View → Gridlines**: Turn ON for alignment
- **View → Snap to grid**: Turn ON
- Grid size: 8px (matches our 8px gap)

**Card Spacing**:
- Gap between cards: **12px**
- Card padding: **12px** (or 16px for larger cards)
- Card border radius: **4px**

**Table Spacing**:
- Header padding: 8px vertical, 10px horizontal
- Cell padding: 8px vertical, 10px horizontal
- Row height: Auto (compact)

### KPI Dashboard Layout

1. Create 4 KPI cards
2. **Format → General → Position**:
   - Arrange in a row
   - Equal widths (divide page width by 4, minus gaps)
   - Gap between: 12px
   - Align top edges

### Section Spacing

- Section title margin bottom: 12px
- Table margin top: 8px
- Filter controls margin bottom: 12px

---

## Styling & Theme JSON

### Creating Custom Theme JSON

1. **View → Themes → Customize current theme**
2. Or create a JSON file:

```json
{
  "name": "FRT Dashboard Theme - Exact Match",
  "dataColors": [
    "#0078D4",  // Primary Blue
    "#FF8C00",  // Orange (Medium Risk)
    "#107C10",  // Green (Low Risk)
    "#D13438",  // Red (High Risk)
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
        ],
        "shadow": [
          {
            "show": true,
            "color": {
              "solid": {
                "color": "rgba(0, 0, 0, 0.13)"
              }
            },
            "blur": 3.6,
            "offsetX": 0,
            "offsetY": 1.6
          }
        ]
      }
    },
    "card": {
      "*": {
        "calloutValueFontSize": 24,
        "calloutValueFontWeight": "Semibold",
        "calloutValueColor": {
          "solid": {
            "color": "#323130"
          }
        },
        "categoryLabelFontSize": 9,
        "categoryLabelFontWeight": "Semibold",
        "categoryLabelColor": {
          "solid": {
            "color": "#605E5C"
          }
        },
        "cardPadding": 12
      }
    },
    "tableEx": {
      "*": {
        "grid": [
          {
            "showVerticalGridlines": false,
            "showHorizontalGridlines": true,
            "rowPadding": 0,
            "outlineColor": {
              "solid": {
                "color": "#F3F2F1"
              }
            },
            "outlineWeight": 1
          }
        ],
        "header": [
          {
            "fontSize": 9,
            "fontWeight": "Semibold",
            "fontColor": {
              "solid": {
                "color": "#323130"
              }
            },
            "background": "#FAF9F8",
            "outline": "Bottom",
            "outlineColor": {
              "solid": {
                "color": "#EDEBE9"
              }
            },
            "outlineWeight": 2
          }
        ],
        "values": [
          {
            "fontSize": 10,
            "fontColor": {
              "solid": {
                "color": "#323130"
              }
            }
          }
        ],
        "total": [
          {
            "fontSize": 10,
            "fontWeight": "Semibold",
            "background": "#FAF9F8"
          }
        ]
      }
    },
    "slicer": {
      "*": {
        "*": {
          "items": [
            {
              "fontSize": 10,
              "fontWeight": "Medium"
            }
          ],
          "selectedItemColor": {
            "solid": {
              "color": "#0078D4"
            }
          },
          "unselectedItemColor": {
            "solid": {
              "color": "#FAF9F8"
            }
          }
        }
      }
    }
  }
}
```

### Applying Theme

1. **View → Themes → Browse for themes**
2. Select your JSON file (`power-bi-theme.json` from the `art-dashboard` repository)
3. Or manually set colors in **View → Themes → Customize current theme**

**Download from GitHub**:
- Repository: `art-dashboard`
- File: `power-bi-theme.json` (in root directory)
- Download via: Raw button on GitHub, or clone the repository

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

## Pro Tips for Exact Match

### 1. Use Bookmarks for Filter States
- Create bookmarks for common filter combinations
- Add buttons to jump to bookmarks
- Style buttons to match export buttons (transparent with border)

### 2. Tooltips
- Create tooltip pages for detailed information
- Hover over visuals to see details
- Match tooltip styling to card styling

### 3. Buttons for Navigation
- Use buttons to navigate between pages
- Style buttons to match export buttons:
  - Background: Transparent
  - Border: 1px solid #EDEBE9
  - Font size: 10px
  - Padding: 6px 12px
  - Border radius: 2px

### 4. Export Buttons (Power BI Service)
- In Power BI Service, add **Action buttons**
- Link to export functionality
- Style to match HTML export buttons

### 5. Print Layout
- **File → Print**
- Set page size to match your needs
- Hide navigation elements in print view
- Use **View → Page view** to preview

### 6. Matching Fonts
- Power BI uses Segoe UI by default (perfect match!)
- If different, go to **View → Themes → Customize → Text font**
- Set to: Segoe UI

### 7. Exact Color Matching
- Use the hex codes provided in this guide
- Test colors side-by-side with HTML version
- Use Power BI's color picker with hex input

### 8. Spacing Consistency
- Use gridlines (View → Gridlines) for alignment
- Set grid to 8px or 12px to match HTML gaps
- Snap visuals to grid for consistent spacing

### 9. Performance Optimization
- Use aggregations for large datasets
- Limit visuals per page (max 8-10)
- Use DirectQuery for real-time data
- Hide unused visuals to improve load time

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

