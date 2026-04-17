import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';
import { Helmet } from 'react-helmet-async';
import { 
  ShieldAlert, Terminal, Briefcase, GraduationCap, Award, 
  MapPin, Mail, Phone, ExternalLink, Linkedin, ChevronRight, 
  Activity, Lock, Crosshair, Server, Database, Code, ShieldCheck,
  Bug, Eye, ArrowUpRight, Shield, Cpu, TerminalSquare, Key, Unlock, CheckCircle2, XCircle,
  Sun, Moon, Menu, X, FileDown
} from 'lucide-react';

// --- DATA ---
const RESUME_DATA = {
  personal: {
    name: "Shahzeb Ali",
    image: "/assets/images/profile.jpg", 
    titles: ["SOC Analyst (Level 1)", "Cybersecurity Analyst", "Purple Team Specialist"],
    location: "Abu Dhabi, UAE",
    phone: "+971 58 611 2232",
    email: "shahzeb@shahsmen.com",
    linkedin: "linkedin.com/in/ishahzebali",
    website: "shahsmen.com",
    details: "Nationality: Pakistani | Visa: UAE Family-Sponsored Residence Visa | Languages: English (Fluent), Urdu (Native)"
  },
  summary: "Results-driven SOC Analyst with over 2 years of hands-on incident response experience across healthcare and technology environments. Specialises in SIEM-based threat detection, log correlation, and full-lifecycle incident management. Holds a unique purple team advantage - using penetration testing knowledge to sharpen defensive detection logic and reduce false-positive rates. Recognised on YesWeHack for responsibly disclosing a critical Broken Access Control vulnerability in Deezer, resulting in a global patch. Proficient in Splunk, Microsoft Sentinel, ELK Stack, Wireshark, and Sysmon; deeply versed in MITRE ATT&CK, the Cyber Kill Chain, and ISO/IEC 27001.",
  skills: [
    { category: "SIEM & Monitoring", icon: Activity, items: ["Splunk", "Microsoft Sentinel", "ELK Stack", "Azure Cloud Defender", "Snort", "Sysmon", "EDR/XDR", "SOAR"] },
    { category: "Incident Response", icon: ShieldAlert, items: ["Alert Triage", "IOC Extraction", "Escalation", "Root Cause Analysis", "Phishing Analysis", "Post-Incident Reporting"] },
    { category: "Log Analysis", icon: Database, items: ["Windows Event Logs", "Linux Syslog", "Firewall Logs", "IDS/IPS Alerts", "Azure AD Sign-in Logs", "Web Activity Logs"] },
    { category: "Threat Intelligence", icon: Eye, items: ["MITRE ATT&CK", "Cyber Kill Chain", "Pyramid of Pain", "Diamond Model", "TTP Mapping", "Vulnerability Tracking"] },
    { category: "Offensive Security", icon: Bug, items: ["Burp Suite", "Nmap", "Metasploit", "Hydra", "Gobuster", "OWASP Top 10", "API Security Testing", "Responsible Disclosure"] },
    { category: "Network & Protocols", icon: Server, items: ["Wireshark", "TCP/IP", "DNS", "HTTP/S", "OSI Model", "Packet Analysis", "DNS Tunnelling Detection"] },
    { category: "Systems & Scripting", icon: Code, items: ["Windows Internals", "Linux CLI", "Active Directory", "PowerShell", "Python", "Bash", "Privilege Escalation Analysis"] },
    { category: "Frameworks & GRC", icon: ShieldCheck, items: ["ISO/IEC 27001", "NIST CSF", "CIS Controls", "RBAC", "Security Awareness"] }
  ],
  experience: [
    {
      title: "SOC Analyst L1",
      company: "CureMD | Lahore, Pakistan",
      date: "Dec 2022 - Jul 2024",
      points: [
        "Monitored and triaged 150+ daily security alerts across Microsoft Sentinel, EDR, and Azure Cloud Defender, sustaining a false-positive rate below 12%.",
        "Investigated phishing campaigns, credential-based intrusions, and lateral movement activity; escalated actionable cases with an average MTTE of 25 minutes.",
        "Deployed Sysmon across critical healthcare endpoints and authored custom detection rules that surfaced LotL tactics, reducing attacker dwell time by 30%.",
        "Correlated logs against MITRE ATT&CK techniques, producing structured threat intelligence reports.",
        "Contributed to HIPAA compliance audit renewal by collaborating with DevSecOps to harden cloud infrastructure.",
        "Designed and ran bi-monthly phishing simulation campaigns, achieving a 40% reduction in click-through rates."
      ]
    },
    {
      title: "SOC Analyst L1 (Internship)",
      company: "Arwen Tech | Lahore, Pakistan",
      date: "Feb 2022 - Aug 2022",
      points: [
        "Triaged 100+ daily security events from SIEM, IDS/IPS, and perimeter firewalls; implemented a severity classification framework reducing escalation time by 20%.",
        "Distinguished true positives from false positives through structured initial analysis, reducing duplicated investigation effort.",
        "Correlated firewall and endpoint logs in Splunk against MITRE ATT&CK TTPs, identifying and containing multiple IOCs.",
        "Proposed three detection rule optimisations during post-incident reviews, all adopted into the SOC playbook."
      ]
    },
    {
      title: "Independent Security Researcher",
      company: "YesWeHack Bug Bounty Platform",
      date: "Aug 2025 - Aug 2025",
      points: [
        "Discovered a critical Insecure Direct Object Reference (IDOR) / Broken Access Control vulnerability in Deezer's production API.",
        "Authored a comprehensive Proof of Concept (PoC) mapped to OWASP Top 10 (A01:2021), enabling a global security patch.",
        "Applied systematic API endpoint behavioural analysis using Burp Suite."
      ],
      isHighlight: true
    }
  ],
  projects: [
    {
      title: "Advanced SIEM Integration & Threat Correlation Lab",
      org: "Personal Initiative",
      date: "Jan 2026",
      points: [
        "Architected a custom Elasticsearch, Logstash, and Kibana (ELK) stack deployed via Docker, seamlessly ingesting Windows Event Logs and Sysmon telemetry.",
        "Engineered real-time SIEM dashboards to monitor anomalous network activity, privilege escalation, and lateral movement.",
        "Mapped custom alerts to MITRE ATT&CK, successfully surfacing active brute-force attempts during simulated breach events."
      ]
    },
    {
      title: "Active Directory Red/Blue Tactics & Mitigation",
      org: "Home Network",
      date: "Jan 2026",
      points: [
        "Constructed a vulnerable Active Directory domain environment to emulate advanced post-exploitation threats and misconfigurations.",
        "Executed offensive AD attacks including Kerberoasting, AS-REP Roasting, and Pass-the-Hash utilizing Mimikatz and Impacket.",
        "Utilized Splunk to ingest Domain Controller logs and authored custom alert logic capable of detecting ticket anomalies and golden ticket creation with 99% accuracy."
      ]
    },
    {
      title: "Enterprise Phishing & Data Exfiltration Investigation",
      org: "TryHackMe",
      date: "Dec 2025",
      points: [
        "Reconstructed the Cyber Kill Chain from phishing access through DNS tunnelling across a compromised enterprise endpoint.",
        "Decoded obfuscated Base64 payloads and reverse-engineered malicious PowerShell execution chains.",
        "Leveraged Sysmon forensics to identify Living off the Land (LotL) techniques and accurately mapped all attacker TTPs."
      ]
    },
    {
      title: "Vulnerability Scanning Automation & Remediation",
      org: "Personal Lab",
      date: "Nov 2025",
      points: [
        "Developed custom Bash and Python scripts to automate continuous Nmap and vulnerability scanning pipelines.",
        "Integrated CVE threat feeds to prioritize the remediation of high-CVSS vulnerabilities across target Linux servers.",
        "Implemented secure baseline configurations (CIS benchmarks) mitigating over 85% of identified systemic vulnerabilities."
      ]
    },
    {
      title: "Mastercard Cybersecurity Virtual Experience",
      org: "Forage",
      date: "Dec 2025",
      points: [
        "Identified active phishing campaigns and performed risk exposure assessments across departmental boundaries.",
        "Designed and proposed targeted security awareness training programs for high-risk business units."
      ]
    }
  ],
  certifications: [
    "Certified SOC Analyst L1 - TryHackMe",
    "Jr Penetration Tester - TryHackMe",
    "Fortinet Certified Associate in Cybersecurity (FCA) - Fortinet",
    "ISO/IEC 27001 Information Security Associate - Skill Front",
    "CyberSecurity 101 - TryHackMe",
    "Linux 100: Fundamentals - TCM Security"
  ],
  education: {
    degree: "Bachelor of Science in Computer Science",
    institution: "Lahore Garrison University | Lahore, Pakistan",
    date: "2020 - 2025"
  }
};

