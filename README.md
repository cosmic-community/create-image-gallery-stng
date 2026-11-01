# SpaceTime Navigators Guild Gallery

![App Preview](https://imgix.cosmicjs.com/d5ddaad0-6a78-11f1-8dfe-457508ece1b8-autopilot-photo-1502134249126-9f3755a50d78-1781720264135.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A cosmic image and video gallery for the SpaceTime Navigators Guild. Explore curated collections of space-time imagery, black hole expansions, galactic clusters, and navigator-grade visual records — all powered by [Cosmic](https://www.cosmicjs.com).

## Features

- 🌌 **Gallery Collections** — Browse organized collections with cover imagery and descriptions
- 🖼️ **Image & Video Gallery** — A responsive masonry-style grid mixing images and embedded videos
- ▶️ **Video Lightbox** — Click to play videos in an elegant overlay
- ⭐ **Featured Items** — Highlighted navigator records on the homepage
- 🔭 **Filterable Media** — Filter the gallery by media type (images / videos)
- 📱 **Fully Responsive** — Optimized for mobile, tablet, and desktop
- 🚀 **Built on Next.js 16 App Router** with Server Components and TypeScript

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6ae6945c5b93710bce4e0b3f&clone_repository=6a32e55dcb5ebdc3473308e8)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: Create a image gallery video gallery of space time images and video gallery for the space time navigators guild website"

### Code Generation Prompt

> "Create a image gallery video gallery of space time images and video gallery for the space time navigators guild website"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Cosmic](https://www.cosmicjs.com/docs)

## Getting Started

### Prerequisites

- Node.js 18+ or [Bun](https://bun.sh)
- A Cosmic account with the `gallery-collections` and `gallery-items` object types

### Installation

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all gallery items with their collection (depth 1)
const { objects } = await cosmic.objects
  .find({ type: 'gallery-items' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Fetch a single collection by slug
const { object } = await cosmic.objects
  .findOne({ type: 'gallery-collections', slug })
  .depth(1)
```

## Cosmic CMS Integration

This app uses two object types:

- **gallery-collections** — `name`, `description`, `cover_image`
- **gallery-items** — `title`, `media_type`, `image`, `video_url`, `video_thumbnail`, `description`, `collection`, `featured`

Data is fetched server-side using the [Cosmic SDK](https://www.cosmicjs.com/docs) with the `depth` parameter to resolve connected collections.

## Deployment Options

- **Vercel** — Connect your repo, add the Cosmic environment variables, and deploy.
- **Netlify** — Use the Next.js build plugin and add environment variables.

Set these environment variables in your hosting dashboard:
`COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`.

<!-- README_END -->