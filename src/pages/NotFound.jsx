import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Terminal, Home, ArrowLeft } from 'lucide-react';

const glitchLines = [
  '> INITIALIZING SCAN...',
  '> TARGET: ' + window.location.pathname,
  '> STATUS: ACCESS_DENIED',
  '> THREAT_LEVEL: UNKNOWN_ROUTE',
  '> ERROR_CODE: 0x404',
  '> RECOMMENDATION: RETURN_TO_BASE',
];

const NotFound = () => {
  const navigate = useNavigate();
  const [visibleLines, setVisibleLines] = useState([]);
  const [cursor, setCursor] = useState(true);

  // Type out terminal lines one by one
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < glitchLines.length) {
        setVisibleLines(prev => [...prev, glitchLines[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 380);
    return () => clearInterval(interval);
  }, []);

  // Blinking cursor
  useEffect(() => {
    const blink = setInterval(() => setCursor(c => !c), 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060913] flex items-center justify-center px-6 font-sans relative overflow-hidden">

      {/* Ambient glow */}
      <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl"
      >
        {/* Icon */}
        <div className="flex justify-center mb-10">
          <motion.div
            animate={{ rotate: [0, 6, -6, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 3 }}
            className="p-6 rounded-3xl bg-red-500/10 border border-red-500/20"
          >
            <ShieldAlert className="w-16 h-16 text-red-400 drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]" />
          </motion.div>
        </div>

        {/* 404 Heading */}
        <div className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-[8rem] md:text-[10rem] font-extrabold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-red-400 to-red-700 dark:from-red-300 dark:to-red-600 select-none drop-shadow-2xl"
          >
            404
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl font-bold text-slate-700 dark:text-slate-300 tracking-tight mt-2"
          >
            Unauthorized Route Detected
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="text-slate-500 dark:text-slate-500 mt-3 text-sm"
          >
            The URL you requested doesn't exist in our system.
          </motion.p>
        </div>

        {/* Terminal block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-[#0A0F1C] rounded-2xl border border-white/[0.06] overflow-hidden mb-10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
        >
          {/* Terminal bar */}
          <div className="flex items-center gap-2 px-5 py-3 bg-white/[0.03] border-b border-white/[0.05]">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-amber-400/70" />
            <span className="w-3 h-3 rounded-full bg-emerald-400/70" />
            <span className="ml-3 text-xs text-slate-500 font-mono tracking-widest">soc_investigation.sh — /dev/null</span>
          </div>
          {/* Terminal lines */}
          <div className="p-6 font-mono text-sm space-y-2 min-h-[180px]">
            {visibleLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className={
                  line.includes('ACCESS_DENIED') || line.includes('ERROR_CODE')
                    ? 'text-red-400'
                    : line.includes('RECOMMENDATION')
                    ? 'text-emerald-400'
                    : 'text-slate-400'
                }
              >
                {line}
              </motion.div>
            ))}
            {visibleLines.length < glitchLines.length && (
              <span className="text-slate-400">
                {cursor ? '█' : ' '}
              </span>
            )}
            {visibleLines.length === glitchLines.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-slate-600 mt-2"
              >
                {`> `}<span className={cursor ? 'opacity-100' : 'opacity-0'}>█</span>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold tracking-[0.15em] uppercase text-sm rounded-2xl transition-all duration-300 shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] hover:-translate-y-0.5"
          >
            <Home className="w-4 h-4" /> Return to Base
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-slate-100 dark:bg-white/[0.03] hover:bg-slate-200 dark:hover:bg-white/[0.07] text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-white/[0.1] font-bold tracking-[0.15em] uppercase text-sm rounded-2xl transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
