import { motion } from 'framer-motion';

export default function Video({ next, prev }) {
  // Replace with your actual YouTube video ID
  const videoId = "dQw4w9WgXcQ"; // Demo video, replace with your special video

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="card"
      style={{ textAlign: 'center' }}
    >
      <h2>Your Special Movie 🎥</h2>
      
      <div className="video-container">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
          title="Birthday Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
        A little something I made just for you 💝
      </p>

      <div className="button-group">
        <button onClick={prev} className="button-secondary">
          Back
        </button>
        <button onClick={next}>
          Next Surprise 🎁
        </button>
      </div>
    </motion.div>
  );
}