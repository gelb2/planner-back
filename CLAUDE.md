# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview
Planner-back is a NestJS-based task planning API with PostgreSQL database.
The application follows Hexagonal Architecture with Domain-Driven Design (DDD) principles.

## Architecture
- Language: TypeScript, 
- Framework: nestJS 11.0.1
- Architecture Pattern: Hexagonal Architecture (Ports & Adapters)
- Design Approach: Domain-Driven Design (DDD)

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

### Hexagonal Architecture Structure

#### Core Layers
- `/src/domain/` - **Domain Layer (Core)**
  - `entities/` - Domain entities (Task, User)
  - `repositories/` - Repository interfaces (Ports)
  - `services/` - Domain service interfaces

- `/src/application/` - **Application Layer (Use Cases)**
  - `controllers/` - REST API controllers (Primary Adapters)
  - `services/` - Application services (Use Case implementations)
  - `dtos/` - Data Transfer Objects

- `/src/infrastructure/` - **Infrastructure Layer (Adapters)**
  - `database/` - Database configuration
  - `repositories/` - Repository implementations (Secondary Adapters)


### Key Architectural Principles

1. Dependency Rule
- Infrastructure → Application → Domain
- Domain layer has no dependencies on outer layers
- Application layer depends only on domain
- Infrastructure layer depends on both application and domain

2. Port and Adapter Pattern
- Inbound Ports: Define use cases (what the application does)
- Outbound Ports: Define infrastructure needs (what the application requires)
- Adapters: Implement ports and connect to external systems

3. Domain-Driven Design
- Rich Domain Models: Complex business logic encapsulated in entities
- Value Objects: Immutable objects organized by domain context
- Domain Services: Pure business logic with no external dependencies (registered via DomainServiceConfig)
- Coordinators: Handle cross-cutting concerns that require repository access

#### Current Architecture Status
- ✅ Layer separation established
- ⚠️ Port/Adapter pattern partially implemented
- 🔧 Repository pattern needs completion
- 📋 Domain services need implementation

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

## Development Guidelines

### Hexagonal Architecture Implementation

When implementing new features, follow these patterns:

1. **Define Ports (Interfaces) First**
   - Create interfaces in `src/domain/repositories/`
   - Define domain service contracts in `src/domain/services/`

2. **Implement Use Cases**
   - Application services should depend on domain interfaces
   - Keep business logic in domain services
   - Use DTOs for data transformation

3. **Create Adapters**
   - Implement repository interfaces in `src/infrastructure/repositories/`
   - Controllers should only handle HTTP concerns
   - Database entities should match domain entities

### Code Conventions
- Use dependency injection for all dependencies
- Implement proper error handling with custom exceptions
- Follow NestJS module structure for each bounded context
- Use TypeORM entities that mirror domain entities
- Validate input with class-validator decorators

### Testing Strategy
- Unit tests for domain services and entities
- Integration tests for repositories
- E2E tests for complete user flows
- Mock external dependencies in tests