// --- STATIC COMPONENTS (Wobble Removed) ---

const TiltCard = ({ children, className }) => {
  return (
    <motion.div className={`relative ${className}`}>
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};

const MagneticButton = ({ children, className, href }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouse = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.3); 
    y.set(middleY * 0.3);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x, y }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.a>
  );
};

const MouseSpotlight = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const updateMousePosition = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);
  
  return (
    <div 
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden lg:block"
      style={{ background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(29,78,216,0.06), transparent 80%)` }}
    />
  );
};

const FadeInSection = ({ children, delay = 0, direction = "up" }) => {
  const directions = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "150px" }}
      transition={{ duration: 0.5, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

// --- HOMEPAGE SPECIFIC COMPONENTS ---

const InteractiveTerminal = () => {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('idle');
  const [showHint, setShowHint] = useState(false);
  
  const obfuscatedCmd = "SUVYIChOZXctT2JqZWN0IE5ldC5XZWJDbGllbnQpLkRvd25sb2FkU3RyaW5nKCdodHRwOi8vMTcyLjE2LjEwLjUwL2JhY2tkb29yLnBzMScp"; 

  const handleDecrypt = (e) => {
    e.preventDefault();
    if (!input) return;
    
    setStatus('checking');
    setTimeout(() => {
      if (input.trim() === "172.16.10.50") {
        setStatus('success');
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 2500);
      }
    }, 1200);
  };

  return (
    <TiltCard>
      <div 
        className="bg-slate-100/80 dark:bg-[#050810]/80 backdrop-blur-2xl border border-red-500/10 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] hover:shadow-[0_0_60px_rgba(239,68,68,0.15)] relative overflow-hidden group transition-all duration-700 h-full w-full"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-red-500/20 transition-all duration-700"></div>
        
        <div className="flex items-center gap-4 mb-8 relative z-10">
          <motion.div 
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 5 }}
            className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl"
          >
            <ShieldAlert className="w-6 h-6 text-red-400" />
          </motion.div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">SOC Scenario: Suspicious Spawn</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">An endpoint triggered an EDR alert for an obfuscated PowerShell execution.</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 text-center relative z-10"
            >
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                <Unlock className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              </motion.div>
              <h4 className="text-2xl font-bold text-emerald-700 dark:text-emerald-300 mb-2">Threat Neutralized</h4>
              <p className="text-emerald-400/80 mb-6">Excellent de-obfuscation. The staging server IP has been blacklisted on the perimeter.</p>
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 rounded-lg border border-emerald-500/30 text-emerald-200 text-sm font-mono"
              >
                Badge: MALWARE_ANALYST_AWARDED
              </motion.div>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6 relative z-10">
              <div className="bg-white dark:bg-[#0A0F1C] border border-slate-200 dark:border-white/[0.05] rounded-xl p-5 font-mono text-sm text-slate-700 dark:text-slate-300 shadow-inner">
                <div className="text-red-400 mb-3 flex items-center gap-2"><Activity className="w-4 h-4"/> [SYSMON EVENT ID: 1 - PROCESS CREATION]</div>
                <div className="text-slate-500 mb-4 whitespace-nowrap overflow-hidden text-ellipsis">
                  <span className="text-blue-400/80">ParentImage:</span> C:\Windows\System32\cmd.exe<br/>
                  <span className="text-blue-400/80">Image:</span> C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe<br/>
                  <span className="text-blue-400/80">CommandLine:</span> powershell.exe -NoP -NonI -W Hidden -Enc
                </div>
                
                <div className="flex flex-col gap-2 bg-[#0A0F1C]/[0.02] dark:bg-white/[0.02] p-4 rounded-lg border border-slate-200 dark:border-white/[0.05] overflow-x-auto">
                  <span className="text-slate-500 text-xs">Encoded Payload Segment:</span>
                  <span className="text-violet-400 font-bold select-all tracking-wider text-xs md:text-sm">{obfuscatedCmd}</span>
                </div>
                
                <div className="text-slate-700 dark:text-slate-300 mt-5 font-bold flex flex-col gap-3">
                  <div>Objective: <span className="font-normal opacity-80">De-obfuscate the payload and identify the external C2 IP Address acting as the staging server.</span></div>
                  
                  {showHint ? (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-xs text-amber-400 font-mono mt-1 border-l-2 border-amber-500/50 pl-3 py-1 overflow-hidden">
                      [System Hint]: The '-Enc' flag indicates Base64. Try using CyberChef or 'echo [payload] | base64 -d' to decode the text and extract the IP!
                    </motion.div>
                  ) : (
                    <button 
                      type="button" 
                      onClick={() => setShowHint(true)}
                      className="text-[11px] text-slate-500 hover:text-slate-700 dark:text-slate-300 w-fit font-normal underline underline-offset-4 decoration-white/[0.1] hover:decoration-white/[0.5] transition-all flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" /> Request Intel Hint
                    </button>
                  )}
                </div>
              </div>

              <form onSubmit={handleDecrypt} className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Crosshair className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter the extracted Malicious IP (e.g. x.x.x.x)..." 
                    className="w-full bg-[#0A0F1C]/[0.02] dark:bg-white/[0.03] border border-slate-300 dark:border-white/[0.1] focus:border-red-500/50 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 dark:text-white font-mono text-sm outline-none transition-all placeholder:text-slate-600 focus:bg-[#0A0F1C]/[0.02] dark:bg-white/[0.05] shadow-inner"
                    disabled={status === 'checking'}
                  />
                </div>
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  type="submit" 
                  disabled={status === 'checking' || !input}
                  className={`px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
                    status === 'checking' 
                      ? 'bg-blue-500/20 text-blue-600 dark:text-blue-300 border border-blue-500/30 cursor-wait'
                      : status === 'error'
                      ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                      : 'bg-red-600 hover:bg-red-500 text-slate-900 dark:text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(239,68,68,0.6)] relative overflow-hidden group/btn'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.2] to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>
                  {status === 'checking' ? (
                    <><Activity className="w-4 h-4 animate-spin" /> Analyzing...</>
                  ) : status === 'error' ? (
                    <><motion.div animate={{ x: [-5, 5, -5, 5, 0] }} transition={{ duration: 0.4 }}><XCircle className="w-4 h-4" /></motion.div> IP Not Found</>
                  ) : (
                    <><CheckCircle2 className="w-4 h-4 relative z-10" /> <span className="relative z-10">Submit IOC</span></>
                  )}
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </TiltCard>
  );
};

