import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Chatbot } from './components/Chatbot';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { Safety } from './pages/Safety';
import { Contact } from './pages/Contact';
import { Dashboard } from './pages/estimate/Dashboard';
import { RateAnalysis } from './pages/estimate/RateAnalysis';
import { Login } from './pages/estimate/Login';
import { ControlCenter } from './pages/admin/ControlCenter';
import { Language, User, UserRole } from './types';

interface ProtectedRouteProps {
  user: User | null;
  children: React.ReactNode;
  roles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ user, children, roles }) => {
  if (!user) {
    return <Navigate to="/estimate/login" replace />;
  }
  if (roles && !roles.includes(user.role)) {
    return <div className="p-20 text-center text-red-500 font-mono">INSUFFICIENT CLEARANCE LEVEL.</div>;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('EN');
  const [user, setUser] = useState<User | null>(null);

  // Check for existing session (simple mock)
  useEffect(() => {
    const role = localStorage.getItem('user_role');
    if (role === 'ADMIN') {
      setUser({ id: 'u1', name: 'Kazi Afnan', role: UserRole.ADMIN, email: 'admin@archon.com' });
    } else if (role === 'ESTIMATOR') {
      setUser({ id: 'u2', name: 'Site Eng.', role: UserRole.ESTIMATOR, email: 'estimator@archon.com' });
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user_role');
  };

  return (
    <Router>
      <Layout lang={lang} setLang={setLang} user={user}>
        <Routes>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="/projects" element={<Projects lang={lang} />} />
          <Route path="/safety" element={<Safety lang={lang} />} />
          <Route path="/contact" element={<Contact lang={lang} />} />
          
          {/* Auth */}
          <Route path="/estimate/login" element={
            user ? <Navigate to="/estimate" replace /> : <Login onLogin={setUser} />
          } />

          {/* Admin */}
          <Route path="/admin" element={
            <ProtectedRoute user={user} roles={[UserRole.ADMIN]}>
              <ControlCenter />
            </ProtectedRoute>
          } />
          
          {/* EstiMate Internal Routes */}
          <Route path="/estimate" element={
            <ProtectedRoute user={user}>
              <Dashboard user={user!} lang={lang} />
            </ProtectedRoute>
          } />
          <Route path="/estimate/rate-analysis" element={
            <ProtectedRoute user={user}>
              <RateAnalysis lang={lang} />
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Chatbot lang={lang} />
      </Layout>
    </Router>
  );
};

export default App;