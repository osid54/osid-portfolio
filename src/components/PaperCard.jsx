import { motion } from 'framer-motion';
import React from 'react';

const STICKER_WIDTHS = {
  sm: '5%',
  md: '7%',
  lg: '11%',
};

const PAPER_WIDTHS = {
  sm: '8%',
  md: '13%',
  lg: '18%',
};

const POSTIT_WIDTHS = {
  sm: '5%',
  md: '7%',
  lg: '11%',
};

export default function PaperCard({
  src, // paper texture
  alt,
  top,
  left,
  size = 'md', // default is 'md' ('sm', 'md', 'lg')
  type = 'sticker', // default is 'sticker' ('sticker', 'paper', 'postit')
  rot = 0, // initial rotation
  hue = null, // hue rotation in degrees
  logo = null, // logo image
  logoSize = 50, // logo size, default is 50
  logoOffsetX = 0, // logo offset X from 50, default is 0
  logoOpacity = 70, // logo opacity, default is 70
  onClick = null, // on click function
}) {
  const isSticker = type === 'sticker';
  const isPaper = type === 'paper';
  const isPostit = type === 'postit';

  const currentWidth = isSticker
    ? STICKER_WIDTHS[size] || STICKER_WIDTHS.md
    : isPaper
      ? PAPER_WIDTHS[size] || PAPER_WIDTHS.md
      : isPostit
        ? POSTIT_WIDTHS[size] || POSTIT_WIDTHS.md
        : STICKER_WIDTHS.md;

  const motionDivProps = (isPaper || isPostit)
    ? {
      whileTap: { scale: 0.95 },
    }
    : {};
  const containerClasses = `absolute ${isPaper || isPostit ? 'cursor-pointer' : ''}`;

  let imageFilter = `drop-shadow(-1px 1px 1px rgba(0, 0, 0, .2))`;
  let hueShift = '';

  if (hue !== null && typeof hue === 'number') {
    hueShift += ` hue-rotate(${hue}deg)`;
  }

  return (
    <motion.div
      className={containerClasses}
      style={{ top, left, width: currentWidth }}
      initial={{ rotate: rot, filter: imageFilter }}
      animate={{ filter: imageFilter }}
      whileHover={{
        scale: (isPaper || isPostit) ? 1.05 : 1,
        rotate: rot + 2,
        filter: (isPaper || isPostit)
          ? imageFilter + ' drop-shadow(0 0 3px rgba(255,255,255,0.8))'
          : imageFilter,
      }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      {...motionDivProps}
      onClick={(isPaper || isPostit) && onClick ? onClick : undefined}
    >
      {(isPaper || isPostit) && (
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            boxShadow: '0 0 3px rgba(255,255,255,0.8)',
            opacity: 0,
            willChange: 'filter, opacity',
          }}
        />
      )}
      {/* paper texture */}
      <img
        src={src}
        alt={alt}
        className="w-full h-auto select-none pointer-events-auto relative z-10"
        style={{ filter: `${isPaper || isPostit ? '' : imageFilter} ${hueShift}` }} // Apply base filter if not paper/postit, otherwise let motion.div handle it
        draggable="false"
      />

      {/* logo */}
      {isPostit && logo && (
        <img
          src={logo}
          alt={`${alt} logo`}
          className={`absolute top-[50%] left-[${50+logoOffsetX}%] -translate-x-1/2 -translate-y-1/2 h-auto object-contain z-20 opacity-${logoOpacity}`}
          style={{ width: `${logoSize}%` }}
          draggable="false"
        />
      )}
    </motion.div>
  );
}