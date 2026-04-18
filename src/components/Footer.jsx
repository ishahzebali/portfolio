import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, ExternalLink, ShieldCheck, ChevronUp } from 'lucide-react';

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

  return (
    <footer className="footer-v2 relative overflow-hidden bg-[#050810] border-t border-white/5 pt-20 pb-10">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Branding Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                <ShieldCheck className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-2xl font-black text-white tracking-widest uppercase">SHAHSMEN</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Defending digital perimeters through advanced threat detection and proactive incident response operations. 
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-[10px] font-bold tracking-[0.2em] uppercase text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Security Status: Hardened
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-widest uppercase text-xs">Intelligence Assets</h4>
            <ul className="space-y-4">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-slate-400 hover:text-blue-400 text-sm transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-4 h-[1px] bg-blue-500 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-widest uppercase text-xs">Communication Nodes</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0" />
                <span className="text-slate-400 text-sm leading-tight">Abu Dhabi, United Arab Emirates</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-blue-500 shrink-0" />
                <span className="text-slate-400 text-sm tracking-wide">+971 58 611 2232</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                <a href="mailto:shahzeb@shahsmen.com" className="text-slate-400 hover:text-white text-sm transition-colors">
                  shahzeb@shahsmen.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social Presence Column */}
          <div className="space-y-6 lg:pl-4">
            <h4 className="text-white font-bold tracking-widest uppercase text-xs">External Channels</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white/5 border border-white/5 rounded-2xl text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/20 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            <div className="pt-4">
              <button 
                onClick={scrollToTop}
                className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300 text-xs font-bold uppercase tracking-widest"
              >
                Back to Ops <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-[11px] font-mono tracking-widest uppercase">
            &copy; {currentYear} SHAHZEB ALI // <span className="text-blue-500/60">SHAHSMEN</span> // All Rights Reserved
          </p>
          <div className="flex items-center gap-8">
            <span className="text-slate-600 text-[10px] font-mono tracking-tighter hidden sm:block">
              ENCRYPTED_HANDSHAKE: SUCCESS
            </span>
            <div className="h-4 w-[1px] bg-white/10 hidden sm:block"></div>
            <p className="text-slate-500 text-[11px] font-mono tracking-widest uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500/50 animate-pulse"></span>
              Aesthetic v4.0.0
            </p>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .footer-v2 {
          contain: paint;
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

