import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, Activity, ChevronRight, Award, 
  Terminal, ShieldCheck, Cpu, TerminalSquare, CheckCircle2, XCircle, Unlock, Eye,
  Lock, ArrowLeft, Zap, Info, Bug, Server, Database, Code
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CHALLENGES } from '../data/challengesData';
import { Helmet } from 'react-helmet-async';

const Challenges = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('idle');
  const [showHint, setShowHint] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const current = CHALLENGES[currentIdx];

  const handleAnswer = (e) => {
    e.preventDefault();
    if (!input) return;
    
    setStatus('checking');
    setTimeout(() => {
      if (input.trim().toLowerCase() === current.answer.toLowerCase()) {
        setStatus('success');
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 2500);
      }
    }, 1200);
  };

  const nextChallenge = () => {
    if (currentIdx < CHALLENGES.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setInput('');
      setStatus('idle');
      setShowHint(false);
    } else {
      setIsCompleted(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050810] selection:bg-blue-500/30 transition-colors duration-500 overflow-hidden relative">
      <Helmet>
        <title>Mission Control | Interactive SOC Challenges | Shahzeb Ali</title>
        <meta name="description" content="Engage in high-fidelity cybersecurity simulations. Test your SOC analyst skills against real-world obfuscation, SQL injection, and exfiltration attempts." />
      </Helmet>

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-violet-600/5 dark:bg-violet-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        
        {/* Scanning Line Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.03] to-transparent h-[2px] w-full animate-[scan_8s_linear_infinite]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-24">
        
        {/* MISSION HEADER */}
        <header className="mb-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <Link to="/" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase text-[10px] mb-4 group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Base
            </Link>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 shadow-lg shadow-blue-500/5">
                <Terminal size={28} className="text-blue-500" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-slate-900 dark:text-white leading-none">
                  Mission <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-500">Control</span>
                </h1>
                <p className="text-xs font-mono font-bold tracking-[0.3em] text-slate-500 uppercase mt-2">Active Operations Terminal</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-6"
          >
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Operator Status</span>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase">Verified Active</span>
              </div>
            </div>
            <div className="h-12 w-[1px] bg-slate-200 dark:bg-white/10 hidden lg:block"></div>
            <div className="px-6 py-3 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 shadow-xl flex items-center gap-4">
               <div className="flex flex-col">
                  <span className="text-[9px] font-mono font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">Progress</span>
                  <span className="text-lg font-black text-slate-900 dark:text-white leading-none uppercase">{isCompleted ? CHALLENGES.length : currentIdx} / {CHALLENGES.length}</span>
               </div>
               <div className="w-24 h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden border border-slate-200 dark:border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${((isCompleted ? CHALLENGES.length : currentIdx) / CHALLENGES.length) * 100}%` }}
                    className="h-full bg-gradient-to-r from-blue-500 to-violet-500"
                  />
               </div>
            </div>
          </motion.div>
        </header>

        {/* MISSION TERMINAL GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Terminal Area */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {isCompleted ? (
                <motion.div 
                  key="completed"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white dark:bg-white/[0.02] border border-emerald-500/30 rounded-[2.5rem] p-12 text-center relative overflow-hidden shadow-2xl backdrop-blur-3xl"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-[0.05] text-emerald-500">
                    <ShieldCheck size={180} />
                  </div>
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }} 
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-500/40 relative z-10"
                  >
                    <Award className="w-12 h-12 text-emerald-400" />
                  </motion.div>
                  <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4 relative z-10">System Fully Hardened</h2>
                  <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-lg mx-auto text-lg leading-relaxed relative z-10">
                    Congratulations, Analyst. You've successfully mitigated all 8 detected threats. 
                    The perimeter is secured and the SOC dashboard is showing nominal status.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setCurrentIdx(0);
                        setIsCompleted(false);
                        setStatus('idle');
                        setInput('');
                      }}
                      className="px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black tracking-widest uppercase text-xs transition-all shadow-xl"
                    >
                      Restart Mission
                    </motion.button>
                    <Link to="/" className="px-10 py-5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-2xl font-black tracking-widest uppercase text-xs transition-all hover:bg-white dark:hover:bg-white/10 shadow-lg">
                      Return to Base
                    </Link>
                  </div>
                </motion.div>
              ) : status === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  className="bg-white dark:bg-white/[0.02] border border-emerald-500/30 rounded-[2.5rem] p-12 text-center relative overflow-hidden shadow-2xl backdrop-blur-3xl h-[600px] flex flex-col justify-center items-center"
                >
                  <motion.div 
                    animate={{ y: [0, -10, 0] }} 
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="mb-8"
                  >
                    <div className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20">
                      <Unlock size={48} className="text-emerald-400" />
                    </div>
                  </motion.div>
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4">Threat Neutralized</h2>
                  <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-md mx-auto text-lg">{current.successMsg}</p>
                  
                  <div className="flex flex-col items-center gap-6">
                    <div className="group relative">
                      <div className="absolute inset-0 bg-emerald-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative inline-flex items-center gap-3 px-6 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-500 text-xs font-mono font-black tracking-widest uppercase">
                        <Zap size={14} /> Badge Earned: {current.badge}
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ x: 5 }}
                      onClick={nextChallenge}
                      className="px-12 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-xs tracking-[0.2em] uppercase flex items-center gap-3 shadow-[0_15px_30px_rgba(16,185,129,0.2)]"
                    >
                      {currentIdx < CHALLENGES.length - 1 ? "Advance to Next Sector" : "Finalize Protocol"} <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="form" 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }} 
                  className="space-y-8"
                >
                  {/* TERMINAL UI */}
                  <div className="bg-[#0A0F1C] dark:bg-[#0A0F1C] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative">
                    <div className="flex items-center gap-3 px-8 py-5 border-b border-white/5 bg-white/[0.02]">
                       <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/30"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/30"></div>
                      </div>
                      <div className="h-4 w-[1px] bg-white/10 mx-2"></div>
                      <span className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Activity size={12} className="text-blue-500" /> Terminal: Node_0{current.id} // Stage_Log
                      </span>
                    </div>

                    <div className="p-10 font-mono space-y-8">
                       <div className="space-y-4">
                         <div className="flex items-center gap-3 text-blue-400 font-bold text-sm">
                           <span className="opacity-40">{`>>`}</span>
                           <span>{current.type}</span>
                         </div>
                         <div className="flex items-center gap-3 text-violet-400 font-bold text-sm">
                           <span className="opacity-40">{`>>`}</span>
                           <span>EVENT_HEADER: {current.header}</span>
                         </div>
                       </div>

                       <div className="relative group">
                          <div className="absolute inset-0 bg-blue-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                          <div className="relative bg-black/40 border border-white/5 rounded-2xl p-8 font-mono overflow-hidden">
                            <span className="absolute top-4 right-4 text-[9px] font-black tracking-widest uppercase text-slate-700">Analysis Snippet</span>
                            <div className="text-slate-300 select-all tracking-wider text-sm md:text-base leading-relaxed break-all whitespace-pre-wrap">
                              {current.obfuscatedCode}
                            </div>
                          </div>
                       </div>

                       <div className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/5">
                          <div className="flex items-center gap-3">
                            <Info size={16} className="text-blue-400" />
                            <span className="text-xs font-black uppercase tracking-widest text-slate-400">Mission Objective</span>
                          </div>
                          <p className="text-slate-200 text-sm md:text-base leading-relaxed font-medium">
                            {current.objective}
                          </p>
                          
                          <AnimatePresence>
                            {showHint ? (
                              <motion.div 
                                initial={{ opacity: 0, height: 0 }} 
                                animate={{ opacity: 1, height: 'auto' }} 
                                className="text-xs text-amber-400/80 font-mono mt-4 border-l-2 border-amber-500/50 pl-4 py-2 bg-amber-500/5 rounded-r-xl"
                              >
                                {current.hint}
                              </motion.div>
                            ) : (
                              <button 
                                type="button" 
                                onClick={() => setShowHint(true)}
                                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-400/60 hover:text-blue-400 transition-all mt-4 py-2 border-b border-transparent hover:border-blue-400/40"
                              >
                                <Eye size={12} /> Request Intelligence Briefing
                              </button>
                            )}
                          </AnimatePresence>
                       </div>
                    </div>
                  </div>

                  {/* INPUT AREA */}
                  <form onSubmit={handleAnswer} className="flex flex-col md:flex-row gap-6">
                    <div className="relative flex-grow group">
                      <div className="absolute inset-0 bg-blue-500/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <TerminalSquare className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                      <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Analyze telemetry and enter identifying intel..." 
                        className="w-full bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 focus:border-blue-500/40 focus:ring-4 focus:ring-blue-500/5 rounded-2xl py-5 pl-16 pr-6 text-slate-900 dark:text-white font-mono text-sm outline-none transition-all placeholder:text-slate-500 shadow-xl dark:shadow-none"
                        disabled={status === 'checking'}
                      />
                    </div>
                    <motion.button 
                      whileTap={{ scale: 0.95 }}
                      type="submit" 
                      disabled={status === 'checking' || !input}
                      className={`px-12 py-5 rounded-2xl font-black text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl ${
                        status === 'checking' 
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 cursor-wait'
                          : status === 'error'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20 relative overflow-hidden group/btn'
                      }`}
                    >
                      {status === 'checking' ? (
                        <><Activity className="w-5 h-5 animate-spin" /> Analyzing...</>
                      ) : status === 'error' ? (
                        <><motion.div animate={{ x: [-5, 5, -5, 5, 0] }} transition={{ duration: 0.4 }}><XCircle className="w-5 h-5" /></motion.div> Intel Rejected</>
                      ) : (
                        <><CheckCircle2 className="w-5 h-5" /> Submit Intel</>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar / Status Area */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Mission Log / Status Card */}
            <div className="bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 shadow-xl backdrop-blur-3xl">
              <h3 className="text-xs font-mono font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                 <ShieldAlert size={14} /> System Health Monitor
              </h3>
              
              <div className="space-y-6">
                {[
                  { label: "Firewall Integrity", status: "Optimal", color: "emerald", icon: Lock },
                  { label: "DNS Resolution", status: "Nominal", color: "blue", icon: Server },
                  { label: "Threat Database", status: "Syncing", color: "amber", icon: Database },
                  { label: "Protocol Analysis", status: "Active", color: "emerald", icon: Activity }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-${item.color}-500/10 border border-${item.color}-500/20 group-hover:scale-110 transition-transform`}>
                        <item.icon size={14} className={`text-${item.color}-500`} />
                      </div>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{item.label}</span>
                    </div>
                    <span className={`text-[10px] font-mono font-black uppercase text-${item.color}-500`}>{item.status}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/5">
                <div className="bg-slate-50 dark:bg-black/20 rounded-2xl p-5 border border-slate-200 dark:border-white/5">
                  <span className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest mb-3 block">Environmental Variable</span>
                  <div className="text-xs font-mono text-slate-600 dark:text-slate-300 leading-relaxed overflow-hidden text-ellipsis uppercase">
                    Session_Token: <span className="text-blue-500">AES-256-GCM_v2</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Tips Card */}
            <div className="bg-gradient-to-br from-blue-600 to-violet-600 rounded-[2.5rem] p-8 shadow-2xl text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform duration-700">
                  <Zap size={100} />
               </div>
               <h3 className="text-lg font-black uppercase tracking-tighter mb-4 relative z-10">Field Manual</h3>
               <p className="text-sm font-medium opacity-80 leading-relaxed mb-6 relative z-10">
                 Identify signatures and anomalous patterns in the provided telemetry logs to clear the system of hostile activity.
               </p>
               <div className="space-y-3 relative z-10">
                 {['De-obfuscate B64', 'Spot SQL logical errors', 'Trace port hit history', 'Identify over-privilege'].map((tip, i) => (
                   <div key={i} className="flex items-center gap-3 text-[10px] font-bold tracking-widest uppercase opacity-90 backdrop-blur-md bg-white/10 px-3 py-1.5 rounded-lg border border-white/5">
                     <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]"></span>
                     {tip}
                   </div>
                 ))}
               </div>
            </div>

          </div>
        </div>

      </div>

      <style jsx="true">{`
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Challenges;
