import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthGuard from './guards/AuthGuard';
import RoleGuard from './guards/RoleGuard';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import Unauthorized from './pages/Unauthorized';
import { ThemeProvider } from './context/ThemeContext';
import ThemeButton from './pages/ThemeButton';

export default function App() {
  return (
    

    <AuthProvider>
      
       <ThemeProvider>
      <h1>React Context API Example</h1>
      <ThemeButton />
    </ThemeProvider>

      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected: any authenticated user */}
          <Route element={<AuthGuard />}>
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Protected: Admin role only */}
            <Route element={<RoleGuard roles={['Admin']} />}>
              <Route path="/admin" element={<AdminPanel />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
