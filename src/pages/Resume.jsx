import React from 'react';
import { motion } from 'framer-motion';
import {
  MapPin, Mail, Phone, Linkedin, ExternalLink, ShieldAlert,
  Briefcase, Award, GraduationCap, Bug, ChevronRight, FileDown,
  Activity, Database, Eye, Server, Code, ShieldCheck, Cpu
} from 'lucide-react';

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
  certifications: [
    "Certified SOC Analyst L1 — TryHackMe",
    "Jr Penetration Tester — TryHackMe",
    "Fortinet Certified Associate in Cybersecurity (FCA) — Fortinet",
    "ISO/IEC 27001 Information Security Associate — Skill Front",
    "CyberSecurity 101 — TryHackMe",
    "Linux 100: Fundamentals — TCM Security"
  ],
  education: {
    degree: "Bachelor of Science in Computer Science",
    institution: "Lahore Garrison University",
    location: "Lahore, Pakistan",
    date: "2020 – 2025"
  }
};

const Section = ({ title, icon: Icon, children }) => (
  <div className="mb-14">
    <div className="flex items-center gap-3 mb-8 pb-3 border-b border-slate-200 dark:border-white/[0.07]">
      <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
        <Icon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
      </div>
      <h2 className="text-xl font-extrabold tracking-widest uppercase text-slate-800 dark:text-slate-100">
        {title}
      </h2>
    </div>
    {children}
  </div>
);

const Resume = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen font-sans"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10 pt-32 pb-24">

        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-16">
          <div className="flex items-center gap-6">
            <div className="relative group/photo">
              <div className="absolute inset-0 rounded-2xl bg-blue-500/20 blur-xl opacity-0 group-hover/photo:opacity-100 transition-opacity duration-500"></div>
              <img
                src={RESUME_DATA.personal.image}
                alt={RESUME_DATA.personal.name}
                className="h-20 w-20 md:h-24 md:w-24 object-cover rounded-2xl border-2 border-slate-200 dark:border-white/[0.1] shadow-2xl relative z-10 group-hover/photo:scale-105 transition-transform duration-500"
              />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                {RESUME_DATA.personal.name}
              </h1>
              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                {RESUME_DATA.personal.titles.map((t, i) => (
                  <span key={i} className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {t}{i < RESUME_DATA.personal.titles.length - 1 && <span className="ml-3 text-slate-300 dark:text-slate-600">|</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <a
            href="/Shahzeb_Ali_Resume.pdf"
            download="Shahzeb_Ali_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold tracking-[0.15em] uppercase rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.35)] hover:shadow-[0_0_30px_rgba(37,99,235,0.55)] hover:-translate-y-0.5 self-start md:self-auto relative z-20 cursor-pointer"
          >
            <FileDown className="w-4 h-4" /> Download PDF
          </a>
        </div>

        {/* ── CONTACT BAR ── */}
        <div className="flex flex-wrap gap-4 mb-14 p-5 rounded-2xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06]">
          {[
            { icon: MapPin, text: RESUME_DATA.personal.location },
            { icon: Phone, text: RESUME_DATA.personal.phone, href: `tel:${RESUME_DATA.personal.phone}` },
            { icon: Mail, text: RESUME_DATA.personal.email, href: `mailto:${RESUME_DATA.personal.email}` },
            { icon: Linkedin, text: "LinkedIn", href: `https://${RESUME_DATA.personal.linkedin}` },
            { icon: ExternalLink, text: RESUME_DATA.personal.website, href: `https://${RESUME_DATA.personal.website}` },
          ].map((item, i) => (
            item.href ? (
              <a key={i} href={item.href} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <item.icon className="w-4 h-4 shrink-0 text-blue-500" />
                {item.text}
              </a>
            ) : (
              <div key={i} className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                <item.icon className="w-4 h-4 shrink-0 text-blue-500" />
                {item.text}
              </div>
            )
          ))}
        </div>

        {/* ── SUMMARY ── */}
        <Section title="Professional Summary" icon={ShieldAlert}>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-light">
            {RESUME_DATA.summary}
          </p>
        </Section>

        {/* ── SKILLS ── */}
        <Section title="Technical Skills" icon={Cpu}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {RESUME_DATA.skills.map((group, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.05] hover:border-blue-400/40 transition-colors group">
                <div className="flex items-center gap-2 mb-3">
                  <group.icon className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                  <h3 className="font-bold text-sm tracking-wide text-slate-800 dark:text-slate-200">{group.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill, j) => (
                    <span key={j} className="text-xs px-3 py-1 rounded-lg bg-slate-200 dark:bg-white/[0.05] text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-white/[0.08] font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── EXPERIENCE ── */}
        <Section title="Work Experience" icon={Briefcase}>
          <div className="space-y-8">
            {RESUME_DATA.experience.map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "100px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`p-7 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
                  job.highlight
                    ? 'bg-violet-50 dark:bg-violet-500/5 border-violet-200 dark:border-violet-500/20 hover:border-violet-400/50'
                    : 'bg-white dark:bg-white/[0.02] border-slate-200 dark:border-white/[0.06] hover:border-blue-400/40'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                  <div>
                    <h3 className={`text-xl font-extrabold tracking-tight ${job.highlight ? 'text-violet-700 dark:text-violet-300' : 'text-slate-900 dark:text-white'}`}>
                      {job.title}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold mt-1 text-sm">
                      {job.company} &mdash; <span className="text-slate-500 dark:text-slate-500 font-normal">{job.location}</span>
                    </p>
                  </div>
                  <span className="shrink-0 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full bg-slate-100 dark:bg-white/[0.05] text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/[0.08]">
                    {job.date}
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {job.points.map((pt, j) => (
                    <li key={j} className="flex gap-3 text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                      <ChevronRight className={`w-4 h-4 shrink-0 mt-0.5 ${job.highlight ? 'text-violet-500' : 'text-blue-500'}`} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ── CERTIFICATIONS + EDUCATION ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <Section title="Certifications" icon={Award}>
            <ul className="space-y-3">
              {RESUME_DATA.certifications.map((cert, i) => (
                <li key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] hover:border-violet-400/40 transition-colors">
                  <ShieldCheck className="w-4 h-4 text-violet-500 dark:text-violet-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{cert}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Education" icon={GraduationCap}>
            <div className="p-7 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] hover:border-blue-400/40 transition-all text-center">
              <GraduationCap className="w-10 h-10 text-blue-500 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
                {RESUME_DATA.education.degree}
              </h3>
              <p className="text-blue-600 dark:text-blue-400 font-semibold mb-1">{RESUME_DATA.education.institution}</p>
              <p className="text-slate-500 dark:text-slate-500 text-sm mb-4">{RESUME_DATA.education.location}</p>
              <span className="inline-block px-5 py-2 rounded-full bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08] text-xs font-bold tracking-widest uppercase text-slate-500 dark:text-slate-400">
                {RESUME_DATA.education.date}
              </span>
            </div>
          </Section>
        </div>

        {/* ── ADDITIONAL ── */}
        <div className="mt-4 p-5 rounded-2xl bg-slate-100 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] text-center">
          <p className="text-sm text-slate-500 dark:text-slate-500 font-medium">
            {RESUME_DATA.personal.details}
          </p>
        </div>

      </div>
    </motion.div>
  );
};

export default Resume;
