import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * DecryptText Component
 * Animates text by scrambling characters before revealing the target string.
 * High-fidelity SOC/Cybersecurity aesthetic.
 */
const DecryptText = ({ text, delay = 0, className = "" }) => {
  const [displayText, setDisplayText] = useState("");
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  
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
    <motion.span 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`font-mono ${className}`}
    >
      {displayText}
    </motion.span>
  );
};

export default DecryptText;
