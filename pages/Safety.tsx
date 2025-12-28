import React from 'react';
import { TRANSLATIONS } from '../constants';
import { Language } from '../types';

export const Safety: React.FC<{lang: Language}> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="border-b border-amber-500/30 pb-4">
        <h1 className="text-3xl font-bold text-white uppercase tracking-widest">{t.safety.title}</h1>
        <p className="text-amber-500 font-mono text-sm mt-2">DOC_REF: ASW-SAFE-2024-v9</p>
      </div>

      <div className="glass-panel p-8 rounded-lg space-y-6">
        <p className="text-lg text-slate-300">{t.safety.intro}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div>
             <h3 className="text-amber-400 font-bold uppercase mb-3 text-sm border-b border-slate-700 pb-1">01. Personal Protective Equipment (PPE)</h3>
             <p className="text-sm text-slate-400 text-justify">
               Mandatory utilization of Tier-3 PPE kits for all on-site personnel. Strict "No Helmet, No Entry" policy enforced via automated turnstiles. Regular audits conducted weekly.
             </p>
          </div>
          <div>
             <h3 className="text-amber-400 font-bold uppercase mb-3 text-sm border-b border-slate-700 pb-1">02. Environmental Impact</h3>
             <p className="text-sm text-slate-400 text-justify">
               Adherence to DoE (Department of Environment) guidelines. Dust suppression systems deployed in road widening projects. Noise pollution mitigation barriers installed near sensitive zones.
             </p>
          </div>
          <div>
             <h3 className="text-amber-400 font-bold uppercase mb-3 text-sm border-b border-slate-700 pb-1">03. Heavy Machinery Protocols</h3>
             <p className="text-sm text-slate-400 text-justify">
               Operators must possess valid certifications. Pre-shift hydraulic and mechanical inspections logged digitally. 10m exclusion zones maintained during excavation.
             </p>
          </div>
          <div>
             <h3 className="text-amber-400 font-bold uppercase mb-3 text-sm border-b border-slate-700 pb-1">04. Quality Assurance</h3>
             <p className="text-sm text-slate-400 text-justify">
               Materials tested in BUET/certified labs. Concrete slump tests performed on every batch. Steel reinforcement verification via digital calipers before pouring.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};