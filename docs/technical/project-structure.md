# Project Structure

This document provides a detailed overview of the Tailspin Toys project organization and architecture.

## Repository Overview

```
agents-in-sdlc-rydermwy/
├── 📁 client/              # Frontend application (Astro + Svelte)
├── 📁 server/              # Backend API (Flask + SQLAlchemy)
├── 📁 docs/                # Documentation
├── 📁 scripts/             # Development and deployment scripts
├── 📁 data/                # Database files (SQLite)
├── 📁 .github/             # GitHub workflows and configuration
├── 📁 .vscode/             # VS Code workspace settings
└── 📄 README.md            # Main project README
```

## Frontend Structure (`client/`)

```
client/
├── 📁 .storybook/          # Storybook configuration
│   ├── main.ts             # Storybook main config
│   └── preview.ts          # Global story settings
├── 📁 src/
│   ├── 📁 components/      # Svelte components
│   │   ├── GameList.svelte
│   │   ├── GameDetails.svelte
│   │   ├── HeaderSvelte.svelte
│   │   ├── *.stories.svelte # Component stories
│   │   └── Header.astro    # Astro components
│   ├── 📁 layouts/         # Astro layout templates
│   │   └── Layout.astro    # Base page layout
│   ├── 📁 pages/           # Astro page routes
│   │   ├── index.astro     # Home page (/)
│   │   ├── about.astro     # About page (/about)
│   │   └── game/           # Dynamic game pages
│   │       └── [id].astro  # Game details (/game/1)
│   ├── 📁 styles/          # Global CSS
│   │   └── global.css      # Tailwind CSS imports
│   ├── 📁 assets/          # Static assets
│   └── middleware.ts       # Astro middleware
├── 📁 e2e-tests/           # Playwright E2E tests
├── 📁 public/              # Static public assets
├── 📄 package.json         # Node.js dependencies and scripts
├── 📄 astro.config.mjs     # Astro configuration
├── 📄 svelte.config.js     # Svelte configuration
├── 📄 tsconfig.json        # TypeScript configuration
└── 📄 playwright.config.ts # E2E test configuration
```

## Backend Structure (`server/`)

```
server/
├── 📁 models/              # SQLAlchemy ORM models
│   ├── __init__.py         # Database initialization
│   ├── base.py             # Base model class
│   ├── game.py             # Game model
│   ├── publisher.py        # Publisher model
│   └── category.py         # Category model
├── 📁 routes/              # API endpoint blueprints
│   ├── __init__.py         # Route registration
│   ├── games.py            # Game endpoints
│   └── publishers.py       # Publisher endpoints
├── 📁 tests/               # Unit tests
│   ├── test_games.py       # Game API tests
│   └── test_*.py           # Other test files
├── 📁 utils/               # Utility functions
├── 📄 app.py               # Flask application entry point
└── 📄 requirements.txt     # Python dependencies
```

## Documentation Structure (`docs/`)

```
docs/
├── 📁 technical/           # Developer documentation
│   ├── README.md           # Technical docs index
│   ├── development-setup.md # Setup instructions
│   ├── components.md       # Component documentation
│   ├── api-reference.md    # API documentation
│   └── project-structure.md # This file
├── 📁 images/              # Documentation images
├── README.md               # Workshop documentation
├── 0-prereqs.md           # Prerequisites
├── 1-copilot-coding-agent.md
├── 2-mcp.md
├── 3-custom-instructions.md
├── 4-copilot-agent-mode-vscode.md
└── 5-reviewing-coding-agent.md
```

## Scripts Directory (`scripts/`)

```
scripts/
├── 📄 setup-env.sh         # Install all dependencies
├── 📄 start-app.sh         # Start frontend and backend
└── 📄 run-server-tests.sh  # Run Python tests
```

## Architecture Patterns

### Frontend Architecture

**Framework**: Astro with Svelte Islands
- **Astro**: Server-side rendering and routing
- **Svelte**: Interactive components with reactivity
- **Tailwind CSS**: Utility-first styling
- **TypeScript**: Type safety

**File Organization**:
```
Pages (Astro)     → Routes and layouts
Components        → Reusable UI components
Layouts          → Page templates
Styles           → Global CSS and design tokens
```

**Data Flow**:
```
Page Load → Astro SSR → Hydrate Svelte → API Calls → Component Updates
```

### Backend Architecture

