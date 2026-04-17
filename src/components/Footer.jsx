import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Shahzeb Ali | SHAHSMEN. All rights reserved.</p>
      </div>
      <style jsx="true">{`
        .footer {
          text-align: center;
          padding: 40px 20px;
          color: var(--text-muted);
          font-size: 0.8rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          margin-top: auto;
          background: rgba(11, 22, 42, 0.5);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
