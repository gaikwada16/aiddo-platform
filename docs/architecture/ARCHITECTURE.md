# AIDDO System Architecture

## Overview

AIDDO is built as a modular monorepo with clean separation of concerns across client, API, business logic, and data layers.

## Layered Architecture

```text
┌──────────────────────────────────────────────────────┐
│ CLIENT LAYER                                         │
│  ┌────────────────┬────────────────┬────────────────┐ │
│  │ Web App        │ Mobile App     │ Admin Panel    │ │
│  │ React/TS       │ React Native   │ React/TS      │ │
│  └────────────────┴────────────────┴────────────────┘ │
└──────────────────────┬───────────────────────────────┘
                       │ REST + WebSocket
                       ▼
┌──────────────────────┴───────────────────────────────┐
│ API LAYER (Node.js)                                  │
│  ┌──────────────────────────────────────────────────┐ │
│  │ Express/Fastify Middleware Stack               │ │
│  │ • Auth (JWT)                                    │ │
│  │ • Validation (Zod)                              │ │
│  │ • Error Handling                                │ │
│  │ • Logging                                       │ │
│  └──────────────────────────────────────────────────┘ │
└──────────────────────┬───────────────────────────────┘
                       │
                       ▼
┌──────────────────────┴───────────────────────────────┐
│ BUSINESS LOGIC LAYER                                 │
│  ┌──────────────┬──────────────┬──────────────┐      │
│  │ Auth         │ Jobs         │ Payments     │      │
│  │ Service      │ Service      │ Service      │      │
│  └──────────────┴──────────────┴──────────────┘      │
│  ┌──────────────┬──────────────┬──────────────┐      │
│  │ Performance  │ Benefits     │ AI Matching  │      │
│  │ Service      │ Service      │ Service      │      │
│  └──────────────┴──────────────┴──────────────┘      │
└──────────────────────┬───────────────────────────────┘
                       │
                       ▼
┌──────────────────────┴───────────────────────────────┐
│ DATA ACCESS LAYER                                    │
│ Prisma ORM                                            │
└──────────────────────┬───────────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        │                             │
        ▼                             ▼
   PostgreSQL                     Redis
```

## Core Design Principles

- Domain-driven module boundaries
- Append-only financial ledger
- Secure, validated API surfaces
- Reusable shared types and configuration
- Clear separation between app and platform code

## Security Layers

```text
HTTPS/TLS
  │
  ▼
API Gateway / Load Balancer
  ├─ Rate limiting
  └─ CORS
  │
  ▼
Authentication (JWT)
  ├─ Bearer token
  ├─ Refresh token
  └─ Token rotation
  │
  ▼
Authorization (RBAC)
  ├─ Role checks
  └─ Permission boundaries
  │
  ▼
Input Validation (Zod)
  ├─ Type safety
  ├─ XSS prevention
  └─ SQL injection prevention
  │
  ▼
Database access controls
```

## Financial Workflow

1. Customer posts a job
2. Customer initiates payment
3. Payment service validates and creates ledger entries
4. Provider accepts the job
5. Work session starts and ends
6. Final amount is calculated
7. Customer confirms completion
8. Settlement is triggered
9. Provider withdrawal is processed
