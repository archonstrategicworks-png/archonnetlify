import React, { useState } from 'react';
import { User, VisitorLog, AdminConfig, Notification, EmailLog } from '../../types';

export const ControlCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview'|'users'|'content'|'logs'|'settings'|'notifications'|'email'>('overview');
  
  // Mock Data
  const [config, setConfig] = useState<AdminConfig>({
    allowPublicRegistrations: false,
    maintenanceMode: false,
    knowledgeBaseContext: "Standard safety protocols active. Project Alpha in Phase 2.",
    enableVisitorLogs: true,
    logRetentionDays: 30,
    publicWelcomeMessage: "Infrastructure Built on Integrity",
    showTenderBanner: true
  });

  const [pendingUsers, setPendingUsers] = useState([
      { id: 'p1', name: 'Lt. Dan Taylor', email: 'dan@archon.com', role: 'Estimator', status: 'Pending', date: '2023-10-28' },
      { id: 'p2', name: 'Sarah Connor', email: 'sarah@archon.com', role: 'Viewer', status: 'Pending', date: '2023-10-29' }
  ]);

  const [logs] = useState<VisitorLog[]>([
    { id: '1', hashedIp: 'e10adc3949ba59abbe56e057f20f883e', timestamp: '2023-10-27T10:00:00Z', path: '/' },
    { id: '2', hashedIp: 'c33367701511b4f6020ec61ded352059', timestamp: '2023-10-27T10:05:00Z', path: '/projects' },
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', title: 'Site Inspection Due', body: 'All estimators please verify site A', status: 'sent', sentAt: '2023-10-26' },
    { id: '2', title: 'Tender Opening', body: 'New Marine Drive tender opening on Monday', status: 'draft' }
  ]);

  const [emailLogs] = useState<EmailLog[]>([
    { id: 'e1', recipient: 'client@gov.bd', subject: 'Quote for Tender #99', status: 'sent', timestamp: '2023-10-27 09:00' },
    { id: 'e2', recipient: 'vendor@steel.com', subject: 'RFQ: Rebar', status: 'failed', timestamp: '2023-10-27 09:05' }
  ]);

  const approveUser = (id: string) => {
      setPendingUsers(pendingUsers.map(u => u.id === id ? {...u, status: 'Approved'} : u));
  };

  const rejectUser = (id: string) => {
      setPendingUsers(pendingUsers.filter(u => u.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-slate-700 pb-4">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white uppercase tracking-widest">Archon Control Center</h1>
        <div className="flex gap-2 text-xs font-mono">
          <span className="bg-red-900/50 text-red-400 px-2 py-1 rounded border border-red-500/30">ADMIN ACCESS ONLY</span>
        </div>
      </div>

      <div className="flex gap-4 border-b border-slate-700/50 overflow-x-auto pb-1">
        {['overview', 'users', 'content', 'notifications', 'email', 'logs', 'settings'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 text-sm font-bold uppercase transition-colors whitespace-nowrap ${activeTab === tab ? 'text-amber-500 border-b-2 border-amber-500' : 'text-slate-500 hover:text-slate-300'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="glass-panel bg-white/50 dark:bg-slate-900/60 p-6 rounded-lg min-h-[400px]">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded border border-slate-200 dark:border-slate-700">
               <h3 className="text-amber-600 dark:text-amber-500 font-bold mb-2">System Status</h3>
               <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                 <p>Database: <span className="text-green-500">Connected</span></p>
                 <p>Mail Server (SMTP): <span className="text-green-500">Operational</span></p>
                 <p>Push Service: <span className="text-green-500">Active (VAPID)</span></p>
                 <p>Gemini AI Quota: <span className="text-yellow-500">45% Used</span></p>
               </div>
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded border border-slate-200 dark:border-slate-700">
               <h3 className="text-amber-600 dark:text-amber-500 font-bold mb-2">Pending Actions</h3>
               <div className="space-y-2">
                 <button onClick={() => setActiveTab('users')} className="w-full text-left flex justify-between items-center text-sm text-slate-300 hover:text-amber-500">
                    <span>User Access Requests</span>
                    <span className="bg-red-600 text-white text-[10px] px-2 rounded-full">{pendingUsers.filter(u => u.status === 'Pending').length}</span>
                 </button>
               </div>
            </div>
          </div>
        )}

        {/* USERS TAB (Approvals) */}
        {activeTab === 'users' && (
            <div className="space-y-6">
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 border-b border-slate-700 pb-2">Access Requests (Queue)</h3>
                
                {pendingUsers.length === 0 ? (
                    <p className="text-slate-500 text-sm">No pending requests.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 uppercase font-mono text-xs">
                                <tr>
                                    <th className="px-4 py-2">Date</th>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Email</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-300 dark:divide-slate-700 text-slate-700 dark:text-slate-300">
                                {pendingUsers.map(user => (
                                    <tr key={user.id} className="bg-slate-50 dark:bg-slate-900/50">
                                        <td className="px-4 py-3 font-mono text-xs text-slate-500">{user.date}</td>
                                        <td className="px-4 py-3 font-bold">{user.name}</td>
                                        <td className="px-4 py-3">{user.email}</td>
                                        <td className="px-4 py-3">
                                            <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${user.status === 'Approved' ? 'bg-green-900/30 text-green-500' : 'bg-yellow-900/30 text-yellow-500'}`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            {user.status === 'Pending' && (
                                                <div className="flex gap-2 justify-end">
                                                    <button onClick={() => approveUser(user.id)} className="text-green-500 hover:text-green-400 text-xs font-bold uppercase border border-green-500/50 px-2 py-1 rounded">Approve</button>
                                                    <button onClick={() => rejectUser(user.id)} className="text-red-500 hover:text-red-400 text-xs font-bold uppercase border border-red-500/50 px-2 py-1 rounded">Deny</button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        )}

        {/* NOTIFICATIONS TAB */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded border border-slate-200 dark:border-slate-700">
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">Create Push Notification</h3>
              <div className="grid gap-3">
                <input type="text" placeholder="Title (e.g., Urgent Safety Alert)" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded p-2 text-sm" />
                <textarea placeholder="Message Body" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded p-2 text-sm h-20"></textarea>
                <div className="flex gap-2">
                   <button className="bg-blue-600 text-white px-4 py-2 rounded text-xs font-bold uppercase">Save Draft</button>
                   <button className="bg-amber-600 text-white px-4 py-2 rounded text-xs font-bold uppercase">Send Now</button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">History</h3>
              <div className="space-y-2">
                {notifications.map(n => (
                  <div key={n.id} className="flex justify-between items-center p-3 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                    <div>
                      <p className="font-bold text-sm text-slate-700 dark:text-slate-200">{n.title}</p>
                      <p className="text-xs text-slate-500">{n.body}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded uppercase font-bold ${n.status === 'sent' ? 'bg-green-900/30 text-green-500' : 'bg-yellow-900/30 text-yellow-500'}`}>
                      {n.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* EMAIL TAB */}
        {activeTab === 'email' && (
          <div className="space-y-6">
             <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded border border-slate-200 dark:border-slate-700">
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">SMTP Status</h3>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                 <span>Host: smtp.archonstrategicworks.com</span>
                 <span>Port: 587 (TLS)</span>
                 <button className="text-amber-500 hover:underline">Test Connection</button>
              </div>
             </div>
             
             <div>
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">Transmission Log</h3>
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 uppercase font-mono text-xs">
                    <tr>
                      <th className="px-4 py-2">Time</th>
                      <th className="px-4 py-2">Recipient</th>
                      <th className="px-4 py-2">Subject</th>
                      <th className="px-4 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-300 dark:divide-slate-700 text-slate-700 dark:text-slate-300">
                    {emailLogs.map(log => (
                      <tr key={log.id}>
                        <td className="px-4 py-2 font-mono text-xs">{log.timestamp}</td>
                        <td className="px-4 py-2">{log.recipient}</td>
                        <td className="px-4 py-2">{log.subject}</td>
                        <td className="px-4 py-2">
                          <span className={log.status === 'sent' ? 'text-green-500' : 'text-red-500'}>{log.status.toUpperCase()}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>
        )}

        {activeTab === 'settings' && (
           <div className="space-y-8 max-w-3xl">
             {/* Public Site Configuration */}
             <div className="bg-slate-100 dark:bg-slate-800 p-5 rounded border border-slate-200 dark:border-slate-700">
               <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
                 Public Site Configurations
               </h3>
               <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <label className="text-sm text-slate-600 dark:text-slate-300 font-medium">Enable Visitor Logs</label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={config.enableVisitorLogs} onChange={(e) => setConfig({...config, enableVisitorLogs: e.target.checked})} className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                    </label>
                 </div>
                 
                 <div>
                    <label className="block text-sm text-slate-600 dark:text-slate-300 mb-1">Log Retention Period (Days)</label>
                    <input 
                      type="number" 
                      value={config.logRetentionDays} 
                      onChange={(e) => setConfig({...config, logRetentionDays: Number(e.target.value)})}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded p-2 text-sm"
                    />
                 </div>

                 <div>
                    <label className="block text-sm text-slate-600 dark:text-slate-300 mb-1">Welcome Message (Hero Section)</label>
                    <input 
                      type="text" 
                      value={config.publicWelcomeMessage} 
                      onChange={(e) => setConfig({...config, publicWelcomeMessage: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded p-2 text-sm"
                    />
                 </div>

                 <div className="flex items-center justify-between">
                    <label className="text-sm text-slate-600 dark:text-slate-300 font-medium">Show Tender Banner</label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={config.showTenderBanner} onChange={(e) => setConfig({...config, showTenderBanner: e.target.checked})} className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                    </label>
                 </div>
               </div>
             </div>

             {/* AI Knowledge Base */}
             <div className="bg-slate-100 dark:bg-slate-800 p-5 rounded border border-slate-200 dark:border-slate-700">
               <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">Chatbot Knowledge Base</h3>
               <p className="text-xs text-slate-500 mb-2">Context provided here will be injected into the AI system prompt.</p>
               <textarea 
                 className="w-full h-32 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded p-3 text-sm text-slate-800 dark:text-slate-200 focus:border-amber-500 outline-none font-mono"
                 value={config.knowledgeBaseContext}
                 onChange={(e) => setConfig({...config, knowledgeBaseContext: e.target.value})}
               />
             </div>

             {/* System Config */}
             <div className="bg-slate-100 dark:bg-slate-800 p-5 rounded border border-slate-200 dark:border-slate-700">
               <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">EstiMate™ System</h3>
               <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={config.maintenanceMode} onChange={(e) => setConfig({...config, maintenanceMode: e.target.checked})} className="accent-amber-500" />
                    <span className="text-sm text-slate-600 dark:text-slate-300">Maintenance Mode</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={config.allowPublicRegistrations} onChange={(e) => setConfig({...config, allowPublicRegistrations: e.target.checked})} className="accent-amber-500" />
                    <span className="text-sm text-slate-600 dark:text-slate-300">Allow Registrations</span>
                  </label>
               </div>
             </div>

             <button className="w-full bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded font-bold uppercase text-sm shadow-lg shadow-green-500/20 transition-all">Save All Configurations</button>
           </div>
        )}

        {activeTab === 'logs' && (
          <div className="overflow-x-auto">
            <div className="flex justify-end mb-4">
               <button className="text-xs bg-slate-700 text-white px-3 py-1 rounded">Export CSV</button>
            </div>
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 uppercase font-mono text-xs">
                <tr>
                  <th className="px-4 py-2">Timestamp</th>
                  <th className="px-4 py-2">Hashed IP (Anonymized)</th>
                  <th className="px-4 py-2">Path Accessed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300 dark:divide-slate-700 text-slate-700 dark:text-slate-300">
                {logs.map(log => (
                  <tr key={log.id}>
                    <td className="px-4 py-2 font-mono">{new Date(log.timestamp).toLocaleString()}</td>
                    <td className="px-4 py-2 font-mono text-xs opacity-70">{log.hashedIp}</td>
                    <td className="px-4 py-2">{log.path}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};