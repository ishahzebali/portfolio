import React from 'react';
import { motion } from 'framer-motion';
import {
  MapPin, Mail, Phone, Linkedin, ExternalLink, ShieldAlert,
  Briefcase, Award, GraduationCap, Bug, ChevronRight, FileDown,
  Activity, Database, Eye, Server, Code, ShieldCheck, Cpu, Crosshair, 
  Terminal, Globe, Lock, User
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { certificationsData } from '../data/certificationsData';

const RESUME_DATA = {
  personal: {
    name: "Shahzeb Ali",
    titles: ["SOC Analyst (Level 1)", "Cybersecurity Analyst", "Purple Team Specialist"],
    location: "Abu Dhabi, UAE",
    phone: "+971 58 611 2232",
    email: "shahzeb@shahsmen.com",
    linkedin: "linkedin.com/in/ishahzebali",
    website: "shahsmen.com",
    image: "/assets/images/profile.jpg",
    details: "Nationality: Pakistani | Visa: UAE Family-Sponsored Residence Visa | Languages: English (Fluent), Urdu (Native)"
  },
  summary: "Results-driven SOC Analyst with over 2 years of hands-on incident response experience across healthcare and technology environments. Specialises in SIEM-based threat detection, log correlation, and full-lifecycle incident management. Holds a unique purple team advantage - using penetration testing knowledge to sharpen defensive detection logic and reduce false-positive rates. Recognised on YesWeHack for responsibly disclosing a critical Broken Access Control vulnerability in Deezer, resulting in a global patch. Proficient in Splunk, Microsoft Sentinel, ELK Stack, Wireshark, and Sysmon; deeply versed in MITRE ATT&CK, the Cyber Kill Chain, and ISO/IEC 27001.",
  skills: [
    { category: "SIEM & Monitoring", icon: Activity, items: ["Splunk", "Microsoft Sentinel", "ELK Stack", "Azure Cloud Defender", "Snort", "Sysmon", "EDR/XDR", "SOAR"], color: "blue" },
    { category: "Incident Response", icon: ShieldAlert, items: ["Alert Triage", "IOC Extraction", "Escalation", "Root Cause Analysis", "Phishing Analysis", "Post-Incident Reporting"], color: "red" },
    { category: "Log Analysis", icon: Database, items: ["Windows Event Logs", "Linux Syslog", "Firewall Logs", "IDS/IPS Alerts", "Azure AD Sign-in Logs", "Web Activity Logs"], color: "indigo" },
    { category: "Threat Intelligence", icon: Eye, items: ["MITRE ATT&CK", "Cyber Kill Chain", "Pyramid of Pain", "Diamond Model", "TTP Mapping", "Vulnerability Tracking"], color: "emerald" },
    { category: "Offensive Security", icon: Bug, items: ["Burp Suite", "Nmap", "Metasploit", "Hydra", "Gobuster", "OWASP Top 10", "API Security Testing", "Responsible Disclosure"], color: "violet" },
    { category: "Network & Protocols", icon: Server, items: ["Wireshark", "TCP/IP", "DNS", "HTTP/S", "OSI Model", "Packet Analysis", "DNS Tunnelling Detection"], color: "sky" },
    { category: "Systems & Scripting", icon: Code, items: ["Windows Internals", "Linux CLI", "Active Directory", "PowerShell", "Python", "Bash", "Privilege Escalation Analysis"], color: "orange" },
    { category: "Frameworks & GRC", icon: ShieldCheck, items: ["ISO/IEC 27001", "NIST CSF", "CIS Controls", "RBAC", "Security Awareness"], color: "teal" }
  ],
  experience: [
    {
      title: "SOC Analyst L1",
      company: "CureMD",
      location: "Lahore, Pakistan",
      date: "Dec 2022 – Jul 2024",
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
      company: "Arwen Tech",
      location: "Lahore, Pakistan",
      date: "Feb 2022 – Aug 2022",
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
      location: "Remote",
      date: "Aug 2025",
      highlight: true,
      points: [
        "Discovered a critical Insecure Direct Object Reference (IDOR) / Broken Access Control vulnerability in Deezer's production API.",
        "Authored a comprehensive Proof of Concept (PoC) mapped to OWASP Top 10 (A01:2021), enabling a global security patch.",
        "Applied systematic API endpoint behavioural analysis using Burp Suite."
      ]
    }
  ],
  education: {
    degree: "Bachelor of Science in Computer Science",
    institution: "Lahore Garrison University",
    location: "Lahore, Pakistan",
    date: "2020 – 2025"
  },
  projects: [
    {
      title: "End-to-End Ransomware Emulation & Detection Engineering",
      org: "Purple Team Lab",
      date: "Feb 2026",
      points: [
        "Architected a secure sandbox environment to emulate full-lifecycle Ransomware execution chains (Initial Access -> Persistence -> Impact), utilizing Atomic Red Team to trigger specific TTPs.",
        "Monitored telemetry via Sysmon and Windows Lifecycle events, capturing granular activity such as Volume Shadow Copy deletion (T1490) and high-frequency file modification (T1486).",
        "Engineered high-fidelity detection logic in Splunk using SPL (Search Processing Language), creating persistent alerting rules that surfaced encrypted behavior with a 0% false-positive rate during validation."
      ]
    },
    {
      title: "Azure Sentinel (SIEM) & SOAR Automation Playbook Development",
      org: "Cloud Security Lab",
      date: "Feb 2026",
      points: [
        "Deployed a cloud-native SIEM environment utilizing Microsoft Sentinel, ingesting Azure AD, Office 365, and Defender for Endpoint telemetry via custom Data Connectors.",
        "Developed automated SOAR (Security Orchestration, Automation, and Response) playbooks using Azure Logic Apps and Python to perform instant IP enrichment and automated account suspension.",
        "Visualized security posture through KQL (Kusto Query Language) Workbooks, enabling real-time monitoring of identity-based threat vectors and cloud misconfigurations."
      ]
    },
    {
      title: "Advanced SIEM Integration & Threat Correlation Lab",
      org: "Personal Initiative",
      date: "Jan 2026",
      points: [
        "Architected a custom Elasticsearch, Logstash, and Kibana (ELK) stack via Docker, engineering a centralized logging pipeline for Windows Event Logs and Sysmon telemetry.",
        "Designed real-time SIEM dashboards to monitor anomalous network activity and lateral movement, mapping custom alerts directly to the MITRE ATT&CK framework.",
        "Successfully surfaced active brute-force attempts during simulated breach events by correlating disparate log sources into high-fidelity actionable security incidents."
      ]
    }
  ]
};

const SectionHeader = ({ title, icon: Icon, subtitle }) => (
  <div className="flex flex-col mb-10">
    <div className="flex items-center gap-4 mb-2">
      <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
        <Icon size={20} className="text-blue-400" />
      </div>
      <h2 className="text-2xl font-black tracking-widest uppercase text-slate-900 dark:text-white drop-shadow-[0_0_10px_rgba(37,99,235,0.1)]">
        {title}
      </h2>
    </div>
    {subtitle && <p className="text-slate-500 text-xs font-mono uppercase tracking-[0.2em] ml-14">{subtitle}</p>}
  </div>
);

const Resume = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050810] selection:bg-blue-500/30 transition-colors duration-500">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-600/5 dark:bg-violet-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] dark:opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-24"
      >
        {/* ── SECURITY CLEARANCE HEADER ── */}
        <header className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12 mb-24">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-500/30 rounded-[2.5rem] blur-2xl group-hover:bg-blue-500/30 dark:group-hover:bg-blue-500/40 transition-all duration-700"></div>
              <div className="relative p-1 rounded-[2.5rem] bg-gradient-to-br from-blue-500/30 to-violet-500/30 dark:from-blue-500/50 dark:to-violet-500/50 border border-slate-200 dark:border-white/10 shadow-xl">
                <img
                  src={RESUME_DATA.personal.image}
                  alt={RESUME_DATA.personal.name}
                  className="h-40 w-40 md:h-48 md:w-48 object-cover rounded-[2.2rem] shadow-2xl grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 bg-white dark:bg-slate-800"
                />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white dark:bg-[#050810] border border-blue-500/20 dark:border-blue-500/30 shadow-xl">
                <span className="text-[10px] font-mono font-black tracking-[0.3em] text-blue-600 dark:text-blue-400 uppercase whitespace-nowrap">ID: SHAHS-8291</span>
              </div>
            </motion.div>

            <div className="text-center md:text-left flex flex-col gap-4">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
                  <div className="h-[2px] w-8 bg-blue-500/30 dark:bg-blue-500/50"></div>
                  <span className="text-xs font-mono font-bold tracking-[0.4em] text-blue-600 dark:text-blue-500 uppercase">Operational Dossier</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-slate-900 dark:text-white leading-none">
                  Shahzeb <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-500">Ali</span>
                </h1>
              </motion.div>

              <motion.div 
                className="flex flex-wrap gap-2 justify-center md:justify-start"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {RESUME_DATA.personal.titles.map((t, i) => (
                  <span key={i} className="px-4 py-1.5 rounded-xl bg-slate-200/50 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-[10px] font-black tracking-[0.15em] uppercase text-slate-600 dark:text-slate-400">
                    {t}
                  </span>
                ))}
              </motion.div>

              <motion.div
                className="flex flex-wrap items-center gap-6 mt-4 justify-center md:justify-start"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest">
                  <MapPin size={14} className="text-blue-600 dark:text-blue-500" /> {RESUME_DATA.personal.location}
                </div>
                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest">
                  <Globe size={14} className="text-violet-600 dark:text-violet-500" /> {RESUME_DATA.personal.website}
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <a
              href="/Shahzeb_Ali_Resume.pdf"
              download="Shahzeb_Ali_Resume.pdf"
              className="group relative flex items-center gap-4 px-10 py-5 bg-gradient-to-br from-blue-600 to-violet-600 rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(37,99,235,0.15)] dark:shadow-[0_20px_40px_rgba(37,99,235,0.2)] hover:shadow-[0_25px_50px_rgba(37,99,235,0.3)] dark:hover:shadow-[0_25px_50px_rgba(37,99,235,0.4)] transition-all active:scale-95"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <FileDown size={24} className="text-white group-hover:scale-110 transition-transform" />
              <div className="flex flex-col items-start leading-tight">
                <span className="text-[10px] font-mono font-black tracking-widest text-white/70 uppercase">System Export</span>
                <span className="text-lg font-black text-white uppercase tracking-tighter">Download PDF</span>
              </div>
            </a>
          </motion.div>
        </header>

        {/* ── MISSION OBJECTIVE (SUMMARY) ── */}
        <section className="mb-32 relative">
          <div className="absolute -left-10 top-0 bottom-0 w-[1px] bg-gradient-to-b from-blue-500/30 via-transparent to-transparent hidden xl:block shadow-[0_0_10px_rgba(59,130,246,0.1)]"></div>
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 40 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-[1fr_2.5fr] gap-12 items-start"
          >
            <div className="sticky top-32">
              <SectionHeader title="Objective" icon={Crosshair} subtitle="Mission Statement" />
            </div>
            <div className="relative p-10 rounded-[2.5rem] bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 backdrop-blur-3xl overflow-hidden shadow-xl dark:shadow-none group">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] dark:opacity-[0.05] text-slate-900 dark:text-white group-hover:scale-110 transition-transform">
                <Terminal size={120} />
              </div>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed tracking-tight italic">
                "{RESUME_DATA.summary}"
              </p>
              <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/5 flex items-center gap-10">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono font-black text-blue-600 dark:text-blue-500 uppercase tracking-widest mb-1">Node Status</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white uppercase font-mono">Verified Active</span>
                  </div>
                </div>
                <div className="flex flex-col text-slate-400 dark:text-slate-500">
                  <span className="text-[10px] font-mono font-black uppercase tracking-widest mb-1">Clearance</span>
                  <span className="text-xs font-bold uppercase font-mono tracking-tight">T-4 Restricted</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── TECHNICAL ARSENAL (SKILLS BENTO) ── */}
        <section className="mb-32">
          <SectionHeader title="Arsenal" icon={Cpu} subtitle="Technical Skill Matrix" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {RESUME_DATA.skills.map((skillGroup, i) => (
              <motion.div
                key={i}
                whileInView={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative p-8 rounded-[2rem] bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-blue-500/20 dark:hover:border-blue-500/30 transition-all duration-500 overflow-hidden shadow-lg dark:shadow-2xl"
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/30 dark:via-blue-500/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000 ease-in-out"></div>
                
                <div className={`p-3 w-fit rounded-2xl bg-${skillGroup.color}-500/5 dark:bg-${skillGroup.color}-500/10 border border-${skillGroup.color}-500/10 dark:border-${skillGroup.color}-500/20 mb-6 group-hover:scale-110 transition-transform`}>
                  <skillGroup.icon size={24} className={`text-${skillGroup.color}-600 dark:text-${skillGroup.color}-400`} />
                </div>
                
                <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                  {skillGroup.category}
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, j) => (
                    <span key={j} className="text-[10px] px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-500 font-mono font-bold uppercase tracking-wider group-hover:bg-blue-50 dark:group-hover:bg-white/10 group-hover:text-blue-600 dark:group-hover:text-slate-300 transition-all">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── OPERATIONAL LOGS (EXPERIENCE TIMELINE) ── */}
        <section className="mb-32">
          <SectionHeader title="History" icon={Briefcase} subtitle="Operational Log Timeline" />
          <div className="relative space-y-12">
            <div className="absolute left-[31px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-blue-500/20 dark:from-blue-500/50 via-violet-500/10 dark:via-violet-500/30 to-transparent"></div>
            {RESUME_DATA.experience.map((job, i) => (
              <motion.div
                key={i}
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -20 }}
                viewport={{ once: true }}
                className="relative pl-24 group"
              >
                {/* Timeline Point */}
                <div className="absolute left-0 top-0 p-4 rounded-2xl bg-white dark:bg-[#050810] border border-slate-200 dark:border-white/10 group-hover:border-blue-500 transition-all z-20 shadow-lg">
                  <Activity size={32} className={`${job.highlight ? 'text-violet-600 dark:text-violet-500' : 'text-blue-600 dark:text-blue-500'} group-hover:animate-pulse`} />
                </div>

                <div className={`p-10 rounded-[2.5rem] border backdrop-blur-2xl transition-all duration-700 shadow-xl dark:shadow-2xl ${
                  job.highlight 
                  ? 'bg-violet-500/[0.03] dark:bg-violet-500/5 border-violet-200 dark:border-violet-500/20 shadow-violet-500/5' 
                  : 'bg-white dark:bg-white/[0.02] border-slate-200 dark:border-white/5'
                }`}>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] font-mono font-black text-blue-600 dark:text-blue-500 uppercase tracking-widest">Entry 0{i + 1}</span>
                        {job.highlight && <span className="px-2 py-0.5 rounded-lg bg-violet-600 text-white text-[8px] font-black uppercase">Critical Highlight</span>}
                      </div>
                      <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none mb-2">
                        {job.title}
                      </h3>
                      <p className="text-xl font-bold text-blue-700 dark:text-blue-400 opacity-80 uppercase tracking-tight">
                        {job.company} <span className="text-slate-400 dark:text-slate-600 mx-2">//</span> <span className="text-slate-500 text-sm">{job.location}</span>
                      </p>
                    </div>
                    <div className="px-6 py-3 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-inner">
                      <span className="text-xs font-mono font-black text-slate-500 dark:text-slate-400 tracking-widest uppercase">{job.date}</span>
                    </div>
                  </div>

                  <ul className="grid md:grid-cols-2 gap-6">
                    {job.points.map((pt, j) => (
                      <li key={j} className="flex gap-4 group/li">
                        <div className="mt-1.5 shrink-0 w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-500 group-hover/li:scale-150 group-hover/li:bg-slate-900 dark:group-hover/li:bg-white transition-all"></div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed group-hover/li:text-slate-900 dark:group-hover/li:text-slate-200 transition-colors">
                          {pt}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── PROJECTS & MISSIONS ── */}
        <section className="mb-32">
          <SectionHeader title="Missions" icon={Lock} subtitle="Key Offensive & Defensive Projects" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {RESUME_DATA.projects.map((proj, i) => (
              <motion.div
                key={i}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-10 rounded-[2.5rem] bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-blue-500/20 dark:hover:border-blue-500/30 transition-all duration-500 shadow-xl dark:shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="p-3 rounded-2xl bg-blue-600/5 dark:bg-blue-500/10 border border-blue-600/10 dark:border-blue-500/20 shadow-sm">
                      <Terminal size={20} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-[10px] font-mono font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{proj.date}</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-tight mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-500 uppercase tracking-[0.3em] mb-8">{proj.org}</p>
                  
                  <div className="space-y-4">
                    {proj.points.map((pt, j) => (
                      <div key={j} className="flex gap-4">
                        <ChevronRight size={14} className="mt-1 shrink-0 text-slate-300 dark:text-slate-700 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors" />
                        <p className="text-xs text-slate-500 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-400 leading-relaxed font-medium transition-colors">{pt}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-10 pt-8 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <span className="text-[9px] font-mono font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">Protocol: RSA/AES-256</span>
                  <div className="flex items-center gap-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-500"></div>
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-600/40 dark:bg-blue-500/40"></div>
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-600/10 dark:bg-blue-500/10"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── ACADEMIC INTEL & VERIFIED CERTS ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.section 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -30 }}
            viewport={{ once: true }}
          >
            <SectionHeader title="Verification" icon={Award} subtitle="Verified Certifications" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certificationsData.slice(0, 8).map((cert, i) => (
                <Link key={i} to={`/verify/${cert.id}`} className="group flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-violet-500/30 dark:hover:border-violet-500/40 transition-all hover:bg-slate-50 dark:hover:bg-white/[0.05] shadow-sm">
                  <div className="relative w-16 h-12 shrink-0 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 group-hover:scale-105 transition-transform bg-white">
                    <img src={cert.image} alt={cert.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100" loading="lazy" />
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-xs text-slate-900 dark:text-white font-black uppercase tracking-tight group-hover:text-violet-600 dark:group-hover:text-violet-400 truncate">{cert.title}</span>
                    <span className="text-[8px] font-mono font-bold text-slate-400 dark:text-slate-500 tracking-widest uppercase truncate">{cert.issuer}</span>
                  </div>
                </Link>
              ))}
            </div>
            <Link to="/#expertise" className="inline-flex items-center gap-2 mt-8 text-[11px] font-black text-blue-600 dark:text-blue-500 uppercase tracking-widest hover:text-slate-900 dark:hover:text-white transition-colors group">
              View All Operations <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.section>

          <motion.section 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 30 }}
            viewport={{ once: true }}
          >
            <SectionHeader title="Education" icon={GraduationCap} subtitle="Academic Foundation" />
            <div className="p-10 rounded-[2.5rem] bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 text-center group relative overflow-hidden shadow-xl dark:shadow-2xl">
              <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="p-5 w-fit rounded-full bg-blue-600/5 dark:bg-blue-500/10 border border-blue-600/10 dark:border-blue-500/20 mx-auto mb-8 group-hover:scale-110 transition-transform">
                <GraduationCap size={40} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2 leading-none">
                {RESUME_DATA.education.degree}
              </h3>
              <p className="text-xl font-bold text-blue-700 dark:text-blue-400 opacity-80 uppercase tracking-tight mb-2">
                {RESUME_DATA.education.institution}
              </p>
              <p className="text-slate-500 dark:text-slate-500 text-sm uppercase tracking-widest font-mono mb-8">{RESUME_DATA.education.location}</p>
              <div className="inline-block px-10 py-3 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono font-black text-slate-600 dark:text-slate-300 tracking-[0.3em] uppercase">
                CLASS OF {RESUME_DATA.education.date.split('–')[1].trim()}
              </div>
            </div>
          </motion.section>
        </div>

        {/* ── METADATA FOOTER ── */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 p-8 rounded-[2rem] bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg dark:shadow-2xl"
        >
          <div className="flex items-center gap-6">
            <div className="group flex items-center gap-3">
              <User size={16} className="text-blue-600 dark:text-blue-500" />
              <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest">{RESUME_DATA.personal.details}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
            <Activity size={14} className="text-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-500/80 uppercase tracking-widest">Protocol: Active Integrity Sync</span>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default Resume;