const SectionHeading = ({ title, icon: Icon }) => (
  <div className="flex items-center gap-4 mb-16 group">
    <div className="p-3 bg-[#0A0F1C]/[0.02] dark:bg-white/[0.03] rounded-2xl border border-slate-200 dark:border-white/[0.08] group-hover:border-blue-400/50 group-hover:bg-blue-500/10 transition-all duration-500 backdrop-blur-xl shadow-lg relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <Icon className="w-6 h-6 text-blue-400 group-hover:text-blue-600 dark:text-blue-300 relative z-10" />
    </div>
    <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-400 tracking-tight">
      {title}
    </h2>
    <motion.div 
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.2 }}
      className="h-[2px] bg-gradient-to-r from-blue-500/40 via-violet-500/20 to-transparent flex-grow ml-6 rounded-full origin-left"
    ></motion.div>
  </div>
);

const ElegantAvatar = ({ src }) => {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <motion.div style={{ y: yParallax }} className="relative group w-64 h-64 md:w-80 md:h-80 lg:w-[420px] lg:h-[420px] mx-auto shrink-0 mt-8 lg:mt-0 z-10">
      <div className="absolute inset-0 rounded-full border-[1px] border-blue-500/30 animate-[spin_40s_linear_infinite]"></div>
      <div className="absolute inset-6 rounded-full border border-dashed border-violet-500/30 animate-[spin_50s_linear_infinite_reverse]"></div>
      <div className="absolute inset-10 rounded-full bg-gradient-to-tr from-blue-600/30 to-violet-600/30 blur-3xl animate-pulse group-hover:opacity-100 opacity-60 transition-opacity duration-700"></div>
      
      <div className="absolute inset-10 rounded-full overflow-hidden border border-white/[0.15] group-hover:border-blue-400/60 transition-all duration-700 z-10 bg-white dark:bg-[#0A0F1C] shadow-[0_0_50px_rgba(0,0,0,0.6)]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-transparent to-transparent opacity-60 z-20 hover:opacity-0 transition-opacity duration-500"></div>
        <motion.img 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          src={src} 
          alt="Shahzeb Ali - Cybersecurity SOC Analyst & Purple Team Specialist Profile" 
          className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700" 
        />
      </div>

      <motion.div 
        animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-8 right-2 md:right-8 px-5 py-2.5 bg-white/90 dark:bg-[#0A0F1C]/90 backdrop-blur-xl border border-slate-300 dark:border-white/[0.1] text-xs font-bold tracking-widest uppercase text-blue-600 dark:text-blue-300 rounded-2xl shadow-2xl z-30"
      >
        Level 1 Analyst
      </motion.div>
      <motion.div 
        animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-16 left-0 md:left-4 px-5 py-2.5 bg-white/90 dark:bg-[#0A0F1C]/90 backdrop-blur-xl border border-slate-300 dark:border-white/[0.1] text-xs font-bold tracking-widest uppercase text-violet-700 dark:text-violet-300 rounded-2xl shadow-2xl flex items-center gap-3 z-30"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-500"></span>
        </span>
        System Secured
      </motion.div>
    </motion.div>
  );
};

// --- PORTFOLIO HOME CONTENT ---
const PortfolioHome = () => (
  <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-36 pb-24 space-y-48" style={{ contain: 'layout' }}>
    {/* HERO SECTION */}
    <section id="about" className="min-h-[80vh] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 relative">
      <div className="flex-1 flex flex-col justify-center order-2 lg:order-1 z-10">
        <FadeInSection delay={100} direction="left">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-300 text-[11px] font-bold tracking-[0.3em] uppercase mb-10 w-fit backdrop-blur-xl shadow-[0_0_30px_rgba(59,130,246,0.15)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.1] to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Defending Digital Perimeters
          </div>
        </FadeInSection>
        
        <FadeInSection delay={200} direction="left">
          <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-slate-900 dark:from-white via-slate-500 dark:via-slate-200 to-slate-300 dark:to-slate-400 dark:to-slate-500 mb-6 tracking-tighter leading-[1.05]">
            {RESUME_DATA.personal.name}
          </h1>
        </FadeInSection>
        
        <FadeInSection delay={300} direction="left">
          <div className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 font-light mb-12 flex flex-wrap gap-x-5 gap-y-3 items-center">
            {RESUME_DATA.personal.titles.map((title, i) => (
              <React.Fragment key={title}>
                <span className="text-blue-700 dark:text-blue-200 font-medium tracking-wide">{title}</span>
                {i < RESUME_DATA.personal.titles.length - 1 && <span className="text-white/[0.15]">|</span>}
              </React.Fragment>
            ))}
          </div>
        </FadeInSection>

        <FadeInSection delay={400} direction="left">
          <div className="flex flex-wrap gap-4 text-sm text-slate-700 dark:text-slate-300 mb-14">
            {[
              { icon: MapPin, text: RESUME_DATA.personal.location },
              { icon: Phone, text: RESUME_DATA.personal.phone },
              { icon: Mail, text: RESUME_DATA.personal.email, link: `mailto:${RESUME_DATA.personal.email}` },
              { icon: Linkedin, text: "LinkedIn", link: `https://${RESUME_DATA.personal.linkedin}` },
              { icon: ExternalLink, text: RESUME_DATA.personal.website, link: `https://${RESUME_DATA.personal.website}` }
            ].map((item, idx) => (
              item.link ? (
                <motion.a 
                    whileHover={{ scale: 1.05, y: -2 }}
                    key={idx} href={item.link} target={item.link.startsWith('http') ? '_blank' : '_self'} rel="noreferrer" 
                    className="flex items-center gap-2.5 bg-[#0A0F1C]/[0.02] dark:bg-white/[0.02] backdrop-blur-2xl px-5 py-3 rounded-2xl border border-slate-200 dark:border-white/[0.08] hover:border-blue-400/50 hover:bg-[#0A0F1C]/[0.02] dark:bg-white/[0.06] transition-all cursor-pointer shadow-lg group">
                  <item.icon className="w-4 h-4 text-blue-400 group-hover:text-blue-600 dark:text-blue-300" /> 
                  <span className="group-hover:text-slate-900 dark:text-white transition-colors font-medium tracking-wide">{item.text}</span>
                </motion.a>
              ) : (
                <div key={idx} className="flex items-center gap-2.5 bg-[#0A0F1C]/[0.02] dark:bg-white/[0.02] backdrop-blur-2xl px-5 py-3 rounded-2xl border border-slate-200 dark:border-white/[0.08] shadow-lg">
                  <item.icon className="w-4 h-4 text-slate-500" /> <span className="font-medium tracking-wide">{item.text}</span>
                </div>
              )
            ))}
          </div>
        </FadeInSection>

        <FadeInSection delay={500} direction="up">
          <TiltCard className="w-full lg:w-[90%]">
            <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-white/[0.08] bg-white/60 dark:bg-[#0A0F1C]/60 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-3xl hover:border-blue-500/30 transition-all duration-700 group h-full w-full">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              <div className="flex items-center gap-2 px-6 py-4 bg-[#0A0F1C]/[0.02] dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/[0.05]">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-700 group-hover:bg-red-400 transition-colors duration-300"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-700 group-hover:bg-amber-400 transition-colors duration-300 delay-75"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-700 group-hover:bg-green-400 transition-colors duration-300 delay-150"></div>
                </div>
                <span className="ml-4 text-xs text-slate-500 font-mono tracking-wider">profile_executive_summary.sh</span>
              </div>
              <div className="p-8 md:p-10 font-sans text-base text-slate-700 dark:text-slate-300 leading-relaxed font-light relative z-10">
                {RESUME_DATA.summary}
              </div>
            </div>
          </TiltCard>
        </FadeInSection>

        <FadeInSection delay={600} direction="up">
          <a
            href="/assets/resume/Shahzeb Ali ATS Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 mt-2 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold tracking-[0.15em] uppercase text-sm transition-all duration-300 shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] hover:-translate-y-1 group"
          >
            <FileDown className="w-5 h-5 group-hover:animate-bounce" />
            Download Resume
          </a>
        </FadeInSection>
      </div>

      <div className="flex-1 order-1 lg:order-2 w-full flex justify-center lg:justify-end">
        <FadeInSection delay={300} direction="right">
            <ElegantAvatar src={RESUME_DATA.personal.image} />
        </FadeInSection>
      </div>
    </section>

    {/* SKILLS SECTION */}
    <section id="skills" className="scroll-mt-40">
      <FadeInSection>
        <SectionHeading title="Technical Arsenal" icon={Cpu} />
      </FadeInSection>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {RESUME_DATA.skills.map((skillGroup, idx) => (
          <FadeInSection key={idx} delay={idx * 60}>
            <TiltCard className="h-full">
              <div className="bg-[#0A0F1C]/[0.02] dark:bg-white/[0.02] backdrop-blur-2xl border border-slate-200 dark:border-white/[0.05] rounded-[2rem] p-8 hover:bg-[#0A0F1C]/[0.02] dark:bg-white/[0.04] hover:border-blue-500/40 transition-all duration-700 group relative overflow-hidden shadow-2xl h-full flex flex-col">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/0 to-transparent group-hover:via-blue-500/80 transition-all duration-700"></div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-white dark:bg-[#0A0F1C] rounded-2xl border border-slate-200 dark:border-white/[0.08] group-hover:border-blue-500/40 shadow-inner transition-colors duration-500">
                    <skillGroup.icon className="w-6 h-6 text-slate-600 dark:text-slate-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:text-white transition-colors tracking-tight">{skillGroup.category}</h3>
                </div>
                <div className="flex flex-wrap gap-3 flex-grow">
                  {skillGroup.items.map((skill, sIdx) => (
                    <span key={sIdx} className="text-[13px] font-medium tracking-wide px-4 py-2 bg-white/50 dark:bg-[#0A0F1C]/50 text-slate-700 dark:text-slate-300 rounded-xl border border-slate-200 dark:border-white/[0.05] group-hover:border-white/[0.15] group-hover:text-blue-700 dark:text-blue-200 transition-colors shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          </FadeInSection>
        ))}
      </div>
    </section>

    {/* EXPERIENCE SECTION */}
    <section id="experience" className="scroll-mt-40">
      <FadeInSection>
        <SectionHeading title="Combat Experience" icon={Briefcase} />
      </FadeInSection>
      <div className="space-y-16 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-blue-500/50 before:via-slate-300 dark:before:via-white/[0.1] before:to-transparent">
        {RESUME_DATA.experience.map((job, idx) => (
          <FadeInSection key={idx} delay={idx * 80} direction={idx % 2 === 0 ? "right" : "left"}>
            <div className="relative w-full group">
              
              {/* Elegant Timeline Dot */}
              <div className={`flex items-center justify-center w-12 h-12 rounded-full border-[4px] border-[#060913] ${job.isHighlight ? 'bg-violet-500 shadow-[0_0_30px_rgba(139,92,246,0.6)]' : 'bg-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.5)]'} absolute left-0 md:left-1/2 -translate-x-1/2 z-20 transition-transform duration-700 group-hover:scale-125`}>
                {job.isHighlight ? <Bug className="w-5 h-5 text-slate-900 dark:text-white" /> : <ShieldAlert className="w-5 h-5 text-slate-900 dark:text-white" />}
              </div>
              
              {/* Content Card */}
              <TiltCard className={`w-[calc(100%-4.5rem)] ml-[4.5rem] md:ml-0 md:w-[calc(50%-4rem)] ${idx % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}>
                <div className={`p-10 rounded-[2.5rem] bg-[#0A0F1C]/[0.02] dark:bg-white/[0.02] backdrop-blur-3xl border border-slate-200 dark:border-white/[0.05] hover:bg-[#0A0F1C]/[0.02] dark:bg-white/[0.04] hover:border-blue-500/40 transition-all duration-700 hover:shadow-[0_20px_70px_rgba(0,0,0,0.5)] relative overflow-hidden h-full`}>
                  <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${job.isHighlight ? 'from-violet-500/20' : 'from-blue-500/20'} to-transparent rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                  
                  <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-10 gap-6 relative z-10">
                    <div>
                      <h3 className={`text-3xl font-extrabold tracking-tight ${job.isHighlight ? 'text-violet-700 dark:text-violet-300' : 'text-slate-800 dark:text-slate-100'}`}>{job.title}</h3>
                      <p className="text-blue-400 text-lg font-medium mt-2">{job.company}</p>
                    </div>
                    <span className="text-xs font-bold tracking-[0.2em] uppercase px-5 py-2.5 bg-white/90 dark:bg-[#0A0F1C]/90 rounded-full text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/[0.08] shrink-0 self-start shadow-inner">
                      {job.date}
                    </span>
                  </div>
                  <ul className="space-y-5 relative z-10">
                    {job.points.map((point, pIdx) => (
                      <li key={pIdx} className="flex gap-5 text-slate-700 dark:text-slate-300 text-base font-light group/item">
                        <ChevronRight className={`w-5 h-5 shrink-0 mt-0.5 transition-transform duration-300 group-hover/item:translate-x-2 ${job.isHighlight ? 'text-violet-400' : 'text-blue-400'}`} />
                        <span className="leading-relaxed opacity-70 group-hover/item:opacity-100 transition-opacity duration-300">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>

    {/* PROJECTS SECTION - SUPREME ELEGANCE */}
    <section id="projects" className="scroll-mt-40">
      <FadeInSection>
        <SectionHeading title="Simulations & Operations" icon={Crosshair} />
      </FadeInSection>
      <div className="flex flex-col gap-16">
        {RESUME_DATA.projects.map((project, idx) => (
          <FadeInSection key={idx} delay={idx * 80} direction="up">
            <div className="group relative flex flex-col lg:flex-row gap-8 lg:flex-row lg:gap-16 border-t border-slate-200 dark:border-white/[0.05] pt-16">
              <div className="absolute top-0 left-0 w-1/3 h-[2px] bg-gradient-to-r from-blue-500/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 ease-out origin-left"></div>
              
              <div className="lg:w-1/3 shrink-0 relative z-10">
                <div className="text-blue-400 text-sm font-bold tracking-[0.3em] uppercase mb-5 flex items-center gap-4">
                    <span className="w-10 h-[2px] bg-blue-500/50 inline-block group-hover:w-16 transition-all duration-700"></span> 
                    {project.date}
                </div>
                <h3 className="text-4xl lg:text-5xl font-light text-slate-800 dark:text-slate-100 leading-tight mb-6 group-hover:text-blue-700 dark:text-blue-200 transition-colors duration-500">{project.title}</h3>
                <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-[#0A0F1C]/[0.02] dark:bg-white/[0.02] backdrop-blur-md border border-slate-200 dark:border-white/[0.05] rounded-full text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mt-2 group-hover:border-blue-500/30 transition-colors">
                  <Lock className="w-3.5 h-3.5 text-blue-500/80"/> {project.org}
                </div>
              </div>
              
              <div className="lg:w-2/3 mt-6 lg:mt-0 relative z-10">
                <ul className="space-y-8 bg-[#0A0F1C]/[0.02] dark:bg-white/[0.01] p-8 rounded-[2rem] border border-slate-100 dark:border-white/[0.02] group-hover:bg-[#0A0F1C]/[0.02] dark:bg-white/[0.02] group-hover:border-slate-200 dark:border-white/[0.05] transition-all duration-700">
                  {project.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex gap-6 text-slate-700 dark:text-slate-300 text-lg font-light group/item leading-relaxed">
                      <ChevronRight className="w-6 h-6 shrink-0 mt-1 text-blue-500/40 group-hover/item:text-blue-400 group-hover/item:translate-x-3 transition-all duration-500 ease-out" />
                      <span className="opacity-70 group-hover/item:opacity-100 transition-opacity duration-300">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>

    {/* INTERACTIVE CHALLENGE SECTION */}
    <section id="challenge" className="scroll-mt-40">
      <FadeInSection>
          <InteractiveTerminal />
      </FadeInSection>
    </section>

    {/* CERTIFICATIONS & EDUCATION */}
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-12">
      
      <div className="flex flex-col">
        <FadeInSection>
          <SectionHeading title="Certifications" icon={Award} />
        </FadeInSection>
        <FadeInSection delay={200}>
          <TiltCard className="h-full">
            <div className="bg-[#0A0F1C]/[0.02] dark:bg-white/[0.02] backdrop-blur-3xl rounded-[2.5rem] p-10 border border-slate-200 dark:border-white/[0.05] flex-grow hover:bg-[#0A0F1C]/[0.02] dark:bg-white/[0.03] transition-all duration-700 shadow-2xl h-full hover:border-blue-500/30">
              <ul className="space-y-5">
                {RESUME_DATA.certifications.map((cert, idx) => (
                  <motion.li 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    key={idx} className="flex items-center gap-6 p-6 rounded-2xl bg-white/40 dark:bg-[#0A0F1C]/40 border border-slate-200 dark:border-white/[0.05] hover:border-violet-500/40 hover:bg-white/80 dark:bg-[#0A0F1C]/80 transition-all duration-500 group cursor-default shadow-sm"
                  >
                    <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/20 group-hover:bg-violet-500/30 group-hover:scale-110 transition-all duration-500">
                        <ShieldCheck className="w-6 h-6 text-violet-400 shrink-0" />
                    </div>
                    <span className="text-base font-bold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:text-white tracking-wide transition-colors duration-300">{cert}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </TiltCard>
        </FadeInSection>
      </div>

      <div className="flex flex-col">
        <FadeInSection>
          <SectionHeading title="Education" icon={GraduationCap} />
        </FadeInSection>
        <FadeInSection delay={400}>
          <TiltCard className="h-full">
            <div className="bg-[#0A0F1C]/[0.02] dark:bg-white/[0.02] backdrop-blur-3xl rounded-[2.5rem] p-10 border border-slate-200 dark:border-white/[0.05] flex-grow flex flex-col justify-center items-center text-center relative overflow-hidden group hover:bg-[#0A0F1C]/[0.02] dark:bg-white/[0.03] transition-all duration-700 shadow-2xl h-full hover:border-blue-500/30">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
              
              <motion.div 
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative z-10 flex items-center justify-center w-28 h-28 rounded-[2rem] bg-white dark:bg-[#0A0F1C] border border-slate-300 dark:border-white/[0.1] mb-12 shadow-inner group-hover:border-blue-500/50 transition-colors duration-700"
              >
                <GraduationCap className="w-12 h-12 text-blue-400" />
              </motion.div>
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-5 tracking-tight leading-tight">{RESUME_DATA.education.degree}</h3>
                <p className="text-blue-600 dark:text-blue-300 font-bold mb-10 text-xl tracking-wide">{RESUME_DATA.education.institution}</p>
                <div className="inline-flex items-center gap-3 px-8 py-3 bg-white/80 dark:bg-[#0A0F1C]/80 rounded-full border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 text-sm font-bold tracking-[0.2em] uppercase shadow-sm group-hover:border-white/[0.2] transition-colors duration-500">
                  <Terminal className="w-4 h-4 text-blue-500" /> Class of {RESUME_DATA.education.date.split('-')[1].trim()}
                </div>
              </div>
            </div>
          </TiltCard>
        </FadeInSection>
      </div>
      
    </section>
  </main>
);

// --- MAIN APP COMPONENT ---

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 400]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#060913] text-slate-800 dark:text-slate-300 font-sans selection:bg-blue-500/30 overflow-hidden transition-colors duration-700">
      <Helmet>
        <title>Shahzeb Ali | Cybersecurity Specialist & SOC Analyst</title>
        <meta name="description" content="Official portfolio of Shahzeb Ali, a Cybersecurity SOC Analyst and Purple Team Specialist. Expert in SIEM, Incident Response, and Offensive Security (YesWeHack researcher)." />
        <link rel="canonical" href="https://shahsmen.com" />
        
        {/* JSON-LD Persona Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Shahzeb Ali",
            "url": "https://shahsmen.com",
            "jobTitle": "SOC Analyst & Cybersecurity Researcher",
            "alumniOf": "Lahore Garrison University",
            "sameAs": [
              "https://linkedin.com/in/ishahzebali",
              "https://github.com/ishahzebali"
            ],
            "description": "Cybersecurity professional specializing in SOC operations, incident response, and purple teaming."
          })}
        </script>
      </Helmet>
      <MouseSpotlight />
      
      {/* Heavy background blobs — desktop only to protect mobile GPU */}
      <motion.div 
        style={{ y: yBg }}
        className="hidden lg:block fixed top-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full bg-blue-900/10 blur-[130px] pointer-events-none z-0"
      />
      <div 
        className="hidden lg:block fixed bottom-[-10%] right-[-10%] w-[700px] h-[700px] rounded-full bg-violet-900/15 blur-[140px] pointer-events-none z-0 opacity-10"
      />
      {/* Lightweight mobile ambient */}
      <div className="lg:hidden fixed top-0 left-0 w-full h-[300px] bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none z-0" />
      {/* Dot grid — desktop only */}
      <div className="hidden lg:block fixed inset-0 z-0 opacity-[0.2]" 
           style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '32px 32px' }}>
      </div>

      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled || mobileMenuOpen ? 'bg-white/95 dark:bg-[#060913]/95 backdrop-blur-2xl border-b border-slate-200 dark:border-white/[0.05] shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.4)]' : 'bg-transparent'} ${mobileMenuOpen ? 'py-4' : scrolled ? 'py-4' : 'py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 group cursor-pointer">
            <img
              src="/assets/images/logo.png"
              alt="Shahzeb Ali Logo"
              className="h-9 w-9 object-contain group-hover:scale-110 transition-transform duration-300"
            />
            <span className="tracking-widest">SA<span className="text-violet-400">.</span></span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-10 text-sm font-bold tracking-[0.1em] uppercase items-center">
            {['About', 'Skills', 'Experience', 'Projects'].map((item) => (
              <a key={item} href={`/#${item.toLowerCase()}`} className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors relative group">
                {item}
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500 dark:bg-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
              </a>
            ))}
            <Link to="/blog" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors relative group px-2">
              <span className="text-blue-600 dark:text-blue-400">BLOG</span>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
            </Link>
            <a
              href="/assets/resume/Shahzeb Ali ATS Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600/10 hover:bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 hover:border-blue-500/60 text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300"
            >
              <FileDown className="w-3.5 h-3.5" /> Resume
            </a>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.1] hover:bg-slate-200 dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-300 transition-colors shadow-sm"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <MagneticButton
              href={`mailto:${RESUME_DATA.personal.email}`}
              className="hidden md:flex px-7 py-3 bg-slate-100 dark:bg-white/[0.03] hover:bg-blue-50 dark:hover:bg-blue-600/20 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/[0.1] hover:border-blue-500/50 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-500 hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] items-center gap-2 backdrop-blur-md"
            >
              Execute Contact
            </MagneticButton>
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="md:hidden p-2.5 rounded-full bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.1] text-slate-700 dark:text-slate-300 transition-colors shadow-sm"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden border-t border-slate-200 dark:border-white/[0.05] mt-4"
            >
              <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-2">
                {['About', 'Skills', 'Experience', 'Projects'].map((item, i) => (
                  <motion.a
                    key={item}
                    href={`/#${item.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white font-bold tracking-[0.15em] uppercase text-sm py-4 border-b border-slate-100 dark:border-white/[0.04] flex items-center justify-between group"
                  >
                    {item}
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200" />
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link
                    to="/blog"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-blue-600 dark:text-blue-400 font-bold tracking-[0.15em] uppercase text-sm py-4 border-b border-slate-100 dark:border-white/[0.04] flex items-center justify-between group"
                  >
                    Blog
                    <ChevronRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-all duration-200" />
                  </Link>
                </motion.div>
                <motion.a
                  href="/assets/resume/Shahzeb Ali ATS Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.22 }}
                  className="text-blue-600 dark:text-blue-400 font-bold tracking-[0.15em] uppercase text-sm py-4 border-b border-slate-100 dark:border-white/[0.04] flex items-center justify-between group"
                >
                  <span className="flex items-center gap-2"><FileDown className="w-4 h-4" /> Resume</span>
                  <ChevronRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-all duration-200" />
                </motion.a>
                <motion.a
                  href={`mailto:${RESUME_DATA.personal.email}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28 }}
                  className="mt-6 w-full py-4 text-center bg-blue-600 hover:bg-blue-500 text-white font-bold tracking-[0.2em] uppercase text-xs rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-300"
                >
                  Execute Contact
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <Routes>
        <Route path="/" element={<PortfolioHome />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <footer className="relative z-20 border-t border-slate-200 dark:border-white/[0.05] bg-slate-50/90 dark:bg-[#03050A]/90 backdrop-blur-3xl pt-24 pb-12 overflow-hidden mt-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-40 bg-blue-900/10 blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-24 relative z-10">
            <div className="space-y-8">
              <div className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-4">
                <img
                  src="/assets/images/logo.png"
                  alt="Shahzeb Ali - Cybersecurity Specialist Logo"
                  className="h-12 w-12 object-contain"
                />
                <span className="tracking-tighter">SHAHZEB<span className="text-violet-400">.ALI</span></span>
              </div>
              <p className="text-slate-400/80 text-base leading-relaxed pr-4 font-medium">
                Securing digital perimeters and hunting threats. Leveraging Purple Team methodologies to bridge the gap between offensive exploits and defensive resilience.
              </p>
            </div>

            <div className="space-y-8 md:px-8">
              <h4 className="text-slate-800 dark:text-slate-200 font-bold tracking-[0.2em] text-xs uppercase flex items-center gap-3 opacity-80">
                <Activity className="w-4 h-4 text-blue-500"/> Connect & Verify
              </h4>
              <ul className="space-y-5">
                {[
                  { icon: Linkedin, text: "LinkedIn Profile", link: `https://${RESUME_DATA.personal.linkedin}` },
                  { icon: Mail, text: "Secure Transmission", link: `mailto:${RESUME_DATA.personal.email}` },
                  { icon: ExternalLink, text: RESUME_DATA.personal.website, link: `https://${RESUME_DATA.personal.website}` }
                ].map((item, idx) => (
                  <li key={idx}>
                    <a href={item.link} target="_blank" rel="noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-blue-400 text-base font-medium flex items-center gap-4 transition-colors w-fit group">
                      <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" /> {item.text}
                      <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-2 translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="text-slate-800 dark:text-slate-200 font-bold tracking-[0.2em] text-xs uppercase flex items-center gap-3 opacity-80">
                <TerminalSquare className="w-4 h-4 text-blue-500"/> System Status
              </h4>
              <div className="bg-white dark:bg-[#0A0F1C] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-8 font-mono text-sm text-slate-600 dark:text-slate-400 shadow-inner group hover:shadow-[0_0_30px_rgba(16,185,129,0.05)] transition-shadow duration-500">
                <div className="flex items-center gap-3 mb-6 text-emerald-400 font-bold tracking-widest">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.6)]"></span>
                  STATUS: ONLINE
                </div>
                <div className="space-y-3 opacity-70">
                  <div>{`> Location: ${RESUME_DATA.personal.location}`}</div>
                  <div>{`> Comm_Link: ${RESUME_DATA.personal.phone}`}</div>
                  <div>{`> Clearance: L1 Analyst`}</div>
                </div>
              </div>
            </div>

          </div>
          <div className="pt-10 border-t border-slate-200 dark:border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
            <p className="text-slate-500/80 text-sm font-medium">
              &copy; {new Date().getFullYear()} {RESUME_DATA.personal.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-5 text-xs font-bold tracking-[0.2em] text-slate-500 bg-[#0A0F1C]/[0.02] dark:bg-white/[0.02] px-8 py-4 rounded-full border border-slate-200 dark:border-white/[0.05] shadow-sm backdrop-blur-md">
              <span className="hover:text-blue-600 dark:text-blue-300 transition-colors cursor-default">{RESUME_DATA.personal.details.split('|')[0].trim()}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
              <span className="hover:text-blue-600 dark:text-blue-300 transition-colors cursor-default">LANG: EN/UR</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
