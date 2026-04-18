import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Lock({ next }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const CORRECT_PASSWORD = "04052006";
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === CORRECT_PASSWORD) {
      setIsLoading(true);
      setError('');

      // Add a small delay for dramatic effect
      setTimeout(() => {
        next();
      }, 800);
    } else {
      setError('❌ Wrong password! Try again 💕');
      setPassword('');
      setAttempts(prev => prev + 1);

      // Shake animation on error
      const input = document.querySelector('.password-input');
      if (input) {
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 500);
      }
    }
  };

  // Add shake animation to CSS
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .shake {
        animation: shake 0.5s ease-in-out;
      }
      
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
      }
      
      .password-input {
        background: rgba(255, 255, 255, 0.1);
        border: 2px solid rgba(255, 107, 157, 0.3);
        color: white;
        padding: 1rem;
        font-size: 1.2rem;
        border-radius: 12px;
        width: 100%;
        max-width: 250px;
        text-align: center;
        font-family: monospace;
        letter-spacing: 2px;
        transition: all 0.3s ease;
      }
      
      .password-input:focus {
        outline: none;
        border-color: #ff6b9d;
        box-shadow: 0 0 20px rgba(255, 107, 157, 0.3);
      }
      
      .password-input::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    `;
    document.head.appendChild(style);

    return () => document.head.removeChild(style);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="card"
      style={{ textAlign: 'center' }}
    >
      <motion.div
        animate={{
          rotate: [0, 10, -10, 10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 className="glow" style={{ fontSize: '3rem' }}>
          🔒 Secret Garden 🔒
        </h1>
      </motion.div>

      <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
        This special world is locked just for you...<br />
        Enter the secret code to begin 💫
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ position: 'relative', width: '100%', maxWidth: '250px' }}
        >
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter 8-digit code"
            className="password-input"
            maxLength={8}
            pattern="[0-9]*"
            inputMode="numeric"
            autoFocus
          />

          {/* Only show eye icon when user has typed something */}
          {password.length > 0 && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                padding: '5px',
                boxShadow: 'none',
                fontSize: '1.2rem',
                cursor: 'pointer',
                margin: 0,
                width: 'auto'
              }}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          )}
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{ color: '#ff6b9d', fontSize: '0.9rem' }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isLoading}
          style={{
            marginTop: '1rem',
            opacity: isLoading ? 0.7 : 1,
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{ display: 'inline-block' }}
            >
              🔓
            </motion.div>
          ) : (
            'Unlock the Magic ✨'
          )}
        </motion.button>
      </form>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{
          fontSize: '0.8rem',
          marginTop: '2rem',
          opacity: 0.6,
          cursor: 'pointer'
        }}
        onClick={() => {
          // Easter egg hint
          alert('💝 Hint: It\'s a special date... 04/05/2006 💝');
        }}
      >
        Need a hint? Click here 🔍
      </motion.p>
    </motion.div>
  );
}