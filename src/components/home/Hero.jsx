import React from 'react';

const Hero = () => {
  return (
    <section className="hero container">
      <div className="hero-content">
        <span className="hero-subtitle">Hi, my name is</span>
        <h1>Shahzeb Ali.</h1>
        <p className="hero-slogan">I secure digital frontiers.</p>
        <p>
          I am a <b>Cybersecurity Analyst</b> and <b>Penetration Tester</b> based in Abu Dhabi. 
          I specialize in bridging the gap between <span className="highlight">Blue Team</span> defense and <span className="highlight">Red Team</span> offense to build resilient security postures for UAE enterprises.
        </p>
        <a href="#projects" className="btn btn-fill">Check my work</a>
      </div>
      
      <div className="hero-image">
        <img 
          src="/assets/images/profile.jpg" 
          alt="Shahzeb Ali - Cybersecurity SOC Analyst" 
          onError={(e) => e.target.src='https://ui-avatars.com/api/?name=Shahzeb+Ali&background=c5a082&color=0b162a&size=300'}
        />
      </div>

      <style jsx="true">{`
        .hero {
          min-height: calc(100vh - 80px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 40px;
          gap: 40px;
        }

        .hero-content {
          max-width: 600px;
          animation: fadeInUp 1s ease forwards;
        }

        .hero-subtitle {
          font-family: var(--font-mono);
          color: var(--accent-gold);
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
          display: block;
        }

        .hero-slogan {
          font-size: clamp(2rem, 6vw, 3rem);
          color: var(--text-muted);
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 1rem;
        }

        .hero-image {
          position: relative;
          max-width: 350px;
          flex-shrink: 0;
          display: none;
        }

        .hero-image img {
          width: 100%;
          height: auto;
          border-radius: 16px;
          border: 2px solid var(--accent-gold);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
          transition: 0.3s;
          filter: grayscale(20%);
        }

        .hero-image img:hover {
          transform: translate(-5px, -5px);
          box-shadow: 0 25px 60px rgba(197, 160, 130, 0.15);
          filter: grayscale(0%);
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (min-width: 992px) {
          .hero-image { display: block; }
        }

        @media (max-width: 768px) {
          .hero {
            flex-direction: column;
            text-align: center;
            justify-content: center;
            padding-top: 80px;
          }
          .hero-image {
            display: block;
            max-width: 250px;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
