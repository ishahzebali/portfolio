import React from 'react';
import Reveal from '../Reveal';
import { ChevronRight } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Independent Security Researcher | Yes WeHack',
      type: 'Bug Bounty Hunting',
      date: 'November 2025 - Present',
      desc: [
        'Conducted black-box security testing on various web applications, focusing on critical OWASP Top 10 vulnerabilities like Broken Access Control and IDOR.',
        'Successfully uncovered and reported a logic vulnerability in a major music streaming platform (Deezer), resulting in a patch and bounty reward.',
        'Utilized Burp Suite to intercept and analyze HTTP traffic, identifying discrepancies between client-side controls and server-side validation.'
      ],
      img: '/assets/images/mistersavant-reward-card-2025_12_19_20_53_11.png',
      tags: ['Bug Bounty', 'Web App Security', 'Burp Suite', 'Logic Vulnerabilities']
    },
    {
      title: 'Enterprise Phishing & Data Exfiltration Simulation',
      type: 'TryHackMe Investigation',
      date: 'December 2025',
      desc: [
        'Conducted a full-lifecycle investigation of a compromised endpoint, reconstructing the Cyber Kill Chain.',
        'Analyzed Sysmon logs to detect "Living off the Land" (LotL) tactics, distinguishing malicious Robocopy use from benign noise.',
        'Identified advanced activities including network reconnaissance via PowerView and stealthy data theft via DNS Tunneling.'
      ],
      tags: ['Sysmon', 'Forensics', 'MITRE ATT&CK']
    },
    {
      title: 'Mastercard Cybersecurity Experience',
      type: 'Forage Job Simulation',
      date: 'December 2025',
      desc: [
        'Served as an analyst on the Security Awareness Team to identify and report phishing threats.',
        'Analyzed business areas requiring robust security training and implemented new procedural safeguards.'
      ],
      tags: ['Phishing Defense', 'Security Awareness', 'Risk Analysis']
    }
  ];

  return (
    <section id="projects" className="container">
      <Reveal>
        <h2>Security Engagements</h2>
        <div className="projects-list">
          {projects.map((project, index) => (
            <div key={index} className="project-card glass">
              <div className="project-top">
                <h3>{project.title}</h3>
                <span className="project-type">{project.type}</span>
              </div>
              <p className="project-date">{project.date}</p>
              <ul className="project-desc">
                {project.desc.map((item, i) => (
                  <li key={i}>
                    <ChevronRight size={18} className="highlight" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {project.img && (
                <img 
                  src={project.img} 
                  alt={`${project.title} Evidence`} 
                  className="project-img" 
                  loading="lazy" 
                  onError={(e) => e.target.style.display = 'none'} 
                />
              )}
              <div className="tags">
                {project.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <style jsx="true">{`
        .projects-list {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .project-card {
          padding: 40px;
          border-left: 3px solid var(--accent-gold);
          transition: 0.3s;
        }

        .project-card:hover {
          transform: translateX(10px);
          background: rgba(22, 44, 80, 0.7);
        }

        .project-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 15px;
          margin-bottom: 5px;
        }

        .project-type {
          font-family: var(--font-mono);
          color: var(--accent-gold);
          font-size: 0.9rem;
        }

        .project-date {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 20px;
        }

        .project-desc {
          margin-bottom: 25px;
        }

        .project-desc li {
          display: flex;
          gap: 10px;
          margin-bottom: 10px;
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        .project-desc li :global(svg) {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .project-img {
          margin: 20px 0;
          width: 100%;
          max-width: 500px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          opacity: 0.9;
          transition: 0.3s;
        }

        .project-img:hover {
          opacity: 1;
          transform: scale(1.02);
        }

        .tag {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          background: rgba(197, 160, 130, 0.1);
          color: var(--accent-gold);
          padding: 5px 12px;
          border-radius: 4px;
          margin-right: 10px;
          margin-bottom: 10px;
          display: inline-block;
        }
      `}</style>
    </section>
  );
};

export default Projects;
