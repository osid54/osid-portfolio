// src/components/BulletinBoard.jsx
import PaperCard from './PaperCard';

export default function BulletinBoard() {
  return (
    <div
        className="relative w-[90vw] max-w-5xl aspect-[16/9] bg-center bg-cover rounded-lg shadow-lg mx-auto"
        style={{ backgroundImage: "url('/assets/bulletinFinal.png')" }}
      >
        <PaperCard
          src="/assets/papers/paper1.png"
          alt="Project 1"
          top="20%"
          left="15%"
        />
        <PaperCard
          src="/assets/stickers/sticker1.png"
          alt="Sticker"
          top="60%"
          left="70%"
        />
      </div>
  );
}
