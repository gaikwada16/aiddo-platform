import { Router } from 'express';
import { z } from 'zod';
import { JobsService } from './jobs.service.js';
import { validateBody } from '../../middleware/validate.js';

const router = Router();
const jobsService = new JobsService();

const createJobSchema = z.object({
  customerId: z.string(),
  title: z.string().min(3),
  description: z.string().min(10),
  category: z.string().min(2),
  price: z.coerce.number().positive(),
  location: z.string().optional(),
});

router.post('/', validateBody(createJobSchema), async (req, res) => {
  try {
    const job = await jobsService.createJob(req.body);
    res.status(201).json(job);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Job creation failed';
    res.status(400).json({ error: message });
  }
});

router.get('/match/:category', async (req, res) => {
  try {
    const matches = await jobsService.findMatchingProviders(req.params.category);
    res.status(200).json(matches);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Provider matching failed';
    res.status(400).json({ error: message });
  }
});

export default router;
