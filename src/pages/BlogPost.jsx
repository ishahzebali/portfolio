import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, ShieldAlert, CheckCircle2, TerminalSquare, Activity, Crosshair } from 'lucide-react';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/blogData';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center font-sans">
        <ShieldAlert className="w-24 h-24 text-red-500/50 mb-8 drop-shadow-[0_0_30px_rgba(239,68,68,0.5)] animate-pulse" />
        <h2 className="text-5xl font-extrabold text-slate-900 dark:text-white mb-8 tracking-tighter">Access Denied</h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg mb-10">The requested intelligence briefing could not be located in the archives.</p>
        <button onClick={() => navigate('/blog')} className="px-10 py-4 bg-blue-600/20 text-blue-600 dark:text-blue-300 border border-blue-500/30 hover:bg-blue-600/40 hover:border-blue-500/50 rounded-full font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:shadow-[0_0_50px_rgba(59,130,246,0.3)]">
          Return to Hub
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-5xl mx-auto px-6 md:px-12 pb-40 font-sans selection:bg-blue-500/30 relative"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none -z-10"></div>
      <motion.div 
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none -z-10"
      ></motion.div>

      <div className="mb-16 pt-10">
        <Link to="/blog" className="inline-flex items-center gap-3 text-blue-400 hover:text-slate-900 dark:text-white font-bold uppercase tracking-[0.25em] text-[11px] transition-all hover:-translate-x-3 group bg-blue-500/10 border border-blue-500/20 px-6 py-2.5 rounded-full backdrop-blur-xl">
          <ArrowLeft className="w-4 h-4 text-blue-500 group-hover:text-slate-900 dark:text-white transition-colors" /> Back to Intelligence Hub
        </Link>
      </div>

      <header className="mb-20 relative">
        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-500 via-violet-500 to-transparent rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
        
        <div className="pl-10 relative z-10">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-xl bg-white/90 dark:bg-[#0A0F1C]/90 border border-slate-300 dark:border-white/[0.1] text-violet-700 dark:text-violet-300 text-[11px] font-extrabold tracking-[0.2em] uppercase mb-8 shadow-inner drop-shadow-xl">
            <Crosshair className="w-4 h-4 text-violet-500" /> {post.badge}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-slate-900 dark:from-white via-slate-500 dark:via-slate-100 to-slate-300 dark:to-slate-400 mb-10 leading-[1.1] tracking-tighter drop-shadow-2xl">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-slate-600 dark:text-slate-400 font-mono text-xs md:text-sm tracking-widest border-b border-slate-200 dark:border-white/[0.08] pb-10">
            <div className="flex items-center gap-3 bg-[#0A0F1C]/[0.02] dark:bg-white/[0.03] px-5 py-2.5 rounded-lg border border-slate-200 dark:border-white/[0.05]">
              <Clock className="w-4 h-4 text-blue-500" /> Date Logged: {post.date}
            </div>
            <div className="flex items-center gap-3 text-emerald-400 bg-emerald-500/10 px-5 py-2.5 rounded-lg border border-emerald-500/20">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
              STATUS: DECLASSIFIED
            </div>
            <div className="flex items-center gap-3 text-slate-500 bg-[#0A0F1C]/[0.02] dark:bg-white/[0.03] px-5 py-2.5 rounded-lg border border-slate-200 dark:border-white/[0.05]">
              <TerminalSquare className="w-4 h-4" /> AUTHOR: SHAHZEB ALI
            </div>
          </div>
        </div>
      </header>

      <div className="blog-content font-sans">
        <div 
          className="bg-gradient-to-br from-[#0A0F1C]/80 to-[#0A0F1C]/40 backdrop-blur-3xl rounded-[3rem] p-10 md:p-20 border border-slate-200 dark:border-white/[0.05] shadow-[0_20px_80px_rgba(0,0,0,0.8)] relative overflow-hidden transition-all duration-700 font-light text-slate-700 dark:text-slate-300 text-lg leading-[1.8]"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </div>

      <div className="mt-24 text-center">
        <button onClick={() => navigate('/blog')} className="px-10 py-5 bg-gradient-to-r from-blue-600/20 to-violet-600/20 hover:from-blue-500/30 hover:to-violet-500/30 text-slate-900 dark:text-white border border-slate-300 dark:border-white/[0.1] hover:border-blue-400/50 rounded-full text-sm font-extrabold tracking-[0.25em] uppercase transition-all duration-500 shadow-[0_0_30px_rgba(37,99,235,0.15)] hover:shadow-[0_0_50px_rgba(139,92,246,0.3)] hover:-translate-y-1 relative overflow-hidden group/btn flex items-center gap-3 mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.2] to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite]"></div>
          <Activity className="w-5 h-5 text-blue-400 group-hover/btn:text-slate-900 dark:text-white transition-colors" />
          <span className="relative z-10">Conclude Briefing</span>
        </button>
      </div>

      {/* Extreme Styling Applied via jsx tags */}
      <style jsx="true">{`
        .blog-content h3 { 
          font-size: 2.2rem; 
          font-weight: 800; 
          color: #ffffff; 
          margin-top: 4.5rem; 
          margin-bottom: 2rem; 
          letter-spacing: -0.03em;
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .blog-content h3::before {
          content: '';
          display: block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #3b82f6;
          box-shadow: 0 0 10px rgba(59,130,246,0.6);
        }
        .blog-content p { 
          margin-bottom: 2rem; 
          font-size: 1.15rem; 
          color: #94a3b8; 
          line-height: 1.8; 
        }
        .blog-content strong { 
          color: #e2e8f0; 
          font-weight: 700; 
        }
        .blog-content code { 
          background: rgba(255,255,255,0.03); 
          padding: 0.3rem 0.6rem; 
          border-radius: 0.5rem; 
          font-family: monospace; 
          color: #a78bfa; 
          font-size: 0.9em; 
          border: 1px solid rgba(255,255,255,0.08); 
        }
        .blog-content pre code { 
          background: transparent; 
          padding: 0; 
          border: none; 
          color: #94a3b8; 
          font-size: 0.95rem;
        }
        .blog-content pre { 
          background: linear-gradient(to bottom right, #050810, #0a0f1c);
          padding: 2.5rem; 
          border-radius: 2rem; 
          border: 1px solid rgba(255,255,255,0.05); 
          overflow-x: auto; 
          font-family: monospace; 
          line-height: 1.7; 
          margin-bottom: 3rem; 
          margin-top: 2rem; 
          box-shadow: inset 0 20px 40px rgba(0,0,0,0.4); 
          position: relative;
        }
        .blog-content pre::before {
          content: 'TERMINAL_OUTPUT';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          padding: 10px 20px;
          background: rgba(255,255,255,0.02);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.25em;
          color: #64748b;
        }
        .blog-content ul { 
          list-style-type: none; 
          margin-bottom: 3rem; 
          margin-left: 0.5rem; 
          margin-top: 2rem;
        }
        .blog-content li { 
          margin-bottom: 1.2rem; 
          position: relative; 
          padding-left: 2.5rem; 
          color: #cbd5e1; 
          font-size: 1.15rem; 
          font-weight: 300; 
        }
        .blog-content li::before { 
          content: "›"; 
          position: absolute; 
          left: 0; 
          color: #3b82f6; 
          font-weight: bold; 
          font-size: 1.8rem; 
          line-height: 1; 
          top: -0.2rem; 
        }
      `}</style>
    </motion.div>
  );
};

export default BlogPost;
