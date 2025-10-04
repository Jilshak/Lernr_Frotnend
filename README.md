# Lernr Frontend: Your Bridge to Knowledge

This repository holds the frontend code for Lernr, your gateway to a personalized and engaging online learning experience. Built with modern web technologies, Lernr provides an intuitive platform for learners and instructors to connect, share knowledge, and grow together.

## Table of Contents
- [Application Overview](#application-overview)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Core Functionality](#core-functionality)
- [API Integration](#api-integration)
- [Authentication](#authentication)
- [State Management](#state-management)
- [Payment Processing](#payment-processing)
- [Admin Dashboard](#admin-dashboard)
- [Development Guidelines](#development-guidelines)

## Application Overview

Lernr is a comprehensive e-learning platform that connects instructors with learners in a seamless digital environment. The platform allows instructors to create and sell courses while students can browse, purchase, and engage with educational content. The application features user authentication, course management, payment processing, community interaction, and administrative controls.

## Key Features

### For Learners:
- Browse and search courses across various categories
- Purchase courses with secure payment processing
- Track learning progress through course materials
- Take quizzes to test knowledge
- Earn certificates upon course completion
- Participate in community discussions
- Access purchased courses anytime, anywhere

### For Instructors:
- Create and manage course content
- Upload video lessons and learning materials
- Create quizzes for course evaluation
- Track student progress and performance
- Earn revenue from course sales
- Manage course visibility (list/unlist)

### For Administrators:
- Monitor platform analytics and user statistics
- Manage users (block/unblock accounts)
- Oversee course content and categories
- View sales and revenue reports
- Manage instructor accounts

## Architecture

Lernr follows a modern React-based architecture with Redux for state management:

```
[User Interface] → [React Components] → [Redux Store] → [API Services] → [Backend API]
     ↑                                        ↓
     ← [State Updates] ← [Async Actions] ← [Side Effects]
```

### Component Structure:
- **Pages**: Main application views (Login, Signup, Course Pages, Admin Dashboard, etc.)
- **Components**: Reusable UI elements (Cards, Charts, Forms, etc.)
- **Features**: Redux slices for state management (User, Course, Chat, etc.)
- **Services**: API integration and external service connectors
- **Utils**: Helper functions and route protection
- **App**: Main application routing and configuration

## Technologies Used

- **React**: JavaScript library for building user interfaces
- **Redux Toolkit**: State management solution
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Daisy UI**: Component library built on Tailwind CSS
- **Chart.js**: Data visualization library
- **Stripe**: Payment processing integration
- **Firebase**: Authentication and real-time features
- **Axios**: HTTP client for API requests
- **SweetAlert2**: Beautiful alert and modal dialogs
- **JWT**: Token-based authentication
- **Vite**: Fast build tool and development server

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- Git for version control

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Navigate to the project directory:
```bash
cd lernr-frontend
```

3. Install dependencies:
```bash
npm install
```

### Running the Application

#### Development Mode
```bash
npm run dev
```
This starts the development server with hot reloading. The application will be available at `http://localhost:5173` (default Vite port).

#### Production Build
```bash
npm run build
```
This creates an optimized production build in the `dist` directory.

#### Preview Production Build
```bash
npm run preview
```
This serves the production build locally for testing.

## Project Structure

```
src/
├── Components/           # Reusable UI components
│   ├── ChartComponents/  # Data visualization charts
│   └── ...               # Other UI components
├── Pages/                # Main application pages
│   ├── Admin/            # Admin-specific pages
│   └── ...               # User-facing pages
├── app/                  # Redux store configuration
├── features/             # Redux slices for state management
├── services/             # API services and configurations
├── utils/                # Utility functions and helpers
├── App.jsx               # Main application component
├── index.css             # Global styles
└── main.jsx              # Application entry point
```

## Core Functionality

### User Authentication
- User registration (student/instructor)
- Login/logout functionality
- Password reset flow
- Guest mode access
- JWT token management
- Role-based access control (student/instructor/admin)

### Course Management
- Course browsing and searching
- Category-based navigation
- Course details and preview
- Progress tracking
- Lesson completion
- Quiz management
- Certificate generation

### Community Features
- Chat functionality
- Discussion forums
- Peer interaction

### Shopping Cart
- Add/remove courses
- Cart persistence
- Checkout process

## API Integration

The frontend connects to a backend API hosted at `https://lernr-backend.onrender.com/`. All API calls are managed through the Axios service:

```javascript
// services/Axios.jsx
import axios from 'axios'

const api = axios.create({
    baseURL: `https://lernr-backend.onrender.com/`
})

export default api
```

To use a different backend, update the `baseURL` in [Axios.jsx](file:///\\vmware-host\Shared%20Folders\Projects\Lernr_Frotnend\src\services\Axios.jsx#L4-L4).

## Authentication

Lernr implements a token-based authentication system using JWT:

1. Users log in with email/password
2. Server returns access token
3. Token is stored in localStorage
4. Token is included in authorized API requests
5. Protected routes check for valid token

The authentication flow is managed through:
- [LoginPage.jsx](file:///\\vmware-host\Shared%20Folders\Projects\Lernr_Frotnend\src\Pages\LoginPage.jsx)
- [ProtectedRoutes.jsx](file:///\\vmware-host\Shared%20Folders\Projects\Lernr_Frotnend\src\utils\ProtectedRoutes.jsx)
- [UserSlice.jsx](file:///\\vmware-host\Shared%20Folders\Projects\Lernr_Frotnend\src\features\UserSlice.jsx)

## State Management

The application uses Redux Toolkit for state management with separate slices for different domains:

- **UserSlice**: User authentication, profiles, and account management
- **CourseSlice**: Course data, categories, cart, and progress tracking
- **ChatSlice**: Real-time messaging functionality
- **PaymentSlice**: Payment processing state
- **ReviewSlice**: Course reviews and ratings
- **ChartSlice**: Admin dashboard analytics

## Payment Processing

Lernr integrates Stripe for secure payment processing:

1. User selects course to purchase
2. Backend creates Stripe payment intent
3. Frontend collects payment details via Stripe Elements
4. Stripe processes the payment
5. Upon success, course is added to user's library

Key files:
- [CheckoutForm.jsx](file:///\\vmware-host\Shared%20Folders\Projects\Lernr_Frotnend\src\Components\CheckoutForm.jsx)
- [PaymentSlice.jsx](file:///\\vmware-host\Shared%20Folders\Projects\Lernr_Frotnend\src\features\PaymentSlice.jsx)

## Admin Dashboard

Administrators have access to a comprehensive dashboard with:

- User analytics (registration trends)
- Instructor management
- Course oversight
- Sales and revenue reporting
- Category management

The dashboard features interactive charts built with Chart.js:
- User growth charts
- Instructor statistics
- Course creation trends
- Sales performance visualization
- Profit tracking

## Development Guidelines

### Code Style
- Follow React best practices
- Use functional components with hooks
- Maintain consistent naming conventions
- Write clean, readable code with comments

### Component Structure
- Keep components small and focused
- Use proper prop validation
- Implement error boundaries
- Optimize performance with React.memo and useCallback

### State Management
- Normalize state structure
- Use appropriate Redux patterns
- Handle loading and error states
- Keep state updates predictable

### Testing
- Write unit tests for critical functionality
- Test components with various data scenarios
- Validate user flows and edge cases
- Ensure responsive design works across devices

## Contributing

We welcome contributions to Lernr! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## Support

For issues, questions, or feedback, please:
1. Check existing issues in the repository
2. Create a new issue with detailed information
3. Contact the development team

---

*Embark on a learning adventure like no other. The future of knowledge awaits!*