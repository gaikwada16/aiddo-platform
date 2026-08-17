export type LedgerEntryType =
  | 'CUSTOMER_PAYMENT'
  | 'PROVIDER_EARNING'
  | 'PLATFORM_FEE'
  | 'BONUS'
  | 'BENEFIT'
  | 'REFUND'
  | 'WITHDRAWAL'
  | 'ADJUSTMENT';

export interface LedgerEntry {
  id: string;
  transactionId: string;
  userId: string;
  jobId?: string;
  type: LedgerEntryType;
  amount: number;
  currency: string;
  status: 'PENDING' | 'POSTED' | 'REVERSED';
  description: string;
  metadata: Record<string, unknown>;
  createdAt: Date;
}

export class LedgerService {
  private entries: LedgerEntry[] = [];

  createEntry(input: Omit<LedgerEntry, 'id' | 'createdAt'>): LedgerEntry {
    const entry: LedgerEntry = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };

    this.entries.push(entry);
    return entry;
  }

  listByUser(userId: string): LedgerEntry[] {
    return this.entries.filter((entry) => entry.userId === userId);
  }

  listByJob(jobId: string): LedgerEntry[] {
    return this.entries.filter((entry) => entry.jobId === jobId);
  }

  balanceForUser(userId: string): number {
    return this.entries
      .filter((entry) => entry.userId === userId && entry.status !== 'REVERSED')
      .reduce((sum, entry) => sum + Number(entry.amount), 0);
  }
}
