# AIDDO Platform

AI-Driven Person-to-Person Service Marketplace

> A production-grade monorepo for intelligent matching, secure communication, transparent payments, safety, and performance analytics.

## Vision

Connect requesters and providers, recommend fair matches, encourage skill growth, maintain trusted profiles, and support ethical collaboration.

## Architecture

```text
AIDDO PLATFORM
      │
      ├── WEB APP          (React + TypeScript)
      ├── MOBILE APP       (Expo / React Native)
      ├── ADMIN DASHBOARD  (React + TypeScript)
      │
      └── NODE.JS API
            │
            ├── AUTH
            ├── USERS
            ├── JOBS
            ├── PROVIDERS
            ├── MATCHING
            ├── PAYMENTS
            └── FINANCIAL LEDGER
                    │
                    ├── EARNINGS
                    ├── BONUS
                    └── BENEFITS

                             │
                          PostgreSQL
```

## Project Structure

```text
aiddo-platform/
├── apps/
│   ├── web/
│   ├── mobile/
│   └── admin/
├── services/
│   └── api/
├── packages/
│   ├── database/
│   ├── types/
│   ├── validation/
│   ├── ui/
│   └── config/
├── infrastructure/
├── docs/
├── tests/
├── .github/
├── .env.example
├── .gitignore
├── .prettierrc
├── docker-compose.yml
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── LICENSE
└── README.md
```

## Tech Stack

| Layer | Technology |
|---|---|
| Web Frontend | React + TypeScript + Vite |
| Mobile | React Native + Expo |
| Backend | Node.js + TypeScript |
| API | REST + Socket.IO |
| Database | PostgreSQL |
| ORM | Prisma |
| Validation | Zod |
| Authentication | JWT + Refresh Tokens |
| Cache | Redis |
| Deployment | Docker + GitHub Actions |

## Quick Start

### Prerequisites

- Node.js 22+
- pnpm 9+
- Docker + Docker Compose
- PostgreSQL 15+

### Setup

```bash
# install dependencies
pnpm install

# copy local environment
cp .env.example .env

# start local services
docker-compose up -d

# run database setup (after adding Prisma package)
# pnpm db:push

# start app development
pnpm dev
```

## Development Milestones

- Milestone 1: Foundation setup, Docker, PostgreSQL, authentication, user registration
- Milestone 2: Marketplace, skills, job posting, matching, work sessions, review system
- Milestone 3: Financial MVP, payment processing, ledger, wallet, settlement, bonus
- Milestone 4: Location features, GPS integration, nearby providers, InstaHelp
- Milestone 5: AI features, classification, matching, price recommendation, support chatbot
- Milestone 6: Production hardening, monitoring, admin panel, dispute resolution, fraud detection

## Security

- Never commit secrets to GitHub.
- Store local secrets in `.env` only.
- Use GitHub Actions secrets for CI/CD.
- Keep `.env.example` as the safe template.

## Documentation

The platform documentation set will live in the `docs/` directory and cover:

- Architecture decisions
- API specifications
- Financial workflows
- Database schema
- Business logic
- Deployment and security guidance

## Contributing

1. Create an issue.
2. Create a feature branch.
3. Write tests.
4. Submit a PR for review.
5. Merge after approval.

## License

MIT © AIDDO

## Contact

Developer: @gaikwada16
