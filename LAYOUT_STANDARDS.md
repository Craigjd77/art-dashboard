# FRT Dashboard Layout Standards

This document defines the standard layout and navigation structure for all FRT Work Tools pages. These standards should be followed when building pages in Power BI to ensure consistency across the entire application.

## Header Structure

All pages must have the following header structure:

```html
<div class="header">
    <div class="header-left">
        <div class="logo">FRT Work Tools</div>
        <div class="header-title">[Page Title]</div>
    </div>
    <div class="header-right">
        <div class="user-info">Craig D'Alessio</div>
        <button>Share</button>
    </div>
</div>
```

**Header Title Format:**
- Main pages: Use descriptive page name (e.g., "Eligibility & Filings", "Status Reports", "Remittance")
- Case detail pages: Use "Case Details" or specific case name
- Account Manager pages: Use "Account Manager Dashboard"

## Navigation Tabs

All pages must have the following navigation structure with icons:

```html
<div class="nav-tabs">
    <button class="nav-tab">
        <i class="fas fa-file-check"></i>
        ELIGIBILITY & FILINGS
    </button>
    <button class="nav-tab">
        <i class="fas fa-chart-line"></i>
        STATUS REPORTS
    </button>
    <button class="nav-tab">
        <i class="fas fa-bell"></i>
        OPT-IN MONITORING
    </button>
    <button class="nav-tab">
        <i class="fas fa-money-bill-wave"></i>
        REMITTANCE
    </button>
    <button class="nav-tab">
        <i class="fas fa-user-tie"></i>
        Account Manager Dashboard
    </button>
    <button class="nav-tab">+</button>
</div>
```

**Navigation Rules:**
- Always include all 5 main navigation tabs in this exact order
- Always include the "+" button at the end
- Use Font Awesome icons (fas fa-*) for each tab
- Mark the active tab with `class="nav-tab active"`
- Tab text should be in UPPERCASE for main tabs, Title Case for Account Manager Dashboard

## Main Container Structure

### Standard Layout (Most Pages)
```html
<div class="main-container">
    <!-- Client Selector (if applicable) -->
    <div class="client-selector-top">
        <div>
            <label>Client:</label>
            <select id="clientSelect">
                <option value="demo">DEMOFRTCLIENT</option>
                <option value="wellington">Wellington Management</option>
                <!-- Additional options -->
            </select>
        </div>
        <!-- Period selector if applicable -->
    </div>

    <!-- Main Content -->
    <div class="content-area">
        <!-- Page content here -->
    </div>
</div>
```

### Sidebar Layout (Account Manager Dashboard)
```html
<div class="main-container">
    <div class="sidebar">
        <!-- Client selector or navigation -->
    </div>
    <div class="content-area">
        <!-- Main content -->
    </div>
</div>
```

## Client Selector Placement

**Standard Placement (Top of Main Container):**
- Use `client-selector-top` class
- Place immediately after `<div class="main-container">`
- Include label "Client:" and select dropdown
- For pages with period selection, include period selector in same container

**Sidebar Placement:**
- Only use for Account Manager Dashboard or pages with complex navigation
- Use `client-selector` class within sidebar
- Include label "Select a Client"

## Footer Structure

All pages must have a consistent footer:

```html
<div class="footer">
    <div class="page-info">
        <span>[Page identifier or page number]</span>
    </div>
    <div style="display: flex; align-items: center; gap: 16px;">
        <span>Zoom: 100%</span>
    </div>
</div>
```

**Footer Content:**
- Main pages: Show page number (e.g., "Page 5 of 21")
- Case detail pages: Show case name (e.g., "Case Details - Apple Inc Securities")
- Account Manager: Show page identifier (e.g., "Account Manager Dashboard")
- Always include zoom level indicator

## Grid System

Use consistent grid classes from `styles.css`:

- `.grid-2` - Two column layout
- `.grid-3` - Three column layout
- `.grid-4` - Four column layout
- `.grid-5` - Five column layout (for KPI cards)

