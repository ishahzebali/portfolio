import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * DecryptText Component
 * Animates text by scrambling characters before revealing the target string.
 * Optimized to prevent layout shifts.
 */
const DecryptText = ({ text, delay = 0, className = "" }) => {
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  
  // Initialize with scrambled text of same length to prevent layout shift
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
    <motion.span 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`inline-block ${className}`}
    >
      {displayText}
    </motion.span>
  );
};

export default DecryptText;
