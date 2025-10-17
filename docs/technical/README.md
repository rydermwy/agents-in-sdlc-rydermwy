# Tailspin Toys - Technical Documentation

Welcome to the technical documentation for the Tailspin Toys crowdfunding platform. This documentation serves as a comprehensive reference for developers working on the project.

## 🏗️ Architecture Overview

Tailspin Toys is a full-stack web application built with modern technologies:

- **Backend**: Flask REST API with SQLAlchemy ORM
- **Frontend**: Astro with Svelte components and Tailwind CSS
- **Database**: SQLite (development) / PostgreSQL (production ready)
- **Testing**: Python unittest (backend), Playwright (E2E)
- **Component Documentation**: Storybook

## 📚 Documentation Structure

### Quick Start
- [Development Setup Guide](./development-setup.md) - Get the project running locally
- [Project Structure](./project-structure.md) - Understanding the codebase organization

### Frontend Development
- [Component Library](./components.md) - Svelte component documentation
- [Styling Guide](./styling.md) - Tailwind CSS conventions and dark mode
- [Frontend Architecture](./frontend-architecture.md) - Astro and Svelte patterns

### Backend Development
- [API Reference](./api-reference.md) - REST API endpoints and schemas
- [Database Schema](./database-schema.md) - Models and relationships
- [Backend Architecture](./backend-architecture.md) - Flask patterns and structure

### Testing & Quality
- Testing: See E2E tests in `client/e2e-tests/` and backend tests in `server/tests/`
- Code Standards: Follow existing patterns shown in component and API documentation

### Deployment & Operations
- [Deployment Guide](./deployment.md) - Production deployment instructions
- [Performance Guidelines](./performance.md) - Optimization strategies

## 🎨 Component Storybook

Interactive component documentation is available via Storybook:

```bash
# Start Storybook development server
cd client
npm run storybook
```

Visit http://localhost:6006 to browse components, their props, and see various states.

## 🚀 Quick Commands

```bash
# Start the full application
./scripts/start-app.sh

# Run backend tests
./scripts/run-server-tests.sh

# Run frontend E2E tests
cd client && npm run test:e2e

# Build for production
cd client && npm run build
```

## 🤝 Contributing

Please follow the patterns shown in the existing codebase and ensure all tests pass before contributing.

## 🔗 External Resources

- [Astro Documentation](https://docs.astro.build/)
- [Svelte Documentation](https://svelte.dev/docs)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)