import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Crosshair, Lock, ChevronRight, Briefcase, ArrowLeft } from 'lucide-react';

const PROJECTS = [
  {
    title: "End-to-End Ransomware Emulation & Detection Engineering",
    org: "Purple Team Lab",
    date: "Feb 2026",
    points: [
      "Architected a secure sandbox environment to emulate full-lifecycle Ransomware execution chains (Initial Access → Persistence → Impact), utilizing Atomic Red Team to trigger specific TTPs.",
      "Monitored telemetry via Sysmon and Windows Lifecycle events, capturing granular activity such as Volume Shadow Copy deletion (T1490) and high-frequency file modification (T1486).",
      "Engineered high-fidelity detection logic in Splunk using SPL, creating persistent alerting rules that surfaced encrypted behavior with a 0% false-positive rate during validation.",
    ],
  },
  {
    title: "Azure Sentinel (SIEM) & SOAR Automation Playbook Development",
    org: "Cloud Security Lab",
    date: "Feb 2026",
    points: [
      "Deployed a cloud-native SIEM environment utilizing Microsoft Sentinel, ingesting Azure AD, Office 365, and Defender for Endpoint telemetry via custom Data Connectors.",
      "Developed automated SOAR playbooks using Azure Logic Apps and Python to perform instant IP enrichment and automated account suspension.",
      "Visualized security posture through KQL Workbooks, enabling real-time monitoring of identity-based threat vectors and cloud misconfigurations.",
    ],
  },
  {
    title: "Advanced SIEM Integration & Threat Correlation Lab",
    org: "Personal Initiative",
    date: "Jan 2026",
    points: [
      "Architected a custom ELK stack via Docker, engineering a centralized logging pipeline for Windows Event Logs and Sysmon telemetry.",
      "Designed real-time SIEM dashboards to monitor anomalous network activity and lateral movement, mapping custom alerts directly to the MITRE ATT&CK framework.",
      "Successfully surfaced active brute-force attempts during simulated breach events by correlating disparate log sources into high-fidelity actionable security incidents.",
    ],
  },
  {
    title: "Cyber Strategic & Technical Advisory Simulation",
    org: "Deloitte (via Forage)",
    date: "Jan 2026",
    points: [
      "Performed multi-vector threat intelligence analysis to identify emerging TTPs targeting financial infrastructure, providing strategic attribution and mitigation recommendations.",
      "Designed a comprehensive security awareness strategy for a simulated global enterprise, focusing on reducing phishing vulnerability across high-risk business units.",
      "Developed executive-level risk reports and incident response playbooks for C-suite stakeholders, translating technical vulnerabilities into actionable business-risk mitigation strategies.",
    ],
  },
  {
    title: "Enterprise Phishing & Data Exfiltration Investigation",
    org: "TryHackMe",
    date: "Dec 2025",
    points: [
      "Reconstructed the Cyber Kill Chain from phishing access through DNS tunnelling across a compromised enterprise endpoint.",
      "Decoded obfuscated Base64 payloads and reverse-engineered malicious PowerShell execution chains, accurately mapping all attacker TTPs to MITRE ATT&CK.",
      "Leveraged Sysmon forensics to identify Living off the Land (LotL) techniques including malicious Robocopy usage for data staging and DNS-based covert channel exfiltration.",
    ],
  },
  {
    title: "Active Directory Red/Blue Tactics & Mitigation",
    org: "Home Network",
    date: "Jan 2026",
    points: [
      "Constructed a vulnerable Active Directory domain environment to emulate advanced post-exploitation threats like Kerberoasting, AS-REP Roasting, and Pass-the-Hash.",
      "Utilized Splunk to ingest logs from the Domain Controller and authored custom detection logic capable of identifying Golden Ticket creation with 99% accuracy.",
      "Implemented hardened GPO configurations and Tiered Administrative Models to significantly reduce the attack surface and mitigate lateral movement opportunities.",
    ],
  },
  {
    title: "Enterprise SOC Operations & Threat Hunting Simulation",
    org: "Datacom (via Forage)",
    date: "Jan 2026",
    points: [
      "Executed real-time alert triage and investigation within a simulated high-tempo Security Operations Center, identifying unauthorized lateral movement and privilege escalation.",
      "Utilized advanced firewall and proxy log analysis to detect stealthy data exfiltration patterns, leveraging Deep Packet Inspection (DPI) to identify malicious TLS-encrypted payloads.",
      "Drafted and implemented rapid containment protocols for compromised virtual assets, ensuring minimal operational downtime while preserving forensic integrity for root cause analysis.",
    ],
  },
  {
    title: "Vulnerability Scanning Automation & Remediation Pipeline",
    org: "Personal Lab",
    date: "Nov 2025",
    points: [
      "Developed custom Bash and Python scripts to automate continuous Nmap and Nessus scanning pipelines, scheduling reports to a centralized dashboard.",
      "Integrated live CVE threat feeds (NVD API) to auto-prioritize high-CVSS vulnerabilities across target Linux servers, reducing manual triage time by 70%.",
      "Implemented CIS benchmark hardening scripts, mitigating over 85% of identified systemic vulnerabilities across the lab environment.",
    ],
  },
  {
    title: "Mastercard Cybersecurity Virtual Experience",
    org: "Forage",
    date: "Dec 2025",
    points: [
      "Identified active phishing campaigns targeting employees and performed granular risk exposure assessments across departmental boundaries.",
      "Analysed which business units were most susceptible and designed targeted security awareness training programs to address specific attack vectors.",
      "Produced a structured report recommending procedural safeguards and measurable KPIs to track security posture improvement over time.",
    ],
  },
];

