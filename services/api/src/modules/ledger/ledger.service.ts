import { PrismaClient, LedgerEntryStatus, LedgerEntryType } from '@prisma/client';

const prisma = new PrismaClient();

export type PostLedgerEntryInput = {
  userId: string;
  type: LedgerEntryType | keyof typeof LedgerEntryType;
  amount: number;
  currency?: string;
  description: string;
  jobId?: string | null;
  metadata?: Record<string, unknown>;
  transactionId?: string | null;
};

export class LedgerService {
  async postEntry({
    userId,
    type,
    amount,
    currency = 'INR',
    description,
    jobId,
    metadata = {},
    transactionId,
  }: PostLedgerEntryInput) {
    return prisma.ledgerEntry.create({
      data: {
        userId,
        jobId: jobId ?? null,
        transactionId: transactionId ?? undefined,
        type: typeof type === 'string' ? (type as LedgerEntryType) : LedgerEntryType[type],
        amount,
        currency,
        description,
        metadata,
        status: LedgerEntryStatus.POSTED,
      },
    });
  }

  async getBalanceForUser(userId: string) {
    const result = await prisma.ledgerEntry.aggregate({
      where: {
        userId,
        status: {
          not: LedgerEntryStatus.REVERSED,
        },
      },
      _sum: {
        amount: true,
      },
    });

    return result._sum.amount ?? 0;
  }
}
