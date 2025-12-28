import React, { useState, useRef, useEffect } from 'react';
import { generateBotResponse } from '../services/geminiService';
import { ChatMessage, Language } from '../types';

interface ChatbotProps {
  lang: Language;
}

export const Chatbot: React.FC<ChatbotProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [userApiKey, setUserApiKey] = useState('');
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [useMaps, setUseMaps] = useState(false);
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '0', role: 'model', text: lang === 'EN' ? 'Archon Security AI online. How can I assist with project data today?' : 'আর্কন সিকিউরিটি এআই অনলাইন।', timestamp: new Date() }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if (!input.trim() && !selectedImage) return;

    const userMsg: ChatMessage = { 
      id: Date.now().toString(), 
      role: 'user', 
      text: input, 
      image: selectedImage || undefined,
      timestamp: new Date() 
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setSelectedImage(null);
    setIsTyping(true);

    const context = `Current Page: ${window.location.hash}. User Role: GUEST/USER.`;
    
    const responseText = await generateBotResponse(userMsg.text, {
      image: userMsg.image,
      context: context,
      useMaps: useMaps,
      userApiKey: userApiKey || undefined
    });
    
    const botMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: responseText, timestamp: new Date() };
    setMessages(prev => [...prev, botMsg]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans flex flex-col items-end">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[350px] md:w-[400px] h-[550px] glass-panel bg-slate-900/95 backdrop-blur-2xl rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-fade-in-up border border-slate-700/80 ring-1 ring-white/10 origin-bottom-right">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-4 border-b border-slate-700 flex justify-between items-center shadow-lg relative z-10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-500 blur-sm"></div>
              </div>
              <div>
                <span className="font-bold text-sm text-slate-100 tracking-wide block">ARCHON AI</span>
                <span className="text-[10px] text-slate-400 font-mono block">SECURE_LINK_ESTABLISHED</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setShowSettings(!showSettings)} 
                className={`p-1.5 rounded-md transition-all ${showSettings ? 'bg-amber-500 text-white' : 'text-slate-400 hover:text-amber-500 hover:bg-slate-800'}`}
                title="Settings"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </button>
              <button onClick={() => setIsOpen(false)} className="p-1.5 text-slate-400 hover:text-white hover:bg-red-500/20 rounded-md transition-colors">&times;</button>
            </div>
          </div>

          {/* Settings Slide-down */}
          <div className={`bg-slate-900 border-b border-slate-700 transition-all duration-300 ease-in-out overflow-hidden ${showSettings ? 'max-h-40 p-4' : 'max-h-0'}`}>
             <h4 className="text-amber-500 text-[10px] font-bold uppercase tracking-widest mb-3">System Configuration</h4>
             <div className="space-y-3">
               <div>
                 <input 
                   type="password" 
                   value={userApiKey}
                   onChange={(e) => setUserApiKey(e.target.value)}
                   placeholder="Enter Gemini API Key (Optional)"
                   className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1.5 text-xs text-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                 />
               </div>
               <label className="flex items-center gap-2 cursor-pointer group">
                 <div className={`w-3 h-3 rounded-sm border flex items-center justify-center ${useMaps ? 'bg-amber-600 border-amber-600' : 'border-slate-600'}`}>
                   {useMaps && <svg className="w-2 h-2 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                 </div>
                 <input type="checkbox" checked={useMaps} onChange={(e) => setUseMaps(e.target.checked)} className="hidden" />
                 <span className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors">Enable Location Grounding (Maps)</span>
               </label>
             </div>
          </div>

          {/* Messages Area */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-950/30">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-slide-in-right`}>
                <div 
                  className={`
                    max-w-[85%] rounded-2xl p-3.5 text-sm leading-relaxed shadow-sm relative
                    ${msg.role === 'user' 
                      ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white rounded-tr-none' 
                      : 'bg-slate-800 border border-slate-700/50 text-slate-200 rounded-tl-none'}
                  `}
                >
                  {msg.image && (
                    <div className="mb-2 relative group overflow-hidden rounded-lg border border-white/10">
                       <img src={msg.image} alt="Analysis Target" className="w-full h-auto transform transition-transform group-hover:scale-105" />
                    </div>
                  )}
                  {msg.text}
                </div>
                <span className="text-[9px] text-slate-500 mt-1.5 font-mono px-1 opacity-70">
                  {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start gap-2 animate-pulse">
                <div className="bg-slate-800 border border-slate-700/50 rounded-2xl rounded-tl-none p-3 flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-slate-900 border-t border-slate-800">
            {selectedImage && (
              <div className="flex items-center gap-3 mb-3 p-2 bg-slate-800 rounded-lg border border-slate-700 animate-fade-in-up">
                <div className="w-8 h-8 rounded bg-slate-700 overflow-hidden">
                   <img src={selectedImage} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-xs text-slate-300 truncate">Image Attached for Analysis</p>
                </div>
                <button onClick={() => setSelectedImage(null)} className="text-slate-500 hover:text-red-400 p-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            )}
            
            <div className="flex gap-2 items-end">
              <button 
                onClick={() => fileInputRef.current?.click()} 
                className="p-2.5 text-slate-400 hover:text-amber-500 hover:bg-slate-800 rounded-lg transition-all"
                title="Upload Image"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </button>
              <input 
                type="file" 
                ref={fileInputRef}
                className="hidden" 
                accept="image/*"
                onChange={handleImageSelect}
              />
              <div className="flex-grow relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={useMaps ? "Ask location..." : (lang === 'EN' ? "Type query..." : "কিভাবে সাহায্য করতে পারি?")}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2.5 pl-3 pr-10 text-sm text-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none placeholder-slate-600"
                />
              </div>
              <button 
                onClick={handleSend} 
                disabled={!input.trim() && !selectedImage}
                className="p-2.5 bg-amber-600 rounded-xl hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-amber-500/20 text-white"
              >
                <svg className="w-5 h-5 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="group relative w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-white shadow-2xl shadow-amber-500/40 flex items-center justify-center transition-all duration-300 hover:scale-110"
        >
          <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-75 duration-[3s]"></div>
          <svg className="w-7 h-7 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></span>
        </button>
      )}
    </div>
  );
};