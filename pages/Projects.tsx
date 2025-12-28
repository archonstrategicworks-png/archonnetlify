import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { Language, User } from '../types';
import { useNavigate } from 'react-router-dom';

interface ProjectsProps {
  lang: Language;
}

export const Projects: React.FC<ProjectsProps> = ({ lang }) => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'Ongoing' | 'Completed' | 'Tender'>('ALL');
  
  const navigate = useNavigate();
  
  // Mock checking authentication status from localStorage
  const isAuthenticated = localStorage.getItem('user_role') !== null; 

  const handleRestrictedAccess = (projectId: string) => {
    if (isAuthenticated) {
      setSelectedProject(projectId);
    } else {
      // Prompt to login
      if (confirm("Restricted Access: Authentication Required. Proceed to Login?")) {
        navigate('/estimate/login');
      }
    }
  };

  const project = PROJECTS.find(p => p.id === selectedProject);

  // Filter and Search Logic
  const filteredProjects = PROJECTS.filter(project => {
    const matchesStatus = statusFilter === 'ALL' || project.status === statusFilter;
    
    // Fuzzy search: Check if all space-separated terms exist in title, location, or description
    const searchTerms = searchQuery.toLowerCase().split(' ').filter(term => term.trim() !== '');
    const matchesSearch = searchTerms.length === 0 || searchTerms.every(term => 
      project.title.toLowerCase().includes(term) ||
      project.location.toLowerCase().includes(term) ||
      project.description.toLowerCase().includes(term)
    );

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8 relative">
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 border-b-4 border-amber-500 pb-4">
         <h1 className="text-3xl font-bold text-slate-800 dark:text-white uppercase tracking-widest pl-2">Active Deployments</h1>
         <div className="text-right hidden md:block">
           <p className="text-amber-600 dark:text-amber-500 font-mono text-xs">SECURE_ARCHIVE_ACCESS</p>
           <p className="text-[10px] text-slate-500">CLASSIFIED INFRASTRUCTURE DATA</p>
         </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="glass-panel bg-white/50 dark:bg-slate-900/60 p-4 rounded-xl flex flex-col md:flex-row gap-4 items-center justify-between border border-slate-200 dark:border-slate-700/50 shadow-lg">
        {/* Search Input */}
        <div className="relative w-full md:w-96 group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-slate-400 group-focus-within:text-amber-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg leading-5 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 sm:text-sm transition-all"
            placeholder="Search projects (e.g. 'Marine Drive')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Status Filters */}
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          {(['ALL', 'Ongoing', 'Completed', 'Tender'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all border whitespace-nowrap ${
                statusFilter === status
                  ? 'bg-amber-600 border-amber-600 text-white shadow-[0_0_10px_rgba(212,175,55,0.4)]'
                  : 'bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-amber-500 hover:text-amber-500'
              }`}
            >
              {status === 'ALL' ? 'All Projects' : status}
            </button>
          ))}
        </div>
      </div>
      
      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in-up">
          {filteredProjects.map((project) => (
            <div key={project.id} className="glass-panel bg-white/50 dark:bg-slate-900/60 rounded-xl overflow-hidden group hover:border-amber-500 transition-all duration-500 shadow-lg flex flex-col h-full">
              <div className="relative h-64 overflow-hidden shrink-0">
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded uppercase shadow-md ${
                  project.status === 'Ongoing' ? 'bg-amber-500 text-black' : 
                  project.status === 'Completed' ? 'bg-emerald-500 text-white' : 
                  'bg-blue-500 text-white'
                }`}>
                  {project.status}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1 group-hover:text-amber-500 transition-colors">{project.title}</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-mono flex items-center gap-2">
                      <span className="text-amber-600 dark:text-amber-500">📍</span> {project.location}
                    </p>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>
                <button 
                  onClick={() => handleRestrictedAccess(project.id)}
                  className="w-full border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 py-3 hover:bg-slate-200 dark:hover:bg-slate-800 uppercase text-xs font-bold tracking-widest transition-colors flex items-center justify-center gap-2 rounded mt-auto"
                >
                  <svg className="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                  Restricted Access: View Technical Specs
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-100/50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 border-dashed">
          <div className="inline-block p-4 rounded-full bg-slate-200 dark:bg-slate-800 mb-4">
             <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-1">No Projects Found</h3>
          <p className="text-sm text-slate-500">Try adjusting your search terms or filters.</p>
          <button 
             onClick={() => {setSearchQuery(''); setStatusFilter('ALL');}}
             className="mt-4 text-amber-600 hover:text-amber-500 text-sm font-bold uppercase tracking-wide hover:underline"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Technical Specs Modal */}
      {selectedProject && project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl bg-slate-900 border border-amber-500/50 rounded-xl shadow-2xl overflow-hidden animate-fade-in-up">
            <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
              <h3 className="text-amber-500 font-bold uppercase tracking-wider flex items-center gap-2">
                <span className="animate-pulse">●</span> CONFIDENTIAL // {project.id.toUpperCase()}
              </h3>
              <button onClick={() => setSelectedProject(null)} className="text-slate-400 hover:text-white">&times;</button>
            </div>
            <div className="p-8 space-y-6">
               <h2 className="text-2xl text-white font-bold">{project.title}</h2>
               <div className="grid grid-cols-2 gap-4 text-sm font-mono text-slate-300">
                 <div className="p-3 bg-slate-950 rounded border border-slate-700">
                   <span className="text-slate-500 block text-xs uppercase mb-1">Budget Code</span>
                   ASW-GOV-2024-X9
                 </div>
                 <div className="p-3 bg-slate-950 rounded border border-slate-700">
                   <span className="text-slate-500 block text-xs uppercase mb-1">Clearance Level</span>
                   LEVEL 4 (DEFENSE)
                 </div>
               </div>
               <div className="text-slate-400 text-sm space-y-2">
                 <p><strong>Load Bearing Capacity:</strong> 75 Tons/sqm (Reinforced)</p>
                 <p><strong>Material Spec:</strong> ASTM A615 Grade 60 Rebar, 5000 PSI Concrete</p>
                 <p><strong>Timeline:</strong> Phase 1 completion due Q3 2025.</p>
                 <p className="italic text-slate-500 mt-4 border-t border-slate-800 pt-2">Note: This document is watermarked with your User ID for leak tracing.</p>
               </div>
               <div className="flex justify-end pt-4">
                 <button onClick={() => window.print()} className="bg-amber-700 hover:bg-amber-600 text-white px-4 py-2 rounded text-xs font-bold uppercase">Print Spec Sheet</button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};