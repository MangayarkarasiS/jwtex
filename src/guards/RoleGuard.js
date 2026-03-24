import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RoleGuard({ roles }) {
  const { hasRole } = useAuth();

  return roles.some(hasRole)
    ? <Outlet />
    : <Navigate to="/unauthorized" />; //replace  
}
