import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TRANSLATIONS } from '../../constants';
import { Language, User, Task } from '../../types';

interface DashboardProps {
  user: User;
  lang: Language;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, lang }) => {
  const t = TRANSLATIONS[lang];
  const navigate = useNavigate();

  // Task State
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Review Material Requisition #402', status: 'pending', assignedTo: user.id },
    { id: '2', title: 'Approve Steel Vendor Contract', status: 'pending', assignedTo: user.id },
    { id: '3', title: 'Submit Daily Site Report', status: 'completed', assignedTo: user.id },
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const addTask = () => {
    if(!newTaskTitle.trim()) return;
    const task: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      status: 'pending',
      assignedTo: user.id
    };
    setTasks([task, ...tasks]);
    setNewTaskTitle('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: t.status === 'pending' ? 'completed' : 'pending' } : t));
  };

  const modules = [
    { title: t.estimate.rateAnalysis, path: '/estimate/rate-analysis', color: 'bg-blue-600' },
    { title: 'QTO (Quantity Take Off)', path: '/estimate/qto', color: 'bg-emerald-600' },
    { title: 'RA Billing', path: '/estimate/billing', color: 'bg-purple-600' },
    { title: t.estimate.risk, path: '/estimate/risk', color: 'bg-red-600' },
    { title: 'Doc Generator', path: '/estimate/docs', color: 'bg-amber-600' },
    { title: 'Training Games', path: '/estimate/games', color: 'bg-slate-600' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-slate-700 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white uppercase">{t.estimate.title}</h1>
          <p className="text-slate-500 dark:text-slate-400 font-mono text-xs mt-1">OPERATOR: {user.name} | ROLE: {user.role}</p>
        </div>
        <div className="text-right">
             <div className="text-xs text-amber-600 dark:text-amber-500 font-mono animate-pulse">SYSTEM_SECURE</div>
             <div className="text-[10px] text-slate-500">V.3.1.4-BETA</div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {modules.map((mod) => (
          <Link 
            key={mod.path}
            to={mod.path}
            className="group relative h-32 glass-panel bg-white/50 dark:bg-slate-900/60 rounded-lg overflow-hidden hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border-l-4 border-transparent hover:border-amber-500 flex flex-col justify-center items-center text-center p-4 cursor-pointer shadow-md"
          >
            <div className={`absolute top-0 right-0 w-16 h-16 ${mod.color} opacity-10 dark:opacity-20 rounded-bl-full transform translate-x-4 -translate-y-4 group-hover:scale-150 transition-transform duration-500`}></div>
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 z-10">{mod.title}</h3>
            <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-wider font-mono">Launch Module &rarr;</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* My Tasks Section */}
        <div className="glass-panel bg-white/50 dark:bg-slate-900/60 p-6 rounded-lg shadow-lg">
          <h4 className="text-amber-600 dark:text-amber-500 font-bold uppercase text-xs mb-4 flex justify-between items-center">
            My Tasks <span>{tasks.filter(t => t.status === 'pending').length} Pending</span>
          </h4>
          
          <div className="flex gap-2 mb-4">
            <input 
              type="text" 
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Add new task..."
              className="flex-grow bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-sm dark:text-white focus:outline-none focus:border-amber-500"
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
            />
            <button onClick={addTask} className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded text-xs font-bold">+</button>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
            {tasks.map(task => (
              <div key={task.id} className={`flex items-center gap-3 p-2 rounded border transition-all ${task.status === 'completed' ? 'bg-slate-100/50 dark:bg-slate-900/50 border-transparent opacity-50' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}>
                <input 
                  type="checkbox" 
                  checked={task.status === 'completed'} 
                  onChange={() => toggleTask(task.id)}
                  className="accent-amber-500"
                />
                <span className={`text-sm ${task.status === 'completed' ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-200'}`}>{task.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats / Notifications */}
        <div className="glass-panel bg-white/50 dark:bg-slate-900/60 p-6 rounded-lg flex flex-col justify-between shadow-lg">
           <h4 className="text-amber-600 dark:text-amber-500 font-bold uppercase text-xs mb-4">System Notifications</h4>
           <div className="text-sm text-slate-500 dark:text-slate-400">
             <p className="mb-2"> > Database backup completed at 04:00.</p>
             <p className="mb-2"> > New rate schedule imported from LGED.</p>
             <p className="mb-2"> > Server Load: 12% (Nominal)</p>
           </div>
           <button className="mt-4 w-full py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-xs text-slate-700 dark:text-white uppercase font-bold rounded transition-colors">View Audit Log</button>
        </div>
      </div>
    </div>
  );
};