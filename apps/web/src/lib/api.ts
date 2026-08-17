const API_BASE = 'http://localhost:3000/api';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'CUSTOMER' | 'PROVIDER' | 'ADMIN';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
  role: 'CUSTOMER' | 'PROVIDER';
}

export interface Job {
  id: string;
  customerId: string;
  providerId: string | null;
  title: string;
  description: string;
  category: string;
  price: string;
  status: 'OPEN' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  location: string;
  createdAt: string;
  updatedAt: string;
  acceptedAt?: string;
  startedAt?: string;
  completedAt?: string;
}

export interface Review {
  id: string;
  jobId: string;
  providerId: string;
  customerId: string;
  rating: number;
  comment: string;
  quality?: number;
  punctuality?: number;
  behaviour?: number;
  createdAt: string;
}

export interface ProviderProfile {
  id: string;
  userId: string;
  category: string;
  rating: number;
  totalJobs: number;
  completionRate: number;
  punctualityRate: number;
  skills: string[];
  bio?: string;
  hourlyRate?: number;
  createdAt: string;
  updatedAt: string;
}

export interface LedgerEntry {
  id: string;
  userId: string;
  type: string;
  amount: string;
  currency: string;
  status: string;
  description: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

class ApiClient {
  private accessToken: string | null = null;

  constructor() {
    const stored = localStorage.getItem('accessToken');
    if (stored) {
      this.accessToken = stored;
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  setAccessToken(token: string) {
    this.accessToken = token;
    localStorage.setItem('accessToken', token);
  }

  clearAccessToken() {
    this.accessToken = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  async register(data: RegisterRequest): Promise<{ user: User; tokens: AuthTokens }> {
    const response = await this.request<{ user: User; tokens: AuthTokens }>(
      '/auth/register',
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
    this.setAccessToken(response.tokens.accessToken);
    localStorage.setItem('refreshToken', response.tokens.refreshToken);
    return response;
  }

  async login(data: LoginRequest): Promise<{ user: User; tokens: AuthTokens }> {
    const response = await this.request<{ user: User; tokens: AuthTokens }>(
      '/auth/login',
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
    this.setAccessToken(response.tokens.accessToken);
    localStorage.setItem('refreshToken', response.tokens.refreshToken);
    return response;
  }

  async createJob(data: Omit<Job, 'id' | 'createdAt' | 'updatedAt' | 'providerId' | 'status'>): Promise<Job> {
    return this.request<Job>('/jobs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getJobs(): Promise<Job[]> {
    // This endpoint doesn't exist yet, returning empty array for now
    return [];
  }

  async getMatchingProviders(category: string): Promise<any[]> {
    return this.request<any[]>(`/jobs/match/${category}`);
  }

  async postLedgerEntry(data: {
    userId: string;
    type: string;
    amount: number;
    description: string;
    metadata?: Record<string, any>;
  }): Promise<any> {
    return this.request<any>('/ledger', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getBalance(userId: string): Promise<{ userId: string; balance: string }> {
    return this.request<{ userId: string; balance: string }>(`/ledger/balance/${userId}`);
  }
}

export const apiClient = new ApiClient();