const TimelineNode = ({ idx }) => (
  <div className="flex items-center justify-center w-12 h-12 rounded-full border-[4px] border-slate-50 dark:border-[#060913] bg-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.5)] absolute left-0 md:left-1/2 -translate-x-1/2 z-20">
    <Lock className="w-5 h-5 text-white" />
  </div>
);

export default function AllProjects() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-50 dark:bg-[#060913] text-slate-800 dark:text-slate-300 font-sans"
    >
      <Helmet>
        <title>All Projects | Shahzeb Ali – Cybersecurity Specialist</title>
        <meta name="description" content="Full archive of cybersecurity simulations, labs, and operations conducted by Shahzeb Ali, covering SIEM, SOAR, Purple Team, and more." />
      </Helmet>

      {/* ambient glow */}
      <div className="fixed top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-900/10 blur-[130px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-violet-900/10 blur-[140px] pointer-events-none z-0 opacity-10" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 pt-36 pb-32">
        {/* Header */}
        <div className="mb-20">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-slate-500 hover:text-blue-500 transition-colors mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20">
              <Crosshair className="w-7 h-7 text-blue-500" />
            </div>
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-blue-500">Operations Archive</span>
          </div>

          <h1 className="text-6xl lg:text-8xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none mb-6">
            Simulations<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500">& Operations</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-light max-w-2xl leading-relaxed">
            A complete archive of cybersecurity labs, red/blue team simulations, cloud operations, and investigative projects — each mapped to real-world threat vectors and industry frameworks.
          </p>

          <div className="flex items-center gap-3 mt-8 text-xs font-bold tracking-widest uppercase text-slate-400">
            <span className="w-10 h-[1px] bg-blue-500/40"></span>
            {PROJECTS.length} operations documented
          </div>
        </div>

        {/* Full Timeline */}
        <div className="space-y-24 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-blue-500/60 before:via-slate-300 dark:before:via-white/[0.1] before:to-transparent">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full group"
            >
              {/* Node */}
              <TimelineNode idx={idx} />

              {/* Timestamp badge (desktop, opposite side) */}
              <div className={`hidden md:flex absolute top-3 ${idx % 2 === 0 ? 'right-[calc(50%+4rem)]' : 'left-[calc(50%+4rem)]'} z-10`}>
                <span className="text-xs font-bold tracking-[0.3em] uppercase px-6 py-2.5 bg-blue-500/10 backdrop-blur-md rounded-full text-blue-600 dark:text-blue-400 border border-blue-500/20 shadow-inner">
                  {project.date}
                </span>
              </div>

              {/* Card */}
              <div className={`w-[calc(100%-4.5rem)] ml-[4.5rem] md:ml-0 md:w-[calc(50%-4rem)] ${idx % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}>
                <div className="p-10 rounded-[2.5rem] bg-white dark:bg-white/[0.02] backdrop-blur-3xl border border-slate-200 dark:border-white/[0.05] hover:border-blue-500/40 transition-all duration-700 hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_70px_rgba(0,0,0,0.5)] relative overflow-hidden h-full group-hover:bg-slate-50 dark:group-hover:bg-white/[0.03]">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  <div className="flex flex-col mb-8 relative z-10">
                    {/* Mobile timestamp */}
                    <div className="md:hidden text-blue-500 text-xs font-bold tracking-[0.3em] uppercase mb-4 flex items-center gap-3">
                      <span className="w-8 h-[1px] bg-blue-500/50"></span>
                      {project.date}
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-800 dark:text-slate-100 leading-tight group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-500">
                      {project.title}
                    </h2>
                    <div className="inline-flex items-center gap-2 mt-4 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[10px] bg-slate-100 dark:bg-white/[0.05] w-fit px-4 py-1.5 rounded-full border border-slate-200 dark:border-white/[0.05]">
                      <Briefcase className="w-3 h-3 text-blue-500/70" /> {project.org}
                    </div>
                  </div>

                  <ul className="space-y-5 relative z-10">
                    {project.points.map((point, pIdx) => (
                      <li key={pIdx} className="flex gap-4 text-slate-600 dark:text-slate-300 text-sm font-light group/item leading-relaxed">
                        <ChevronRight className="w-4 h-4 shrink-0 mt-0.5 text-blue-500/40 group-hover/item:text-blue-500 group-hover/item:translate-x-1 transition-all duration-300" />
                        <span className="opacity-80 group-hover/item:opacity-100 transition-opacity duration-300">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA at bottom */}
        <div className="mt-32 text-center">
          <p className="text-slate-400 text-sm mb-6 font-light tracking-wide">Interested in collaborating or discussing any of these operations?</p>
          <a
            href="mailto:shahzeb@shahsmen.com"
            className="inline-flex items-center gap-3 px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm tracking-widest uppercase rounded-2xl shadow-[0_0_30px_rgba(37,99,235,0.35)] hover:shadow-[0_0_50px_rgba(37,99,235,0.55)] transition-all duration-300 hover:-translate-y-1"
          >
            Execute Contact
          </a>
        </div>
      </div>
    </motion.div>
  );
}
