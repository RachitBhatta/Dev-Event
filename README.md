# 🌟 Dev-Events

<div align="center">

![Dev-Events Banner](https://img.shields.io/badge/Dev--Events-The%20Hub%20for%20Every%20Dev-00D9FF?style=for-the-badge&logo=react&logoColor=white)

**The Ultimate Platform for Developer Events You Can't Miss**

[![Next.js](https://img.shields.io/badge/Next.js-15.x-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

[Live Demo](https://dev-event-delta.vercel.app) • [Report Bug](https://github.com/RachitBhatta/dev-events/issues) • [Request Feature](https://github.com/RachitBhatta/dev-events/issues)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [API Routes](#-api-routes)
- [Database Schema](#-database-schema)
- [Performance Optimizations](#-performance-optimizations)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**Dev-Events** is a cutting-edge event management platform built for developers, by developers. It provides a seamless experience for discovering, browsing, and booking technical events like hackathons, conferences, and meetups. With stunning WebGL-powered light ray animations and a glassmorphic UI, Dev-Events stands out as both functional and visually captivating.

### 🎨 Design Philosophy

- **Modern Aesthetics**: Glassmorphism, gradient text, and animated light rays create an immersive experience
- **Performance First**: Server-side rendering, caching strategies, and optimized WebGL rendering
- **Type Safety**: Full TypeScript implementation with strict type checking
- **Developer Experience**: Clean code, extensive documentation, and modular architecture

---

## ✨ Features

### 🌐 Core Functionality

- **📅 Event Discovery**: Browse featured developer events with rich metadata (date, time, location, tags)
- **🔍 Event Details**: Comprehensive event pages with agenda, organizer info, and booking counts
- **📝 Event Booking**: Simple email-based registration with PostHog analytics tracking
- **🎯 Similar Events**: Smart recommendation engine based on event tags
- **📱 Responsive Design**: Fully optimized for mobile, tablet, and desktop devices

### 🎨 Visual Features

- **✨ WebGL Light Rays**: Interactive animated light rays using OGL (OpenGL wrapper)
  - Mouse-following effects with smooth interpolation
  - Customizable ray origin, color, speed, and spread
  - Performance-optimized with intersection observer
  - Distortion and noise effects for dynamic visuals

- **🪟 Glassmorphism UI**: Modern glass-effect cards with backdrop blur
- **🎭 Gradient Text**: Eye-catching gradient text effects
- **🌈 Smooth Transitions**: CSS transitions and animations throughout
- **📊 Card Shadows**: Depth-enhancing shadow effects

### 🔧 Technical Features

- **🚀 Next.js 15**: Latest features including Server Components and App Router
- **💾 Server-Side Caching**: Aggressive caching with `cacheLife` for optimal performance
- **🔄 API Routes**: RESTful API endpoints for events and bookings
- **📈 Analytics Integration**: PostHog for event tracking and user behavior
- **☁️ Cloudinary Integration**: Image upload and optimization
- **🗄️ MongoDB Atlas**: Scalable NoSQL database with Mongoose ODM
- **✅ Data Validation**: Comprehensive server-side validation with error handling

---

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 15.x (App Router, Server Components)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 3.x with custom utilities
- **Animations**: 
  - WebGL (OGL library)
  - CSS Custom Properties
  - tw-animate-css

### Backend
- **Runtime**: Node.js
- **API**: Next.js API Routes
- **Database**: MongoDB Atlas
- **ODM**: Mongoose 8.x
- **File Upload**: Cloudinary v2

### DevOps
- **Hosting**: Vercel
- **Database**: MongoDB Atlas
- **CDN**: Cloudinary
- **Analytics**: PostHog

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Layer                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Browser   │  │   Mobile    │  │   Tablet    │         │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘         │
└─────────┼─────────────────┼─────────────────┼───────────────┘
          │                 │                 │
          └─────────────────┼─────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                   Next.js App Layer                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Server Components (RSC)                             │   │
│  │  - SSR with caching                                  │   │
│  │  - Data fetching at build/request time              │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Client Components                                   │   │
│  │  - Interactive UI (BookEvent, Explorebtn)           │   │
│  │  - WebGL Animations (LightRays)                     │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                     API Layer                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ GET /events  │  │ POST /events │  │ GET /[slug]  │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
└─────────┼──────────────────┼──────────────────┼─────────────┘
          │                  │                  │
┌─────────▼──────────────────▼──────────────────▼─────────────┐
│                   Data Layer                                 │
│  ┌────────────────────────────────────────────────────┐     │
│  │  Mongoose Models                                   │     │
│  │  - Event Model (title, slug, date, tags...)       │     │
│  │  - Booking Model (eventId, email)                 │     │
│  └────────────────────┬───────────────────────────────┘     │
└────────────────────────┼─────────────────────────────────────┘
                         │
┌────────────────────────▼─────────────────────────────────────┐
│               MongoDB Atlas (Database)                       │
│  ┌─────────────┐        ┌─────────────┐                     │
│  │   Events    │        │  Bookings   │                     │
│  │ Collection  │        │ Collection  │                     │
│  └─────────────┘        └─────────────┘                     │
└──────────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js**: v18.x or higher
- **npm/yarn/pnpm**: Latest version
- **MongoDB Atlas Account**: For database hosting
- **Cloudinary Account**: For image uploads
- **Git**: For version control

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/dev-events.git
cd dev-events
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dev-events?retryWrites=true&w=majority

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# PostHog Analytics (Optional)
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🔐 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `MONGODB_URI` | MongoDB connection string | ✅ | - |
| `NEXT_PUBLIC_BASE_URL` | Application base URL | ✅ | `http://localhost:3000` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | ✅ | - |
| `CLOUDINARY_API_KEY` | Cloudinary API key | ✅ | - |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | ✅ | - |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog project key | ❌ | - |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog API host | ❌ | - |

---

## 📁 Project Structure

```
dev-events/
├── app/
│   ├── api/
│   │   └── events/
│   │       ├── route.ts              # GET all events, POST new event
│   │       └── [slug]/
│   │           └── route.ts          # GET event by slug
│   ├── events/
│   │   └── [slug]/
│   │       └── page.tsx              # Dynamic event detail page
│   ├── globals.css                   # Global styles + Tailwind
│   ├── layout.tsx                    # Root layout with nav & light rays
│   └── page.tsx                      # Homepage
├── components/
│   ├── BookEvent.tsx                 # Booking form component
│   ├── EventCard.tsx                 # Event card component
│   ├── EventDetails.tsx              # Event details page content
│   ├── Explorebtn.tsx                # Explore button component
│   ├── LightRays.jsx                 # WebGL light rays animation
│   ├── LightRays.css                 # Light rays styles
│   └── NavBar.tsx                    # Navigation bar
├── database/
│   ├── event.model.ts                # Event Mongoose model
│   ├── booking.model.ts              # Booking Mongoose model
│   └── index.ts                      # Model exports
├── lib/
│   ├── actions/
│   │   ├── event.action.ts           # Server actions for events
│   │   └── booking.action.ts         # Server actions for bookings
│   ├── constants.tsx                 # Static event data
│   ├── mongodb.ts                    # MongoDB connection handler
│   └── utils.ts                      # Utility functions
├── public/
│   ├── icons/                        # SVG icons
│   └── images/                       # Event images
├── .env.local                        # Environment variables (not in repo)
├── next.config.js                    # Next.js configuration
├── tailwind.config.ts                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
└── package.json                      # Dependencies and scripts
```

---

## 🔌 API Routes

### Events API

#### `GET /api/events`
Fetches all events sorted by creation date (newest first).

**Response:**
```json
{
  "message": "Event fetched successfully",
  "events": [
    {
      "_id": "6734a...",
      "title": "React Summit US 2025",
      "slug": "react-summit-us-2025",
      "description": "...",
      "image": "https://...",
      "date": "2025-11-07",
      "time": "09:00",
      "location": "San Francisco, CA",
      "tags": ["react", "frontend"],
      "agenda": ["Opening keynote", "..."],
      "createdAt": "2024-11-13T...",
      "updatedAt": "2024-11-13T..."
    }
  ]
}
```

#### `POST /api/events`
Creates a new event with image upload to Cloudinary.

**Request (FormData):**
- `title`: string
- `description`: string
- `overview`: string
- `image`: File
- `venue`: string
- `location`: string
- `date`: string (YYYY-MM-DD)
- `time`: string (HH:MM)
- `mode`: "online" | "offline" | "hybrid"
- `audience`: string
- `agenda`: JSON string array
- `organizer`: string
- `tags`: JSON string array

**Response:**
```json
{
  "message": "Event created Successfully",
  "event": { /* created event object */ }
}
```

#### `GET /api/events/[slug]`
Fetches a single event by its URL slug.

**Parameters:**
- `slug`: URL parameter (e.g., "react-summit-us-2025")

**Response:**
```json
{
  "success": true,
  "data": { /* event object */ }
}
```

**Error Responses:**
- `400`: Invalid slug format
- `404`: Event not found
- `500`: Server error

---

## 🗄 Database Schema

### Event Model

```typescript
{
  _id: ObjectId,
  title: string,              // Required, trimmed
  slug: string,               // Auto-generated, unique, lowercase
  description: string,        // Required, trimmed
  overview: string,           // Required, trimmed
  image: string,              // Cloudinary URL, required
  venue: string,              // Required, trimmed
  location: string,           // Required, trimmed
  date: string,               // ISO format (YYYY-MM-DD), required
  time: string,               // HH:MM format, required
  mode: enum,                 // "online" | "offline" | "hybrid"
  audience: string,           // Required, trimmed
  agenda: string[],           // Array with at least 1 item
  organizer: string,          // Required, trimmed
  tags: string[],             // Array with at least 1 item
  createdAt: Date,            // Auto-generated
  updatedAt: Date             // Auto-generated
}
```

**Indexes:**
- `slug: 1` (for fast slug lookups)

**Pre-save Hooks:**
- Auto-generates slug from title
- Normalizes date to ISO format
- Validates and formats time (HH:MM)

### Booking Model

```typescript
{
  _id: ObjectId,
  eventId: ObjectId,          // Reference to Event, required
  email: string,              // Validated email, required, lowercase
  createdAt: Date,            // Auto-generated
  updatedAt: Date             // Auto-generated
}
```

**Indexes:**
- `eventId: 1` (for fast booking queries by event)

**Pre-save Hooks:**
- Validates that referenced event exists
- Prevents orphaned bookings

---

## ⚡ Performance Optimizations

### 1. **Server-Side Caching**
```typescript
'use cache';
cacheLife('hours');
```
- Event pages cached for 1 hour
- Reduces database queries
- Improves page load times

### 2. **WebGL Optimization**
- Intersection Observer for lazy initialization
- Conditional rendering based on visibility
- Adaptive device pixel ratio (max 2x)
- Cleanup on unmount to prevent memory leaks

### 3. **Image Optimization**
- Next.js Image component for automatic optimization
- Cloudinary CDN for fast delivery
- Responsive image sizing

### 4. **Database Optimization**
- Mongoose lean queries (`.lean()`) for better performance
- Strategic indexing on frequently queried fields
- Connection pooling with cached connections

### 5. **Code Splitting**
- Automatic route-based code splitting
- Dynamic imports for client components
- Suspense boundaries for loading states

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js

3. **Add Environment Variables**
   - In Vercel dashboard: Settings → Environment Variables
   - Add all variables from `.env.local`

4. **Deploy**
   - Click "Deploy"
   - Vercel builds and deploys automatically
   - Get your live URL (e.g., `https://dev-events.vercel.app`)

### Deploy to Other Platforms

**Prerequisites:**
- Node.js 18+ runtime
- Environment variables configured
- Build command: `npm run build`
- Start command: `npm start`

**Supported Platforms:**
- Netlify
- Railway
- Render
- AWS Amplify
- DigitalOcean App Platform

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
```bash
git checkout -b feature/amazing-feature
```

3. **Make your changes**
   - Follow existing code style
   - Add TypeScript types
   - Write meaningful commit messages

4. **Test your changes**
```bash
npm run build
npm run dev
```

5. **Commit your changes**
```bash
git commit -m "Add amazing feature"
```

6. **Push to your branch**
```bash
git push origin feature/amazing-feature
```

7. **Open a Pull Request**

### Code Style Guidelines

- Use TypeScript for all new files
- Follow ESLint and Prettier configurations
- Use functional components with hooks
- Add JSDoc comments for complex functions
- Keep components small and focused

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Dev-Events

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing framework
- **Vercel** - For seamless deployment
- **MongoDB** - For scalable database solutions
- **Cloudinary** - For image hosting and optimization
- **OGL** - For lightweight WebGL rendering
- **Tailwind CSS** - For utility-first styling

---

## 📧 Contact

**Project Maintainer**: Rachit Bhatta

- GitHub: [RachitBhatta](https://github.com/RachitBhatta)
- Email: rachitbhatta2009@gmail.com
- LinkedIn: RachitBhatta(https://linkedin.com/in/RachitBhatta)

**Project Link**: [https://github.com/RachitBhatta/dev-events](https://github.com/RachitBhatta/dev-events)

---

<div align="center">

### ⭐ Star this repo if you found it helpful!

Made with ❤️ by developers, for developers

[⬆ Back to Top](#-dev-events)

</div>
