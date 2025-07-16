# Portfolio Website - Abdulrahman Adisa Amuda

## Overview

This is a modern developer portfolio website built for Abdulrahman Adisa Amuda, a Machine Learning Engineer, Mobile App Developer (Flutter/Dart), and Full Stack Developer. The application is designed as a high-end SaaS-style portfolio with interactive features, smooth animations, and dynamic content integration with GitHub.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: ShadCN/UI components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Animations**: Framer Motion for smooth, interactive animations
- **State Management**: TanStack React Query for server state management
- **Theme System**: Custom theme provider supporting light/dark modes

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Development**: Hot module replacement via Vite integration
- **API Endpoints**: RESTful API with GitHub proxy endpoints to avoid CORS issues

### Key Components

#### Portfolio Sections
1. **Hero Section**: Animated name display with typing effects and profile image
2. **About Section**: Skills showcase with technology icons and GitHub statistics
3. **Projects Section**: Dynamic GitHub repository integration with filtering capabilities
4. **Blog Section**: Static markdown-based blog posts with rich content
5. **Contact Section**: Interactive contact form with toast notifications
6. **AI Chat Assistant**: Mock chatbot with predefined responses about the developer

#### UI Components
- Comprehensive design system using ShadCN/UI
- Responsive navigation with mobile menu support
- Theme toggle functionality
- Interactive cards and animations
- Toast notification system

### Data Flow

#### GitHub Integration
- **API Proxy**: Server-side endpoints (`/api/github/user/:username`, `/api/github/repos/:username`) 
- **Data Fetching**: Client-side hooks using React Query for caching and error handling
- **Repository Filtering**: Client-side categorization of projects (ML, Web Dev, Mobile Apps)
- **Real-time Updates**: Automatic fetching and display of latest GitHub repository data

#### Content Management
- **Static Blog Posts**: Defined in TypeScript files with rich metadata
- **Image Assets**: Stored in `attached_assets` directory with Vite alias resolution
- **Dynamic Content**: GitHub API integration for live project data

### External Dependencies

#### Core Dependencies
- **React Ecosystem**: React 18, React DOM, React Query for state management
- **UI/UX**: Radix UI primitives, Framer Motion for animations, Lucide React for icons
- **Styling**: Tailwind CSS, class-variance-authority for component variants
- **Forms**: React Hook Form with Zod validation via @hookform/resolvers
- **Development**: TypeScript, Vite, ESBuild for production builds

#### GitHub API Integration
- **Endpoints**: Public GitHub REST API v4
- **Authentication**: No authentication required for public repository data
- **Rate Limiting**: Relies on GitHub's generous rate limits for unauthenticated requests
- **CORS Handling**: Server-side proxy to avoid browser CORS restrictions

#### Database Configuration
- **ORM**: Drizzle ORM with PostgreSQL support (currently using in-memory storage)
- **Schema**: Basic user schema defined but not actively used in portfolio context
- **Future Extensibility**: Database setup ready for features like contact form persistence, analytics, or user authentication

### Deployment Strategy

#### Build Process
- **Frontend**: Vite builds optimized React application to `dist/public`
- **Backend**: ESBuild bundles Express server to `dist/index.js`
- **Assets**: Static assets copied and optimized during build process

#### Production Configuration
- **Server**: Express.js serving both API endpoints and static files
- **Environment**: NODE_ENV-based configuration for development vs production
- **Static Serving**: Production builds serve pre-built React application

#### Development Features
- **Hot Reload**: Vite dev server with instant updates
- **Error Overlay**: Custom error modal for development debugging
- **Replit Integration**: Special handling for Replit development environment

The architecture is designed to be easily deployable to various platforms while maintaining excellent performance and user experience. The separation of concerns between frontend portfolio display and backend API proxy ensures scalability and maintainability.