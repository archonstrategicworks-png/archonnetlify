import React, { useState, useEffect } from 'react';
import { TRANSLATIONS } from '../../constants';
import { Language, RateItem } from '../../types';

export const RateAnalysis: React.FC<{lang: Language}> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  
  // Default Data
  const defaultItems: RateItem[] = [
    { id: '1', description: 'Portland Cement', unit: 'Bag', quantity: 50, unitRate: 520, officialRate: 550, category: 'Material' },
    { id: '2', description: 'Skilled Mason', unit: 'Day', quantity: 5, unitRate: 750, officialRate: 900, category: 'Labor' }
  ];

  const [items, setItems] = useState<RateItem[]>(defaultItems);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'reset'>('idle');

  // Load from LocalStorage on mount to persist warnings/edits
  useEffect(() => {
    const savedData = localStorage.getItem('archon_rate_analysis');
    if (savedData) {
      try {
        setItems(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to load saved rate analysis");
      }
    }
  }, []);

  const saveAnalysis = () => {
    localStorage.setItem('archon_rate_analysis', JSON.stringify(items));
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  const resetAnalysis = () => {
    if (confirm("Reset all rates to default? This will clear your saved analysis.")) {
      localStorage.removeItem('archon_rate_analysis');
      setItems(defaultItems);
      setSaveStatus('reset');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }
  };

  const calculateTotal = (item: RateItem) => item.quantity * item.unitRate;
  
  // Logic: Warn if Unit Rate is < 90% of Official Rate
  // Since we save 'items', and this logic is derived from the item properties, the warning is implicitly persisted.
  const isALR = (item: RateItem) => item.unitRate < (item.officialRate * 0.9);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white uppercase">{t.estimate.rateAnalysis}</h2>
        <div className="flex gap-2">
           <button 
             onClick={resetAnalysis}
             className="px-4 py-2 bg-slate-800 hover:bg-red-900/50 hover:border-red-500/50 text-xs font-bold rounded border border-slate-600 text-slate-300 transition-colors"
           >
             RESET DEFAULTS
           </button>
           <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded border border-slate-600 text-slate-300">IMPORT CSV</button>
           <button 
             onClick={saveAnalysis}
             className={`px-4 py-2 text-white text-xs font-bold rounded transition-colors ${saveStatus === 'saved' ? 'bg-green-600' : 'bg-amber-700 hover:bg-amber-600'}`}
           >
             {saveStatus === 'saved' ? 'SAVED ✓' : (saveStatus === 'reset' ? 'RESET ✓' : 'SAVE ANALYSIS')}
           </button>
        </div>
      </div>

      <div className="glass-panel rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-900 text-slate-400 uppercase font-mono text-xs">
            <tr>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Unit</th>
              <th className="px-6 py-3 text-right">Qty</th>
              <th className="px-6 py-3 text-right">Official Rate</th>
              <th className="px-6 py-3 text-right">Quoted Rate</th>
              <th className="px-6 py-3 text-right">Total</th>
              <th className="px-6 py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-200">{item.description}</td>
                <td className="px-6 py-4 text-slate-400">{item.unit}</td>
                <td className="px-6 py-4 text-right">{item.quantity}</td>
                <td className="px-6 py-4 text-right text-slate-500">{item.officialRate}</td>
                <td className="px-6 py-4 text-right">
                   <input 
                     type="number" 
                     value={item.unitRate}
                     onChange={(e) => {
                       const val = Number(e.target.value);
                       setItems(items.map(i => i.id === item.id ? {...i, unitRate: val} : i));
                     }}
                     className={`w-24 bg-slate-900 border px-2 py-1 rounded text-right focus:outline-none ${isALR(item) ? 'border-red-500 text-red-500 font-bold bg-red-950/20' : 'border-slate-700 text-white'}`}
                   />
                </td>
                <td className="px-6 py-4 text-right font-bold text-amber-500">
                  {calculateTotal(item).toLocaleString()} ৳
                </td>
                <td className="px-6 py-4 text-center">
                  {isALR(item) && (
                    <span className="text-[10px] bg-red-900/50 text-red-400 px-2 py-1 rounded border border-red-500/30 animate-pulse font-bold">
                      ALR ALERT
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-slate-900 font-bold text-slate-200">
             <tr>
               <td colSpan={5} className="px-6 py-4 text-right uppercase">Grand Total</td>
               <td className="px-6 py-4 text-right text-amber-500 text-lg">
                 {items.reduce((acc, curr) => acc + calculateTotal(curr), 0).toLocaleString()} ৳
               </td>
               <td></td>
             </tr>
          </tfoot>
        </table>
      </div>
      
      {/* Alert Explanation */}
      <div className="text-xs text-red-400 font-mono bg-red-950/20 p-4 rounded border border-red-900/50">
        * {t.estimate.alr_warning} (Official -10%). <br/>
        <span className="text-slate-500">Note: Saving analysis will persist these warnings for future sessions.</span>
      </div>
    </div>
  );
};