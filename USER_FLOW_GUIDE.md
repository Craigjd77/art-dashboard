# FRT Dashboard User Flow & Access Control Guide

This document outlines the user journey, page access, and data visibility for different user types in the FRT Work Tools dashboard system.

## User Types & Access Levels

### 1. **Client Users** (External/Client-Facing)
**Who:** Institutional clients (CalSTRS, BlackRock, Wellington, etc.)
**Access:** Limited to their own data only
**Pages:**
- Eligibility & Filings (simplified view)
- Status Reports (their data only)
- Remittance (their payments only)
- Opt-in Monitoring (their cases only)

**Features:**
- Client selector shows only their organization
- No access to other clients' data
- Simplified views focused on their recoveries
- Case tracking search for their cases
- Read-only access (no admin functions)

---

### 2. **Account Managers** (Internal)
**Who:** FRT account managers assigned to specific clients
**Access:** All clients assigned to them
**Pages:**
- **Account Manager Portfolio** (NEW) - Overview of all assigned clients
- **Account Manager Dashboard** - Deep dive into individual client
- All client-facing pages (with full access to assigned clients)

**Features:**
- Multi-client portfolio view
- Filter by account manager(s)
- Client health scoring
- Relationship timeline
- Smart recommendations
- Revenue opportunities
- Can switch between assigned clients
- Full access to client data for their portfolio

---

### 3. **Internal/Admin Users** (Full Access)
**Who:** FRT internal staff, operations, management
**Access:** All clients, all data
**Pages:**
- All pages with full access
- Account Manager Portfolio (all managers)
- Account Manager Dashboard (any client)
- Admin/operational views (future)

**Features:**
- View all clients across all account managers
- Cross-client analytics
- System-wide reporting
- Administrative functions

---

## Page Flow & Navigation

### Client User Journey
```
Login → Eligibility & Filings (default)
  ├─→ Status Reports (their recoveries)
  ├─→ Remittance (their payments)
  ├─→ Opt-in Monitoring (their cases)
  └─→ Case Details (from any page)
```

### Account Manager Journey
```
Login → Account Manager Portfolio (default)
  ├─→ Select one or more account managers
  ├─→ View all assigned clients
  ├─→ Filter by health, renewal, risk
  ├─→ Click client card → Account Manager Dashboard
  │   ├─→ Deep dive into client
  │   ├─→ 9 Box rating
  │   ├─→ Smart recommendations
  │   ├─→ Revenue opportunities
  │   └─→ Relationship timeline
  └─→ Quick actions (Email, Call, Schedule)
```

### Internal/Admin Journey
```
Login → Account Manager Portfolio (all clients)
  ├─→ Select any/all account managers
  ├─→ View all clients
  ├─→ Cross-client analytics
  └─→ System-wide reporting
```

---

## Data Visibility Rules

### Client Users
- **See:** Only their own organization's data
- **Client Selector:** Hidden or shows only their org
- **Period Selector:** Available for their data
- **Filters:** Limited to their cases/recoveries
- **Export:** Only their own data

### Account Managers
- **See:** All clients assigned to them
- **Client Selector:** Shows all assigned clients
- **Portfolio View:** All assigned clients in grid
- **Filters:** Can filter by health, risk, renewal
- **Export:** Can export data for assigned clients

### Internal/Admin
- **See:** All clients, all data
- **Client Selector:** All clients
- **Portfolio View:** All clients
- **Filters:** All filters available
- **Export:** All data

---

## Page-Specific Access

### Eligibility & Filings
- **Client View:** Their eligible/filed cases only
- **AM View:** All cases for assigned clients
- **Admin View:** All cases

### Status Reports
- **Client View:** Their recoveries only
- **AM View:** Recoveries for assigned clients
- **Admin View:** All recoveries

### Remittance
- **Client View:** Their payments only
- **AM View:** Payments for assigned clients
- **Admin View:** All payments

### Opt-in Monitoring
- **Client View:** Their opt-in cases only
- **AM View:** Opt-in cases for assigned clients
- **Admin View:** All opt-in cases

### Account Manager Dashboard
- **Client View:** Not accessible
- **AM View:** Any assigned client
- **Admin View:** Any client

### Account Manager Portfolio
- **Client View:** Not accessible
- **AM View:** Their assigned clients
- **Admin View:** All clients

---

## Recommended Implementation

### 1. **Authentication & Authorization**
```javascript
const userRole = getUserRole(); // 'client', 'account_manager', 'admin'
const assignedClients = getAssignedClients(); // Array of client IDs
const currentClient = getCurrentClient(); // Selected client ID
```

### 2. **Client Selector Logic**
```javascript
function getAvailableClients() {
    if (userRole === 'client') {
        return [currentUserClient];
    } else if (userRole === 'account_manager') {
        return assignedClients;
    } else {
        return allClients; // Admin
    }
}
```

### 3. **Data Filtering**
```javascript
function filterData(data, clientId) {
    if (userRole === 'client') {
        return data.filter(d => d.clientId === currentUserClient);
    } else if (userRole === 'account_manager') {
        return data.filter(d => assignedClients.includes(d.clientId));
    } else {
        return data; // Admin sees all
    }
}
```

### 4. **Page Visibility**
```javascript
function canAccessPage(page) {
    if (page === 'account-manager-portfolio' || page === 'account-manager-dashboard') {
        return userRole !== 'client';
    }
    return true; // All other pages accessible to all
}
```

---

## Navigation Recommendations

### For Client Users
- Hide "Account Manager Dashboard" and "My Portfolio" tabs
- Show simplified navigation
- Focus on their data

### For Account Managers
- Show all navigation tabs
- Default to "My Portfolio" on login
- Quick access to assigned clients

### For Admin Users
- Show all navigation tabs
- Default to "Account Manager Portfolio" (all clients)
- Additional admin tools (future)

---

## URL Parameters for Deep Linking

### Client-Specific Views
- `account-manager-dashboard.html?client=wellington`
- `client-status-reports.html?client=blackrock`
- `client-remittance.html?client=schwab&period=2024-10`

### Account Manager Views
- `account-manager-portfolio.html?manager=craig`
- `account-manager-portfolio.html?manager=craig,sarah` (multiple)

### Period Selection
- `client-status-reports.html?client=wellington&period=2024-10&compare=previous`

---

## Future Enhancements

1. **Role-Based Navigation**
   - Dynamic navigation based on user role
   - Hide/show tabs automatically

2. **Permission System**
   - Granular permissions per user
   - Feature flags for beta features

3. **Multi-Tenant Support**
   - Client-specific branding
   - Customizable dashboards per client

4. **Audit Logging**
   - Track who accessed what data
   - Compliance reporting

5. **Notification System**
   - Role-based notifications
   - Client vs internal notifications

---

## Implementation Checklist

- [ ] Add user role detection
- [ ] Implement client filtering based on role
- [ ] Add account manager portfolio page
- [ ] Update navigation based on role
- [ ] Add URL parameter support for deep linking
- [ ] Implement data access controls
- [ ] Add permission checks to all pages
- [ ] Test client user flow
- [ ] Test account manager flow
- [ ] Test admin flow

