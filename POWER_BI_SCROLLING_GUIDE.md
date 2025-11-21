# Power BI Scrolling & Long Content Guide
## How to Handle Long Dashboards in Power BI Desktop

This guide explains how to implement scrolling pages and handle long content in Power BI, similar to what we built in the HTML sandbox.

---

## Method 1: Scrollable Visual Containers (Recommended)

### How It Works
Power BI pages can scroll naturally when content exceeds the viewport. You can also create scrollable sections within a page.

### Implementation

1. **Natural Page Scrolling**:
   - Power BI pages automatically scroll when content exceeds page height
   - No special configuration needed
   - Users scroll with mouse wheel or scrollbar

2. **Scrollable Visual Container**:
   - **Insert → Visual container** (or use a Rectangle shape as container)
   - Place multiple visuals inside
   - Set container height to fixed value (e.g., 600px)
   - Container will scroll if content exceeds height

### Steps:
1. **Insert → Shapes → Rectangle**
2. Format rectangle:
   - **Format → General → Size**
   - Set height: 600px (or desired height)
   - Set width: Full page width
3. **Format → Visual → Fill**
   - Background: Transparent or white
4. Add visuals inside the rectangle
5. The rectangle acts as a scrollable container

---

## Method 2: Multiple Pages with Navigation

### Best Practice for Long Dashboards

Instead of one long scrolling page, create multiple focused pages:

1. **Overview Page** (Main landing)
   - Key metrics
   - Quick actions
   - Summary charts

2. **Details Page** (Drillthrough)
   - Detailed tables
   - Full data views
   - Export options

3. **Analysis Page**
   - Deep dive charts
   - Trend analysis
   - Comparative views

### Navigation Between Pages

**Option A: Navigation Buttons**
1. **Insert → Button**
2. **Button → Action → Page navigation**
3. Select target page
4. Style button to match your theme

**Option B: Navigation Menu**
1. Create a navigation bar at top
2. Use buttons for each page
3. Highlight active page
4. Use bookmarks to show/hide sections

**Option C: Drillthrough**
1. Right-click visual → **Add drillthrough**
2. Create detail page
3. Users click to drill down
4. Back button returns to overview

---

## Method 3: Bookmarks for Show/Hide Sections

### Create Collapsible Sections

1. **Create Multiple States**:
   - State 1: Show only top section
   - State 2: Show top + middle section
   - State 3: Show all sections

2. **Create Bookmarks**:
   - **View → Bookmarks → Add bookmark**
   - Name: "Show Overview Only"
   - Hide visuals you don't want to show
   - Repeat for each state

3. **Add Toggle Buttons**:
   - **Insert → Button**
   - **Button → Action → Bookmark**
   - Select your bookmark
   - Style as toggle

### Example: Collapsible Sections

```
[Overview Section - Always Visible]
[▼ Details Section] ← Button toggles visibility
  [Details content]
[▼ Analysis Section] ← Button toggles visibility
  [Analysis content]
```

---

## Method 4: Tooltips for Additional Info

### Use Tooltips Instead of Scrolling

For additional details, use tooltip pages:

1. **Create Tooltip Page**:
   - **View → Page size → Tooltip**
   - Set size: 400px × 300px
   - Add key information

2. **Configure Visual Tooltip**:
   - Select visual
   - **Format → General → Tooltip**
   - Turn ON "Tooltip"
   - Select your tooltip page

3. **Benefits**:
   - No scrolling needed
   - Quick access to details
   - Clean main page

---

## Method 5: Responsive Layouts

### Mobile vs Desktop Views

Power BI supports different layouts for different screen sizes:

1. **View → Mobile layout**
2. Design mobile-optimized version
3. Different visuals for mobile
4. Stacked layout for small screens

### Responsive Visuals

Some visuals are responsive by default:
- Cards adapt to container size
- Tables scroll horizontally
- Charts resize automatically

---

## Recommended Approach for AM Dashboard

### Structure:

**Page 1: Overview (No Scrolling)**
- Client hierarchy
- Top 3 priority cards (Open Items, Interactions, Upcoming)
- Key metrics (compact)
- Quick charts

**Page 2: Details (Scrollable)**
- All open items table
- All interactions
- All recoveries
- Full data tables

**Page 3: Analysis (Scrollable)**
- Detailed charts
- Trend analysis
- Comparative views

