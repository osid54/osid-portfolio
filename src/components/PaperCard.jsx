// src/components/PaperCard.jsx
import { motion } from 'framer-motion';

// PaperCard.jsx
export default function PaperCard({ src, alt, top, left, size = 'w-32' }) {
  return (
    <motion.div
      className={`absolute ${size} cursor-pointer`}
      style={{ top, left }}
      whileHover={{ scale: 1.05, rotate: 2 }}
      whileTap={{ scale: 0.95 }}
    >
      <img src={src} alt={alt} className="w-full h-auto select-none pointer-events-auto" draggable="false" />
    </motion.div>
  );
}
