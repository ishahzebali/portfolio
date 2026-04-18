import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Resume from './pages/Resume';
import VerifyCert from './pages/VerifyCert';
import NotFound from './pages/NotFound';
import AllProjects from './pages/AllProjects';
import { certificationsData } from './data/certificationsData';
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
      date: "Aug 2025 - Present",
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
      title: "End-to-End Ransomware Emulation & Detection Engineering",
      org: "Purple Team Lab",
      date: "Feb 2026",
      points: [
        "Architected a secure sandbox environment to emulate full-lifecycle Ransomware execution chains (Initial Access -> Persistence -> Impact), utilizing Atomic Red Team to trigger specific TTPs.",
        "Monitored telemetry via Sysmon and Windows Lifecycle events, capturing granular activity such as Volume Shadow Copy deletion (T1490) and high-frequency file modification (T1486).",
        "Engineered high-fidelity detection logic in Splunk using SPL, creating persistent alerting rules that surfaced encrypted behavior with a 0% false-positive rate during validation."
      ]
    },
    {
      title: "Azure Sentinel (SIEM) & SOAR Automation Playbook Development",
      org: "Cloud Security Lab",
      date: "Feb 2026",
      points: [
        "Deployed a cloud-native SIEM environment utilizing Microsoft Sentinel, ingesting Azure AD, Office 365, and Defender for Endpoint telemetry via custom Data Connectors.",
        "Developed automated SOAR playbooks using Azure Logic Apps and Python to perform instant IP enrichment and automated account suspension.",
        "Visualized security posture through KQL Workbooks, enabling real-time monitoring of identity-based threat vectors and cloud misconfigurations."
      ]
    },
    {
      title: "Advanced SIEM Integration & Threat Correlation Lab",
      org: "Personal Initiative",
      date: "Jan 2026",
      points: [
        "Architected a custom ELK stack via Docker, engineering a centralized logging pipeline for Windows Event Logs and Sysmon telemetry.",
        "Designed real-time SIEM dashboards to monitor anomalous network activity and lateral movement, mapping custom alerts directly to the MITRE ATT&CK framework.",
        "Successfully surfaced active brute-force attempts during simulated breach events by correlating disparate log sources into high-fidelity actionable security incidents."
      ]
    },
    {
      title: "Cyber Strategic & Technical Advisory Simulation",
      org: "Deloitte (via Forage)",
      date: "Jan 2026",
      points: [
        "Performed multi-vector threat intelligence analysis to identify emerging TTPs targeting financial infrastructure, providing strategic attribution and mitigation recommendations.",
        "Designed a comprehensive security awareness strategy for a simulated global enterprise, focusing on reducing phishing vulnerability across high-risk business units.",
        "Developed executive-level risk reports and incident response playbooks for C-suite stakeholders, translating technical vulnerabilities into actionable business-risk mitigation strategies."
      ]
    },
    {
      title: "Enterprise Phishing & Data Exfiltration Investigation",
      org: "TryHackMe",
      date: "Dec 2025",
      points: [
        "Reconstructed the Cyber Kill Chain from phishing access through DNS tunnelling across a compromised enterprise endpoint.",
        "Decoded obfuscated Base64 payloads and reverse-engineered malicious PowerShell execution chains, accurately mapping all attacker TTPs to MITRE ATT&CK.",
        "Leveraged Sysmon forensics to identify Living off the Land (LotL) techniques including malicious Robocopy usage for data staging and DNS-based covert channel exfiltration."
      ]
    },
    {
      title: "Active Directory Red/Blue Tactics & Mitigation",
      org: "Home Network",
      date: "Jan 2026",
      points: [
        "Constructed a vulnerable Active Directory domain environment to emulate advanced post-exploitation threats like Kerberoasting, AS-REP Roasting, and Pass-the-Hash.",
        "Utilized Splunk to ingest logs from the Domain Controller and authored custom detection logic capable of identifying Golden Ticket creation with 99% accuracy.",
        "Implemented hardened GPO configurations and Tiered Administrative Models to significantly reduce the attack surface and mitigate lateral movement opportunities."
      ]
    },
    {
      title: "Enterprise SOC Operations & Threat Hunting Simulation",
      org: "Datacom (via Forage)",
      date: "Jan 2026",
      points: [
        "Executed real-time alert triage and investigation within a simulated high-tempo Security Operations Center, identifying unauthorized lateral movement and privilege escalation.",
        "Utilized advanced firewall and proxy log analysis to detect stealthy data exfiltration patterns, leveraging Deep Packet Inspection (DPI) to identify malicious TLS-encrypted payloads.",
        "Drafted and implemented rapid containment protocols for compromised virtual assets, ensuring minimal operational downtime while preserving forensic integrity for root cause analysis."
      ]
    },
    {
      title: "Vulnerability Scanning Automation & Remediation Pipeline",
      org: "Personal Lab",
      date: "Nov 2025",
      points: [
        "Developed custom Bash and Python scripts to automate continuous Nmap and Nessus scanning pipelines, scheduling reports to a centralized dashboard.",
        "Integrated live CVE threat feeds (NVD API) to auto-prioritize high-CVSS vulnerabilities across target Linux servers, reducing manual triage time by 70%.",
        "Implemented CIS benchmark hardening scripts, mitigating over 85% of identified systemic vulnerabilities across the lab environment."
      ]
    },
    {
      title: "Mastercard Cybersecurity Virtual Experience",
      org: "Forage",
      date: "Dec 2025",
      points: [
        "Identified active phishing campaigns targeting employees and performed granular risk exposure assessments across departmental boundaries.",
        "Analysed which business units were most susceptible and designed targeted security awareness training programs to address specific attack vectors.",
        "Produced a structured report recommending procedural safeguards and measurable KPIs to track security posture improvement over time."
      ]
    }
  ],
  certifications: [
    { title: "Certified SOC Analyst L1", issuer: "TryHackMe", file: "/assets/Certs/THM Certificate.pdf", image: "/assets/Certs/THM Certificate.png" },
    { title: "Jr Penetration Tester", issuer: "TryHackMe", file: "/assets/Certs/THM-PUYNGDL9DA.pdf", image: "/assets/Certs/THM-PUYNGDL9DA.png" },
    { title: "CyberSecurity 101", issuer: "TryHackMe", file: "/assets/Certs/THM Certificate (1).pdf", image: "/assets/Certs/THM Certificate (1).png" },
    { title: "Fortinet Certified Associate in Cybersecurity", issuer: "Fortinet", file: "/assets/Certs/Fortinet Certified Associate Cybersecurity.pdf", image: "/assets/Certs/Fortinet Certified Associate Cybersecurity.png" },
    { title: "Practical Ethical Hacking (PEH)", issuer: "TCM Security", file: "/assets/Certs/Practical Ethical Hacking Course.pdf", image: "/assets/Certs/Practical Ethical Hacking Course.png" },
    { title: "Linux 100: Fundamentals", issuer: "TCM Security", file: "/assets/Certs/gaqol7kz_1762615002343.pdf", image: "/assets/Certs/gaqol7kz_1762615002343.png" },
    { title: "ISO/IEC 27001 Information Security Associate", issuer: "Skill Front", file: "/assets/Certs/SkillFront Document.pdf", image: "/assets/Certs/SkillFront Document.png" },
    { title: "Bash Scripting", issuer: "Codecademy", file: "/assets/Certs/Bash Scripting Cert | Codecademy.pdf", image: "/assets/Certs/Bash Scripting Cert | Codecademy.png" },
    { title: "Additional Qualification", issuer: "TryHackMe", file: "/assets/Certs/THM-TT5DLHBSMX.pdf", image: "/assets/Certs/THM-TT5DLHBSMX.png" },
    { title: "Additional Qualification", issuer: "TryHackMe", file: "/assets/Certs/THM-TT5DLHBSMX (1).pdf", image: "/assets/Certs/THM-TT5DLHBSMX (1).png" },
    { title: "SOC Analyst Training", issuer: "LetsDefend", file: "/assets/Certs/E9pA6qsdbeyEkp3ti_9PBTqmSxAf6zZTseP_6941831f49fe35d39a8998e4_1765902408780_completion_certificate.pdf", image: "/assets/Certs/E9pA6qsdbeyEkp3ti_9PBTqmSxAf6zZTseP_6941831f49fe35d39a8998e4_1765902408780_completion_certificate.png" },
    { title: "Completion Certificate", issuer: "Other", file: "/assets/Certs/Completion Certificate.pdf", image: "/assets/Certs/Completion Certificate.png" },
    { title: "Certificate Record", issuer: "Udemy", file: "/assets/Certs/UC-1a52400e-4046-4546-80b6-9556034f2f27.jpg", image: "/assets/Certs/UC-1a52400e-4046-4546-80b6-9556034f2f27.jpg" },
    { title: "Certificate Record", issuer: "Udemy", file: "/assets/Certs/UC-c360a48e-b658-47ac-adf0-f8304ae673b6.jpg", image: "/assets/Certs/UC-c360a48e-b658-47ac-adf0-f8304ae673b6.jpg" },
    { title: "Activity Record 1", issuer: "Other", file: "/assets/Certs/Screenshot 2025-07-13 at 20.48.03.png", image: "/assets/Certs/Screenshot 2025-07-13 at 20.48.03.png" },
    { title: "Activity Record 2", issuer: "Other", file: "/assets/Certs/Screenshot 2025-11-01 at 10.47.12.png", image: "/assets/Certs/Screenshot 2025-11-01 at 10.47.12.png" },
    { title: "Activity Record 3", issuer: "Other", file: "/assets/Certs/Screenshot 2025-11-04 at 21.34.29.png", image: "/assets/Certs/Screenshot 2025-11-04 at 21.34.29.png" },
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


const CHALLENGES = [
  {
    id: 1,
    title: "SOC Scenario: Suspicious Spawn",
    scenario: "An endpoint triggered an EDR alert for an obfuscated PowerShell execution.",
    type: "SYSMON EVENT ID: 1 - PROCESS CREATION",
    header: "profile_executive_summary.sh",
    obfuscatedCode: "SUVYIChOZXctT2JqZWN0IE5ldC5XZWJDbGllbnQpLkRvd25sb2FkU3RyaW5nKCdodHRwOi8vMTcyLjE2LjEwLjUwL2JhY2tkb29yLnBzMScp",
    objective: "De-obfuscate the payload and identify the external C2 IP Address acting as the staging server.",
    hint: "The '-Enc' flag indicates Base64. Try decoding the payload to extract the IP!",
    answer: "172.16.10.50",
    badge: "MALWARE_ANALYST_AWARDED",
    successMsg: "Excellent de-obfuscation. The staging server IP has been blacklisted on the perimeter."
  },
  {
    id: 2,
    title: "SOC Scenario: Web Intrusion",
    scenario: "Web server logs show a series of suspicious GET requests targeting the database.",
    type: "HTTP ACCESS LOG - 403 FORBIDDEN",
    header: "apache_access_log.log",
    obfuscatedCode: "192.168.1.45 - - [15/Apr/2026:14:22:01] \"GET /login?id=1' OR '1'='1'-- HTTP/1.1\" 200 542",
    objective: "Identify the technical name for this specific injection technique used by the attacker.",
    hint: "Look at the 'id=' parameter. It attempts to bypass authentication using logical operators.",
    answer: "SQL Injection",
    badge: "WEB_DEFENDER_CERTIFIED",
    successMsg: "Correct. SQL Injection was identified. Patching parameterized queries immediately."
  },
  {
    id: 3,
    title: "SOC Scenario: Exfiltration Attempt",
    scenario: "Network telemetry detected high-frequency DNS queries to a suspicious sub-domain.",
    type: "DNS QUERY LOG - TUNNELING DETECTED",
    header: "bind9_query.log",
    obfuscatedCode: "Query: a2V5LWxvZ2dlci1kYXRh.exfiltrate.badactor.com",
    objective: "Extract the hidden identifier by decoding the first segment of the suspicious sub-domain.",
    hint: "The sub-domain segment 'a2V5LWxvZ2dlci1kYXRh' is encoded in Base64.",
    answer: "key-logger-data",
    badge: "NETWORK_FORENSIC_EXPERT",
    successMsg: "Great catch. Data exfiltration via DNS tunneling has been blocked."
  },
  {
    id: 4,
    title: "SOC Scenario: Ransomware Attribution",
    scenario: "A compromised workstation shows a binary signature in the memory dump.",
    type: "PE HEADER ANALYSIS - MALWARE ID",
    header: "volatility_memdump.raw",
    obfuscatedCode: "[FILE_ID: 12af89] -> SIGNATURE: LOCKBIT_3_0_ZEUS_VARIANT",
    objective: "Enter the name of the ransomware group associated with this specific file identifier.",
    hint: "The signature explicitly mentions the name of a notorious RaaS group.",
    answer: "LockBit",
    badge: "THREAT_INTEL_GURU",
    successMsg: "Attribution complete. This is LockBit 3.0. Deploying specific decryptors."
  }
];

const InteractiveTerminal = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('idle');
  const [showHint, setShowHint] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
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
    <TiltCard>
      <div 
        className="bg-slate-100/80 dark:bg-[#050810]/80 backdrop-blur-2xl border border-blue-500/10 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] hover:shadow-[0_0_60px_rgba(59,130,246,0.15)] relative overflow-hidden group transition-all duration-700 h-full w-full"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-blue-500/20 transition-all duration-700"></div>
        
        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex items-center gap-4">
            <motion.div 
              animate={{ rotate: status === 'success' ? [0, 360] : [0, 5, -5, 0] }}
              transition={{ duration: status === 'success' ? 0.8 : 0.5, repeat: status === 'success' ? 0 : Infinity, repeatDelay: 5 }}
              className={`p-3 border rounded-xl transition-colors duration-500 ${status === 'success' ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-blue-500/10 border-blue-500/30'}`}
            >
              {status === 'success' ? <ShieldCheck className="w-6 h-6 text-emerald-400" /> : <ShieldAlert className="w-6 h-6 text-blue-400" />}
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{isCompleted ? "Cyber Quest Complete" : current.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">{isCompleted ? "All threats neutralized. Access restored." : current.scenario}</p>
            </div>
          </div>
          {!isCompleted && (
            <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase bg-slate-200/50 dark:bg-white/5 px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/10 shrink-0">
              Stage {current.id} / {CHALLENGES.length}
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          {isCompleted ? (
            <motion.div 
              key="completed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-12 text-center relative z-10"
            >
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }} 
                transition={{ repeat: Infinity, duration: 3 }}
                className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/40"
              >
                <Award className="w-10 h-10 text-emerald-400" />
              </motion.div>
              <h4 className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-300 mb-4 tracking-tight">System Fully Hardened</h4>
              <p className="text-emerald-400/80 mb-8 max-w-md mx-auto">
                You've successfully identified and mitigated every threat in this simulation. 
                Your pattern recognition and forensic skills are elite.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentIdx(0);
                  setIsCompleted(false);
                  setStatus('idle');
                  setInput('');
                }}
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold tracking-widest uppercase text-xs transition-all shadow-lg"
              >
                Reset Simulation
              </motion.button>
            </motion.div>
          ) : status === 'success' ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 text-center relative z-10"
            >
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                <Unlock className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              </motion.div>
              <h4 className="text-2xl font-bold text-emerald-700 dark:text-emerald-300 mb-2">Threat Neutralized</h4>
              <p className="text-emerald-400/80 mb-6">{current.successMsg}</p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 rounded-lg border border-emerald-500/30 text-emerald-200 text-[10px] font-mono tracking-widest">
                  Badge: {current.badge}
                </div>
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={nextChallenge}
                  className="px-6 py-2.5 bg-white dark:bg-emerald-600 text-slate-900 dark:text-white rounded-lg font-bold text-xs tracking-widest uppercase flex items-center gap-2 shadow-lg"
                >
                  {currentIdx < CHALLENGES.length - 1 ? "Next Challenge" : "Finalize Protocol"} <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6 relative z-10">
              <div className="bg-white dark:bg-[#0A0F1C] border border-slate-200 dark:border-white/[0.05] rounded-xl p-5 font-mono text-sm text-slate-700 dark:text-slate-300 shadow-inner">
                <div className="text-blue-500 dark:text-blue-400 mb-3 flex items-center gap-2"><Activity className="w-4 h-4"/> [{current.type}]</div>
                
                <div className="flex flex-col gap-2 bg-[#0A0F1C]/[0.02] dark:bg-white/[0.02] p-4 rounded-lg border border-slate-200 dark:border-white/[0.05] overflow-x-auto">
                  <span className="text-slate-500 text-xs">Analysis Snippet:</span>
                  <span className="text-violet-400 font-bold select-all tracking-wider text-xs md:text-sm whitespace-pre-wrap">{current.obfuscatedCode}</span>
                </div>
                
                <div className="text-slate-700 dark:text-slate-300 mt-5 font-bold flex flex-col gap-3">
                  <div>Objective: <span className="font-normal opacity-80">{current.objective}</span></div>
                  
                  {showHint ? (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-xs text-amber-500 font-mono mt-1 border-l-2 border-amber-500/50 pl-3 py-1 overflow-hidden">
                      [System Hint]: {current.hint}
                    </motion.div>
                  ) : (
                    <button 
                      type="button" 
                      onClick={() => setShowHint(true)}
                      className="text-[11px] text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white w-fit font-normal underline underline-offset-4 decoration-slate-300 dark:decoration-white/[0.1] hover:decoration-slate-900 dark:hover:decoration-white/[0.5] transition-all flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" /> Request Intel Hint
                    </button>
                  )}
                </div>
              </div>

              <form onSubmit={handleAnswer} className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <TerminalSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter identifying string..." 
                    className="w-full bg-[#0A0F1C]/[0.02] dark:bg-white/[0.03] border border-slate-300 dark:border-white/[0.1] focus:border-blue-500/50 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 dark:text-white font-mono text-sm outline-none transition-all placeholder:text-slate-600 focus:bg-[#0A0F1C]/[0.02] dark:bg-white/[0.05] shadow-inner"
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
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] relative overflow-hidden group/btn'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.2] to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>
                  {status === 'checking' ? (
                    <><Activity className="w-4 h-4 animate-spin" /> Analyzing...</>
                  ) : status === 'error' ? (
                    <><motion.div animate={{ x: [-5, 5, -5, 5, 0] }} transition={{ duration: 0.4 }}><XCircle className="w-4 h-4" /></motion.div> Failed</>
                  ) : (
                    <><CheckCircle2 className="w-4 h-4 relative z-10" /> <span className="relative z-10">Submit SOC Intel</span></>
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
  <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-24 space-y-40 md:space-y-48" style={{ contain: 'layout' }}>
    <Helmet>
      <title>Shahzeb Ali | Cybersecurity Specialist | SOC Analyst & Purple Teamer</title>
      <meta name="description" content="Professional portfolio of Shahzeb Ali, a SOC Analyst specializing in threat detection, incident response, and purple team operations. Exploring the intersection of offensive exploits and defensive resilience." />
      <meta name="keywords" content="Shahzeb Ali, SOC Analyst, Cybersecurity Specialist, Purple Team, SIEM, Splunk, Microsoft Sentinel, Threat Hunting, Incident Response, Abu Dhabi, UAE" />
      <link rel="canonical" href="https://shahsmen.com" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://shahsmen.com" />
      <meta property="og:title" content="Shahzeb Ali | Cybersecurity Specialist & SOC Analyst" />
      <meta property="og:description" content="Professional cybersecurity portfolio and intelligence briefings. Expert in SIEM operations and threat detection." />
      <meta property="og:image" content="https://shahsmen.com/assets/images/logo.png" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://shahsmen.com" />
      <meta property="twitter:title" content="Shahzeb Ali | Cybersecurity Specialist" />
      <meta property="twitter:description" content="SOC Analyst & Purple Team Specialist. Defending digital perimeters via advanced threat detection." />
      <meta property="twitter:image" content="https://shahsmen.com/assets/images/logo.png" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Shahzeb Ali",
          "jobTitle": "SOC Analyst & Cybersecurity Specialist",
          "description": "Results-driven SOC Analyst with over 2 years of experience in SIEM-based threat detection and incident response.",
          "url": "https://shahsmen.com",
          "sameAs": [
            "https://linkedin.com/in/ishahzebali",
            "https://shahsmen.com"
          ],
          "knowsAbout": [
            "Cybersecurity",
            "SOC Operations",
            "Incident Response",
            "SIEM",
            "Splunk",
            "Microsoft Sentinel",
            "Threat Hunting",
            "Purple Teaming"
          ],
          "worksFor": {
            "@type": "Organization",
            "name": "CureMD"
          }
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Shahzeb Ali Portfolio",
          "url": "https://shahsmen.com"
        })}
      </script>
    </Helmet>
    {/* HERO SECTION */}
    <section id="about" className="min-h-[70vh] md:min-h-[80vh] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 relative">
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
                  <item.icon className="w-4 h-4 text-blue-500 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors" /> 
                  <span className="text-slate-700 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors font-medium tracking-wide">{item.text}</span>
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

      {/* Big bento-grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {RESUME_DATA.skills.map((skillGroup, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className="group relative rounded-[1.75rem] overflow-hidden cursor-default"
          >
            {/* Card bg */}
            <div className="absolute inset-0 bg-white dark:bg-[#0A0F1C] border border-slate-200 dark:border-white/[0.06] rounded-[1.75rem] transition-all duration-500 group-hover:border-blue-500/40 group-hover:shadow-[0_20px_60px_rgba(59,130,246,0.12)] dark:group-hover:shadow-[0_20px_60px_rgba(59,130,246,0.08)]" />
            {/* Animated gradient shimmer top */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {/* Corner glow blob */}
            <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-blue-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="relative z-10 p-7 flex flex-col h-full">
              {/* Icon + Category header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 rounded-xl bg-blue-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative p-3 bg-slate-100 dark:bg-white/[0.06] rounded-xl border border-slate-200 dark:border-white/[0.08] group-hover:border-blue-500/30 transition-colors duration-400">
                    <skillGroup.icon className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-blue-500 transition-colors duration-300" />
                  </div>
                </div>
                <h3 className="text-[13px] font-extrabold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white tracking-[0.08em] uppercase transition-colors">
                  {skillGroup.category}
                </h3>
              </div>

              {/* Skill pills */}
              <div className="flex flex-wrap gap-2 flex-grow">
                {skillGroup.items.map((skill, sIdx) => (
                  <motion.span
                    key={sIdx}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.06 + sIdx * 0.04 }}
                    className="text-[12px] font-semibold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-white/[0.06] group-hover:bg-blue-50 dark:group-hover:bg-blue-500/10 group-hover:text-blue-700 dark:group-hover:text-blue-300 group-hover:border-blue-200 dark:group-hover:border-blue-500/20 transition-all duration-300"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>

              {/* Bottom count indicator */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/[0.04] flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 dark:text-slate-600 group-hover:text-blue-400 transition-colors">
                  {skillGroup.items.length} tools
                </span>
                <div className="flex gap-1">
                  {skillGroup.items.slice(0, 5).map((_, i) => (
                    <div key={i} className="w-1 h-1 rounded-full bg-slate-300 dark:bg-white/[0.15] group-hover:bg-blue-400 transition-colors duration-300" style={{ transitionDelay: `${i * 50}ms` }} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
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
                      <h3 className={`text-3xl font-extrabold tracking-tight transition-colors ${job.isHighlight ? 'text-violet-700 dark:text-violet-300' : 'text-slate-800 dark:text-slate-100 group-hover:text-blue-700 dark:group-hover:text-blue-300'}`}>{job.title}</h3>
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

    {/* PROJECTS SECTION */}
    <section id="projects" className="scroll-mt-40">
      <FadeInSection>
        <SectionHeading title="Simulations & Operations" icon={Crosshair} />
      </FadeInSection>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {RESUME_DATA.projects.slice(0, 4).map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
            className="group relative rounded-[2rem] overflow-hidden cursor-default"
          >
            {/* Base card */}
            <div className="absolute inset-0 bg-white dark:bg-[#0A0F1C] border border-slate-200 dark:border-white/[0.06] rounded-[2rem] transition-all duration-500 group-hover:border-blue-500/30 group-hover:shadow-[0_25px_60px_rgba(59,130,246,0.1)] dark:group-hover:shadow-[0_25px_60px_rgba(59,130,246,0.07)]" />
            {/* Top gradient line */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-violet-500 to-blue-400 origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 + 0.3, ease: 'easeOut' }}
            />
            {/* Corner glow */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-blue-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="relative z-10 p-8 flex flex-col h-full">
              {/* Header row */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex-1">
                  {/* Number + date row */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[11px] font-black tracking-[0.3em] text-blue-500/60 uppercase">0{idx + 1}</span>
                    <span className="flex-1 h-[1px] bg-blue-500/15"></span>
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/15">
                      {project.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 leading-snug group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-400">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Org badge */}
              <div className="inline-flex items-center gap-2 mb-6 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/[0.05] text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/[0.05] w-fit group-hover:border-blue-500/20 transition-colors">
                <Lock className="w-3 h-3 text-blue-500/60" />
                {project.org}
              </div>

              {/* Points */}
              <ul className="space-y-3 flex-grow">
                {project.points.map((point, pIdx) => (
                  <li key={pIdx} className="flex gap-3 text-[13px] text-slate-600 dark:text-slate-400 font-light leading-relaxed group/item">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 shrink-0 mt-1.5 group-hover/item:bg-blue-500 transition-colors duration-200" />
                    <span className="group-hover/item:text-slate-800 dark:group-hover/item:text-slate-200 transition-colors duration-200">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Projects CTA */}
      <FadeInSection delay={400}>
        <div className="mt-16 flex flex-col items-center gap-4 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-light">
            Showing <span className="text-blue-500 font-bold">4 of {RESUME_DATA.projects.length}</span> operations
          </p>
          <Link
            to="/projects"
            className="group inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm tracking-widest uppercase shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-[0_0_50px_rgba(37,99,235,0.55)] transition-all duration-300 hover:-translate-y-1"
          >
            <Crosshair className="w-4 h-4" />
            View All Operations
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </FadeInSection>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
                {certificationsData.map((cert, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    whileHover={{ 
                      y: -8,
                      scale: 1.02,
                      rotateY: 5,
                      rotateX: -5,
                      transition: { duration: 0.4, ease: "easeOut" }
                    }}
                    transition={{ delay: (idx % 8) * 0.1, duration: 0.6, type: "spring", stiffness: 100 }}
                    viewport={{ once: true, margin: "-50px" }}
                    key={idx}
                    className="relative group perspective-1000"
                    style={{ perspective: "1000px" }}
                  >
                    <Link to={`/verify/${cert.id}`} className="flex flex-col bg-white/80 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all duration-500 shadow-md hover:shadow-[0_20px_40px_rgba(59,130,246,0.2)] cursor-pointer h-full relative z-10 backdrop-blur-sm">
                      {/* Shiny sweep effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out z-20 pointer-events-none" />
                      
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800/50">
                        <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
                        <img 
                          src={cert.image} 
                          alt={`${cert.title} Certificate`} 
                          className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-700 ease-[0.16,1,0.3,1]"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-end justify-center p-4">
                          <div className="flex items-center gap-2 bg-blue-600/90 backdrop-blur-md px-4 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 border border-blue-400/50 shadow-lg">
                            <span className="text-white text-[10px] font-bold tracking-widest uppercase">Verify</span>
                            <ExternalLink className="w-3.5 h-3.5 text-white" />
                          </div>
                        </div>
                      </div>
                      <div className="p-5 flex flex-col items-center text-center relative overflow-hidden">
                        {/* Subtle background glow in footer */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <span className="text-sm font-extrabold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1 relative z-10">{cert.title}</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold tracking-[0.2em] uppercase mt-1.5 relative z-10 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">{cert.issuer}</span>
                      </div>
                    </Link>
                    
                    {/* Floating ambient glow behind card */}
                    <div className="absolute -inset-2 bg-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                  </motion.div>
                ))}
              </div>
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
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sections = ['about', 'skills', 'experience', 'projects'];
    const observers = [];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
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

      {/* SCROLL PROGRESS BAR */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-violet-500 to-blue-400 origin-left z-[60] shadow-[0_0_10px_rgba(99,102,241,0.6)]"
        style={{ scaleX }}
      />

      {/* BACK TO TOP BUTTON */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold tracking-widest uppercase shadow-[0_8px_30px_rgba(37,99,235,0.4)] hover:shadow-[0_12px_40px_rgba(37,99,235,0.6)] transition-all duration-300 hover:-translate-y-1 group"
            aria-label="Back to top"
          >
            <svg className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
            Top
          </motion.button>
        )}
      </AnimatePresence>

      <nav className={`fixed top-[3px] w-full z-50 transition-all duration-700 ${scrolled || mobileMenuOpen ? 'bg-white/95 dark:bg-[#060913]/95 backdrop-blur-2xl border-b border-slate-200 dark:border-white/[0.05] shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.4)]' : 'bg-transparent'} ${mobileMenuOpen ? 'py-4' : scrolled ? 'py-4' : 'py-6'}`}>
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
            {['About', 'Skills', 'Experience', 'Projects'].map((item) => {
              const isActive = activeSection === item.toLowerCase();
              return (
                <a key={item} href={`/#${item.toLowerCase()}`} className={`transition-all relative group font-bold tracking-[0.1em] uppercase text-sm ${ isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-white' }`}>
                  {item}
                  <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 rounded-full bg-blue-500 dark:bg-blue-400 transition-all duration-300 ${ isActive ? 'w-full opacity-100' : 'w-1 opacity-0 group-hover:opacity-100 group-hover:w-1' }`}></span>
                </a>
              );
            })}
            <Link to="/blog" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative group px-2">
              <span className="font-bold">BLOG</span>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
            </Link>
            <Link
              to="/resume"
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600/10 hover:bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 hover:border-blue-500/60 text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300"
            >
              <FileDown className="w-3.5 h-3.5" /> <span className="text-slate-700 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white transition-colors">Resume</span>
            </Link>
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
              className="hidden md:flex px-7 py-3 bg-slate-100 dark:bg-white/[0.03] hover:bg-blue-600 dark:hover:bg-blue-600 text-slate-800 dark:text-slate-200 hover:text-white dark:hover:text-white border border-slate-200 dark:border-white/[0.1] hover:border-blue-500/50 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-500 hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] items-center gap-2 backdrop-blur-md"
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
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.22 }}
                >
                  <Link
                    to="/resume"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-blue-600 dark:text-blue-400 font-bold tracking-[0.15em] uppercase text-sm py-4 border-b border-slate-100 dark:border-white/[0.04] flex items-center justify-between group"
                  >
                    <span className="flex items-center gap-2"><FileDown className="w-4 h-4" /> Resume</span>
                    <ChevronRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-all duration-200" />
                  </Link>
                </motion.div>
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
        <Route path="/projects" element={<AllProjects />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/verify/:id" element={<VerifyCert />} />
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
                  { icon: FileDown, text: "Professional Resume", link: "/resume" },
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
