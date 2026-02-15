# Edvana Frontend

Modern educational platform frontend for Rwanda's Competence-Based Curriculum (CBC) built with React, Vite, and Tailwind CSS.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html                      # Main HTML file where the React app mounts
├── src/                                # Source code lives here
│   ├── api/                            # All backend API call logic (organized per feature/role)
│   │   ├── axios.ts                    # Shared Axios instance with base URL & token headers
│   │   ├── auth.ts                     # Login, register, logout requests
│   │   ├── student.ts                  # API calls for student functionality
│   │   └── ...                         # Add more per role/feature as needed
│   ├── assets/                         # Static assets (icons, logos, images, etc.)
│   │   └── images/
│   ├── components/                     # Reusable UI building blocks
│   │   ├── ui/                         # Common styled components (Button, Input, Modal)
│   │   ├── layout/                     # Header, Sidebar, PageShell
│   │   └── charts/                     # Custom chart components (e.g. ProgressChart)
│   ├── constants/                      # Global enums and string constants
│   │   ├── roles.ts                    # Defined user roles (student, teacher, etc.)
│   │   ├── apiRoutes.ts                # API endpoint constants (e.g. /auth/login)
│   │   ├── curriculum.ts               # Grade levels, CBC subjects, etc.
│   │   └── README.txt                  # Explanation of this folder's purpose
│   ├── context/                        # Global React context for shared state
│   │   ├── AuthContext.tsx             # Provides login state, token, user object
│   │   └── RoleContext.tsx             # Optionally separate user role logic
│   ├── dashboard/                      # Role-specific dashboards
│   │   └── student/
│   │       ├── components/             # Sidebar, Navbar, etc. for student view
│   │       ├── views/                  # Pages like Curriculum, Exams, Progress
│   │       ├── routes.tsx              # Nested route config for /role/student/*
│   │       └── StudentDashboard.tsx    # Role layout using shared DashboardLayout
│   ├── hooks/                          # Custom reusable hooks
│   │   ├── useAuth.ts                  # Wrapper for accessing auth context
│   │   ├── useRoleRedirect.ts          # Redirect user based on role
│   │   ├── useLocalStorage.ts          # Sync state with localStorage
│   │   └── README.txt                  # Explains how to use and structure hooks
│   ├── layouts/
│   │   └── DashboardLayout.tsx         # Shared layout shell (Sidebar + Header + Content)
│   ├── pages/                          # Public pages
│   │   ├── Landing.tsx                 # Main landing page (marketing or intro)
│   │   ├── Login.tsx                   # Shared login page for all roles
│   │   ├── Register.tsx                # Optional registration page
│   │   └── NotFound.tsx                # 404 page
│   ├── router/                         # Centralized app routing
│   │   ├── index.tsx                   # Main <Routes> component, mapping URLs
│   │   └── ProtectedRoute.tsx          # Wrapper to protect routes based on auth + role
│   ├── styles/                         # Styling support files
│   │   ├── tailwind.css                # Tailwind directives (@tailwind base, etc.)
│   │   └── glassmorphism.ts            # Optional shared styles (e.g., backdrop blur)
│   ├── types/                          # Global TypeScript types and interfaces
│   │   ├── user.ts                     # User and Auth-related types
│   │   ├── quiz.ts                     # Types for questions, quizzes, answers
│   │   ├── api.d.ts                    # Optional generic API types (e.g. ApiResponse<T>)
│   │   └── README.txt                  # Explains how to use and organize types
│   ├── utils/                          # Pure JS/TS utility functions (no React)
│   │   ├── auth.ts                     # Token helpers (get/set/remove)
│   │   └── mockData.ts                 # Temporary mock data (for dev/testing only)
│   ├── App.tsx                         # Root component with top-level layout and router
│   ├── main.tsx                        # ReactDOM.createRoot() and app bootstrap
│   └── vite.config.ts                  # Vite config (build, aliases, plugins)
├── .env.local                          # Local env variables (API base URL, etc.)
├── .env.development                    # Dev-specific environment overrides
├── .env.production                     # Production environment overrides
├── tailwind.config.js                  # Tailwind theme config (colors, breakpoints, etc.)
├── tsconfig.json                       # TypeScript compiler options
├── package.json                        # Project dependencies and scripts
└── README.md                           # Overview and setup instructions
```

## 🎨 Design System

### Colors
- **Charcoal**: `#4C5454` - Primary dark color
- **Coral**: `#FF715B` - Accent/CTA color
- **Teal**: `#1EA896` - Success/highlight color
- **Brown**: `#523F38` - Secondary accent
- **White**: `#FFFFFF` - Background/text

### Glassmorphism Effects
The app uses a modern glassmorphism design with:
- Backdrop blur effects
- Semi-transparent cards
- Soft shadows and borders
- Responsive gradient backgrounds

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Routing**: Wouter
- **State Management**: React Context + Custom Hooks
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **Icons**: Lucide React

## 🔧 Development Guidelines

### Code Organization
- Use TypeScript for all files
- Follow the established folder structure
- Keep components focused and reusable
- Implement proper error boundaries
- Use custom hooks for shared logic

### Styling
- Use Tailwind utility classes
- Leverage the custom glassmorphism classes
- Follow mobile-first responsive design
- Maintain consistent spacing and typography

### API Integration
- All API calls go through the `/api` folder
- Use TypeScript interfaces for all data
- Implement proper error handling
- Support role-based data fetching

## 🌐 Environment Setup

### Local Development
```bash
cp .env.local.example .env.local
# Add your API endpoints and keys
```

### Production Build
```bash
npm run build
```

## 📚 Key Features

- **Role-Based Authentication**: Support for students, teachers, parents, and administrators
- **Responsive Design**: Mobile-first approach with glass morphism UI
- **CBC Curriculum**: Specifically designed for Rwanda's education system
- **Real-time Progress**: Track learning progress and achievements
- **Assessment Tools**: Interactive quizzes and examinations
- **Multilingual**: Support for Kinyarwanda, English, and French

## 🔒 Security

- JWT token-based authentication
- Role-based access control
- Protected routes and components
- Secure API communication
- Input validation and sanitization

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Follow the established folder structure
2. Write TypeScript interfaces for all data
3. Use the design system colors and components
4. Add proper error handling
5. Include unit tests for complex logic

## 📄 License

MIT License - see LICENSE file for details