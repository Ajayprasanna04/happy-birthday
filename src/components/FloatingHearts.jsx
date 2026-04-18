import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (hearts.length < 15) {
        const newHeart = {
          id: Date.now(),
          x: Math.random() * window.innerWidth,
          size: Math.random() * 20 + 10,
          duration: Math.random() * 5 + 3,
        };
        setHearts(prev => [...prev, newHeart]);
        
        setTimeout(() => {
          setHearts(prev => prev.filter(h => h.id !== newHeart.id));
        }, newHeart.duration * 1000);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [hearts.length]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      {hearts.map(heart => (
        <motion.div
          key={heart.id}
          initial={{ y: '100vh', x: heart.x, opacity: 1 }}
          animate={{ y: '-10vh', opacity: 0 }}
          transition={{ duration: heart.duration, ease: 'linear' }}
          style={{
            position: 'absolute',
            fontSize: heart.size,
            pointerEvents: 'none',
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}