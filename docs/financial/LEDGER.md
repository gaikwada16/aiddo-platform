# AIDDO Financial Ledger System

## Overview

The financial ledger is the core of AIDDO's payment system. It provides an immutable, append-only record of all financial transactions.

## Ledger Entry Types

```ts
export type LedgerEntryType =
  | 'CUSTOMER_PAYMENT'
  | 'PROVIDER_EARNING'
  | 'PLATFORM_FEE'
  | 'BONUS'
  | 'BENEFIT'
  | 'REFUND'
  | 'WITHDRAWAL'
  | 'ADJUSTMENT'
  | 'TAX_DEDUCTION'
  | 'INSURANCE_CONTRIBUTION';
```

## Core Principle

The ledger is append-only. Never modify or delete a ledger entry. Instead, create a reversal entry with the opposite amount and link it through the transaction reference.

## Sample Workflow

```ts
const originalEntry = {
  transactionId: 'txn_123',
  userId: 'user_456',
  jobId: 'job_789',
  type: 'CUSTOMER_PAYMENT',
  amount: 1000,
  currency: 'INR',
  status: 'POSTED',
  description: 'Payment for job',
};

const reversalEntry = {
  ...originalEntry,
  transactionId: 'txn_123_reversal',
  type: 'ADJUSTMENT',
  amount: -1000,
  description: 'Reversal of incorrect payment',
};
```

## Benefits of an Append-Only Ledger

- Audit trail for every transaction
- Compliance and financial transparency
- Clear dispute resolution
- Fraud prevention and reconciliation
- Easy recalculation of balances
