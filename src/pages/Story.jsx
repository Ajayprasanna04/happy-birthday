import { motion } from 'framer-motion';

const storyParts = [
  "You changed my life in ways I never expected...",
  "Every moment with you feels like a beautiful dream 💭",
  "Your smile lights up my darkest days ☀️",
  "You're not just my love, you're my home 🏠",
  "Thank you for being you, Aliyaa 💕"
];

export default function Story({ next, prev }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="card"
      style={{ textAlign: 'center' }}
    >
      <h2>Our Story ❤️</h2>
      
      <div style={{ margin: '2rem 0' }}>
        {storyParts.map((part, idx) => (
          <motion.p
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.3 }}
            style={{ marginBottom: '1rem' }}
          >
            {part}
          </motion.p>
        ))}
      </div>

      <div className="button-group">
        <button onClick={prev} className="button-secondary">
          Back
        </button>
        <button onClick={next}>
          Continue 🎥
        </button>
      </div>
    </motion.div>
  );
}