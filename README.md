# Bounce v2

A modern web application built with React, TypeScript, and Vite, featuring a comprehensive suite of features for business management and customer engagement.

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Testing**: Jest
- **Linting**: ESLint
- **Authentication**: Custom auth system with protected routes

## Features

- **Blog Management**: Full-featured blog system with rich text editing
- **Product Management**: Product catalog with detailed views and admin controls
- **Contact System**: Contact forms with admin management interface
- **Admin Panel**: Secure administrative interface for content management
- **Customer Reviews**: Display and management of customer feedback
- **Authentication**: Secure login system with protected routes
- **Responsive Design**: Mobile-friendly interface with modern UI components

## Project Structure

```
src/
├── components/         # React components
│   ├── blog/          # Blog-related components
│   ├── product/       # Product-related components
│   ├── contact/       # Contact form components
│   └── ui/            # Reusable UI components
├── contexts/          # React context providers
├── hooks/             # Custom React hooks
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── data/             # Static data and configurations
```

## Development

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Run tests:

```bash
npm test
```

## Testing

The project includes comprehensive test coverage using Jest. Test files are located alongside their corresponding components with the `.test.tsx` extension.

## Build

To build for production:

```bash
npm run build
```

This will generate optimized production files in the `dist` directory.

## ESLint Configuration

The project uses ESLint with TypeScript support for code quality. Configuration can be found in `eslint.config.js`.
