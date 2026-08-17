import { PrismaClient, JobStatus, ProviderStatus } from '@prisma/client';

const prisma = new PrismaClient();

export type CreateJobInput = {
  customerId: string;
  title: string;
  description: string;
  category: string;
  price: number;
  location?: string | null;
};

export class JobsService {
  async createJob({ customerId, title, description, category, price, location }: CreateJobInput) {
    const customer = await prisma.user.findUnique({ where: { id: customerId } });

    if (!customer) {
      throw new Error('Customer not found');
    }

    return prisma.job.create({
      data: {
        customerId,
        title,
        description,
        category,
        price,
        location,
        status: JobStatus.OPEN,
      },
    });
  }

  async findMatchingProviders(jobCategory: string) {
    return prisma.providerProfile.findMany({
      where: {
        status: ProviderStatus.APPROVED,
        skills: {
          has: jobCategory,
        },
      },
      include: {
        user: true,
      },
    });
  }

  async assignProvider(jobId: string, providerId: string) {
    return prisma.job.update({
      where: { id: jobId },
      data: {
        providerId,
        status: JobStatus.ACCEPTED,
        acceptedAt: new Date(),
      },
    });
  }
}
