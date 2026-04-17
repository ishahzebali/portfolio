import React from 'react';
import Reveal from '../Reveal';

const SecretZone = () => {
  const code = ['5', 'Y', '5', '7', '3', 'M'];

  return (
    <Reveal>
      <section id="secret-zone">
        <p>Hover To Decrypt System Access</p>
        <ul className="code-container">
          {code.map((digit, index) => (
            <li key={index} className="digit" tabIndex="0">
              <span>{digit}</span>
            </li>
          ))}
        </ul>

        <style jsx="true">{`
          #secret-zone {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 2rem;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            background: rgba(11, 22, 42, 0.5);
            overflow: hidden;
            padding: 100px 20px;
            margin: 40px 0;
            width: 100%;
          }

          #secret-zone::before {
            --line: rgba(197, 160, 130, 0.1);
            content: "";
            height: 100%;
            width: 100%;
            position: absolute;
            background:
              linear-gradient(90deg, var(--line) 1px, transparent 1px 10vmin) 0 -5vmin / 10vmin 10vmin,
              linear-gradient(var(--line) 1px, transparent 1px 10vmin) 0 -5vmin / 10vmin 10vmin;
            mask: linear-gradient(-15deg, transparent 30%, white);
            top: 0; left: 0; z-index: -1; pointer-events: none;
          }

          #secret-zone p {
            font-size: 1.5rem;
            text-align: center;
            background: linear-gradient(var(--text-main), var(--text-muted));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            font-weight: bold;
            letter-spacing: 1px;
          }

          .code-container {
            font-size: clamp(1.5rem, 8vw, 3rem);
            display: flex;
            flex-wrap: nowrap;
            color: var(--accent-gold);
            border-radius: 1rem;
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            justify-content: center;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
            padding: 0;
          }

          .code-container:hover {
            cursor: grab;
          }

          .digit {
            display: flex;
            height: 100%;
            padding: clamp(2rem, 5vw, 4rem) clamp(0.5rem, 2vw, 1rem);
            cursor: pointer;
            position: relative;
          }

          .digit:focus-visible {
            outline-color: var(--accent-gold);
            outline-offset: 1rem;
          }

          .digit span {
            scale: calc(var(--active, 0) + 0.5);
            filter: blur(calc((1 - var(--active, 0)) * 1rem));
            transition: scale calc(((1 - var(--active, 0)) + 0.2) * 1s), filter calc(((1 - var(--active, 0)) + 0.2) * 1s);
            display: block;
          }

          .digit:first-of-type {
            padding-left: clamp(1rem, 5vw, 3rem);
          }

          .digit:last-of-type {
            padding-right: clamp(1rem, 5vw, 3rem);
          }

          /* GLIDE LERP EFFECT */
          .digit:is(:hover, :focus-visible) { --active: var(--lerp-0); }
          
          .digit:is(:hover, :focus-visible) + .digit,
          .digit:has(+ .digit:is(:hover, :focus-visible)) { --active: var(--lerp-1); }
          
          .digit:is(:hover, :focus-visible) + .digit + .digit,
          .digit:has(+ .digit + .digit:is(:hover, :focus-visible)) { --active: var(--lerp-2); }
          
          .digit:is(:hover, :focus-visible) + .digit + .digit + .digit,
          .digit:has(+ .digit + .digit + .digit:is(:hover, :focus-visible)) { --active: var(--lerp-3); }
          
          .digit:is(:hover, :focus-visible) + .digit + .digit + .digit + .digit,
          .digit:has(+ .digit + .digit + .digit + .digit:is(:hover, :focus-visible)) { --active: var(--lerp-4); }
          
          .digit:is(:hover, :focus-visible) + .digit + .digit + .digit + .digit + .digit,
          .digit:has(+ .digit + .digit + .digit + .digit + .digit:is(:hover, :focus-visible)) { --active: var(--lerp-5); }
        `}</style>
      </section>
    </Reveal>
  );
};

export default SecretZone;
