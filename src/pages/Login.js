import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login as loginApi } from '../services/authService';

export default function Login() {
  const [credentials, setCredentials] = useState({ userName: '', password: '' ,role:''});
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await loginApi(credentials.userName, credentials.password,credentials.role); 
      console.log(data.token);//
      login(data.token); // expects { token: "..." } from ASP.NET Core
      navigate(from, { replace: true });
    } catch {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: '100px auto', padding: 24, border: '1px solid #ddd', borderRadius: 8 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <input
            placeholder="UserName"
            value={credentials.userName}
            onChange={e => setCredentials({ ...credentials, userName  : e.target.value })}
            style={{ width: '100%', padding: 8 }}
            required
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={e => setCredentials({ ...credentials, password: e.target.value })}
            style={{ width: '100%', padding: 8 }}
            required
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <input
            placeholder="Role"
            value={credentials.role}
            onChange={e => setCredentials({ ...credentials, role: e.target.value })}
            style={{ width: '100%', padding: 8 }}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ width: '100%', padding: 10 }}>Login</button>
      </form>
    </div>
  );
}
