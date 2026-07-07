# Aryan Gupta — Portfolio

A modern, responsive developer portfolio featuring an interactive terminal, global command palette, and sleek project showcases. Built as a standard React/TypeScript application using **TanStack Start** and **Tailwind CSS v4**.

## Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/router/latest/docs/start/overview) (React, SSR)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State & Routing**: TanStack Query & TanStack Router
- **Runtime & Bundler**: Vite, Bun (or Node.js)

## Features

- **Interactive Terminal**: An in-browser CLI terminal that supports commands like `help`, `about`, `projects`, `clear`, `neofetch`, and theme switching.
- **Command Palette**: Universal command search (accessible via `Cmd/Ctrl + K`) for instant navigation and action execution.
- **Theme Support**: Custom themes (like `midnight-cyan` / `cyan`) configured using native CSS variables.
- **Responsive Layout**: Designed for mobile, tablet, and desktop screens with elegant transition and hover effects.

## Getting Started

### Prerequisites

You can use either [Bun](https://bun.sh/) (recommended, as a lockfile is provided) or [npm](https://www.npmjs.com/).

### Installation

Install the project dependencies:

```bash
# Using Bun
bun install

# Or using npm
npm install
```

### Development

To start the local development server:

```bash
# Using Bun
bun run dev

# Or using npm
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port specified in your terminal) to view the application.

### Build

To compile the production build:

```bash
# Using Bun
bun run build

# Or using npm
npm run build
```

This compiles the TanStack Start application with server and static assets optimized.
