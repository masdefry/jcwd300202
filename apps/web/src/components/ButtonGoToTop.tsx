'use client'

import { useState, useEffect } from 'react';

const ButtonGoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const checkScrollPosition = () => {
    if (window.scrollY > 200) {
      setIsVisible(true); 
    } else {
      setIsVisible(false); 
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollPosition); 

    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className=" fixed bottom-10 right-10 bg-slate-900 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:opacity-75 duration-100 transition"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </>
  );
};

export default ButtonGoToTop;