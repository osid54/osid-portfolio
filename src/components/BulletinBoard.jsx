// src/components/BulletinBoard.jsx
import PaperCard from './PaperCard';

export default function BulletinBoard() {
  return (
    <div
      className="relative w-[95vw] max-w-5xl aspect-[16/9] bg-center bg-cover rounded-lg shadow-lg mx-auto"
      style={{ backgroundImage: "url('/assets/bulletinFinal.png')" }}
    >
      <img
        className='absolute top-[12%] left-1/2 -translate-x-1/2 w-[35%] z-10' // Added absolute positioning, centering, and z-index
        src='/assets/title.png'
        alt='Bulletin Board Title' // Always add an alt attribute for accessibility
      />

      {/* papers */}

      <PaperCard
        src="/assets/papers/paper3.jpg"
        alt="Project 1"
        top="20%"
        left="15%"
        type="paper"
        rot={3}
      />
      <PaperCard
        src="/assets/papers/paper5.jpg"
        alt="Project 1"
        top="40%"
        left="30%"
        type="paper"
        rot={5}
      />
      <PaperCard
        src="/assets/papers/paper2.jpg"
        alt="Project 1"
        top="35%"
        left="50%"
        type="paper"
        rot={-3}
      />
      <PaperCard
        src="/assets/papers/paper1.jpg"
        alt="Project 1"
        top="70%"
        left="70%"
        type="paper"
        rot={3}
      />

      {/* stickers */}
      <PaperCard
        src="/assets/stickers/stickerNJIT.png"
        alt="Sticker"
        top="70%"
        left="12%"
        type='sticker'
        size="lg"
        rot={-8}
      />
      <PaperCard
        src="/assets/stickers/stickerCat.png"
        alt="Sticker"
        top="23%"
        left="69%"
        type='sticker'
        size="sm"
        rot={15}
      />
      <PaperCard
        src="/assets/stickers/stickerOcto.png"
        alt="Sticker"
        top="24%"
        left="76%"
        type='sticker'
        size="sm"
        rot={-35}
      />
      <PaperCard
        src="/assets/stickers/stickerOctoBig.png"
        alt="Sticker"
        top="12%"
        left="80%"
        type='sticker'
        rot={10}
      />
      <PaperCard
        src="/assets/stickers/stickerOctoRound.png"
        alt="Sticker"
        top="24%"
        left="82%"
        type='sticker'
        rot={5}
      />      
      <PaperCard
        src="/assets/stickers/stickerOSID.png"
        alt="Sticker"
        top="12%"
        left="72%"
        type='sticker'
        rot={-5}
      />
    </div>
  );
}
