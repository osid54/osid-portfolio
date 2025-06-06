// src/components/BulletinBoard.jsx
import PaperCard from './PaperCard';

export default function BulletinBoard() {
  return (
    <div
      className="relative w-[95vw] max-w-5xl aspect-[208/125] bg-center bg-cover rounded-3xl shadow-2xl shadow-black overflow-hidden"
      style={{ backgroundImage: "url('/assets/bulletinFinal.png')" }}
    >
      <img
        className='absolute top-[8%] left-1/2 -translate-x-1/2 w-[40%] z-10'
        src='/assets/title.png'
        alt='Bulletin Board Title'
      />

      {/* stickers */}
      <PaperCard
        src="/assets/stickers/stickerNJIT.png"
        alt="Sticker"
        top="74%"
        left="5%"
        type='sticker'
        size="lg"
        rot={-8}
      />
      <div className="absolute top-[19%] left-[75%] w-full h-full pointer-events-none">
        <PaperCard
          src="/assets/stickers/stickerCat.png"
          alt="Sticker"
          top="0%"
          left="0%"
          type='sticker'
          size="sm"
          rot={15}
        />
        <PaperCard
          src="/assets/stickers/stickerOcto.png"
          alt="Sticker"
          top="1%"
          left="7%"
          type='sticker'
          size="sm"
          rot={-35}
        />
        <PaperCard
          src="/assets/stickers/stickerOctoBig.png"
          alt="Sticker"
          top="-11%"
          left="11%"
          type='sticker'
          rot={10}
        />
        <PaperCard
          src="/assets/stickers/stickerOctoRound.png"
          alt="Sticker"
          top="1%"
          left="13%"
          type='sticker'
          rot={5}
        />
        <PaperCard
          src="/assets/stickers/stickerOSID.png"
          alt="Sticker"
          top="-11%"
          left="3%"
          type='sticker'
          rot={-5}
        />
      </div>

      {/* postits */}
      <div className="absolute top-[12%] left-[8%] w-full h-full pointer-events-none">
      <PaperCard
        src="/assets/postits/postit3.png"
        alt="Project 1"
        top="4%"
        left="7%"
        type="postit"
        logo={"/assets/logos/linkedinLogo.png"}
        hue={180}
        rot={-6}
      />
      <PaperCard
        src="/assets/postits/postit3.png"
        alt="Project 1"
        top="12%"
        left="0%"
        type="postit"
        logo={"/assets/logos/itchioLogo.png"}
        hue={-90}
        rot={3}
      />
      <PaperCard
        src="/assets/postits/postit3.png"
        alt="Project 1"
        top="0%"
        left="0%"
        type="postit"
        logo={"/assets/logos/githubLogo.png"}
        rot={8}
      />
      </div>

      {/* papers */}
      <div className="absolute top-[23%] left-[36%] w-full h-full pointer-events-none">
      <PaperCard
        src="/assets/papers/aboutme.jpg"
        alt="Project 1"
        top="0%"
        left="0%"
        type="paper"
        rot={-5}
      />
      <PaperCard
        src="/assets/papers/resume.jpg"
        alt="Project 1"
        top="5%"
        left="16%"
        type="paper"
        rot={3}
      />
      </div>
    </div>
  );
}