**Framework**: Flask with Blueprint pattern
- **Flask**: Web framework and routing
- **SQLAlchemy**: ORM and database abstraction
- **Blueprint**: Modular route organization
- **SQLite**: Development database

**Request Flow**:
```
HTTP Request → Flask Router → Blueprint → Route Handler → Database Query → JSON Response
```

**Model Relationships**:
```
Game ←→ Publisher (Many-to-One)
Game ←→ Category (Many-to-One)
```

## Configuration Files

### Frontend Configuration

**astro.config.mjs** - Astro configuration:
```javascript
export default defineConfig({
  integrations: [svelte(), node()],
  output: 'server',
  adapter: node({ mode: 'standalone' })
});
```

**svelte.config.js** - Svelte configuration:
```javascript
export default {
  // Svelte compiler options
};
```

**package.json** - Key scripts:
```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "storybook": "storybook dev -p 6006",
    "test:e2e": "npx playwright test"
  }
}
```

### Backend Configuration

**app.py** - Flask application setup:
```python
from flask import Flask
from models import db
from routes import register_blueprints

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///games.db'
db.init_app(app)
register_blueprints(app)
```

**requirements.txt** - Python dependencies:
```
Flask
SQLAlchemy
Flask-SQLAlchemy
```

### Development Configuration

**.vscode/settings.json** - VS Code settings:
```json
{
  "python.defaultInterpreterPath": "./venv/bin/python",
  "files.associations": {
    "*.astro": "astro"
  }
}
```

## Development Workflow

### 1. Environment Setup
```bash
./scripts/setup-env.sh    # Install dependencies
```

### 2. Development Servers
```bash
./scripts/start-app.sh    # Start both servers
# OR
npm run dev              # Frontend only (port 4321)
python server/app.py     # Backend only (port 5100)
```

### 3. Component Development
```bash
cd client
npm run storybook        # Component documentation (port 6006)
```

### 4. Testing
```bash
./scripts/run-server-tests.sh  # Backend tests
cd client && npm run test:e2e  # E2E tests
```

### 5. Build
```bash
cd client
npm run build           # Production build
```

## File Naming Conventions

### Frontend
- **Pages**: `kebab-case.astro` (e.g., `about.astro`)
- **Components**: `PascalCase.svelte` (e.g., `GameList.svelte`)
- **Stories**: `ComponentName.stories.svelte`
- **Styles**: `kebab-case.css`

### Backend
- **Models**: `snake_case.py` (e.g., `game.py`)
- **Routes**: `snake_case.py` (e.g., `games.py`)
- **Tests**: `test_*.py` (e.g., `test_games.py`)

### General
- **Directories**: `kebab-case` or `snake_case`
- **Configuration**: `kebab-case.extension` (e.g., `astro.config.mjs`)

## Import Patterns

### Frontend Imports
```javascript
// Relative imports for components
import GameList from './GameList.svelte';
import Layout from '../layouts/Layout.astro';

// Absolute imports from src
import { someUtil } from '../utils/helpers';
```

### Backend Imports
```python
# Relative imports within packages
from .base import BaseModel
from models import db, Game

# Absolute imports
from flask import jsonify, Blueprint
```

## Build Artifacts

### Frontend Build Output
```
client/dist/
├── client/        # Client-side assets
├── server/        # Server-side code
└── static/        # Static assets
```

### Development Files (Ignored in .gitignore)
```
node_modules/      # Node.js dependencies
__pycache__/       # Python bytecode
venv/              # Python virtual environment
.env               # Environment variables
dist/              # Build output
```

## Port Allocation

| Service | Port | URL |
|---------|------|-----|
| Backend API | 5100 | http://localhost:5100 |
| Frontend Dev | 4321 | http://localhost:4321 |
| Storybook | 6006 | http://localhost:6006 |
| E2E Tests | Dynamic | Managed by Playwright |

## Environment Variables

### Development
```bash
FLASK_ENV=development
DATABASE_URL=sqlite:///data/games.db
PUBLIC_API_URL=http://localhost:5100
```

### Production (Example)
```bash
FLASK_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/db
PUBLIC_API_URL=https://api.tailspintoys.com
```

## Next Steps

After understanding the project structure:
1. Review [Development Setup](./development-setup.md)
2. Explore [Component Documentation](./components.md)  
3. Study [API Reference](./api-reference.md)
4. Examine existing tests in `server/tests/` and `client/e2e-tests/`