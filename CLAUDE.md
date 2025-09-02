# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview
Planner-back is a NestJS-based task planning API with PostgreSQL database. The application follows clean architecture principles with domain-driven design.

## Development Commands

### Docker Development (Recommended)
```bash
# Start PostgreSQL and backend services
docker-compose up

# Start only PostgreSQL
docker-compose up postgres

# Stop all services
docker-compose down

# View logs
docker-compose logs planner-back
docker-compose logs postgres
```

### Local Development
```bash
# Install dependencies
npm install

# Development with watch mode
npm run start:dev

# Production mode
npm run start:prod

# Build application
npm run build
```

### Testing
```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e
```

### Code Quality
```bash
# Lint and fix code issues
npm run lint

# Format code with Prettier
npm run format
```

## Architecture Overview

### Tech Stack
- **Framework**: NestJS 11.0.1
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT tokens
- **Validation**: class-validator, class-transformer
- **Testing**: Jest

### Project Structure
- `/src/application/` - Application layer (controllers, services)
- `/src/domain/` - Domain layer (entities, value objects)
- `/src/infrastructure/` - Infrastructure layer (database, external services)
- `/test/` - E2E tests

### Database Configuration
- **PostgreSQL** with TypeORM
- Connection settings in `.env` file
- Auto-synchronization enabled in development
- Entities located in `src/domain/entities/`

### Environment Variables
Required environment variables in `.env`:
```
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=planner_user
DB_PASSWORD=planner_password
DB_DATABASE=planner_db
PORT=3000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRATION=7d
```

### Docker Setup
- PostgreSQL service on port 5432
- Backend service on port 3000
- Data persistence with named volume
- Hot reload enabled in development mode