import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield, Activity, ChevronRight, Download } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', path: '/#about' },
    { name: 'Expertise', path: '/#expertise' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/#contact' },
  ];

  const checkActive = (path) => {
    if (path === '/blog') {
      return location.pathname.startsWith('/blog');
    }
    // For hash links, they should only be active if we are on the home page
    if (path.startsWith('/#')) {
      return location.pathname === '/' && location.hash === path.substring(1);
    }
    return location.pathname === path;
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[1000] px-6 transition-all duration-500 ${scrolled ? 'pt-4' : 'pt-8'}`}>
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-6xl relative"
        >
          {/* Main Navbar Container - Floating Glass Island */}
          <div className={`relative flex items-center justify-between px-6 py-4 rounded-3xl transition-all duration-500 ${
            scrolled 
            ? 'bg-[#0B162A]/60 backdrop-blur-3xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)]' 
            : 'bg-[#0B162A]/30 backdrop-blur-xl border border-white/[0.05]'
          }`}>
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group" onClick={closeMenu}>
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative p-2 bg-blue-500/10 rounded-xl border border-blue-500/20 group-hover:border-blue-400/50 transition-all">
                  <Shield size={20} className="text-blue-400" />
                </div>
              </div>
              <span className="text-xl font-black tracking-tighter uppercase sm:text-2xl">
                <span className="text-white">SHAHS</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500">MEN</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                link.path.startsWith('/#') ? (
                  <a
                    key={link.name}
                    href={link.path}
                    className="relative text-sm font-medium tracking-wide text-slate-300 hover:text-white transition-colors group/link"
                  >
                    {link.name}
                    <span className={`absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-300 group-hover/link:w-full ${checkActive(link.path) ? 'w-full' : ''}`}></span>
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="relative text-sm font-medium tracking-wide text-slate-300 hover:text-white transition-colors group/link"
                  >
                    {link.name}
                    <span className={`absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-300 group-hover/link:w-full ${checkActive(link.path) ? 'w-full' : ''}`}></span>
                  </Link>
                )
              ))}
            </div>

            {/* Desktop Action & Mobile Toggle */}
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 mr-2">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </div>
                <span className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase">Secure</span>
              </div>
              
              <a 
                href="/assets/resume/SOC analyst resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-white text-[11px] font-bold uppercase tracking-widest hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all active:scale-95"
              >
                Resume <Download size={14} />
              </a>

              <button 
                onClick={toggleMenu}
                className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-blue-400 md:hidden hover:bg-white/10 transition-colors"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </motion.div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-[900] bg-[#050810]/80 h-screen flex flex-col justify-center items-center"
          >
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]"></div>
              <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-600/10 rounded-full blur-[120px]"></div>
            </div>

            <motion.div 
              className="flex flex-col gap-8 text-center"
              initial="closed"
              animate="open"
              variants={{
                open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
              }}
            >
              {navLinks.map((link) => (
                <motion.div
                  key={link.name}
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: 20 }
                  }}
                >
                  {link.path.startsWith('/#') ? (
                    <a
                      href={link.path}
                      onClick={closeMenu}
                      className={`text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r transition-all uppercase tracking-tighter flex items-center gap-4 justify-center group ${checkActive(link.path) ? 'from-blue-400 to-violet-500' : 'from-white to-white/40 hover:from-blue-400 hover:to-violet-500'}`}
                    >
                      <span className={`text-blue-500 transition-opacity text-2xl font-mono ${checkActive(link.path) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>0{navLinks.indexOf(link) + 1}</span>
                      {link.name}
                      <ChevronRight className={`transition-all group-hover:translate-x-2 text-violet-500 ${checkActive(link.path) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} size={40} />
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      onClick={closeMenu}
                      className={`text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r transition-all uppercase tracking-tighter flex items-center gap-4 justify-center group ${checkActive(link.path) ? 'from-blue-400 to-violet-500' : 'from-white to-white/40 hover:from-blue-400 hover:to-violet-500'}`}
                    >
                      <span className={`text-blue-500 transition-opacity text-2xl font-mono ${checkActive(link.path) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>0{navLinks.indexOf(link) + 1}</span>
                      {link.name}
                      <ChevronRight className={`transition-all group-hover:translate-x-2 text-violet-500 ${checkActive(link.path) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} size={40} />
                    </Link>
                  )}
                </motion.div>
              ))}
              
              <motion.div
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: 20 }
                }}
                className="mt-8"
              >
                <a 
                  href="/assets/resume/SOC analyst resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 px-10 py-5 rounded-3xl bg-white text-[#050810] text-lg font-black uppercase tracking-[0.2em] shadow-2xl active:scale-95"
                >
                  Secure Briefing <Download size={24} />
                </a>
              </motion.div>
            </motion.div>

            {/* Technical Detail Footer in Mobile Menu */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-12 flex flex-col items-center gap-4"
            >
              <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 border border-white/5">
                <Activity size={16} className="text-blue-500 animate-pulse" />
                <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">System Active | Port 443 | SSL Verified</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx="true">{`
        nav {
          contain: layout;
        }
      `}</style>
    </>
  );
};

export default Navbar;
