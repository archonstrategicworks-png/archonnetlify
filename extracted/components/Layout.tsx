import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { COMPANY_INFO, CREDITS, TRANSLATIONS } from '../constants';
import { Language, User } from '../types';
import { ArchonLogo } from './Logo';

interface LayoutProps {
  children: React.ReactNode;
  lang: Language;
  setLang: (l: Language) => void;
  user: User | null;
}

export const Layout: React.FC<LayoutProps> = ({ children, lang, setLang, user }) => {
  const t = TRANSLATIONS[lang];
  const [visitorIp, setVisitorIp] = useState<string>('LOADING...');
  const location = useLocation();
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return localStorage.getItem('theme') as 'dark' | 'light' || 'dark';
  });

  // Notification Permission State
  const [showNotifPrompt, setShowNotifPrompt] = useState(false);

  useEffect(() => {
    // Simulate IP masking for visitor log with cleanup
    const timer = setTimeout(() => {
      const randomIp = `103.${Math.floor(Math.random() * 255)}.XXX.XXX`;
      setVisitorIp(randomIp);
    }, 1500);

    // Check notification permission (Soft Prompt)
    if ('Notification' in window && Notification.permission === 'default') {
      const hasSeenPrompt = localStorage.getItem('notif_prompt_seen');
      if (!hasSeenPrompt) {
        setTimeout(() => setShowNotifPrompt(true), 3000);
      }
    }

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleEnableNotifications = () => {
    if (!('Notification' in window)) {
      alert("This browser does not support desktop notifications");
      return;
    }
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification("Archon Strategic Works", {
          body: "Notifications enabled. You will receive updates on tenders and critical alerts.",
        });
      }
      setShowNotifPrompt(false);
      localStorage.setItem('notif_prompt_seen', 'true');
    });
  };

  // Refined Futuristic Navigation Link Style
  const navLinkClass = `
    relative px-4 py-2 rounded-sm text-sm font-bold uppercase tracking-widest 
    text-slate-600 dark:text-slate-400 
    transition-all duration-300 ease-out transform backface-hidden
    hover:text-amber-500 hover:scale-105 
    hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]
    hover:bg-gradient-to-t hover:from-amber-500/10 hover:to-transparent
    border-b-2 border-transparent hover:border-amber-500
  `;
  
  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-500 relative`}>
      {/* Global Background - Bangladesh Context */}
      <div className="fixed inset-0 z-[-2]">
         <img 
           src="https://images.unsplash.com/photo-1603995878422-99933939615a?q=80&w=1935&auto=format&fit=crop" 
           alt="Bangladesh Infrastructure Background" 
           className="w-full h-full object-cover grayscale opacity-10 dark:opacity-[0.07]"
         />
         <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-slate-950/90' : 'bg-slate-50/90'} mix-blend-overlay`}></div>
      </div>

      {/* Sticky Defense-Grade Nav */}
      <nav className="sticky top-0 z-50 glass-panel border-b border-amber-500/20 shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Logo Area */}
            <Link to="/" className="flex items-center gap-4 group cursor-pointer" aria-label="Archon Strategic Works Home">
               <ArchonLogo className="w-14 h-14 group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.8)] transition-all duration-500" />
               
               <div className="flex flex-col">
                 <h1 className="text-xl font-bold tracking-[0.15em] text-slate-800 dark:text-slate-100 uppercase leading-none group-hover:text-amber-500 transition-colors">ARCHON</h1>
                 <p className="text-[0.6rem] text-amber-600 dark:text-amber-500 tracking-[0.3em] uppercase mb-1">Strategic Works</p>
                 {/* Header Symbol/Badge */}
                 <div className="flex items-center gap-1 bg-gradient-to-r from-amber-500/20 to-transparent px-2 py-0.5 rounded-l border-l-2 border-amber-500 w-max">
                   <span className="text-[10px]" role="img" aria-label="badge">🛡️</span>
                   <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter">1st Class Govt. Contractor</span>
                 </div>
               </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-baseline gap-2">
                <Link to="/" className={navLinkClass}>{t.nav.home}</Link>
                <Link to="/projects" className={navLinkClass}>{t.nav.projects}</Link>
                <Link to="/safety" className={navLinkClass}>{t.nav.safety}</Link>
                <Link to="/contact" className={navLinkClass}>Contact</Link>
                
                {user?.role === 'ADMIN' && (
                  <Link to="/admin" className={navLinkClass + " !text-red-500 hover:!drop-shadow-[0_0_8px_rgba(239,68,68,0.6)] hover:!border-red-500"}>
                     Admin
                  </Link>
                )}

                <Link to="/estimate" className={`ml-4 px-6 py-2 rounded-sm border text-sm font-bold uppercase tracking-wide transition-all duration-300 transform hover:scale-105 shadow-[0_0_10px_rgba(212,175,55,0.1)] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] relative overflow-hidden group ${user ? 'bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400' : 'border-slate-500 hover:border-amber-500 text-slate-500 dark:text-slate-300'}`}>
                  <span className="relative z-10">{user ? 'ACCESS GRANTED' : t.nav.estimate}</span>
                  {/* Button Glint Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0"></div>
                </Link>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3 border-l border-slate-300 dark:border-slate-700 pl-6">
                <button 
                  onClick={() => setLang(lang === 'EN' ? 'BN' : 'EN')}
                  className="w-8 h-8 rounded-full border border-slate-400 dark:border-slate-600 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-amber-500 hover:text-amber-500 hover:shadow-[0_0_10px_rgba(212,175,55,0.4)] transition-all"
                  aria-label="Toggle Language"
                >
                  {lang}
                </button>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:text-amber-500 transition-colors hover:rotate-12 transform"
                  aria-label="Toggle Theme"
                >
                  {theme === 'dark' ? '☀️' : '🌙'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
        {children}
      </main>

      {/* Notification Soft Prompt */}
      {showNotifPrompt && (
        <div className="fixed bottom-24 right-6 max-w-sm glass-panel bg-slate-900/95 border-l-4 border-amber-500 p-5 rounded shadow-2xl z-50 animate-fade-in-up">
          <div className="flex items-start gap-3">
             <div className="text-amber-500 text-xl animate-bounce">🔔</div>
             <div>
               <h4 className="text-white font-bold text-sm uppercase mb-1 tracking-wider">Strategic Alerts</h4>
               <p className="text-slate-400 text-xs mb-3">Initialize push protocol for tender updates and critical site warnings?</p>
               <div className="flex gap-2">
                 <button onClick={handleEnableNotifications} className="bg-amber-600 hover:bg-amber-500 text-white text-xs px-4 py-1.5 rounded-sm font-bold uppercase tracking-wider">Initialize</button>
                 <button onClick={() => setShowNotifPrompt(false)} className="text-slate-500 hover:text-white text-xs px-3 py-1.5 uppercase">Dismiss</button>
               </div>
             </div>
          </div>
        </div>
      )}

      {/* Footer & Visitor Log */}
      <footer className="bg-slate-100/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-300 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-slate-600 dark:text-slate-400">
          <div>
            <h3 className="text-amber-600 dark:text-amber-500 font-bold mb-2 uppercase flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full"></span> Contact HQ
            </h3>
            <p className="font-light">{COMPANY_INFO.address_office}</p>
            <p className="mt-2 font-mono text-xs hover:text-amber-500 transition-colors">
              <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a>
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 border border-slate-700/50 bg-slate-200 dark:bg-slate-950 p-2 rounded w-max">
                 <span className="text-green-500">●</span> 
                 <span>PROTOCOL: MILITARY_GRADE_ENCRYPTION</span>
              </div>
              <a href={COMPANY_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-500 hover:text-amber-500 transition-colors text-xs font-bold uppercase group">
                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                 <span className="group-hover:underline">Follow on LinkedIn</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-amber-600 dark:text-amber-500 font-bold mb-2 uppercase flex items-center gap-2">
               <span className="w-2 h-2 bg-amber-500 rounded-full"></span> Quick Links
            </h3>
            <ul className="space-y-1 font-light">
              <li><Link to="/privacy" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/sitemap" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Sitemap</Link></li>
              <li><Link to="/contact" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Contact Us</Link></li>
              <li className="pt-2"><Link to="/admin" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors text-xs font-bold uppercase">Admin Panel (Backend)</Link></li>
              <li><Link to="/estimate" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors text-xs font-bold uppercase">EstiMate™ Admin</Link></li>
            </ul>
            <h3 className="text-amber-600 dark:text-amber-500 font-bold mb-2 mt-4 uppercase flex items-center gap-2">
               <span className="w-2 h-2 bg-slate-500 rounded-full"></span> System Links
            </h3>
            <ul className="space-y-1 font-light text-xs font-mono">
               <li>
                 <a href="https://archonswt.lovable.app/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                   Project Expense Tracker 
                   <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                 </a>
               </li>
            </ul>
          </div>
          <div className="text-right flex flex-col items-end">
             <p className="mb-2 font-bold uppercase tracking-wider">&copy; {new Date().getFullYear()} Archon</p>
             <p className="text-[10px] text-slate-500 mb-2 max-w-[200px] leading-tight">
               {CREDITS.text}
             </p>
             <div className="inline-flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-full border border-slate-700 mt-2">
               <span className="text-[10px]">🇧🇩</span>
               <span className="text-[9px] text-amber-500 font-bold tracking-widest uppercase">Certified Class-1 Contractor</span>
             </div>
          </div>
        </div>
        
        {/* Terminal Bar */}
        <div className="bg-slate-200 dark:bg-black py-1 px-4 border-t border-slate-300 dark:border-slate-800 font-mono text-[10px] text-green-700 dark:text-green-500 flex justify-between items-center opacity-90">
          <div className="flex gap-4">
             <span className="hidden sm:inline">root@archon:~$ system_status --check</span>
             <span className="text-amber-600 dark:text-amber-500 animate-pulse">● SECURE_CONNECTION</span>
          </div>
          <div className="flex gap-4">
            <span className="hidden sm:inline">LATENCY: 24ms</span>
            <span>VISITOR_ID: [{visitorIp}]</span>
          </div>
        </div>
      </footer>
    </div>
  );
};