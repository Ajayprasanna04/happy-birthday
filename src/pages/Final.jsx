import { motion } from 'framer-motion';

export default function Final() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className="card"
      style={{ textAlign: 'center' }}
    >
      <motion.h1
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="glow"
      >
        Aliyaa 💌
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ fontSize: '1.3rem' }}
      >
        You are my happiness, my peace, <br />
        my everything ❤️
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{ fontStyle: 'italic', marginTop: '1rem' }}
      >
        Every day with you feels like a celebration. <br />
        I love you more than words can express. 💕
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        style={{ marginTop: '2rem' }}
      >
        <h3 style={{ color: '#ff6b9d' }}>
          Forever yours, <br />
          With all my love 🌹
        </h3>
      </motion.div>
    </motion.div>
  );
}