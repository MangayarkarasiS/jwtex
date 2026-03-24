import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout, getRoles } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ padding: 32 }}>
      <h2>Dashboard</h2>
      <p>Welcome, <strong>{user?.sub || user?.name || user?.unique_name}</strong></p>
      <p>Roles: <strong>{getRoles().join(', ') || 'None'}</strong></p>
      <button onClick={() => navigate('/admin')} style={{ marginRight: 8 }}>Go to Admin Panel</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
