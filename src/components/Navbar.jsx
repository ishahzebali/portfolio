import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { name: 'About', path: '/#about' },
    { name: 'Expertise', path: '/#expertise' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/#contact' },
  ];

  return (
    <nav className="navbar">
      <div className="nav-container container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src="/assets/images/logo.png" alt="SHAHSMEN Logo" onError={(e) => e.target.style.display = 'none'} />
          <span>SHAHSMEN</span>
        </Link>

        <div className="mobile-toggle" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              onClick={closeMenu}
              className={location.pathname === link.path ? 'active-link' : ''}
            >
              {link.name}
            </a>
          ))}
          <a
            href="/assets/resume/SOC analyst resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="highlight resume-link"
          >
            Resume
          </a>
        </div>
      </div>

      <style jsx="true">{`
        .navbar {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 80px;
          background: rgba(11, 22, 42, 0.7);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          border-bottom: 1px solid var(--glass-border);
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 1000;
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .logo img {
          height: 45px;
          width: auto;
        }

        .logo span {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--accent-gold);
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .nav-links {
          display: flex;
          gap: 30px;
          align-items: center;
        }

        .nav-links a {
          font-size: 0.9rem;
          color: var(--text-main);
          position: relative;
          transition: 0.3s;
        }

        .nav-links a:hover {
          color: var(--accent-gold);
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: -5px;
          left: 0;
          background: var(--accent-gold);
          transition: width 0.3s;
        }

        .nav-links a:hover::after {
          width: 100%;
        }

        .active-link {
          color: var(--accent-gold) !important;
        }

        .active-link::after {
          width: 100% !important;
        }

        .mobile-toggle {
          display: none;
          color: var(--accent-gold);
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .mobile-toggle {
            display: block;
          }

          .nav-links {
            display: none;
            flex-direction: column;
            position: absolute;
            top: 80px;
            left: 0;
            width: 100%;
            background: var(--bg-dark);
            padding: 40px 20px;
            text-align: center;
            border-bottom: 1px solid var(--glass-border);
          }

          .nav-links.active {
            display: flex;
          }

          .nav-links a {
            font-size: 1.25rem;
            margin-bottom: 20px;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
