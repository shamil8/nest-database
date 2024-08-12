# nest-database
A submodule for integrating database functionality within a NestJS application, utilizing TypeORM.

### Prerequisites
Ensure the following libraries are installed in your NestJS project:

1. `typeorm`
2. `@nestjs/typeorm`
3. `typeorm-naming-strategies`

### Installation
To add the necessary dependencies, run:
```yarn
yarn add typeorm @nestjs/typeorm typeorm-naming-strategies
```

### Uninstallation:
To remove these dependencies, run:
```yarn
yarn remove typeorm @nestjs/typeorm typeorm-naming-strategies
```

### Environment Variables
Configure your database connection by setting the following environment variables:
```dotenv
# Database module environments
DB_HOST=localhost
DB_PORT=5433
DB_USER=app
DB_PASSWORD=root
DB_NAME=app_db
```
