import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
  const navigate = useNavigate();
  return (
    <div style={{ padding: 32 }}>
      <h2>Admin Panel</h2>
      <p>Only users with the <strong>Admin</strong> role can see this page.</p>
      <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
    </div>
  );
}
