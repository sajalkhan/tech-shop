import { useState } from 'react';

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const updatePosition = () => {
    setScrollPosition(window.pageYOffset);
  };

  const saveScrollPosition = () => {
    window.addEventListener('scroll', updatePosition);
    return () => window.removeEventListener('scroll', updatePosition);
  };

  const getScrollPosition = () => {
    saveScrollPosition();
    return scrollPosition;
  };

  return { getScrollPosition };
};
