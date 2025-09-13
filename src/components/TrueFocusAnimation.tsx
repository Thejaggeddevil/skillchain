import { useState, useEffect, useRef } from 'react';

interface TrueFocusAnimationProps {
  text: string;
  className?: string;
}

const TrueFocusAnimation = ({ text, className = "" }: TrueFocusAnimationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && currentIndex < text.length) {
      const timer = setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible, currentIndex, text.length]);

  return (
    <div ref={containerRef} className={className}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-300 ${
            index <= currentIndex
              ? 'opacity-100 transform translate-y-0'
              : 'opacity-0 transform translate-y-4'
          } ${
            char === ' ' ? 'w-2' : ''
          }`}
          style={{
            transitionDelay: `${index * 50}ms`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};

export default TrueFocusAnimation;
