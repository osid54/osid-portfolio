// src/components/BulletinBoard.jsx
import PaperCard from './PaperCard';

export default function BulletinBoard() {
  return (
    <div
      className="relative w-[95vw] max-w-5xl aspect-[208/125] bg-center bg-cover rounded-3xl shadow-2xl shadow-black overflow-hidden"
      style={{ backgroundImage: "url('/assets/bulletinFinal.png')" }}
    >
      {/* title */}
      <img
        className='absolute top-[8%] left-1/2 -translate-x-1/2 w-[40%] z-10'
        src='/assets/titles/title.png'
        alt='Bulletin Board Title'
      />

      {/* projects */}
      <div className="absolute top-[40%] left-[18%] w-full h-full pointer-events-none">
        <img
          className='absolute top-[0%] left-[0%] -translate-x-1/2 z-10 scale-40'
          src='/assets/titles/projects.png'
          alt='Projects Title'
        />
        <PaperCard
          src="/assets/logos/stardewdleTitle.png"
          alt="Stardewdle Label"
          top="12%"
          left="-13%"
          type="paper"
          size='lg'
          rot={-4}
          onClick={() => window.open("https://stardewdle.com/", "_blank")}
        />
        <PaperCard
          src="/assets/logos/medilineLogo.png"
          alt="Mediline Label"
          top="22%"
          left="-5%"
          type="paper"
          size='lg'
          rot={3}
          onClick={() => window.open("https://www.mediline-njit.com/", "_blank")}
        />
      </div>

      {/* skills */}
      <div className="absolute top-[58%] left-[78%] w-full h-full pointer-events-none">
        <img
          className='absolute top-[0%] left-[0%] -translate-x-1/2 z-10 scale-40'
          src='/assets/titles/skills.png'
          alt='Skills Title'
        />
      </div>

      { /* certificates */}
      <div className="absolute top-[68%] left-[57%] w-full h-full pointer-events-none">
        <img
          className='absolute top-[0%] left-[0%] -translate-x-1/2 z-10 scale-40'
          src='/assets/titles/certificates.png'
          alt='Certificates Title'
        />
        <PaperCard
          src="/assets/postits/postit3.png"
          alt="AWS Sticker"
          top="9%"
          left="-6%"
          type="postit"
          logo="/assets/logos/aws.png"
          rot={-10}
          hue={-30}
          logoSize={80}
          logoOffsetX={3}
          logoOpacity={100}
          size='lg'
          onClick={() => window.open("https://www.credly.com/badges/4d6193ec-b166-41dd-a9e0-0537a6e71b28/linked_in_profile", "_blank")}
        />
      </div>

      {/* stickers */}
      <PaperCard
        src="/assets/stickers/stickerNJIT.png"
        alt="NJIT Sticker"
        top="74%"
        left="5%"
        type='sticker'
        size="lg"
        rot={-8}
      />
      <div className="absolute top-[19%] left-[75%] w-full h-full pointer-events-none">
        <PaperCard
          src="/assets/stickers/stickerCat.png"
          alt="Cat Doodle Sticker"
          top="0%"
          left="0%"
          type='sticker'
          size="sm"
          rot={15}
        />
        <PaperCard
          src="/assets/stickers/stickerOcto.png"
          alt="Octopus Sticker"
          top="1%"
          left="7%"
          type='sticker'
          size="sm"
          rot={-35}
        />
        <PaperCard
          src="/assets/stickers/stickerOctoBig.png"
          alt="Octopus Avatar Sticker"
          top="-11%"
          left="11%"
          type='sticker'
          rot={10}
        />
        <PaperCard
          src="/assets/stickers/stickerOctoRound.png"
          alt="Octopus Profile Picture Sticker"
          top="1%"
          left="13%"
          type='sticker'
          rot={5}
        />
        <PaperCard
          src="/assets/stickers/stickerOSID.png"
          alt="OSID Sticker"
          top="-11%"
          left="3%"
          type='sticker'
          rot={-5}
        />
      </div>

      {/* pins */}
      <div className="absolute top-[11%] left-[70%] w-full h-full pointer-events-none">
        <img
          className='absolute top-[0%] left-[00%] z-10 h-6 w-8'
          src='/assets/pins/pin1.png'
          alt='Red Pin'
          style={{ filter: 'hue-rotate(0deg)' }}
        />
        <img
          className='absolute top-[-2%] left-[4%] z-10 h-6 w-8'
          src='/assets/pins/pin1.png'
          alt='Blue Pin'
          style={{ filter: 'hue-rotate(200deg)' }}
        />
        <img
          className='absolute top-[3%] left-[3%] z-10 h-6 w-8'
          src='/assets/pins/pin1.png'
          alt='Green Pin'
          style={{ filter: 'hue-rotate(110deg)' }}
        />
      </div>

      {/* postits */}
      <div className="absolute top-[12%] left-[8%] w-full h-full pointer-events-none">
        <PaperCard
          src="/assets/postits/postit3.png"
          alt="LinkedIn Postit"
          top="4%"
          left="7%"
          type="postit"
          logo="/assets/logos/linkedinLogo.png"
          hue={180}
          rot={-6}
          logoOffsetX={3}
          onClick={() => window.open("https://www.linkedin.com/in/omar-siddiqui-34610132a", "_blank")}
        />
        <PaperCard
          src="/assets/postits/postit3.png"
          alt="Itch.io Postit"
          top="12%"
          left="0%"
          type="postit"
          logo="/assets/logos/itchioLogo.png"
          hue={-90}
          rot={3}
          logoOffsetX={3}
          onClick={() => window.open("https://osid54.itch.io", "_blank")}
        />
        <PaperCard
          src="/assets/postits/postit3.png"
          alt="GitHub Postit"
          top="0%"
          left="0%"
          type="postit"
          logo="/assets/logos/githubLogo.png"
          rot={8}
          logoOffsetX={3}
          onClick={() => window.open("https://github.com/osid54", "_blank")}
        />
      </div>

      {/* papers */}
      <div className="absolute top-[23%] left-[36%] w-full h-full pointer-events-none">
        <PaperCard
          src="/assets/papers/aboutme.jpg"
          alt="About Me Paper"
          top="0%"
          left="0%"
          type="paper"
          rot={-5}
        />
        <PaperCard
          src="/assets/papers/resume.jpg"
          alt="Resume Paper"
          top="5%"
          left="16%"
          type="paper"
          rot={3}
        />
      </div>
    </div>
  );
}
