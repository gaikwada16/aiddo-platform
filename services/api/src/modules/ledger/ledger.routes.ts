import { Router } from 'express';
import { z } from 'zod';
import { LedgerService } from './ledger.service.js';
import { validateBody } from '../../middleware/validate.js';

const router = Router();
const ledgerService = new LedgerService();

const postEntrySchema = z.object({
  userId: z.string(),
  type: z.enum([
    'CUSTOMER_PAYMENT',
    'PROVIDER_EARNING',
    'PLATFORM_FEE',
    'BONUS',
    'BENEFIT',
    'REFUND',
    'WITHDRAWAL',
    'ADJUSTMENT',
  ]),
  amount: z.coerce.number().finite(),
  currency: z.string().default('INR'),
  description: z.string().min(3),
  jobId: z.string().optional(),
  metadata: z.record(z.any()).optional(),
  transactionId: z.string().optional(),
});

router.post('/', validateBody(postEntrySchema), async (req, res) => {
  try {
    const entry = await ledgerService.postEntry(req.body);
    res.status(201).json(entry);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Ledger entry creation failed';
    res.status(400).json({ error: message });
  }
});

router.get('/balance/:userId', async (req, res) => {
  try {
    const balance = await ledgerService.getBalanceForUser(req.params.userId);
    res.status(200).json({ userId: req.params.userId, balance });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Balance lookup failed';
    res.status(400).json({ error: message });
  }
});

export default router;
