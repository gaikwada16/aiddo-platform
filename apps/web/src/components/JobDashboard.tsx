import React, { useState } from 'react';
import { useAuth } from '../lib/auth';
import { apiClient, Job } from '../lib/api';

export const JobDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'PLUMBING',
    price: '',
    location: '',
  });

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (!user) throw new Error('User not authenticated');

      const newJob = await apiClient.createJob({
        customerId: user.id,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: parseFloat(formData.price),
        location: formData.location,
      });

      setJobs([newJob, ...jobs]);
      setFormData({ title: '', description: '', category: 'PLUMBING', price: '', location: '' });
      setShowCreateForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create job');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid #ddd',
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>AIDDO Platform</h1>
          <p style={{ margin: '0.5rem 0 0 0', color: '#666' }}>
            Welcome, <strong>{user?.name}</strong> ({user?.role})
          </p>
        </div>
        <button
          onClick={handleLogout}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </div>

      {error && (
        <div
          style={{
            padding: '1rem',
            marginBottom: '1rem',
            backgroundColor: '#fee',
            color: '#c33',
            borderRadius: '4px',
          }}
        >
          {error}
        </div>
      )}

      {user?.role === 'CUSTOMER' && (
        <div style={{ marginBottom: '2rem' }}>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            {showCreateForm ? 'Cancel' : 'Create New Job'}
          </button>

          {showCreateForm && (
            <form
              onSubmit={handleCreateJob}
              style={{
                marginTop: '1.5rem',
                padding: '1.5rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <h3>Create a New Job</h3>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Job Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                  placeholder="e.g., Fix Water Leak"
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    minHeight: '100px',
                    fontFamily: 'inherit',
                  }}
                  placeholder="Describe the job details..."
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                    }}
                  >
                    <option value="PLUMBING">Plumbing</option>
                    <option value="ELECTRICAL">Electrical</option>
                    <option value="CARPENTRY">Carpentry</option>
                    <option value="CLEANING">Cleaning</option>
                    <option value="PAINTING">Painting</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                    Budget (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    min="0"
                    step="100"
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                    }}
                    placeholder="e.g., 2500"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                  placeholder="e.g., Bangalore, Indiranagar"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.6 : 1,
                }}
              >
                {isLoading ? 'Creating...' : 'Create Job'}
              </button>
            </form>
          )}
        </div>
      )}

      <div>
        <h2>Jobs {jobs.length > 0 && `(${jobs.length})`}</h2>
        {jobs.length === 0 ? (
          <p style={{ color: '#666', fontStyle: 'italic' }}>
            No jobs yet. {user?.role === 'CUSTOMER' ? 'Create one to get started!' : 'Check back later for new jobs.'}
          </p>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {jobs.map((job) => (
              <div
                key={job.id}
                style={{
                  padding: '1.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <h3 style={{ margin: '0 0 0.5rem 0' }}>{job.title}</h3>
                    <p style={{ margin: '0.5rem 0', color: '#666' }}>{job.description}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '1rem', marginTop: '1rem' }}>
                      <div>
                        <span style={{ fontWeight: 'bold' }}>Category:</span> {job.category}
                      </div>
                      <div>
                        <span style={{ fontWeight: 'bold' }}>Budget:</span> ₹{job.price}
                      </div>
                      {job.location && (
                        <div>
                          <span style={{ fontWeight: 'bold' }}>Location:</span> {job.location}
                        </div>
                      )}
                      <div>
                        <span style={{ fontWeight: 'bold' }}>Status:</span>{' '}
                        <span
                          style={{
                            padding: '0.25rem 0.5rem',
                            backgroundColor: job.status === 'OPEN' ? '#d4edda' : '#fff3cd',
                            color: job.status === 'OPEN' ? '#155724' : '#856404',
                            borderRadius: '4px',
                            fontSize: '0.9rem',
                          }}
                        >
                          {job.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
