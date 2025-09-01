[//]: # (# CLAUDE.md)

[//]: # ()
[//]: # (This file provides guidance to Claude Code &#40;claude.ai/code&#41; when working with code in this repository.)

[//]: # ()
[//]: # (## ⚠️ IMPORTANT: Linting Rules)

[//]: # (**NEVER run linting commands or linting checks:**)

[//]: # (- DO NOT run `npm run lint`)

[//]: # (- DO NOT run `npm run format`)

[//]: # (- DO NOT run any ESLint or Prettier commands)

[//]: # (- DO NOT attempt to fix linting issues automatically)

[//]: # (- Focus only on the functional requirements and business logic)

[//]: # ()
[//]: # (## Essential Commands)

[//]: # ()
[//]: # (### Development)

[//]: # (```bash)

[//]: # (npm run start:local   # Local development with hot reload)

[//]: # (npm run start:dev     # Development environment)

[//]: # (npm run start:stg     # Staging environment)

[//]: # (npm run start:prod    # Production environment)

[//]: # (```)

[//]: # ()
[//]: # (### Testing)

[//]: # (```bash)

[//]: # (npm run test          # Run unit tests)

[//]: # (npm run test:watch    # Run tests in watch mode)

[//]: # (npm run test:cov      # Run tests with coverage)

[//]: # (npm run test:e2e      # Run e2e tests)

[//]: # (```)

[//]: # ()
[//]: # (### Code Quality)

[//]: # (```bash)

[//]: # (npm run lint          # Lint and fix code issues)

[//]: # (npm run format        # Format code with Prettier)

[//]: # (```)

[//]: # ()
[//]: # (## Architecture Overview)

[//]: # ()
[//]: # (This is a NestJS-based healthcare platform API that manages medical certificates, patient records, and hospital operations. The codebase follows a modular architecture where each feature is isolated in its own module.)

[//]: # ()
[//]: # (### Core Architecture Pattern)

[//]: # (- **Module Structure**: Each feature area has its own module containing:)

[//]: # (  - `controller/` - HTTP request handlers)

[//]: # (  - `service/` - Business logic)

[//]: # (  - `schema/` - MongoDB/Mongoose models)

[//]: # (  - `dto/` - Request/response validation objects)

[//]: # (  - `*.module.ts` - Module configuration)

[//]: # ()
[//]: # (### Database Architecture)

[//]: # (- **MongoDB** with Mongoose ODM)

[//]: # (- Connection pooling configured &#40;max: 30, min: 5&#41;)

[//]: # (- All schemas extend Mongoose Document interface)

[//]: # (- Timestamps automatically managed on most schemas)

[//]: # ()
[//]: # (### Authentication Flow)

[//]: # (1. JWT-based authentication with access/refresh token pattern)

[//]: # (2. Strategies located in `src/auth/strategy/`)

[//]: # (3. Guards in `src/guards/` handle token validation and role-based access)

[//]: # (4. API key authentication available for external services)

[//]: # ()
[//]: # (### Key Integration Points)

[//]: # (- **Azure Blob Storage**: File storage &#40;see `src/storage/`&#41;)

[//]: # (- **Firebase**: Push notifications &#40;see `src/messages/`&#41;)

[//]: # (- **WeChat**: Mini-program integration &#40;see `src/wechat/`&#41;)

[//]: # (- **Blockchain/NFT**: Medical certificate authenticity &#40;see `src/nfts/`&#41;)

[//]: # (- **Bull Queue**: Async job processing)

[//]: # ()
[//]: # (### API Response Pattern)

[//]: # (Controllers typically return standardized responses with:)

[//]: # (- Status code)

[//]: # (- Success/error message)

[//]: # (- Data payload)

[//]: # (- Pagination info &#40;for list endpoints&#41;)

[//]: # ()
[//]: # (### Environment Configuration)

[//]: # (- Uses NestJS ConfigModule)

[//]: # (- Environment-specific configs: local, dev, stg, prod)

[//]: # (- Sensitive configs stored in environment variables)

[//]: # (- Database connection strings follow MongoDB URI format)

[//]: # ()
[//]: # (### Testing Approach)

[//]: # (- Unit tests alongside source files &#40;*.spec.ts&#41;)

[//]: # (- E2E tests in `test/` directory)

[//]: # (- HTTP test files in `test/http/` for manual API testing)

[//]: # (- Jest as the testing framework)

[//]: # ()
[//]: # (### Common Development Patterns)

[//]: # (- DTOs use class-validator decorators for validation)

[//]: # (- Services inject repositories via constructor)

[//]: # (- Controllers use decorators for routing, guards, and validation)

[//]: # (- Mongoose schemas use decorators from @nestjs/mongoose)

[//]: # (- Error handling via custom exceptions and global filters)