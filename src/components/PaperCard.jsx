import { motion } from 'framer-motion';
import React from 'react';

// Define standardized dimensions (widths as percentages) for each type
// These percentages are relative to the parent container (BulletinBoard)
const STICKER_WIDTHS = {
  sm: '5%',  // Small sticker will be 8% of the BulletinBoard's width
  md: '7%', // Medium sticker will be 12% of the BulletinBoard's width
  lg: '11%', // Large sticker will be 18% of the BulletinBoard's width
};

const PAPER_WIDTHS = {
  sm: '8%', // Small paper will be 20% of the BulletinBoard's width
  md: '13%', // Medium paper will be 30% of the BulletinBoard's width
  lg: '18%', // Large paper will be 45% of the BulletinBoard's width
};

// PaperCard.jsx
export default function PaperCard({
  src,
  alt,
  top,
  left,
  size = 'md', // Default size is 'md'
  type = 'sticker', // Default type is 'sticker'
  rot = 0, // Initial rotation in degrees
}) {
  const isSticker = type === 'sticker';
  const isPaper = type === 'paper';

  // Determine the appropriate width percentage based on the type and size prop
  const currentWidth = isSticker
    ? STICKER_WIDTHS[size] || STICKER_WIDTHS.md // Fallback to md if size prop is invalid for stickers
    : PAPER_WIDTHS[size] || PAPER_WIDTHS.md;   // Fallback to md if size prop is invalid for papers

  // whileTap will remain conditional, only active for 'paper' type
  const motionProps = isPaper
    ? {
        whileTap: { scale: 0.95 },
      }
    : {}; // No whileTap for sticker type

  // Define base classes for the container div.
  // The width is now set via the 'style' prop, so we remove the 'size' class from here.
  const containerClasses = `absolute ${isPaper ? 'cursor-pointer' : ''}`;

  // Define classes for the image, including the base drop shadow and conditional outline
  const imageClasses = `w-full h-auto select-none pointer-events-auto common-drop-shadow ${
    isSticker ? 'sticker-outline-shadow' : ''
  }`;

  return (
    <motion.div
      className={containerClasses}
      // Apply top, left, and the calculated width directly to the style prop
      style={{ top, left, width: currentWidth }}
      initial={{ rotate: rot }} // Set the initial rotation
      whileHover={{ scale: 1.05, rotate: rot + 2 }} // Apply hover effect relative to initial rotation
      {...motionProps} // Spread conditional motion properties (now only whileTap)
    >
      <img src={src} alt={alt} className={imageClasses} draggable="false" />
      <style>{`
        .common-drop-shadow {
          /* Always apply a standard drop shadow */
          filter: drop-shadow(-1px 1px 1px rgba(0, 0, 0, .2));
        }
      `}</style>
    </motion.div>
  );
}
