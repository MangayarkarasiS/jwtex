import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Checking token on app load:', token); // Debug log
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) setUser(decoded);
        else localStorage.removeItem('token');
      } catch {
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setUser(jwtDecode(token));
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // ASP.NET Core JWT stores roles under this claim key
  const getRoles = () => {
    if (!user) return [];
    const roleKey = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
    const roles = user[roleKey] || user.role || [];
    return Array.isArray(roles) ? roles : [roles];
  };

  const hasRole = (role) => getRoles().includes(role);

  return (
    <AuthContext.Provider value={{ user, login, logout, getRoles, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
