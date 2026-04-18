import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, ExternalLink, ShieldCheck, ChevronUp, Terminal } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    { name: 'About', href: '/#about' },
    { name: 'Expertise', href: '/#expertise' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/#contact' },
  ];

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/ishahzebali', label: 'LinkedIn' },
    { icon: Github, href: 'https://www.github.com/ishahzebali', label: 'GitHub' },
    { icon: Twitter, href: 'https://www.twitter.com/ishahzebali', label: 'Twitter' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <footer className="footer-v2 relative overflow-hidden bg-[#050810] border-t border-white/[0.05] pt-24 pb-12">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[150px] pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Scanning Line Animation */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent scan-line"></div>

      <motion.div 
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12 mb-20">
          
          {/* Branding Column */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="flex items-center gap-4 group cursor-default">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 shadow-[0_0_25px_rgba(59,130,246,0.15)] group-hover:border-blue-400/40 transition-all duration-300">
                  <ShieldCheck className="w-7 h-7 text-blue-400 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <span className="text-3xl font-black tracking-tighter uppercase sm:text-4xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">SHAHS</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500">MEN</span>
              </span>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-light">
              Architecting secure digital landscapes and neutralizing complex threats. Specializing in <span className="text-blue-300/80 font-medium">SOC Operations</span> and <span className="text-violet-300/80 font-medium">Defensive Resilience</span>.
            </p>

            <div className="group inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-[#0A0F1C]/80 border border-white/[0.08] backdrop-blur-xl shadow-2xl hover:border-emerald-500/30 transition-all duration-500">
              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
              </div>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-emerald-400/90 group-hover:text-emerald-300 transition-colors">
                System: Hardened
              </span>
            </div>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h4 className="text-white text-xs font-black tracking-[0.3em] uppercase flex items-center gap-3">
              <Terminal className="w-4 h-4 text-blue-500" /> Intelligence
            </h4>
            <ul className="space-y-4">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-slate-500 hover:text-blue-400 text-sm transition-all duration-300 flex items-center group/link font-medium"
                  >
                    <span className="w-0 group-hover/link:w-5 h-[1.5px] bg-blue-500 transition-all duration-300 mr-0 group-hover/link:mr-3 rounded-full"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h4 className="text-white text-xs font-black tracking-[0.3em] uppercase flex items-center gap-3">
              <ExternalLink className="w-4 h-4 text-violet-500" /> Connection
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                  <MapPin className="w-4 h-4 text-blue-500" />
                </div>
                <span className="text-slate-400 text-sm leading-tight pt-1">Abu Dhabi, UAE</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                  <Phone className="w-4 h-4 text-blue-500" />
                </div>
                <span className="text-slate-400 text-sm tracking-wide">+971 58 611 2232</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                  <Mail className="w-4 h-4 text-blue-500" />
                </div>
                <a href="mailto:shahzeb@shahsmen.com" className="text-slate-400 hover:text-white text-sm transition-colors pt-0.5">
                  shahzeb@shahsmen.com
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social Presence Column */}
          <motion.div variants={itemVariants} className="space-y-8 lg:pl-4">
            <h4 className="text-white text-xs font-black tracking-[0.3em] uppercase flex items-center gap-3">
              <Linkedin className="w-4 h-4 text-blue-400" /> Presence
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -8, scale: 1.1, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                  whileTap={{ scale: 0.9 }}
                  className="p-4 bg-white/5 border border-white/[0.05] rounded-[1.25rem] text-slate-400 hover:text-blue-400 transition-all duration-300 shadow-xl backdrop-blur-md"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            <div className="pt-2">
              <motion.button 
                onClick={scrollToTop}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group w-full md:w-auto flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-br from-blue-600/10 to-violet-600/10 border border-white/5 text-slate-300 hover:text-white hover:border-blue-500/30 transition-all duration-500 text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-xl shadow-2xl"
              >
                Back to Operations <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          variants={itemVariants}
          className="pt-12 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-8"
        >
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-slate-500 text-[10px] font-mono tracking-[0.4em] uppercase">
              &copy; {currentYear} // <span className="text-white hover:text-blue-400 transition-colors">SHAHZEB ALI</span> // DEFENSIVE_OPS
            </p>
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-8 bg-white/10"></div>
              <span className="text-[9px] font-mono text-slate-700 tracking-widest uppercase">Protocol: SHAHSMEN_SITE_V2</span>
            </div>
          </div>

          <div className="flex items-center gap-10">
            <div className="hidden sm:flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.05]">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
              <span className="text-slate-600 text-[9px] font-mono tracking-widest uppercase">Secure Connection Verified</span>
            </div>
            <p className="text-slate-500 text-[10px] font-mono tracking-[0.2em] uppercase flex items-center gap-3 group">
              <span className="text-blue-500/40 group-hover:text-blue-500 transition-colors">STABLE</span>
              <span className="w-1 h-4 bg-white/5"></span>
              Aesthetic v4.2.0
            </p>
          </div>
        </motion.div>
      </motion.div>

      <style jsx="true">{`
        .footer-v2 {
          contain: paint;
        }
        .scan-line {
          animation: scan 8s linear infinite;
        }
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @media (max-width: 768px) {
          .footer-v2 {
            text-align: center;
          }
          .footer-v2 ul {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .footer-v2 .grid {
            gap: 60px;
          }
          .footer-v2 .flex {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;


