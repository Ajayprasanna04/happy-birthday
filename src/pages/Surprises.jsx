import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ConfettiEffect from '../components/ConfettiEffect';

const surprises = [
  { time: "00:00", text: "🎉 HAPPY BIRTHDAY! You're my greatest gift 🎁", emoji: "🎂" },
  { time: "08:00", text: "🌅 Good Morning beautiful! Hope you sleep well ☀️", emoji: "🌅" },
  { time: "12:00", text: "🍫 Lunch time! Don't forget to eat something sweet... like me? 😘", emoji: "🍫" },
  { time: "15:00", text: "📱 Just thinking about you... as always 💭", emoji: "💭" },
  { time: "18:00", text: "🌅 Sunset reminder: You're the most beautiful view 🌇", emoji: "🌇" },
  { time: "21:00", text: "⭐ Stargazing would be perfect if you were here ✨", emoji: "⭐" },
];

export default function Surprises() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [unlockedMessages, setUnlockedMessages] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [newlyUnlocked, setNewlyUnlocked] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const now = currentTime;
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeStr = `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`;

    surprises.forEach(surprise => {
      if (currentTimeStr >= surprise.time && !unlockedMessages.includes(surprise.time)) {
        setUnlockedMessages(prev => [...prev, surprise.time]);
        setNewlyUnlocked(surprise);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
        setTimeout(() => setNewlyUnlocked(null), 3000);
      }
    });
  }, [currentTime, unlockedMessages]);

  const getTimeUntil = (targetTime) => {
    const now = currentTime;
    const [targetHour, targetMin] = targetTime.split(':');
    const target = new Date(now);
    target.setHours(parseInt(targetHour), parseInt(targetMin), 0, 0);
    
    if (target <= now) {
      target.setDate(target.getDate() + 1);
    }
    
    const diff = target - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="card"
    >
      {showConfetti && <ConfettiEffect />}
      
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        style={{ textAlign: 'center', marginBottom: '2rem' }}
      >
        <h2>Time-Locked Surprises ⏰</h2>
        <p style={{ fontSize: '0.9rem' }}>
          Messages unlock throughout your special day! <br />
          Current time: <strong>{currentTime.toLocaleTimeString()}</strong>
        </p>
      </motion.div>

      <AnimatePresence>
        {newlyUnlocked && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50 }}
            className="surprise-card"
            style={{ 
              background: 'linear-gradient(135deg, #ff6b9d, #ff3b6f)',
              marginBottom: '2rem',
              textAlign: 'center'
            }}
          >
            <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
              🎉 New Message Unlocked! 🎉
            </h3>
            <p style={{ fontSize: '1.1rem' }}>{newlyUnlocked.text}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="surprise-grid">
        {surprises.map((surprise, idx) => {
          const isUnlocked = unlockedMessages.includes(surprise.time);
          
          return (
            <motion.div
              key={surprise.time}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`surprise-card ${!isUnlocked ? 'locked' : ''}`}
              whileHover={isUnlocked ? { scale: 1.05 } : {}}
            >
              <div className="surprise-time">
                {surprise.emoji} {surprise.time}
              </div>
              
              {isUnlocked ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="surprise-text"
                >
                  {surprise.text}
                </motion.div>
              ) : (
                <div className="countdown-text">
                  🔒 Unlocks in: {getTimeUntil(surprise.time)}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}