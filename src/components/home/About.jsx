import React from 'react';
import Reveal from '../Reveal';

const About = () => {
  const skills = [
    'Splunk & ELK Stack',
    'Metasploit & Nmap',
    'Python & Bash',
    'Wireshark',
    'Cortex & TheHive',
    'MITRE ATT&CK Framework'
  ];

  const certs = [
    { name: 'SOC L1 (TryHackMe)', icon: 'shield-alt' },
    { name: 'CyberSecurity 101', icon: 'user-secret' },
    { name: 'Pre-Security (TryHackMe)', icon: 'lock' },
    { name: 'Linux 100: Fundamentals (TCM Security)', icon: 'linux', brand: true },
    { name: 'Python (Codedex)', icon: 'python', brand: true },
    { name: 'Bash Scripting (CodeAcademy)', icon: 'terminal' },
  ];

  return (
    <section id="about" className="container">
      <Reveal>
        <h2>About Me</h2>
        <div className="about-grid">
          <div className="about-text">
            <p>
              Hello! I'm Shahzeb, an entry-level SOC Analyst with a Bachelor's in <b>Computer Science</b> from Lahore Garrison University. My journey in cybersecurity is driven by a curiosity for how systems break—and how to forge them stronger.
            </p>
            <p>
              I have hands-on experience in <b>incident triage</b>, <b>log analysis</b>, and executing <b>offensive security</b> assessments. I don't just watch the alerts; I understand the attack vectors behind them to protect data integrity.
            </p>
            <p>Here are a few technologies I've been working with recently:</p>
            <ul className="skill-list">
              {skills.map(skill => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
          
          <div className="cert-column">
            <div className="cert-card glass">
              <h4><i className="fas fa-certificate"></i> Certifications</h4>
              <ul className="cert-list">
                {certs.map(cert => (
                  <li key={cert.name}>
                    <i className={`${cert.brand ? 'fab' : 'fas'} fa-${cert.icon}`}></i>
                    {cert.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="thm-badge-container">
              <iframe 
                src="https://tryhackme.com/api/v2/badges/public-profile?userPublicId=5126748" 
                title="TryHackMe Profile Badge" 
                style={{ border: 'none', width: '100%', height: '250px', overflow: 'hidden' }} 
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </Reveal>

      <style jsx="true">{`
        .about-grid {
          display: grid;
          grid-template-columns: 2fr 1.2fr;
          gap: 50px;
          align-items: start;
        }

        .skill-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-top: 20px;
        }

        .skill-list li {
          position: relative;
          padding-left: 20px;
          font-family: var(--font-mono);
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .skill-list li::before {
          content: '▹';
          position: absolute;
          left: 0;
          color: var(--accent-gold);
        }

        .cert-card {
          padding: 30px;
          margin-bottom: 25px;
        }

        .cert-card h4 {
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .cert-list li {
          margin-bottom: 12px;
          font-size: 0.9rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .cert-list i {
          color: var(--accent-gold);
          width: 20px;
          text-align: center;
        }

        .thm-badge-container {
          margin-top: 20px;
          display: flex;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
