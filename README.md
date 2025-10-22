# Netflix-Style Portfolio Platform

A modern, Netflix-inspired portfolio platform built with Next.js 15, featuring multiple professional profiles, project showcases, and comprehensive skill management. This application allows visitors to explore different aspects of a professional's expertise through role-based profiles.

## 🚀 Features

### Core Functionality

- **Multi-Profile System**: Switch between different professional roles (Developer, Tester, Recruiter, Adventurer)
- **Netflix-Style UI**: Immersive browsing experience with billboard hero sections and card-based layouts
- **Project Showcase**: Detailed project portfolios with skills, tech stacks, and media galleries
- **Skill Management**: Comprehensive skill categorization and proficiency tracking
- **Education & Experience**: Timeline-based career progression display
- **Admin Dashboard**: Full CRUD operations for content management (coming soon)

### Technical Features

- **Modern Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **State Management**: Zustand for client-side state
- **Animations**: Framer Motion for smooth transitions
- **Image Management**: Cloudinary integration for optimized media
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Radix UI primitives with custom styling

## 🏗️ Architecture

### Database Schema

The application uses a comprehensive relational database design:

- **Profiles**: Multiple professional personas with unique details
- **Skills**: Categorized technical and soft skills with proficiency levels
- **Projects**: Portfolio items with tech stacks, media, and skill associations
- **Education**: Academic background with descriptions
- **Experience**: Professional work history with detailed descriptions
- **Media Management**: Asset tracking for images and documents

### Key Models

```prisma
Profile -> ProfileDetails (1:1)
Profile -> Projects (1:many)
Profile -> Skills (many:many via ProfileSkill)
Profile -> Education (1:many)
Profile -> Experience (1:many)
Project -> Skills (many:many via ProjectSkill)
Project -> TechStack (many:many via ProjectTech)
```

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React

### Backend

- **Runtime**: Node.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Server Actions**: Next.js Server Actions
- **Validation**: Zod schemas

### Development Tools

- **Package Manager**: Bun
- **Linting**: ESLint + Prettier
- **Type Checking**: TypeScript
- **Database Management**: Prisma CLI

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (main)/            # Main application routes
│   │   ├── admin/         # Admin dashboard (planned)
│   │   ├── browse/        # Portfolio browsing
│   │   └── profile/       # Profile selection
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Landing page with logo animation
├── components/
│   ├── admin/             # Admin components (planned)
│   ├── main/              # Main application components
│   └── ui/                # Reusable UI components
├── actions/               # Server actions
│   ├── profiles.ts        # Profile CRUD operations
│   ├── projects.ts        # Project management
│   └── skills.ts          # Skill management
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
│   ├── db.ts             # Database connection
│   ├── store/            # Zustand stores
│   └── utils/            # Helper functions
└── types/                # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- PostgreSQL database
- Cloudinary account (for image management)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd netflix-portfolio
   ```

2. **Install dependencies**

   ```bash
   bun install
   # or
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/netflix_portfolio"
   CLOUDINARY_CLOUD_NAME="your_cloud_name"
   CLOUDINARY_API_KEY="your_api_key"
   CLOUDINARY_API_SECRET="your_api_secret"
   ```

4. **Database Setup**

   ```bash
   # Generate Prisma client
   bun run generate

   # Push database schema
   bun run push

   # Seed the database
   bun run seed
   ```

5. **Start Development Server**

   ```bash
   bun run dev
   # or
   npm run dev
   ```

6. **Open Application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint
- `bun run generate` - Generate Prisma client
- `bun run push` - Push database schema changes
- `bun run seed` - Seed database with sample data

## 🎯 User Experience

### Landing Page

- Animated logo introduction with "Victoria Ajuwon" branding
- Professional subtitle and description
- Automatic redirect to profile selection after 3 seconds

### Profile Selection

- Multiple professional personas to choose from
- Each profile represents a different aspect of expertise
- Admin profile for content management (when authenticated)

### Portfolio Browsing

- Netflix-style interface with billboard hero sections
- Card-based project and skill displays
- Responsive design for all device sizes
- Smooth animations and transitions

## 🔧 Admin Features (Planned)

The application is designed to expand with comprehensive admin functionality:

### Planned CRUD Operations

- **Profiles**: Create, edit, delete professional profiles
- **Skills**: Manage skill categories, proficiency levels, and associations
- **Projects**: Full project lifecycle management with media uploads
- **Education**: Academic background management
- **Experience**: Professional history with detailed descriptions
- **Media Management**: Asset organization and optimization

### Admin Dashboard Features

- Analytics and insights
- Content management interface
- User activity tracking
- Performance metrics
- Bulk operations

## 🎨 Design System

### Color Palette

- Primary: Netflix-inspired red (#E50914)
- Background: Dark theme with zinc/gray gradients
- Text: White and zinc variations
- Accents: Red highlights and hover states

### Typography

- Primary: Geist Sans (Vercel font)
- Monospace: Geist Mono
- Responsive scaling from mobile to desktop

### Components

- Custom card components with hover effects
- Responsive navigation with mobile menu
- Modal dialogs for detailed views
- Loading states and error handling

## 🔒 Security & Performance

### Security Features

- Server-side validation with Zod schemas
- SQL injection prevention via Prisma ORM
- Environment variable protection
- Secure image handling with Cloudinary

### Performance Optimizations

- Next.js Image optimization
- Server-side rendering (SSR)
- Static generation where appropriate
- Efficient database queries with Prisma
- Client-side state management with Zustand

## 🚀 Deployment

### Production Build

```bash
bun run build
bun run start
```

### Environment Variables

Ensure all required environment variables are set:

- `DATABASE_URL`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

### Database Migration

```bash
bun run push
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Victoria Ajuwon**

- LinkedIn: [Victoria Ajuwon](https://www.linkedin.com/in/victoria-ajuwon/)
- Portfolio: [Live Demo](https://your-portfolio-url.com)

## 🙏 Acknowledgments

- Netflix for UI/UX inspiration
- Next.js team for the amazing framework
- Prisma team for the excellent ORM
- Radix UI for accessible component primitives
- Tailwind CSS for utility-first styling

---

_Built with ❤️ using Next.js, TypeScript, and modern web technologies_
