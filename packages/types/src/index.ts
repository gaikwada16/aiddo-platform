export type UserRole = 'CUSTOMER' | 'PROVIDER' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
}

export interface JobStatusUpdate {
  jobId: string;
  status: 'DRAFT' | 'OPEN' | 'ACCEPTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  updatedAt: string;
}
