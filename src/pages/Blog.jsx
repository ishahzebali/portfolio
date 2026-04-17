import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Trophy, Clock, Filter, Eye, ShieldAlert, BookOpen, Activity } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { blogPosts } from '../data/blogData';

const FadeInSection = ({ children, delay = 0, direction = "up" }) => {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 }
  };
  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.7, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', 'bug-bounty', 'cve threat-intel', 'red-team', 'blue-team'];

  // Sorting dynamically by Date in Descending order
  const filteredPosts = useMemo(() => {
    if (!blogPosts) return [];
    
    return [...blogPosts]
      .filter(post => {
        const matchesSearch = post.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === 'all' || post.category?.includes(activeCategory);
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [searchTerm, activeCategory]);

  // Featured post is always the highest date available
  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;

  // The rest of the grid without the featured post 
  // (Only omit featured post if 'all' categories and no search is applied)
  const gridPosts = (activeCategory === 'all' && !searchTerm && featuredPost) 
    ? filteredPosts.slice(1) 
    : filteredPosts;

  return (
    <div className="min-h-screen text-slate-700 dark:text-slate-300 font-sans selection:bg-blue-500/30 pt-20">
      <Helmet>
        <title>Intelligence Briefings | Shahzeb Ali Cybersecurity Blog</title>
        <meta name="description" content="Technical writeups, threat intelligence reports, and cybersecurity research by Shahzeb Ali. Covering SOC operations, bug bounty, and blue team tactics." />
      </Helmet>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* HEADER */}
        <header className="relative pt-12 pb-20 mt-10 flex flex-col items-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[130px] pointer-events-none"
          />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
          
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-300 text-xs font-bold tracking-[0.2em] uppercase mb-8 backdrop-blur-3xl shadow-[0_0_40px_rgba(59,130,246,0.2)] z-10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.1] to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
            <BookOpen className="w-4 h-4 relative z-10" /> <span className="relative z-10">Security Insights & Briefings</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-slate-900 dark:from-white via-slate-500 dark:via-slate-200 to-slate-300 dark:to-slate-400 dark:to-slate-500 mb-8 tracking-tighter z-10 text-center drop-shadow-2xl">
            Threat Intelligence
          </h1>
          
          <div className="relative w-full max-w-3xl mt-6 z-10 group cursor-text">
            <div className="absolute inset-0 bg-blue-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-[2rem]"></div>
            <div className="relative flex items-center">
              <Search className="absolute left-6 w-6 h-6 text-slate-500 group-hover:text-blue-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Search CVEs, Writeups, Tactical Procedures..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/90 dark:bg-[#0A0F1C]/90 backdrop-blur-3xl border border-slate-300 dark:border-white/[0.1] focus:border-blue-500/60 rounded-[2rem] py-5 pl-16 pr-8 text-slate-900 dark:text-white font-medium text-lg outline-none transition-all placeholder:text-slate-600 focus:shadow-[0_0_50px_rgba(59,130,246,0.2)] shadow-inner"
              />
            </div>
          </div>
        </header>

        {/* CATEGORIES */}
        <div className="flex justify-center gap-3 md:gap-4 my-16 flex-wrap relative z-10">
          {categories.map((cat, idx) => (
            <motion.button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-7 py-3 rounded-full text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300 border shadow-lg ${
                activeCategory === cat 
                  ? 'bg-blue-600 text-slate-900 dark:text-white border-blue-400 shadow-[0_0_30px_rgba(37,99,235,0.5)]' 
                  : 'bg-[#0A0F1C]/[0.02] dark:bg-white/[0.03] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/[0.08] hover:border-blue-500/50 hover:bg-[#0A0F1C]/[0.02] dark:bg-white/[0.08] hover:text-slate-900 dark:text-white'
              }`}
            >
              {cat.replace('-', ' ').replace('cve ', 'CVE ')}
            </motion.button>
          ))}
        </div>

        <div className="pb-32 relative z-10">
          <AnimatePresence mode="popLayout">
            
            {/* FEATURED POST */}
            {activeCategory === 'all' && !searchTerm && featuredPost && (
              <FadeInSection key="featured">
                <div className="group relative grid grid-cols-1 lg:grid-cols-5 gap-0 overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#0A0F1C]/80 to-[#0A0F1C]/40 backdrop-blur-3xl border border-slate-200 dark:border-white/[0.08] hover:border-blue-500/40 transition-all duration-1000 mb-20 shadow-[0_20px_60px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_80px_rgba(59,130,246,0.2)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 mix-blend-screen pointer-events-none"></div>
                  
                  <div className="lg:col-span-3 p-12 lg:p-20 flex flex-col justify-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-violet-500/20 text-violet-700 dark:text-violet-300 text-[11px] font-extrabold tracking-[0.2em] uppercase mb-8 border border-violet-500/30 w-fit drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                      <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse"></span> {featuredPost.badge}
                    </div>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-8 leading-[1.1] tracking-tight group-hover:text-blue-100 transition-colors drop-shadow-xl">{featuredPost.title}</h2>
                    <p className="text-slate-700 dark:text-slate-300 text-xl leading-relaxed mb-10 font-light opacity-90">{featuredPost.excerpt}</p>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-auto gap-6 sm:gap-0 border-t border-slate-200 dark:border-white/[0.05] pt-8">
                      <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 font-mono tracking-wider font-semibold">
                        <Clock className="w-5 h-5 text-blue-500" /> {featuredPost.date}
                      </div>
                      <Link to={`/blog/${featuredPost.slug}`} className="flex items-center justify-center gap-3 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-slate-900 dark:text-white font-bold uppercase tracking-widest text-xs transition-all duration-300 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] hover:-translate-y-1">
                        Access Intel Report <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                  
                  <div className="hidden lg:flex lg:col-span-2 items-center justify-center bg-slate-100/50 dark:bg-[#050810]/50 border-l border-slate-200 dark:border-white/[0.05] relative overflow-hidden group/img p-10">
                    <div className="absolute inset-0 bg-gradient-to-bl from-blue-600/30 via-transparent to-violet-600/20 opacity-40 mix-blend-screen group-hover/img:opacity-100 transition-opacity duration-1000"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-blue-500/20 rounded-full animate-[spin_40s_linear_infinite] group-hover/img:border-blue-400/50 transition-colors duration-1000"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-dashed border-violet-500/30 rounded-full animate-[spin_25s_linear_infinite_reverse] group-hover/img:border-violet-400/60 transition-colors duration-1000"></div>
                    
                    <motion.div whileHover={{ scale: 1.15, rotate: 8 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}>
                      <Activity className="w-48 h-48 text-blue-500/80 group-hover/img:text-blue-400 transition-colors duration-700 relative z-10 drop-shadow-[0_0_50px_rgba(59,130,246,0.6)]" />
                    </motion.div>
                  </div>
                </div>
              </FadeInSection>
            )}

            {/* POSTS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {gridPosts.map((post, index) => (
                <FadeInSection key={post.id} delay={index * 100}>
                  <div className="h-full flex flex-col p-10 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-3xl border border-slate-200 dark:border-white/[0.08] hover:border-blue-500/40 transition-all duration-700 group relative overflow-hidden shadow-xl hover:shadow-[0_30px_60px_rgba(59,130,246,0.15)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 blur-[50px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                    
                    <div className="mb-8 flex justify-between items-start relative z-10">
                       <div className="px-4 py-2 rounded-xl bg-white/90 dark:bg-[#0A0F1C]/90 border border-slate-300 dark:border-white/[0.1] text-blue-600 dark:text-blue-300 text-[10px] font-extrabold tracking-[0.2em] uppercase shadow-inner group-hover:border-blue-500/40 transition-colors">
                         {post.badge}
                       </div>
                    </div>
                    
                    <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-6 group-hover:text-blue-700 dark:text-blue-200 transition-colors duration-500 leading-[1.25] tracking-tight relative z-10 drop-shadow-md">{post.title}</h3>
                    <p className="text-slate-700 dark:text-slate-300 text-[1.1rem] leading-relaxed font-light mb-12 flex-grow relative z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-300">{post.excerpt}</p>
                    
                    <div className="mt-auto flex items-center justify-between border-t border-slate-200 dark:border-white/[0.05] pt-6 relative z-10">
                      <span className="text-slate-500 font-mono text-xs tracking-widest font-semibold flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" /> {post.date}
                      </span>
                      <Link to={`/blog/${post.slug}`} className="flex items-center gap-2 text-blue-400 font-bold uppercase tracking-widest text-xs transition-all relative z-10 hover:text-slate-900 dark:text-white group/btn">
                        Detail <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-40 relative z-10 bg-[#0A0F1C]/[0.02] dark:bg-white/[0.01] rounded-[3rem] border border-slate-200 dark:border-white/[0.05] mt-10 backdrop-blur-xl"
              >
                <div className="p-6 bg-red-500/10 rounded-full mb-8">
                  <ShieldAlert className="w-20 h-20 text-red-500/80 drop-shadow-[0_0_20px_rgba(239,68,68,0.4)]" />
                </div>
                <h3 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">No Briefings Found</h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg">Your intelligence parameters did not match any active reports.</p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Blog;