### Navigation:
- Buttons at top to switch pages
- Breadcrumb navigation
- Back buttons on detail pages

---

## Power BI Page Settings

### Page Size Options

1. **Standard Sizes**:
   - **View → Page size → Standard (16:9)**
   - **View → Page size → Standard (4:3)**
   - **View → Page size → Letter**

2. **Custom Size**:
   - **View → Page size → Custom**
   - Set width: 1920px
   - Set height: Auto (allows scrolling)
   - Or set fixed height: 1080px

3. **Fit to Page**:
   - **View → Page size → Fit to page**
   - Automatically adjusts

### Page View Settings

- **View → Fit to page**: Scales to fit screen
- **View → Actual size**: 100% zoom
- **View → Fit to width**: Fits width, allows vertical scroll

---

## Best Practices

### 1. Keep Overview Page Short
- Fit on one screen if possible
- Use drillthrough for details
- Use tooltips for quick info

### 2. Use Visual Hierarchy
- Most important at top
- Less important below
- Related items grouped

### 3. Navigation is Key
- Clear page navigation
- Breadcrumbs
- Back buttons
- Consistent layout

### 4. Performance
- Limit visuals per page (max 8-10)
- Use aggregations for large datasets
- Hide unused visuals

### 5. Mobile Considerations
- Test mobile layout
- Stack visuals vertically
- Simplify for small screens

---

## Implementation Example

### For Your AM Dashboard:

**Page 1: Client Overview** (Fixed height, no scroll)
```
┌─────────────────────────────────────┐
│ Client Hierarchy                     │
├─────────────────────────────────────┤
│ [Open Items] [Interactions] [Alerts]│
├─────────────────────────────────────┤
│ [Metrics: 4 cards]                   │
├─────────────────────────────────────┤
│ [Charts: 2 side-by-side]             │
└─────────────────────────────────────┘
```

**Page 2: Client Details** (Scrollable)
```
┌─────────────────────────────────────┐
│ All Open Items (Table)               │
├─────────────────────────────────────┤
│ All Interactions (List)              │
├─────────────────────────────────────┤
│ All Recoveries (Table)               │
├─────────────────────────────────────┤
│ Client Information                   │
└─────────────────────────────────────┘
(Scrolls if content exceeds page)
```

**Navigation:**
- Button bar at top: "Overview | Details | Analysis"
- Active page highlighted
- Smooth transitions

---

## Power BI Specific Tips

### 1. Visual Container Scrolling
- Power BI doesn't have native "scrollable container" visual
- Use page-level scrolling instead
- Or use multiple pages

### 2. Table Scrolling
- Tables automatically scroll if content exceeds
- **Format → Visual → Scrollbar**
- Can customize scrollbar appearance

### 3. Page Navigation
- Use buttons for navigation
- Use bookmarks for state management
- Use drillthrough for detail views

### 4. Mobile Layout
- **View → Mobile layout**
- Design separate mobile version
- Different visual arrangement

---

## Comparison: HTML vs Power BI

| Feature | HTML Sandbox | Power BI |
|---------|-------------|----------|
| Scrolling | Natural page scroll | Natural page scroll |
| Scrollable Sections | CSS overflow | Page-level only |
| Multiple Pages | Separate HTML files | Separate report pages |
| Navigation | Links/buttons | Buttons with page navigation |
| Collapsible Sections | JavaScript | Bookmarks |
| Tooltips | CSS/JS modals | Tooltip pages |

---

## Quick Reference

### To Create Scrollable Content:
1. Set page height to Auto or large fixed value
2. Add visuals that exceed viewport
3. Page will scroll naturally

### To Create Multiple Pages:
1. Right-click page tab → **New page**
2. Name the page
3. Add navigation buttons
4. Link buttons to pages

### To Create Collapsible Sections:
1. Create bookmarks for different states
2. Add toggle buttons
3. Link buttons to bookmarks

### To Create Tooltips:
1. Create tooltip page (400×300px)
2. Add content
3. Link to visual tooltip property

---

## Next Steps

1. Decide on structure (single scrollable page vs multiple pages)
2. Create page navigation if using multiple pages
3. Test scrolling behavior
4. Optimize for mobile if needed
5. Add back buttons and breadcrumbs

Need help implementing any specific approach? Let me know!

