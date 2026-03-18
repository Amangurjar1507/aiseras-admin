# Admin Dashboard - React + Vite

This project has been successfully converted from HTML to React Vite. It's a fully functional admin dashboard with login, dashboard, and user list pages.

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Chart.jsx
│   ├── Header.jsx
│   ├── Sidebar.jsx
│   ├── StatBox.jsx
│   └── UserTable.jsx
├── pages/              # Page components
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   └── UserList.jsx
├── styles/             # Component-specific styles
│   ├── Dashboard.css
│   ├── Header.css
│   ├── Login.css
│   ├── Sidebar.css
│   └── UserTable.css
├── App.jsx             # Main App component with routing
├── App.css
├── index.css           # Global styles
└── main.jsx            # React entry point
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or pnpm

### Installation

1. Install dependencies:
```bash
npm install
# or
pnpm install
```

2. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
pnpm build
```

The built files will be in the `dist/` directory.

## Features

✅ **Login Page** - Admin authentication interface with email and password fields
✅ **Dashboard** - Overview with statistics, charts, and user list
✅ **User List** - Dedicated page showing all users with management options
✅ **Responsive Design** - Works on mobile, tablet, and desktop screens
✅ **Sidebar Navigation** - Fixed sidebar that collapses on mobile
✅ **Chart.js Integration** - Bar and donut charts for data visualization
✅ **React Router** - Client-side routing between pages
✅ **Bootstrap Icons** - Professional icons throughout the app

## Key Conversions from HTML to React

1. **HTML Structure** → React Components
   - `index.html` (login page) → `src/pages/Login.jsx`
   - `admin-dashboard.html` → `src/pages/Dashboard.jsx`
   - `user-list.html` → `src/pages/UserList.jsx`

2. **Styling** → Component CSS Files
   - Global styles in `src/index.css`
   - Component-specific styles in `src/styles/`

3. **JavaScript Logic** → React Hooks & Components
   - Sidebar toggle logic using `useState`
   - Navigation using `react-router-dom`
   - Chart initialization with useEffect

4. **Static Assets** 
   - Bootstrap CDN for icons
   - Chart.js CDN for charts

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Browser Support

Works on all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## Notes

- The project uses NO TypeScript (as per requirements)
- All routing is handled by React Router v6
- Charts are loaded from CDN (Chart.js v4.4.0)
- Bootstrap Icons are loaded from CDN
- No Next.js - pure React with Vite

## Customization

To customize the admin dashboard:
1. Edit components in `src/components/`
2. Modify styles in `src/styles/`
3. Add new pages in `src/pages/`
4. Update routes in `src/App.jsx`

---

Happy coding! 🚀
