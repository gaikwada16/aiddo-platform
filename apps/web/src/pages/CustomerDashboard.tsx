import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { apiClient, Job } from '../lib/api';

export const CustomerDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isCreatingJob, setIsCreatingJob] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'PLUMBING',
    price: '',
    location: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!user) throw new Error('Not authenticated');

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
      setIsCreatingJob(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create job');
    } finally {
      setLoading(false);
    }
  };

  const nearbyServices = [
    { category: 'ELECTRICIAN', price: '250/hr', rating: 4.8 },
    { category: 'CLEANING', price: '200/hr', rating: 4.6 },
    { category: 'HELPER', price: '180/hr', rating: 4.5 },
    { category: 'DELIVERY', price: '220/hr', rating: 4.7 },
  ];

  const dashboardStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const greetingStyle: React.CSSProperties = {
    fontSize: '1.3rem',
    fontWeight: 'bold',
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '2rem',
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
    marginTop: '1rem',
  };

  const cardStyle: React.CSSProperties = {
    padding: '1rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '6px',
    border: '1px solid #ddd',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  };

  return (
    <div style={dashboardStyle}>
      <div style={headerStyle}>
        <div>
          <h1 style={greetingStyle}>Good morning, {user?.name} 👋</h1>
          <p style={{ margin: '0.5rem 0 0', color: '#666' }}>What help do you need today?</p>
        </div>
        <button
          onClick={() => setIsCreatingJob(!isCreatingJob)}
          style={buttonStyle}
        >
          {isCreatingJob ? 'Cancel' : 'Create Request'}
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

      {isCreatingJob && (
        <div style={sectionStyle}>
          <h2>Create a Work Request</h2>
          <form onSubmit={handleCreateJob}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Service Type
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
                <option value="CLEANING">Cleaning</option>
                <option value="CARPENTER">Carpentry</option>
                <option value="DELIVERY">Delivery</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="What service do you need?"
                required
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the work you need..."
                required
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  minHeight: '80px',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '1rem',
              }}
            >
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Budget (₹)
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="e.g., 500"
                  required
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Your location"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...buttonStyle,
                opacity: loading ? 0.6 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Creating...' : 'Post Request'}
            </button>
          </form>
        </div>
      )}

      <div style={sectionStyle}>
        <h2>🔍 Nearby Services</h2>
        <div style={gridStyle}>
          {nearbyServices.map((service) => (
            <div key={service.category} style={cardStyle}>
              <h4 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem' }}>
                {service.category === 'ELECTRICIAN'
                  ? '🔧'
                  : service.category === 'CLEANING'
                  ? '🧹'
                  : service.category === 'HELPER'
                  ? '👷'
                  : '🚚'}{' '}
                {service.category}
              </h4>
              <p style={{ margin: '0.5rem 0' }}>₹{service.price}</p>
              <p style={{ margin: '0.5rem 0', color: '#666' }}>⭐ {service.rating}</p>
              <button
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginTop: '0.5rem',
                }}
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>

      <div style={sectionStyle}>
        <h2>Your Active Requests</h2>
        {jobs.length === 0 ? (
          <p style={{ color: '#666', fontStyle: 'italic' }}>
            No active requests. Create one to get started!
          </p>
        ) : (
          <div style={gridStyle}>
            {jobs.map((job) => (
              <div key={job.id} style={cardStyle}>
                <h4 style={{ margin: '0 0 0.5rem' }}>{job.title}</h4>
                <p style={{ margin: '0.5rem 0', color: '#666', fontSize: '0.9rem' }}>
                  {job.description.substring(0, 50)}...
                </p>
                <p style={{ margin: '0.5rem 0', fontWeight: 'bold' }}>₹{job.price}</p>
                <div
                  style={{
                    padding: '0.25rem 0.5rem',
                    backgroundColor: '#d4edda',
                    color: '#155724',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                    marginBottom: '0.5rem',
                  }}
                >
                  {job.status}
                </div>
                <button
                  onClick={() => navigate(`/job/${job.id}`)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
