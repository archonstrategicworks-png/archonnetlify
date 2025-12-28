import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../../types';
import { ArchonLogo } from '../../components/Logo';

interface LoginProps {
  onLogin: (user: any) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  
  // Signup State
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Admin Credentials
    // Username: Admin OR Email: archonstrategicworks@gmail.com
    // Password: Admin
    if ((identifier === 'Admin' || identifier === 'archonstrategicworks@gmail.com') && password === 'Admin') {
      const user = {
        id: 'u1',
        name: 'Super Admin',
        role: UserRole.ADMIN,
        email: 'archonstrategicworks@gmail.com'
      };
      onLogin(user);
      localStorage.setItem('user_role', 'ADMIN'); 
      navigate('/estimate');
      return;
    } 
    
    // Mock Legacy Estimator
    if (identifier === 'estimator@archon.com' && password === 'user') {
       const user = {
        id: 'u2',
        name: 'Site Engineer',
        role: UserRole.ESTIMATOR,
        email: identifier
      };
      onLogin(user);
      localStorage.setItem('user_role', 'ESTIMATOR');
      navigate('/estimate');
      return;
    }

    setError('Invalid credentials. Access Denied.');
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this sends data to the backend for the Admin to approve.
    setSuccess('Access request sent to Command Center. Pending Admin approval.');
    setSignupName('');
    setSignupEmail('');
    setSignupPassword('');
    setTimeout(() => {
      setIsLogin(true); // Switch back to login after 2 seconds
    }, 2500);
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-md glass-panel bg-white/10 dark:bg-slate-900/80 p-8 rounded-xl border border-slate-700 shadow-2xl backdrop-blur-md">
        <div className="text-center mb-6">
           {/* Logo - Using SVG Component */}
           <div className="relative h-24 w-24 mx-auto mb-4 flex items-center justify-center">
             <ArchonLogo className="w-full h-full" />
           </div>

          <h2 className="text-2xl font-bold text-slate-800 dark:text-white uppercase tracking-widest">EstiMate™ Access</h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 font-mono">AUTHORIZED PERSONNEL ONLY</p>
        </div>

        {/* Auth Toggle */}
        <div className="flex mb-6 border-b border-slate-700/50">
           <button 
             onClick={() => { setIsLogin(true); setError(''); setSuccess(''); }}
             className={`flex-1 py-2 text-sm font-bold uppercase transition-colors ${isLogin ? 'text-amber-500 border-b-2 border-amber-500' : 'text-slate-500 hover:text-slate-300'}`}
           >
             Login
           </button>
           <button 
             onClick={() => { setIsLogin(false); setError(''); setSuccess(''); }}
             className={`flex-1 py-2 text-sm font-bold uppercase transition-colors ${!isLogin ? 'text-amber-500 border-b-2 border-amber-500' : 'text-slate-500 hover:text-slate-300'}`}
           >
             Request Access
           </button>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-500/50 text-red-400 text-xs font-bold p-3 rounded mb-6 text-center animate-pulse">
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div className="bg-green-900/20 border border-green-500/50 text-green-400 text-xs font-bold p-3 rounded mb-6 text-center">
            ✓ {success}
          </div>
        )}

        {isLogin ? (
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-slate-600 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Username or Email</label>
              <input 
                type="text" 
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-950/50 border border-slate-300 dark:border-slate-600 rounded p-2.5 text-slate-800 dark:text-white focus:border-amber-500 outline-none transition-colors text-sm"
                placeholder="Admin or email..."
                required
              />
            </div>
            <div>
              <label className="block text-slate-600 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-950/50 border border-slate-300 dark:border-slate-600 rounded p-2.5 text-slate-800 dark:text-white focus:border-amber-500 outline-none transition-colors text-sm"
                placeholder="••••••••"
                required
              />
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold py-3 rounded uppercase tracking-widest text-xs transition-all transform hover:scale-[1.02] shadow-lg shadow-amber-500/20 mt-2">
              Authenticate
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="space-y-4">
             <div>
              <label className="block text-slate-600 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Full Name</label>
              <input 
                type="text" 
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-950/50 border border-slate-300 dark:border-slate-600 rounded p-2.5 text-slate-800 dark:text-white focus:border-amber-500 outline-none transition-colors text-sm"
                placeholder="Officer Name"
                required
              />
            </div>
            <div>
              <label className="block text-slate-600 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Official Email</label>
              <input 
                type="email" 
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-950/50 border border-slate-300 dark:border-slate-600 rounded p-2.5 text-slate-800 dark:text-white focus:border-amber-500 outline-none transition-colors text-sm"
                placeholder="name@archon.com"
                required
              />
            </div>
             <div>
              <label className="block text-slate-600 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Proposed Password</label>
              <input 
                type="password" 
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-950/50 border border-slate-300 dark:border-slate-600 rounded p-2.5 text-slate-800 dark:text-white focus:border-amber-500 outline-none transition-colors text-sm"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="pt-2">
              <button type="submit" className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded uppercase tracking-widest text-xs transition-all border border-slate-500">
                Submit for Approval
              </button>
              <p className="text-[10px] text-slate-500 text-center mt-2">
                * Approval subject to Admin review via Control Center.
              </p>
            </div>
          </form>
        )}
        
        {isLogin && (
          <div className="mt-6 text-center">
            <a href="#" className="text-[10px] text-slate-500 hover:text-amber-500 transition-colors uppercase tracking-wide">Secure Reset Protocol</a>
          </div>
        )}
      </div>
    </div>
  );
};