**Spacing:**
- Standard gap: 10-12px
- Card padding: 10-12px
- Section margin-bottom: 12px

## KPI Cards

**Standard KPI Card Structure:**
```html
<div class="viz-card" style="border-left: 3px solid [color]; padding: 10px 12px;">
    <div style="font-size: 9px; color: var(--pbi-text-secondary); margin-bottom: 4px; font-weight: 500; text-transform: uppercase;">
        [Label]
    </div>
    <div style="font-size: 18px; font-weight: 700; color: [color]; line-height: 1.1;" id="[id]">
        [Value]
    </div>
    <div style="font-size: 9px; color: var(--pbi-text-secondary); margin-top: 4px;">
        [Description]
    </div>
</div>
```

**KPI Card Colors:**
- Primary metrics: `var(--pbi-primary)` (#0078d4)
- Success metrics: `var(--chart-green)` (#107c10)
- Warning metrics: `var(--chart-orange)` (#ff8c00)
- Info metrics: `var(--chart-purple)` (#8764b8)

## Typography Standards

**Font Sizes:**
- Page titles: 18-20px
- Section titles: 12px, font-weight: 600
- KPI values: 18-20px, font-weight: 700
- KPI labels: 9px, uppercase, letter-spacing: 0.5px
- Table headers: 10px, font-weight: 600
- Table content: 9-10px
- Descriptions: 9px

**Font Family:**
- Primary: 'Segoe UI', sans-serif
- Monospace (for numbers): 'Courier New', monospace

## Color Standards

Use CSS variables from `styles.css`:
- `var(--pbi-primary)` - Primary blue (#0078d4)
- `var(--pbi-primary-dark)` - Dark blue (#005a9e)
- `var(--pbi-card-bg)` - Card background (#ffffff)
- `var(--pbi-border)` - Borders (#edebe9)
- `var(--pbi-text-primary)` - Primary text (#323130)
- `var(--pbi-text-secondary)` - Secondary text (#605e5c)
- `var(--chart-green)` - Success/green (#107c10)
- `var(--chart-orange)` - Warning/orange (#ff8c00)
- `var(--chart-purple)` - Info/purple (#8764b8)

## Responsive Design

**Breakpoints:**
- Large screens (>1600px): Full grid layout
- Medium screens (1200-1600px): Reduce grid columns
- Small screens (<1200px): Stack to 2 columns or single column

**Grid Responsive Rules:**
```css
@media (max-width: 1600px) {
    .grid-5 { grid-template-columns: repeat(3, 1fr) !important; }
}
@media (max-width: 1200px) {
    .grid-5 { grid-template-columns: repeat(2, 1fr) !important; }
}
```

## Page-Specific Notes

### Eligibility & Filings
- Client selector: Top placement (if needed)
- Toggle buttons for ELIGIBLE/FILED views
- Case search functionality

### Status Reports
- Client selector: Top placement with period selector
- Tab navigation for report types
- Comparison toggle

### Remittance
- Client selector: Top placement with period selector
- Full-width layout (no sidebar)
- Status cards for payment lifecycle

### Opt-in Monitoring
- Client selector: Sidebar placement
- KPI dashboard with featured card
- Filter badges for case types

### Account Manager Dashboard
- Client selector: Sidebar placement
- Page navigation tabs
- Client hierarchy display

### Case Detail Pages
- No client selector (case-specific)
- Case header with title and metadata
- Timeline visualization (for US CA Settled cases)
- Risk assessment sections

## Implementation Checklist

When creating a new page, ensure:
- [ ] Header structure matches standard
- [ ] Navigation tabs include all 5 main tabs with icons
- [ ] Active tab is marked correctly
- [ ] Client selector placed appropriately
- [ ] Footer structure matches standard
- [ ] Grid system used consistently
- [ ] KPI cards follow standard structure
- [ ] Typography sizes match standards
- [ ] Colors use CSS variables
- [ ] Responsive breakpoints considered
- [ ] Page-specific requirements met

