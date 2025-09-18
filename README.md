# Sigment Articles Hub

A modern article management platform built with **Sigment**, featuring user authentication, article creation, and a responsive design system.

## ✨ Features

* 🯉 **Sigment** — Fine-grained, signals-based reactivity
* ⚡ **Vite** — Fast dev server and production bundling
* 📜 **TypeScript** — Type-safe development
* 🗄️ **PostgreSQL** — Robust database with Prisma ORM
* 🔐 **Authentication** — JWT-based user authentication
* 📝 **Article Management** — Create, read, and manage articles
* 🎨 **Responsive Design** — Modern UI with custom design system
* 🧪 **Testing** — Vitest with comprehensive test coverage

## 🛠️ Tech Stack

### Frontend
- **[Sigment](https://sigment.dev)** - Signals-based reactive framework
- **[Vite](https://vitejs.dev)** - Build tool and dev server
- **[TypeScript](https://www.typescriptlang.org)** - Type-safe JavaScript
- **CSS** - Custom design system with CSS variables

### Backend
- **[Express.js](https://expressjs.com)** - Web framework
- **[TypeScript](https://www.typescriptlang.org)** - Type-safe JavaScript
- **[JWT](https://jwt.io)** - Authentication tokens
- **[bcrypt](https://www.npmjs.com/package/bcrypt)** - Password hashing

### Database
- **[PostgreSQL](https://www.postgresql.org)** - Relational database
- **[Prisma](https://www.prisma.io)** - Database ORM and migrations
- **[Prisma Studio](https://www.prisma.io/studio)** - Database GUI

### Development Tools
- **[Vitest](https://vitest.dev)** - Testing framework
- **[jsdom](https://github.com/jsdom/jsdom)** - DOM testing environment
- **[pnpm](https://pnpm.io)** - Package manager
- **[Concurrently](https://www.npmjs.com/package/concurrently)** - Run multiple commands

## 🚀 Quick Start

### Prerequisites
- **Node.js**: >= 18.0.0
- **pnpm**: >= 8.0.0
- **PostgreSQL**: Database server

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd sigment-article-hub
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Setup environment**
Create a `.env` file:
```bash
DATABASE_URL="postgresql://username:password@localhost:5432/sigment_articles"
JWT_SECRET="your-super-secret-jwt-key-here"
PORT=3001
NODE_ENV=development
```

4. **Setup database**
```bash
pnpm run db:generate
pnpm run db:migrate
pnpm run db:seed
```

## 🛠️ Development

### Start Both Server and UI
```bash
pnpm run dev:all
```

### Individual Commands

**Frontend (UI)**
```bash
pnpm run dev
```

**Backend (Server)**
```bash
pnpm run server:watch
```

**Production**
```bash
pnpm run build
pnpm run serve:prod
```

## 🧪 Testing

### Run Tests
```bash
npx vitest
```

### Test Commands
```bash
# Run tests once
pnpm run test:run

# Run tests with UI
pnpm run test:ui
```

## 🗄️ Database

### Prisma Commands
```bash
# Generate client
pnpm run db:generate

# Run migrations
pnpm run db:migrate

# Seed database
pnpm run db:seed

# Open Prisma Studio
pnpm run db:studio

# Reset database
pnpm run db:reset
```

## 📁 Project Structure

```
sigment-article-hub/
├── src/
│   ├── components/          # Sigment components
│   ├── assets/css/         # Stylesheets
│   ├── services/           # API and business logic
│   ├── types/              # TypeScript definitions
│   └── router/             # Client-side routing
├── prisma/                 # Database schema and migrations
├── api/                    # Express.js API routes
└── app.ts                  # Server entry point
```

## 🌐 URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **Prisma Studio**: http://localhost:5555

## 📚 Documentation

- [Sigment Framework](https://sigment.dev)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Vitest Testing](https://vitest.dev)

## 📄 License

[MIT](./LICENSE)
