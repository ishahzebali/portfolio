import React from 'react';
import Reveal from '../Reveal';
import { ShieldAlert, Zap, Network } from 'lucide-react';

const Expertise = () => {
  const domains = [
    {
      title: 'Blue Team Operations',
      icon: <ShieldAlert size={40} />,
      desc: 'Proactive monitoring and threat mitigation utilizing industry-standard SIEM and EDR solutions.',
      tags: ['Incident Triage', 'Splunk', 'MS Sentinel', 'TheHive', 'Cortex', 'Phishing Analysis']
    },
    {
      title: 'Red Team Tactics',
      icon: <Zap size={40} />,
      desc: 'Simulating adversary behaviors to identify vulnerabilities before they can be exploited.',
      tags: ['Penetration Testing', 'Nmap', 'Burp Suite', 'Metasploit', 'Hydra', 'OWASP Top 10']
    },
    {
      title: 'Network & Systems',
      icon: <Network size={40} />,
      desc: 'Deep understanding of the infrastructure that supports—and exposes—modern enterprises.',
      tags: ['TCP/IP', 'Pyramid of Pain', 'Linux CLI', 'Windows Internals', 'Active Directory', 'DNS/HTTP']
    }
  ];

  return (
    <section id="expertise" className="container">
      <Reveal>
        <h2>Technical Arsenal</h2>
        <div className="domains-grid">
          {domains.map((domain) => (
            <div key={domain.title} className="domain-card glass">
              <div className="domain-icon">{domain.icon}</div>
              <h3>{domain.title}</h3>
              <p>{domain.desc}</p>
              <div className="tags">
                {domain.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <style jsx="true">{`
        .domains-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
        }

        .domain-card {
          padding: 40px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: 0.3s;
        }

        .domain-card:hover {
          transform: translateY(-10px) scale(1.02);
          border-color: var(--accent-gold);
          background: rgba(17, 34, 64, 0.8);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }

        .domain-icon {
          color: var(--accent-gold);
          margin-bottom: 20px;
          transition: 0.3s;
        }

        .domain-card:hover .domain-icon {
          transform: scale(1.1);
          color: var(--accent-hover);
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: auto;
          padding-top: 20px;
        }

        .tag {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          background: rgba(197, 160, 130, 0.1);
          color: var(--accent-gold);
          padding: 5px 12px;
          border-radius: 4px;
          transition: 0.3s;
        }

        .tag:hover {
          background: var(--accent-gold);
          color: var(--bg-dark);
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
};

export default Expertise;
