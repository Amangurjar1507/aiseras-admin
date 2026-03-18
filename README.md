# AISeras Admin Dashboard

A modern React + Vite admin dashboard application converted from HTML to a fully functional React application.

## Features

- **Login Page**: Secure admin login interface with email/password authentication
- **Dashboard**: Statistics overview with charts showing video/audio analytics and user status
- **User Management**: Comprehensive user list with sorting and filtering capabilities
- **Responsive Design**: Mobile-friendly layout with collapsible sidebar navigation
- **Interactive Charts**: Real-time data visualization using Chart.js and react-chartjs-2
- **Modern UI**: Professional design with gradient cards, status badges, and smooth transitions

## Tech Stack

- **React 18.3**: JavaScript library for building user interfaces
- **Vite**: Fast build tool and dev server
- **Chart.js & react-chartjs-2**: Data visualization library
- **CSS3**: Responsive styling with modern flexbox layout
- **Bootstrap Icons**: Icon library for UI elements

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open http://localhost:5173 in your browser

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Sidebar.jsx      # Navigation sidebar component
│   └── Header.jsx       # Page header with user menu
├── pages/
│   ├── Login.jsx        # Login page
│   ├── Dashboard.jsx    # Main dashboard with charts
│   └── UserList.jsx     # User management page
├── styles/
│   └── global.css       # Global styles and theme
├── App.jsx              # Main app component with routing
└── main.jsx             # React entry point
```

## Authentication

Currently uses client-side authentication stored in localStorage. In production, this should be replaced with a proper backend authentication system.

**Demo Credentials:**
- Email: admin@example.com
- Password: (any value)

## Conversion Notes

This project was converted from a static HTML/CSS/JavaScript admin template to a modern React application with:

- State management using React hooks
- Component-based architecture
- Client-side page navigation without routing libraries
- Integrated Chart.js visualization
- Responsive design with CSS Grid and Flexbox
- Professional styling system with CSS variables

## Future Enhancements

- Real backend API integration
- Secure JWT-based authentication
- User CRUD operations
- Advanced filtering and search
- Data export functionality
- Real-time data updates with WebSocket
