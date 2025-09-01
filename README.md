# Planner Backend

NestJS backend application with TypeScript, Hexagonal Architecture, and PostgreSQL.

## Architecture

This project follows the Hexagonal Architecture (Ports and Adapters) pattern:

- **Domain Layer**: Contains business entities, interfaces, and domain services
- **Application Layer**: Contains application services, DTOs, and controllers
- **Infrastructure Layer**: Contains database repositories and external service adapters

## Project Structure

```
src/
├── domain/
│   ├── entities/           # Domain entities
│   ├── repositories/       # Repository interfaces
│   └── services/          # Service interfaces
├── application/
│   ├── controllers/       # HTTP controllers
│   ├── dtos/             # Data transfer objects
│   └── services/         # Application services
├── infrastructure/
│   ├── database/         # Database configuration
│   └── repositories/     # Repository implementations
└── shared/
    ├── interfaces/       # Shared interfaces
    └── utils/           # Utility functions
```

## Environment Setup

1. Copy `.env.example` to `.env` and configure your database settings:

```bash
cp .env.example .env
```

2. Install dependencies:

```bash
npm install
```

3. Make sure PostgreSQL is running and create the database:

```sql
CREATE DATABASE planner_db;
CREATE USER planner_user WITH ENCRYPTED PASSWORD 'planner_password';
GRANT ALL PRIVILEGES ON DATABASE planner_db TO planner_user;
```

## Running the Application

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/completed` - Get completed tasks
- `GET /api/tasks/pending` - Get pending tasks
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `PUT /api/tasks/:id/complete` - Mark task as completed
- `DELETE /api/tasks/:id` - Delete task

## Technologies Used

- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe JavaScript
- **PostgreSQL** - Relational database
- **TypeORM** - Object-relational mapping
- **Class Validator** - Validation decorators
- **Class Transformer** - Object transformation