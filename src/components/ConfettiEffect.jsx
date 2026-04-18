import { useEffect } from 'react';

export default function ConfettiEffect() {
  useEffect(() => {
    // Dynamic import to reduce bundle size
    import('canvas-confetti').then(module => {
      const confetti = module.default;
      
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff6b9d', '#ffb6c1', '#ff3b6f', '#ffffff']
      });
      
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 100,
          origin: { y: 0.5, x: 0.3 },
          colors: ['#ff6b9d', '#ffb6c1']
        });
      }, 200);
      
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 100,
          origin: { y: 0.5, x: 0.7 },
          colors: ['#ff6b9d', '#ffb6c1']
        });
      }, 400);
    });
  }, []);

  return null;
}