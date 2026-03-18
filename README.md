# Admin Dashboard - React + Vite

This is a React + Vite conversion of the HTML admin dashboard with Bootstrap 5.

## Project Structure

```
src/
├── main.jsx                 # Entry point
├── App.jsx                  # Main app router
├── pages/
│   ├── LoginPage.jsx        # Login page
│   ├── AdminDashboard.jsx   # Dashboard with charts and stats
│   └── UserList.jsx         # User list page
├── components/
│   ├── Sidebar.jsx          # Navigation sidebar
│   ├── Header.jsx           # Page header
│   ├── StatBox.jsx          # Stat card component
│   ├── UserTable.jsx        # User data table
│   └── ChartContainer.jsx   # Chart wrapper
└── utils/
    └── chartInit.js         # Chart.js initialization

assets/
├── css/
│   └── style.css            # All styling (unchanged from original)
├── images/
│   ├── logo.png
│   ├── avatar.svg
│   └── bg.jpg
└── js/
    └── main.js              # Original JS (converted to React hooks)

index.html                  # Vite entry HTML
vite.config.js             # Vite configuration
package.json               # Dependencies
```

## Setup & Running

1. Install dependencies:
```bash
pnpm install
```

2. Start development server:
```bash
pnpm dev
```

3. Build for production:
```bash
pnpm build
```

## Key Features

- **Hash-based routing**: Pages navigate via URL hash (#login, #admin-dashboard, #user-list)
- **All CSS preserved**: The original style.css is used without modifications
- **Bootstrap 5 & Icons**: Loaded from CDN
- **Chart.js integration**: Bar and donut charts on dashboard
- **Simple-DataTables**: For user list table with search/sort
- **localStorage support**: Sidebar state persists across sessions
- **Responsive design**: Mobile-first layout with sidebar collapse

## Pages

1. **Login** - Authentication form that navigates to dashboard
2. **Admin Dashboard** - Stats cards, charts, and user list preview
3. **User List** - Full user management table

## Notes

- All original class names and IDs are preserved
- No CSS modifications made
- Assets folder path references changed to `/assets/` for Vite
- Simple hash-based routing (can be replaced with React Router if needed)
- localStorage integration for sidebar state management
