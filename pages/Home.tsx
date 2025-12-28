import React from 'react';
import { Link } from 'react-router-dom';
import { TRANSLATIONS, COMPANY_PROFILE, CORE_COMPETENCIES } from '../constants';
import { Language } from '../types';

interface HomeProps {
  lang: Language;
}

export const Home: React.FC<HomeProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[70vh] rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl group isolate">
        <div className="absolute inset-0 bg-slate-950 z-[-1]">
           {/* Padma Bridge / Bangladesh Infrastructure Image */}
           <img 
            src="https://images.unsplash.com/photo-1629814169728-66774a382d63?q=80&w=2070&auto=format&fit=crop" 
            alt="Bangladesh Construction Site" 
            className="w-full h-full object-cover opacity-60 mix-blend-overlay hover:scale-105 transition-transform duration-[30s]"
          />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent flex flex-col justify-center px-6 md:px-12">
          <div className="max-w-4xl border-l-4 border-amber-500 pl-8 animate-fade-in-up">
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tighter leading-[0.9]">
              {t.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 font-light mb-10 max-w-2xl leading-relaxed tracking-wide">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/projects" className="inline-block bg-amber-600 hover:bg-amber-500 text-white px-10 py-4 rounded-sm font-bold tracking-[0.2em] uppercase text-xs md:text-sm transition-all transform hover:translate-y-[-2px] shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                {t.hero.cta}
              </Link>
              <Link to="/contact" className="inline-block border border-slate-500 hover:border-amber-500 text-slate-300 hover:text-white px-10 py-4 rounded-sm font-bold tracking-[0.2em] uppercase text-xs md:text-sm transition-all backdrop-blur-sm bg-slate-900/30">
                Contact HQ
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Profile Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-1 bg-amber-500 shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
            <h2 className="text-2xl font-bold text-white uppercase tracking-[0.2em]">Corporate Profile</h2>
          </div>
          <div className="glass-panel p-8 rounded-xl border-l-4 border-l-amber-500/50 relative overflow-hidden">
            {/* Subtle background pattern for text area */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full pointer-events-none"></div>
            
            {COMPANY_PROFILE.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-slate-400 leading-relaxed mb-4 text-justify last:mb-0 text-sm md:text-base font-light">
                {paragraph}
              </p>
            ))}
            <div className="mt-8 pt-6 border-t border-slate-700/50">
              <p className="text-amber-500 font-bold text-xs uppercase tracking-widest mb-4">Core Competencies</p>
              <div className="flex flex-wrap gap-2">
                {CORE_COMPETENCIES.map((skill, idx) => (
                  <span key={idx} className="bg-slate-800/80 border border-slate-700 px-3 py-1.5 rounded text-xs text-slate-300 font-mono hover:border-amber-500 hover:text-white transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Capabilities / Visual Grid */}
        <div className="lg:col-span-5 space-y-6">
           <h2 className="text-xl font-bold text-white uppercase tracking-widest text-right mb-6">Operational Standards</h2>
           
           {[
            { icon: '🛡️', title: 'Defense Grade', desc: 'High-control environments requiring security clearance.' },
            { icon: '🇧🇩', title: 'Govt. Procurement', desc: 'Strict adherence to PPA-2006 and PPR-2008 regulatory frameworks.' },
            { icon: '🏗️', title: 'Specialized Works', desc: 'Road widening, drainage rehabilitation, and strategic site development.' }
          ].map((item, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-xl hover:border-amber-500/50 transition-all group flex items-start gap-4 hover:bg-slate-800/50">
              <div className="text-3xl bg-slate-900 border border-slate-700 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-inner">{item.icon}</div>
              <div>
                <h3 className="text-lg font-bold text-slate-100 mb-1 group-hover:text-amber-500 transition-colors">{item.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}

          <div className="p-8 bg-gradient-to-br from-amber-600/10 to-transparent border border-amber-600/30 rounded-xl text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-amber-500/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            <h3 className="text-amber-500 font-bold text-3xl mb-1 relative z-10">2.5M+ Sq. Ft.</h3>
            <p className="text-slate-400 text-xs uppercase tracking-[0.3em] relative z-10">Infrastructure Developed</p>
          </div>
        </div>
      </section>
    </div>
  );
};