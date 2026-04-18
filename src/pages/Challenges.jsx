import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, Activity, ChevronRight, Award, 
  Terminal, ShieldCheck, Cpu, TerminalSquare, CheckCircle2, XCircle, Unlock, Eye,
  Lock, ArrowLeft, Zap, Info, Bug, Server, Database, Code, RefreshCw
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CHALLENGES } from '../data/challengesData';
import { Helmet } from 'react-helmet-async';
import DecryptText from '../components/DecryptText';

// --- ANIMATION COMPONENTS ---

const GlitchEffect = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 1, 0, 1, 0] }}
    transition={{ duration: 0.4 }}
    className="absolute inset-0 z-50 pointer-events-none overflow-hidden"
  >
    <div className="absolute inset-0 bg-blue-500/20 mix-blend-overlay"></div>
    <div className="absolute inset-x-0 top-1/4 h-px bg-white/20 animate-[glitch-line_0.2s_infinite]"></div>
    <div className="absolute inset-x-0 bottom-1/3 h-px bg-violet-400/20 animate-[glitch-line_0.3s_infinite_reverse]"></div>
  </motion.div>
);

const Challenges = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('idle'); // idle, checking, success, error
  const [showHint, setShowHint] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const current = CHALLENGES[currentIdx];

  const handleAnswer = (e) => {
    e.preventDefault();
    if (!input || status === 'checking') return;
    
    setStatus('checking');
    setTimeout(() => {
      if (input.trim().toLowerCase() === current.answer.toLowerCase()) {
        setStatus('success');
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 2000);
      }
    }, 1200);
  };

  const nextChallenge = () => {
    setGlitchActive(true);
    setTimeout(() => {
      if (currentIdx < CHALLENGES.length - 1) {
        setCurrentIdx(prev => prev + 1);
        setInput('');
        setStatus('idle');
        setShowHint(false);
      } else {
        setIsCompleted(true);
      }
      setGlitchActive(false);
    }, 400);
  };

  // Entrance variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050810] selection:bg-blue-500/30 transition-colors duration-500 overflow-hidden relative">
      <Helmet>
        <title>Mission Control | Interactive SOC Challenges | Shahzeb Ali</title>
        <meta name="description" content="Engage in high-fidelity cybersecurity simulations. Test your SOC analyst skills against real-world obfuscation, SQL injection, and exfiltration attempts." />
      </Helmet>

      {/* Cinematic Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-blue-600/[0.03] dark:bg-blue-600/[0.07] rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-violet-600/[0.03] dark:bg-violet-600/[0.07] rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        
        {/* Dynamic Scanning Lines */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.04] to-transparent h-[2px] w-full animate-[scan_8s_linear_infinite]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/[0.02] to-transparent h-[1px] w-full animate-[scan_6s_linear_infinite_reverse]" style={{ animationDelay: '1s' }} />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24"
      >
        
        {/* MISSION HEADER */}
        <header className="mb-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div variants={itemVariants}>
            <Link to="/" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase text-[10px] mb-4 group px-3 py-1 bg-blue-500/5 rounded-full border border-blue-500/10 hover:bg-blue-500/10 transition-all">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Base
            </Link>
            <div className="flex items-center gap-5">
              <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.1)] relative group">
                <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Terminal size={32} className="text-blue-500 relative z-10" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-slate-900 dark:text-white leading-none flex flex-wrap gap-x-4">
                  <span>Mission</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-500">
                    <DecryptText text="Control" />
                  </span>
                </h1>
                <div className="flex items-center gap-3 mt-2">
                  <span className="h-1 w-1 rounded-full bg-blue-500 animate-ping"></span>
                  <p className="text-xs font-mono font-bold tracking-[0.3em] text-slate-400 uppercase">Active Operations Terminal // PORT: 0443</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-6"
          >
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">Operator Level</span>
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-blue-500" />
                <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tighter">Level 1 Analyst</span>
              </div>
            </div>
            <div className="h-12 w-[1px] bg-slate-200 dark:bg-white/10 hidden lg:block"></div>
            <div className="px-8 py-4 rounded-3xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 shadow-2xl flex items-center gap-6 backdrop-blur-md">
               <div className="flex flex-col">
                  <span className="text-[9px] font-mono font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">Mission Progress</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-900 dark:text-white leading-none uppercase">{isCompleted ? CHALLENGES.length : currentIdx}</span>
                    <span className="text-xs font-bold text-slate-500 opacity-50">/ {CHALLENGES.length}</span>
                  </div>
               </div>
               <div className="w-28 h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden border border-slate-200 dark:border-white/5 p-[2px]">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${((isCompleted ? CHALLENGES.length : currentIdx) / CHALLENGES.length) * 100}%` }}
                    className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-violet-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                  />
               </div>
            </div>
          </motion.div>
        </header>

        {/* MISSION TERMINAL GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Terminal Area */}
          <motion.div variants={itemVariants} className="lg:col-span-8 relative">
            <AnimatePresence mode="wait">
              {glitchActive && <GlitchEffect key="glitch" />}
              
              {isCompleted ? (
                <motion.div 
                  key="completed"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white dark:bg-white/[0.02] border border-emerald-500/30 rounded-[3rem] p-16 text-center relative overflow-hidden shadow-2xl backdrop-blur-3xl"
                >
                  <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-emerald-500 rotate-12">
                    <ShieldCheck size={240} />
                  </div>
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.15, 1],
                      boxShadow: ["0 0 20px rgba(16,185,129,0.1)", "0 0 50px rgba(16,185,129,0.3)", "0 0 20px rgba(16,185,129,0.1)"]
                    }} 
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="w-28 h-28 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-10 border border-emerald-500/40 relative z-10"
                  >
                    <Award className="w-14 h-14 text-emerald-400" />
                  </motion.div>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-6 relative z-10 leading-tight">Perimeter Fully <br/> <span className="text-emerald-500"><DecryptText text="Hardened" /></span></h2>
                  <p className="text-slate-500 dark:text-slate-400 mb-12 max-w-lg mx-auto text-lg leading-relaxed relative z-10 font-medium opacity-90">
                    Mission accomplished, Analyst. All sector threats have been neutralized. 
                    System status is nominal. Your performance record has been updated.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(16,185,129,0.4)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setCurrentIdx(0);
                        setIsCompleted(false);
                        setStatus('idle');
                        setInput('');
                      }}
                      className="px-12 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black tracking-widest uppercase text-xs transition-all shadow-xl flex items-center gap-3"
                    >
                      <RefreshCw className="w-4 h-4" /> Restart Protocol
                    </motion.button>
                    <Link to="/" className="px-12 py-5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-2xl font-black tracking-widest uppercase text-xs transition-all hover:bg-white dark:hover:bg-white/10 shadow-lg">
                      Log Out
                    </Link>
                  </div>
                </motion.div>
              ) : status === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  className="bg-white dark:bg-white/[0.02] border border-emerald-500/30 rounded-[3rem] p-16 text-center relative overflow-hidden shadow-[0_0_100px_rgba(16,185,129,0.1)] backdrop-blur-3xl h-[650px] flex flex-col justify-center items-center"
                >
                  <motion.div 
                    animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }} 
                    transition={{ repeat: Infinity, duration: 2.5 }}
                    className="mb-10"
                  >
                    <div className="p-8 rounded-[2rem] bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.1)]">
                      <Unlock size={56} className="text-emerald-400" />
                    </div>
                  </motion.div>
                  <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4"><DecryptText text="Threat Neutralized" /></h2>
                  <p className="text-slate-500 dark:text-slate-400 mb-12 max-w-md mx-auto text-xl font-medium leading-relaxed">{current.successMsg}</p>
                  
                  <div className="flex flex-col items-center gap-8">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="group relative"
                    >
                      <div className="absolute inset-0 bg-emerald-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative inline-flex items-center gap-4 px-8 py-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-500 text-xs font-mono font-black tracking-[0.2em] uppercase">
                        <Zap size={16} className="animate-pulse" /> Badge: {current.badge}
                      </div>
                    </motion.div>
                    
                    <motion.button
                      whileHover={{ x: 10, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={nextChallenge}
                      className="px-16 py-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-xs tracking-[0.3em] uppercase flex items-center gap-4 shadow-[0_20px_40px_rgba(16,185,129,0.25)] group"
                    >
                      {currentIdx < CHALLENGES.length - 1 ? "Next Sector Access" : "Finalize Mission"} <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
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
                  <motion.div 
                    animate={status === 'error' ? { x: [-10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    className={`bg-[#0A0F1C] rounded-[3rem] overflow-hidden border shadow-2xl relative transition-colors duration-500 ${status === 'error' ? 'border-red-500/50 shadow-red-500/10' : 'border-white/10'}`}
                  >
                    {/* CRT SCANLINE OVERLAY */}
                    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-[3rem]">
                      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)50%,rgba(0,0,0,0.25)50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
                    </div>

                    <div className="flex items-center justify-between px-10 py-6 border-b border-white/5 bg-white/[0.03] relative z-20">
                       <div className="flex items-center gap-5">
                          <div className="flex gap-2.5">
                            <div className="w-3.5 h-3.5 rounded-full bg-red-500/20 border border-red-500/40 shadow-[0_0_10px_rgba(239,68,68,0.2)]"></div>
                            <div className="w-3.5 h-3.5 rounded-full bg-amber-500/20 border border-amber-500/40"></div>
                            <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 border border-emerald-500/40"></div>
                          </div>
                          <div className="h-5 w-[1px] bg-white/10 mx-1"></div>
                          <span className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-3">
                            <Activity size={14} className="text-blue-500 animate-pulse" /> Terminal::Node_0{current.id} <span className="text-blue-500/40">[{current.type}]</span>
                          </span>
                       </div>
                       <div className="flex items-center gap-3">
                          <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-mono font-bold text-slate-500">
                            CPU_LOAD: 14.2%
                          </div>
                       </div>
                    </div>

                    <div className="p-12 font-mono space-y-10 relative z-10">
                       <div className="space-y-5">
                         <div className="flex items-center gap-4 text-blue-400 font-bold text-sm">
                           <span className="opacity-40 animate-pulse">{`>>`}</span>
                           <span className="tracking-tight uppercase">System_Entry_Log: <span className="text-white/80">{current.header}</span></span>
                         </div>
                         <div className="flex items-center gap-4 text-violet-400 font-bold text-sm">
                           <span className="opacity-40 animate-pulse">{`>>`}</span>
                           <span className="tracking-tight uppercase">Trace_Status: <span className="text-green-400 font-black animate-pulse">Scanning...</span></span>
                         </div>
                       </div>

                       <div className="relative group">
                          <div className="absolute -inset-4 bg-blue-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                          <div className="relative bg-black/60 border border-white/10 rounded-3xl p-10 font-mono shadow-inner group-hover:border-blue-500/20 transition-all duration-700">
                            <div className="absolute top-5 right-8 flex items-center gap-2">
                               <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></div>
                               <span className="text-[10px] font-black tracking-widest uppercase text-blue-500/40">Telemetry Analysis</span>
                            </div>
                            <div className="text-slate-300 select-all tracking-wider text-sm md:text-lg leading-relaxed break-all whitespace-pre-wrap font-bold bg-clip-text">
                              {current.obfuscatedCode}
                              <span className="inline-block w-2.5 h-6 bg-blue-500/60 ml-2 align-middle animate-[pulse_1s_infinite]"></span>
                            </div>
                          </div>
                       </div>

                       <div className="space-y-5 bg-white/[0.03] p-8 rounded-3xl border border-white/5 relative group">
                          <div className="absolute inset-0 bg-blue-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none"></div>
                          <div className="flex items-center gap-4 relative z-10">
                            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                              <Info size={18} className="text-blue-400" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-[0.3em] text-blue-400/80">Mission Objective</span>
                          </div>
                          <p className="text-slate-200 text-lg md:text-xl font-bold leading-tight relative z-10 tracking-tight">
                            <DecryptText text={current.objective} />
                          </p>
                          
                          <AnimatePresence>
                            {showHint ? (
                              <motion.div 
                                initial={{ opacity: 0, height: 0, scaleY: 0 }} 
                                animate={{ opacity: 1, height: 'auto', scaleY: 1 }} 
                                className="text-sm text-amber-400/90 font-mono mt-6 border-l-2 border-amber-500/40 pl-6 py-3 bg-amber-500/5 rounded-r-2xl origin-top"
                              >
                                <span className="text-xs font-black tracking-widest uppercase text-amber-500/60 mb-2 block">// INTELLIGENCE BRIEFING:</span>
                                {current.hint}
                              </motion.div>
                            ) : (
                              <button 
                                type="button" 
                                onClick={() => setShowHint(true)}
                                className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-blue-400/50 hover:text-blue-300 transition-all mt-6 py-2 border-b border-transparent hover:border-blue-500/30 group/hint"
                              >
                                <Eye size={14} className="group-hover:scale-110 transition-transform" /> Access Intel Ops Briefing
                              </button>
                            )}
                          </AnimatePresence>
                       </div>
                    </div>
                  </motion.div>

                  {/* INPUT AREA */}
                  <form onSubmit={handleAnswer} className="flex flex-col md:flex-row gap-6 relative z-10">
                    <div className="relative flex-grow group">
                      <motion.div 
                        initial={false}
                        animate={status === 'error' ? { backgroundColor: "rgba(239,68,68,0.1)" } : { backgroundColor: "rgba(59,130,246,0.02)" }}
                        className="absolute inset-0 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      ></motion.div>
                      <TerminalSquare className={`absolute left-7 top-1/2 -translate-y-1/2 w-6 h-6 transition-colors duration-300 ${status === 'error' ? 'text-red-500' : 'text-slate-500 group-hover:text-blue-500'} z-20`} />
                      <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Trace telemetry signature..." 
                        className={`w-full bg-white dark:bg-black/40 border transition-all duration-300 rounded-[2rem] py-6 pl-16 pr-8 text-slate-900 dark:text-white font-mono text-base outline-none shadow-2xl relative z-10 ${
                          status === 'error' 
                            ? 'border-red-500/50 ring-4 ring-red-500/10' 
                            : 'border-slate-200 dark:border-white/10 focus:border-blue-500/50 focus:ring-8 focus:ring-blue-500/5'
                        } placeholder:text-slate-500/50 placeholder:font-bold placeholder:tracking-tight`}
                        disabled={status === 'checking'}
                      />
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit" 
                      disabled={status === 'checking' || !input}
                      className={`px-14 py-6 rounded-3xl font-black text-xs tracking-[0.3em] uppercase transition-all duration-500 flex items-center justify-center gap-4 shadow-2xl relative overflow-hidden group/btn ${
                        status === 'checking' 
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 cursor-wait'
                          : status === 'error'
                          ? 'bg-red-500/80 text-white border border-red-400 shadow-[0_0_30px_rgba(239,68,68,0.3)]'
                          : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20'
                      }`}
                    >
                      {status === 'checking' ? (
                        <><RefreshCw className="w-5 h-5 animate-spin" /> Verifying</>
                      ) : status === 'error' ? (
                        <><XCircle className="w-5 h-5" /> REJECTED</>
                      ) : (
                        <><CheckCircle2 className="w-5 h-5" /> Execute Protocol</>
                      )}
                      
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite]"></div>
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-10">
            
            {/* Mission Log Card */}
            <motion.div 
              variants={itemVariants}
              className="bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-[3rem] p-10 shadow-2xl backdrop-blur-3xl relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-blue-500 via-blue-400 to-violet-500"></div>
              <h3 className="text-xs font-mono font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                 <ShieldAlert size={16} className="animate-pulse" /> HUD Status Monitor
              </h3>
              
              <div className="space-y-7">
                {[
                  { label: "Firewall Node 01", status: "Optimal", color: "emerald", icon: Lock, active: true },
                  { label: "DNS Resolution", status: status === 'error' ? "Warning" : "Nominal", color: status === 'error' ? "red" : "blue", icon: Server, active: true },
                  { label: "SIEM Database", status: status === 'checking' ? "Syncing" : "Static", color: "amber", icon: Database, active: status === 'checking' },
                  { label: "Analyzers", status: status === 'checking' ? "RUNNING" : "Ready", color: "blue", icon: Activity, active: status === 'checking' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between group/item">
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-xl bg-${item.color}-500/10 border border-${item.color}-500/20 group-hover/item:scale-110 transition-transform duration-300`}>
                        <item.icon size={16} className={`text-${item.color}-500 ${item.active ? 'animate-pulse' : ''}`} />
                      </div>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight">{item.label}</span>
                    </div>
                    <span className={`text-[10px] font-mono font-black uppercase text-${item.color}-500 flex items-center gap-1.5`}>
                      {item.active && <span className={`h-1.5 w-1.5 rounded-full bg-${item.color}-500 animate-[ping_1.5s_infinite]`}></span>}
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-10 border-t border-slate-100 dark:border-white/5 space-y-5">
                <div className="bg-slate-50 dark:bg-black/40 rounded-2xl p-6 border border-slate-200 dark:border-white/5 relative overflow-hidden">
                   <div className="absolute inset-0 bg-blue-500/[0.02] animate-pulse"></div>
                   <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest mb-3 block relative z-10">// SESSION METADATA:</span>
                   <div className="text-xs font-mono text-slate-600 dark:text-slate-300 leading-relaxed break-all relative z-10">
                     TOKEN: <span className="text-blue-500 font-bold">AES_256_GCM_{Date.now().toString(16).slice(-6).toUpperCase()}</span>
                     <br/>
                     NODE: <span className="text-violet-500 font-bold">SHMEN_NODE_Z9</span>
                   </div>
                </div>
              </div>
            </motion.div>

            {/* Field Manual Card */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-blue-700 to-violet-800 rounded-[3rem] p-10 shadow-3xl text-white relative overflow-hidden group border border-white/10"
            >
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-1000">
                  <Zap size={150} />
               </div>
               <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-[80px] pointer-events-none"></div>
               
               <h3 className="text-2xl font-black uppercase tracking-tighter mb-5 relative z-10 flex items-center gap-3">
                 <Code size={24} /> Field Ops
               </h3>
               <p className="text-base font-semibold opacity-90 leading-relaxed mb-8 relative z-10 tracking-tight">
                 Hardening protocols require elite pattern recognition. Use every HUD diagnostic available to verify the telemetry.
               </p>
               <div className="grid grid-cols-1 gap-4 relative z-10">
                 {[
                   'De-obfuscate B64 strings',
                   'Trace port scan patterns',
                   'Verify malicious logic jumps',
                   'Analyze GTFOBin paths'
                 ].map((tip, i) => (
                   <div key={i} className="flex items-center gap-4 text-[11px] font-bold tracking-widest uppercase backdrop-blur-md bg-white/10 px-5 py-3 rounded-2xl border border-white/10 hover:bg-white/20 transition-all cursor-default">
                     <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white] animate-pulse"></span>
                     {tip}
                   </div>
                 ))}
               </div>
            </motion.div>

          </div>
        </div>

      </motion.div>

      <style jsx="true">{`
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes glitch-line {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default Challenges;
