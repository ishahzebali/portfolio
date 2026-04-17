import { useEffect } from 'react';

export const useRipple = () => {
  useEffect(() => {
    const createRipple = (e) => {
      const ripple = document.createElement('div');
      ripple.classList.add('ripple');
      ripple.style.left = `${e.pageX}px`;
      ripple.style.top = `${e.pageY}px`;
      document.body.appendChild(ripple);

      ripple.addEventListener('animationend', () => {
        ripple.remove();
      });
    };

    window.addEventListener('click', createRipple);
    return () => window.removeEventListener('click', createRipple);
  }, []);
};
