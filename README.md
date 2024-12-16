# Bounce v2

A modern web application built with React, TypeScript, and Vite, featuring a comprehensive suite of features for business management and customer engagement.

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Testing**: Jest with React Testing Library
- **Linting**: ESLint
- **Authentication**: Custom auth system with protected routes
- **Cloud Services**: Cloudinary for media management
- **Deployment**: Vercel

## Features

- **Blog Management**: Full-featured blog system with rich text editing
- **Product Management**: Product catalog with detailed views and admin controls
- **Contact System**: Contact forms with admin management interface
- **Admin Panel**: Secure administrative interface for content management
- **Customer Reviews**: Display and management of customer feedback
- **Authentication**: Secure login system with protected routes
- **Responsive Design**: Mobile-friendly interface with modern UI components
- **Analytics**: Built-in analytics tracking

## Project Structure

```
src/
├── __mocks__/          # Mock files for testing
├── assets/             # Static assets
├── components/         # React components
│   ├── blog/          # Blog-related components
│   │   ├── BlogForm.tsx
│   │   ├── BlogTable.tsx
│   │   └── QuillConfig.ts
│   ├── contact/       # Contact form components
│   │   ├── ContactForm.tsx
│   │   └── ContactTable.tsx
│   ├── product/       # Product-related components
│   │   ├── ProductDetail.tsx
│   │   ├── ProductForm.tsx
│   │   ├── ProductList.tsx
│   │   └── ProductTable.tsx
│   ├── ui/           # Reusable UI components
│   │   ├── card.tsx
│   │   └── LoadingSpinner.tsx
│   └── __tests__/    # Component tests
├── contexts/         # React context providers
│   └── AuthContext.tsx
├── hooks/           # Custom React hooks
│   ├── useBlogManagement.ts
│   ├── useContactManagement.ts
│   └── useProductManagement.ts
├── types/           # TypeScript type definitions
│   ├── blog.ts
│   ├── contact.ts
│   ├── css.d.ts
│   └── product.ts
├── utils/           # Utility functions
│   ├── analytics.ts
│   ├── cloudinary.ts
│   └── env.ts
└── data/           # Static data and configurations
    └── features.ts

public/             # Public assets
├── manifest.json
├── robots.txt
├── sitemap.xml
├── logo.png
├── logo192.png
├── logo512.png
├── favicon.ico
├── apple-touch-icon.png
├── og-image.jpg
└── twitter-image.jpg
```

## Development

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

   - Copy `.env.sample` to `.env`
   - Configure required environment variables

3. Start development server:

```bash
npm run dev
```

4. Run tests:

```bash
npm test
```

## Testing

The project includes comprehensive test coverage using Jest and React Testing Library. Test files are located alongside their corresponding components in `__tests__` directories with the `.test.tsx` extension. Mock files are stored in `__mocks__` directories for both components and project root.

## Build

To build for production:

```bash
npm run build
```

This will generate optimized production files in the `dist` directory.

## Configuration Files

- `tsconfig.json`: Base TypeScript configuration
- `tsconfig.app.json`: App-specific TypeScript settings
- `tsconfig.node.json`: Node-specific TypeScript settings
- `tsconfig.test.json`: Test-specific TypeScript settings
- `eslint.config.js`: ESLint configuration
- `tailwind.config.js`: TailwindCSS configuration
- `postcss.config.js`: PostCSS configuration
- `jest.config.ts`: Jest test configuration
- `vite.config.ts`: Vite build configuration
- `vercel.json`: Vercel deployment configuration
- `next-env.d.ts`: Next.js type declarations
