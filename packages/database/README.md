# AIDDO Database Package

This package contains the Prisma schema and migration setup for the AIDDO platform.

## Local setup

1. Copy the environment file if needed.
2. Run PostgreSQL locally with Docker Compose.
3. Apply the schema using Prisma.

```bash
pnpm prisma generate
pnpm prisma db push
```
