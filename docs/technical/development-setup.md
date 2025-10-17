# Development Setup Guide

This guide will help you set up the Tailspin Toys project for local development.

## Prerequisites

- **Python 3.8+** - Backend runtime
- **Node.js 18+** - Frontend runtime and package management
- **Git** - Version control

## Quick Start

The project provides scripts to automate the setup process:

```bash
# Clone the repository (if not already done)
git clone https://github.com/rydermwy/agents-in-sdlc-rydermwy.git
cd agents-in-sdlc-rydermwy

# Install all dependencies (Python + Node.js)
./scripts/setup-env.sh

# Start both backend and frontend servers
./scripts/start-app.sh
```

After running these commands:
- Backend API will be available at: http://localhost:5100
- Frontend application will be available at: http://localhost:4321

## Manual Setup (Alternative)

### Backend Setup

1. **Create Python virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install Python dependencies**:
   ```bash
   cd server
   pip install -r requirements.txt
   ```

3. **Start Flask development server**:
   ```bash
   python app.py
   ```

### Frontend Setup

1. **Install Node.js dependencies**:
   ```bash
   cd client
   npm install
   ```

2. **Start Astro development server**:
   ```bash
   npm run dev
   ```

## Development Tools

### Storybook (Component Documentation)

Start the component documentation server:

```bash
cd client
npm run storybook
```

Access at: http://localhost:6006

### Running Tests

**Backend Tests**:
```bash
./scripts/run-server-tests.sh
```

**Frontend E2E Tests**:
```bash
cd client
npm run test:e2e
```

**Build Verification**:
```bash
cd client
npm run build
```

## Project Structure Overview

```
.
├── client/                 # Astro/Svelte frontend
│   ├── src/
│   │   ├── components/     # Svelte components
│   │   ├── pages/          # Astro page routes
│   │   ├── layouts/        # Astro layouts
│   │   └── styles/         # Global CSS (Tailwind)
│   ├── .storybook/         # Storybook configuration
│   └── package.json
├── server/                 # Flask backend
│   ├── models/             # SQLAlchemy ORM models
│   ├── routes/             # API endpoints
│   ├── tests/              # Unit tests
│   ├── utils/              # Utility functions
│   ├── app.py              # Flask application entry point
│   └── requirements.txt
├── scripts/                # Development scripts
├── docs/                   # Documentation
└── data/                   # SQLite database files
```

## Environment Configuration

The application uses environment variables for configuration:

### Backend Environment Variables
- `FLASK_ENV`: Set to `development` for dev mode
- `DATABASE_URL`: Database connection string (defaults to SQLite)
- `SECRET_KEY`: Flask secret key for sessions

### Frontend Environment Variables
- `PUBLIC_API_URL`: Backend API URL (defaults to http://localhost:5100)

## Database Setup

The application uses SQLite by default for development. The database file is created automatically when you first run the application.

**Database location**: `data/games.db`

To reset the database:
```bash
rm data/games.db
# Restart the Flask application to regenerate
```

## Common Issues

### Port Conflicts
- Backend: Change port in `server/app.py` (default: 5100)
- Frontend: Change port in `client/astro.config.mjs` (default: 4321)
- Storybook: Change port with `npm run storybook -- -p 6007`

### Python Virtual Environment
If you encounter permission issues, ensure the virtual environment is activated:
```bash
source venv/bin/activate
```

### Node.js Dependencies
If packages are missing, clear cache and reinstall:
```bash
cd client
rm -rf node_modules package-lock.json
npm install
```

## IDE Configuration

### VS Code (Recommended)

Install these extensions for the best development experience:
- **Astro** - Astro language support
- **Svelte for VS Code** - Svelte component support
- **Python** - Python language support
- **Tailwind CSS IntelliSense** - CSS class autocompletion
- **Thunder Client** - API testing (alternative to Postman)

Workspace settings are included in `.vscode/settings.json`.

## Next Steps

After setting up the development environment:
1. Review the [Project Structure Guide](./project-structure.md)
2. Explore [Component Documentation](./components.md)
3. Check out the [API Reference](./api-reference.md)
4. Run the existing tests to understand the testing patterns