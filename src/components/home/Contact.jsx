import React from 'react';
import Reveal from '../Reveal';
import { Mail, Phone, Linkedin, Github, Twitter } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="container">
      <Reveal>
        <div className="contact-box glass">
          <p className="hero-subtitle">What's Next?</p>
          <h2>Get In Touch</h2>
          <p>
            I am currently based in Abu Dhabi and actively seeking opportunities in SOC Analysis and Penetration Testing. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          
          <a href="mailto:shahzeb@shahsmen.com" className="btn btn-fill">Say Hello</a>
          
          <div className="contact-info">
            <p><Phone size={18} className="highlight" /> +971 58 611 2232</p>
            <p><Mail size={18} className="highlight" /> shahzeb@shahsmen.com</p>
          </div>

          <div className="social-links">
            <a href="https://www.linkedin.com/in/ishahzebali" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile"><Linkedin size={24} /></a>
            <a href="https://www.github.com/ishahzebali" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile"><Github size={24} /></a>
            <a href="https://www.twitter.com/ishahzebali" target="_blank" rel="noopener noreferrer" aria-label="Twitter Profile"><Twitter size={24} /></a>
          </div>
        </div>
      </Reveal>

      <style jsx="true">{`
        .contact-box {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
          padding: 80px 40px;
        }

        .contact-box:hover {
          box-shadow: 0 0 40px rgba(197, 160, 130, 0.15);
          border-color: var(--accent-gold);
        }

        .hero-subtitle {
          font-family: var(--font-mono);
          color: var(--accent-gold);
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
          display: block;
        }

        .contact-info {
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: center;
        }

        .contact-info p {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin-top: 40px;
        }

        .social-links a {
          color: var(--text-muted);
          transition: 0.3s;
        }

        .social-links a:hover {
          color: var(--accent-gold);
          transform: translateY(-5px) rotate(10deg);
        }
      `}</style>
    </section>
  );
};

export default Contact;
