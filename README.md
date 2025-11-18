# FRT Work Tools Dashboard

Financial Recovery Technologies LLC - Interactive Dashboard Sandbox

**GitHub Repository**: `art-dashboard`

## Overview

This is an interactive HTML/CSS/JavaScript dashboard sandbox designed to replicate and enhance Power BI reports for FRT Services. The dashboard provides a flexible environment for testing layouts, styles, and new modules before implementing changes in Power BI.

## Features

- **Client Opt-in Monitoring**: Track non-US opt-in cases with document requirements, risk assessments, and workflow status
- **Eligibility & Filings**: Monitor recognized losses, recoveries, and case filings
- **Case Details**: Comprehensive case information including fraud summaries, CUSIPs, deadlines, and risk assessments
- **Style Switcher**: Real-time CSS customization tool for colors, fonts, spacing, and shadows
- **Risk-Based Color Coding**: Visual indicators for jurisdiction risk levels (Low/Medium/High)

## Pages

- `index.html` - Dashboard landing page
- `opt-in-monitoring.html` - Client Opt-in Monitoring dashboard
- `eligibility-filings.html` - Eligibility & Filings dashboard
- `case-details.html` - Individual case detail page

## Files

- `styles.css` - Shared Power BI-inspired stylesheet
- `style-switcher.css` - Style switcher panel styles
- `style-switcher.js` - Interactive style customization tool

## Usage

1. Open `index.html` in a web browser
2. Navigate between dashboards using the top navigation tabs
3. Click on case names to view detailed case information
4. Use the style switcher (palette icon on the right) to customize colors and styles
5. Export/import styles as JSON for sharing or reuse

## Risk Levels

Jurisdiction risk levels are color-coded based on three criteria:
- **Anonymity**: Level of participant anonymity in the jurisdiction
- **Cost**: Expected costs associated with participation
- **Discovery burden**: Extent of document production and discovery requirements

- **Low Risk (Green)**: Australia (AU), Netherlands (NL)
- **Medium Risk (Amber)**: All other jurisdictions
- **High Risk (Red)**: Great Britain (GB)

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge)

## License

Proprietary - Financial Recovery Technologies LLC

