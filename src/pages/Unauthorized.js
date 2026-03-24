import { useNavigate } from 'react-router-dom';

export default function Unauthorized() {
  const navigate = useNavigate();
  return (
    <div style={{ padding: 32 }}>
      <h2>403 - Unauthorized</h2>
      <p>You do not have permission to access this page.</p>
      <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
    </div>
  );
}
