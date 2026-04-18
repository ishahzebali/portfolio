import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * DecryptText Component
 * Animates text by scrambling characters before revealing the target string.
 * Uses Monospaced Stabilization to prevent any layout shifts or "wiggles"
 * during the scramble process while remaining compatible with 
 * background-clip: text and other complex parent styles.
 */
const DecryptText = ({ text, delay = 0, className = "" }) => {
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  
  // Initialize with scrambled text of same length
  const [displayText, setDisplayText] = useState(() => 
    text.split("").map(() => chars[Math.floor(Math.random() * chars.length)]).join("")
  );
  
  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text.split("")
          .map((char, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className={`inline-grid grid-cols-1 grid-rows-1 font-mono ${className}`}>
      {/* Ghost Layer: Invisible, reserved space with target text */}
      <span 
        className="invisible col-start-1 row-start-1 pointer-events-none select-none h-full w-full font-mono" 
        aria-hidden="true"
      >
        {text}
      </span>
      
      {/* Animated Layer: Positioned in the same grid cell as the ghost */}
      <motion.span 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="col-start-1 row-start-1 font-mono"
      >
        {displayText}
      </motion.span>
    </span>
  );
};

export default DecryptText;
