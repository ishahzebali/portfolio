import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, ArrowLeft, ExternalLink, Download, FileDown, Award, Calendar } from 'lucide-react';
import { certificationsData } from '../data/certificationsData';

const VerifyCert = () => {
  const { id } = useParams();
  const cert = certificationsData.find(c => c.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!cert) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060913] text-slate-800 dark:text-slate-300 font-sans selection:bg-violet-500/30 overflow-hidden relative pb-32">
      <Helmet>
        <title>{`Verify: ${cert.title} | Shahzeb Ali`}</title>
        <meta name="description" content={`Official verification page for ${cert.title} by ${cert.issuer}.`} />
        <meta name="robots" content="noindex" />
      </Helmet>

      {/* Ambient backgrounds */}
      <div className="fixed top-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full bg-violet-900/10 blur-[130px] pointer-events-none z-0 hidden lg:block" />
      <div className="fixed bottom-0 right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-900/10 blur-[120px] pointer-events-none z-0 hidden lg:block" />

      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-32">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-8"
        >
          <Link to="/#projects" className="inline-flex items-center gap-2 text-slate-500 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400 font-bold tracking-widest text-xs uppercase transition-colors">
            <ArrowLeft className="w-4 h-4" /> Return to Portfolio
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white/60 dark:bg-[#0A0F1C]/60 backdrop-blur-3xl border border-slate-200 dark:border-white/[0.08] rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.4)] md:shadow-[0_40px_80px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-500/10 via-blue-500/5 to-transparent rounded-bl-full pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row gap-10 items-start justify-between relative z-10 border-b border-slate-200 dark:border-white/[0.05] pb-10 mb-10">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold tracking-[0.2em] uppercase rounded-full mb-6">
                 <ShieldCheck className="w-3.5 h-3.5" /> Verified Credential
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight mb-4">{cert.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 dark:text-slate-400 font-medium">
                <span className="flex items-center gap-2"><Award className="w-4 h-4 text-violet-500" /> {cert.issuer}</span>
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-slate-400" /> Issued: {cert.date}</span>
                <span className="flex items-center gap-2 text-xs font-mono bg-slate-100 dark:bg-white/[0.05] px-3 py-1 rounded-md border border-slate-200 dark:border-white/[0.08]">ID: {cert.id.toUpperCase().substring(0, 12)}</span>
              </div>
            </div>
            <div className="shrink-0 flex flex-row md:flex-col gap-3 w-full md:w-auto mt-4 md:mt-0">
               <a 
                 href={cert.file} 
                 target="_blank" 
                 rel="noreferrer"
                 className="flex-1 md:flex-none relative overflow-hidden group inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-6 py-3.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
               >
                 <ExternalLink className="w-4 h-4" /> View Original
               </a>
            </div>
          </div>

          <div className="relative z-10 w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-[#03050a]/40 flex items-center justify-center min-h-[300px]">
             {/* If it's heavily visual, we render the image. Even PDFs have been converted to high quality PNG thumbnails. */}
             <img 
               src={cert.image} 
               alt={`${cert.title} Document`}
               className="w-full h-auto max-h-[800px] object-contain rounded-xl relative z-10 shadow-2xl"
               onContextMenu={(e) => e.preventDefault()}
             />
             <div className="absolute top-4 right-4 bg-[#0A0F1C]/80 backdrop-blur-md border border-white/[0.1] px-4 py-2 rounded-full flex items-center gap-2 z-20 shadow-lg text-white text-xs font-medium tracking-wide">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                Secure View Context
             </div>
          </div>
          
        </motion.div>
      </main>
    </div>
  );
};

export default VerifyCert;
