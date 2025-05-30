// src/components/PaperCard.jsx
import { motion } from 'framer-motion';

export default function PaperCard({ src, alt, top, left }) {
  return (
    <motion.div
      className="absolute w-15 sm:w-10 md:w-20 cursor-pointer"
      style={{ top, left }}
      whileHover={{ scale: 1.05, rotate: 2 }}
      whileTap={{ scale: 0.95 }}
    >
      <img src={src} alt={alt} className="w-full h-auto select-none pointer-events-auto" draggable="false" />
    </motion.div>
  );
}
