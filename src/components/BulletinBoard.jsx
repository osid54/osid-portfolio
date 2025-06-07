import React, { useState } from 'react';
import PaperCard from './PaperCard';
import GalleryModal from './GalleryModal';
import PDFModal from './PDFModal';

const Tooltip = ({ text, x, y, visible }) => {
  if (!visible) return null;

  return (
    <div
      className='fixed rounded-sm pointer-events-none z-100 text-white'
      style={{
        top: y + 15,
        left: x + 15,
        padding: '2px 4px',
        backgroundColor: 'rgba(1, 1, 1, .5)',
      }}
    >
      {text}
    </div>
  );
};

export default function BulletinBoard() {
  const [tooltip, setTooltip] = useState({
    show: false,
    text: '',
    x: 0,
    y: 0,
  });

  const handleHoverChange = (data) => {
    setTooltip(data);
  };

  const [activeGalleryModal, setActiveGalleryModal] = useState(null);
  const [activePDFModal, setActivePDFModal] = useState(null);

  const openGalleryModal = (modalData) => {
    setActiveGalleryModal(modalData);
  };

  const closeGalleryModal = () => {
    setActiveGalleryModal(null);
  };

  const openPDFModal = (modalData) => {
    setActivePDFModal(modalData);
  };

  const closePDFModal = () => {
    setActivePDFModal(null);
  };

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
      <div className="absolute top-[50%] left-[18%] w-full h-full pointer-events-none">
        <img
          className='absolute top-[0%] left-[0%] -translate-x-1/2 z-10 scale-40'
          src='/assets/titles/projects.png'
          alt='Projects'
        />
        <PaperCard
          src="/assets/logos/stardewdleTitle.png"
          alt="stardewdle.com"
          top="11%"
          left="-13%"
          type="paper"
          size='lg'
          rot={-4}
          onHoverChange={handleHoverChange}
          //onClick={() => window.open("https://stardewdle.com/", "_blank")}
          onClick={() => openGalleryModal({
            imageSrc: "/assets/logos/stardewdleTitle.png",
            linkHref: "https://stardewdle.com/",
            textContent: "A Wordle-like game based on crops from the hit game Stardew Valley. Its frontend is built in React and hosted through AWS Amplify, and its backend is serverless through AWS Lambda, API Gateway, S3, and DynamoDB.",
            galleryImages: [
              '/assets/screenshots/stardewdle/stardewdle1.png',
              '/assets/screenshots/stardewdle/stardewdle2.png',
              '/assets/screenshots/stardewdle/stardewdle3.png',
            ],
          })}
        />
        <PaperCard
          src="/assets/logos/medilineLogo.png"
          alt="mediline-njit.com"
          top="21%"
          left="-5%"
          type="paper"
          size='lg'
          rot={3}
          onHoverChange={handleHoverChange}
          //onClick={() => window.open("https://www.mediline-njit.com/", "_blank")}
          onClick={() => openGalleryModal({
            imageSrc: "/assets/logos/medilineLogo.png",
            linkHref: "https://www.mediline-njit.com/",
            textContent: "A healthcare portal that allows patients, doctors, and pharmacists to interact and manage their data, interactions, appointments, prescriptions, invoices, and more, all through dynamic, role-based dashboards. Built upon React, Flask, and MySQL",
            galleryImages: [
              '/assets/screenshots/mediline/mediline1.png',
              '/assets/screenshots/mediline/mediline2.png',
              '/assets/screenshots/mediline/mediline3.png',
              '/assets/screenshots/mediline/mediline4.png',
              '/assets/screenshots/mediline/mediline5.png',
              '/assets/screenshots/mediline/mediline6.png',
              '/assets/screenshots/mediline/mediline7.png',
              '/assets/screenshots/mediline/mediline8.png',
            ],
          })}
        />
      </div>

      {/* skills */}
      <div className="absolute top-[38%] left-[78%] w-full h-full pointer-events-none">
        <img
          className='absolute top-[-2%] left-[0%] -translate-x-1/2 z-10 scale-40'
          src='/assets/titles/skills.png'
          alt='Skills'
        />
        {/* languages */}
        <div className="absolute top-[9%] left-[-8%] w-full h-full pointer-events-none">
          <PaperCard
            src="/assets/symbols/javascript.png"
            alt="JavaScript"
            top="0%"
            left="-1%"
            type='sticker'
            size="sm"
            rot={-12}
            onHoverChange={handleHoverChange}
          />
          <PaperCard
            src="/assets/symbols/python.png"
            alt="Python"
            top="0%"
            left="5%"
            type='sticker'
            size="sm"
            rot={7}
            onHoverChange={handleHoverChange}
          />
          <PaperCard
            src="/assets/symbols/java.png"
            alt="Java"
            top="10%"
            left="-3%"
            type='sticker'
            size="sm"
            rot={-3}
            onHoverChange={handleHoverChange}
          />
          <PaperCard
            src="/assets/symbols/c.png"
            alt="C"
            top="9%"
            left="3%"
            type='sticker'
            size="sm"
            rot={15}
            onHoverChange={handleHoverChange}
          />
          <PaperCard
            src="/assets/symbols/cpp.png"
            alt="C++"
            top="9%"
            left="9%"
            type='sticker'
            size="sm"
            rot={-8}
            onHoverChange={handleHoverChange}
          />
          <PaperCard
            src="/assets/symbols/bash.png"
            alt="Bash"
            top="18%"
            left="6%"
            type='sticker'
            size="sm"
            rot={11}
            onHoverChange={handleHoverChange}
          />
        </div>
        {/* platforms */}
        <div className="absolute top-[3%] left-[6%] w-full h-full pointer-events-none">
          <PaperCard
            src="/assets/symbols/aws.png"
            alt="AWS"
            top="0%"
            left="0%"
            type='sticker'
            size="sm"
            rot={-11}
            onHoverChange={handleHoverChange}
          />
          <PaperCard
            src="/assets/symbols/mysql.png"
            alt="MySQL"
            top="2%"
            left="6%"
            type='sticker'
            size="sm"
            rot={12}
            onHoverChange={handleHoverChange}
          />
          <PaperCard
            src="/assets/symbols/gcp.png"
            alt="GCP"
            top="9%"
            left="2%"
            type='sticker'
            size="sm"
            rot={-4}
            onHoverChange={handleHoverChange}
          />
        </div>
        {/* webdev */}
        <div className="absolute top-[29%] left-[6%] w-full h-full pointer-events-none">
          <PaperCard
            src="/assets/symbols/react.png"
            alt="React"
            top="0%"
            left=".5%"
            type='sticker'
            size="sm"
            rot={-6}
            onHoverChange={handleHoverChange}
          />
          <PaperCard
            src="/assets/symbols/flask.png"
            alt="Flask"
            top="2%"
            left="6%"
            type='sticker'
            size="sm"
            rot={0}
            onHoverChange={handleHoverChange}
          />
          <PaperCard
            src="/assets/symbols/css.png"
            alt="CSS"
            top="9%"
            left="0%"
            type='sticker'
            size="sm"
            rot={-4}
            onHoverChange={handleHoverChange}
          />
          <PaperCard
            src="/assets/symbols/html.png"
            alt="HTML"
            top="11%"
            left="5%"
            type='sticker'
            size="sm"
            rot={15}
            onHoverChange={handleHoverChange}
          />
        </div>
        {/* tools */}
        <div className="absolute top-[34%] left-[-16%] w-full h-full pointer-events-none">
          <PaperCard
            src="/assets/symbols/figma.png"
            alt="Figma"
            top="0%"
            left="0%"
            type='sticker'
            size="sm"
            rot={-8}
            onHoverChange={handleHoverChange}
          />
          <PaperCard
            src="/assets/symbols/postman.png"
            alt="Postman"
            top="-1.5%"
            left="5.5%"
            type='sticker'
            size="sm"
            rot={5}
            onHoverChange={handleHoverChange}
          />
          <PaperCard
            src="/assets/symbols/microsoftoffice.png"
            alt="Microsoft Office"
            top="7.5%"
            left="3%"
            type='sticker'
            size="sm"
            rot={-8}
            onHoverChange={handleHoverChange}
          />
          <PaperCard
            src="/assets/symbols/trello.png"
            alt="Trello"
            top="8%"
            left="9%"
            type='sticker'
            size="sm"
            rot={11}
            onHoverChange={handleHoverChange}
          />
        </div>
      </div>

      { /* certificates */}
      <div className="absolute top-[62%] left-[51%] w-full h-full pointer-events-none">
        <img
          className='absolute top-[0%] left-[0%] -translate-x-1/2 z-10 scale-40'
          src='/assets/titles/certificates.png'
          alt='Certificates'
        />
        <PaperCard
          src="/assets/postits/postit3.png"
          alt="AWS Certified Cloud Practitioner"
          top="11%"
          left="-6%"
          type="postit"
          logo="/assets/logos/aws.png"
          rot={-9}
          hue={-30}
          logoSize={80}
          logoOffsetX={3}
          logoOpacity={100}
          size='lg'
          onClick={() => window.open("https://www.credly.com/badges/4d6193ec-b166-41dd-a9e0-0537a6e71b28/linked_in_profile", "_blank")}
          onHoverChange={handleHoverChange}
        />
      </div>

      {/* postits */}
      <div className="absolute top-[22%] left-[7%] w-full h-full pointer-events-none">
        <img
          className='absolute top-[-10%] left-[7%] -translate-x-1/2 z-10 scale-40'
          src='/assets/titles/links.png'
          alt='Links'
        />
        <PaperCard
          src="/assets/postits/postit3.png"
          alt="linkedin.com"
          top="4%"
          left="7%"
          type="postit"
          logo="/assets/logos/linkedinLogo.png"
          hue={180}
          rot={-6}
          logoOffsetX={3}
          onClick={() => window.open("https://www.linkedin.com/in/omar-siddiqui-34610132a", "_blank")}
          onHoverChange={handleHoverChange}
        />
        <PaperCard
          src="/assets/postits/postit3.png"
          alt="itch.io"
          top="12%"
          left="0%"
          type="postit"
          logo="/assets/logos/itchioLogo.png"
          hue={-90}
          rot={3}
          logoOffsetX={3}
          onClick={() => window.open("https://osid54.itch.io", "_blank")}
          onHoverChange={handleHoverChange}
        />
        <PaperCard
          src="/assets/postits/postit3.png"
          alt="github.com"
          top="0%"
          left="-.5%"
          type="postit"
          logo="/assets/logos/githubLogo.png"
          rot={8}
          logoOffsetX={3}
          onClick={() => window.open("https://github.com/osid54", "_blank")}
          onHoverChange={handleHoverChange}
        />
      </div>

      {/* papers */}
      <div className="absolute top-[23%] left-[32%] w-full h-full pointer-events-none">
        <PaperCard
          src="/assets/papers/aboutme.jpg"
          alt="About Me"
          top="0%"
          left="0%"
          type="paper"
          rot={-5}
          onHoverChange={handleHoverChange}
          onClick={() => openPDFModal({
            pdfSrc: '/assets/aboutme.pdf',
          })}
        />
        <PaperCard
          src="/assets/papers/resume.jpg"
          alt="Resume"
          top="5%"
          left="16%"
          type="paper"
          rot={3}
          onHoverChange={handleHoverChange}
          onClick={() => openPDFModal({
            downloadFileName: 'Omar-Siddiqui-Resume.pdf',
            imageUrl: '/assets/pdfs/resume.png',
          })}
        />
      </div>

      {/* stickers */}
      <PaperCard
        src="/assets/stickers/stickerNJIT.png"
        alt="New Jersey Institute of Technology"
        top="74%"
        left="5%"
        type='sticker'
        size="lg"
        rot={-8}
        onHoverChange={handleHoverChange}
      />
      <div className="absolute top-[19%] left-[75%] w-full h-full pointer-events-none">
        <PaperCard
          src="/assets/stickers/stickerCat.png"
          alt="Cat Doodle"
          top="0%"
          left="0%"
          type='sticker'
          size="sm"
          rot={15}
        />
        <PaperCard
          src="/assets/stickers/stickerOcto.png"
          alt="Octopus"
          top="1%"
          left="7%"
          type='sticker'
          size="sm"
          rot={-35}
        />
        <PaperCard
          src="/assets/stickers/stickerOctoBig.png"
          alt="Octopus Avatar"
          top="-11%"
          left="11%"
          type='sticker'
          rot={10}
        />
        <PaperCard
          src="/assets/stickers/stickerOctoRound.png"
          alt="Octopus Profile Picture"
          top="1%"
          left="13%"
          type='sticker'
          rot={5}
        />
        <PaperCard
          src="/assets/stickers/stickerOSID.png"
          alt="OSID"
          top="-11%"
          left="3%"
          type='sticker'
          rot={-5}
        />
      </div>

      {/* pins */}
      <div className="absolute top-[81%] left-[34%] w-full h-full pointer-events-none">
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
      <img
        className='absolute top-[33%] left-[90%] z-10 h-6 w-8'
        src='/assets/pins/pin1.png'
        alt='Red Pin'
        style={{ filter: 'hue-rotate(0deg)' }}
      />
      <img
        className='absolute top-[15.5%] left-[6%] z-10 h-6 w-8'
        src='/assets/pins/pin1.png'
        alt='Blue Pin'
        style={{ filter: 'hue-rotate(200deg)' }}
      />

      {/* Modals */}
      {activeGalleryModal && (
        <GalleryModal
          isOpen={true}
          onClose={closeGalleryModal}
          imageSrc={activeGalleryModal.imageSrc}
          linkHref={activeGalleryModal.linkHref}
          textContent={activeGalleryModal.textContent}
          galleryImages={activeGalleryModal.galleryImages}
        />
      )}
      {activePDFModal && (
        <PDFModal
          isOpen={true}
          onClose={closePDFModal}
          pdfSrc={activePDFModal.pdfSrc}
          downloadFileName={activePDFModal.downloadFileName}
        />
      )}

      <Tooltip
        text={tooltip.text}
        x={tooltip.x}
        y={tooltip.y}
        visible={tooltip.show}
      />
    </div>
  );
}
