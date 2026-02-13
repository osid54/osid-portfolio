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
    <>
      <div
        className="absolute w-[75vw] aspect-[208/125]" // size of bulletin image
      >
        {/* bulletin board */}
        <img
          src={'/assets/bulletinFinal.png'}
          alt={null}
          className="w-full h-auto relative z-0"
          style={{ filter: `drop-shadow(-10px 15px 10px rgba(0, 0, 0, .8))` }}
          draggable="false"
        />

        {/* title */}
        <img
          className='absolute top-[8%] left-1/2 -translate-x-1/2 w-[40%] z-10'
          src='/assets/titles/title.png'
          alt='Bulletin Board Title'
        />

        {/* projects */}
        <div className="absolute top-[54%] left-[18%] w-full h-full pointer-events-none">
          <img
            className='absolute top-[2%] left-[0%] -translate-x-1/2 z-10 h-[5%]'
            src='/assets/titles/projects.png'
            alt='Projects'
          />
          <PaperCard
            src="/assets/logos/stardewdleLogo.png"
            alt="stardewdle.com"
            top="10%"
            left="-13%"
            type="paper"
            size='lg'
            rot={-4}
            onHoverChange={handleHoverChange}
            onClick={() => openGalleryModal({
              imageSrc: "/assets/logos/stardewdleLogo.png",
              linkHref: "stardewdle.com",
              textContent: "Stardewdle is a Wordle-inspired game based on the hit game Stardew Valley. Every day, players have to guess the daily crop, narrowing down their guesses based on qualitative and quantitative information. The frontend is built in React and hosted through AWS Amplify, and the serverless backend is hosted through AWS Lambda, API Gateway, S3, and DynamoDB.",
              galleryImages: [
                '/assets/screenshots/stardewdle/stardewdle1.png',
                '/assets/screenshots/stardewdle/stardewdle2.png',
                '/assets/screenshots/stardewdle/stardewdle3.png',
                '/assets/screenshots/stardewdle/stardewdle4.png',
                '/assets/screenshots/stardewdle/stardewdle5.png',
              ],
              captions: [
                'Stardewdle\'s landing page, where users can navigate to either the game page or the collection page. They can also see the GitHub repository and game credits.',
                'The collections page is where users can see all possible crop options, as well as their respective game information. This information was webscraped from the Stardew Valley Wiki.',
                'The game page is where users actually play the game. They try to guess the crop using the given attributes. There are also hints available, which narrow down possible guesses.',
                'When a game is completed, users can see the time until the next daily crop is available, as well as how many other people have played today. They can also share their results via the share button.',
                'In addition to the desktop version, Stardewdle is fully mobile responsive and playable on any mobile device.',
              ],
              dates: ['May 2025', 'January 2026'],
              githubLink: 'chrismarquezz/Stardewdle',
              roleText: `Co-Founder & Full Stack Developer`,
              skills: ['react', 'aws', 'javascript']
            })}
          />
          <PaperCard
            src="/assets/logos/teacherspetLogo.png"
            alt="teachers-pet.site"
            top="18%"
            left="0%"
            type="paper"
            size='sm'
            rot={8}
            onHoverChange={handleHoverChange}
            onClick={() => openGalleryModal({
              imageSrc: "/assets/logos/teacherspetLogo.png",
              linkHref: "teachers-pet.site",
              textContent: "Teacher's Pet is a math-based worksheet generator that allows users to customize, save, and share worksheets based on an array of subjects. Templates allow worksheets to be randomizable with consistent formats. The frontend is built on a Next.js and React framework, hosted on Vercel. The backend is built with Python, PostgreSQL, and FastAPI, hosted on Railway.",
              galleryImages: [
                '/assets/screenshots/teacherspet/teacherspet1.png',
                '/assets/screenshots/teacherspet/teacherspet2.png',
                '/assets/screenshots/teacherspet/teacherspet3.png',
              ],
              captions: [
                'The main page of Teacher\'s Pet is the generation page. Here users can select the subjects they wish to include in their worksheet and modify their settings, allowing for mixed subjects and increased difficulty.',
                'Any and all users can see and search for publically shared worksheet generation templates made by users. They can then use these templates to generate their own worksheets.',
                'Creating an account allows users to create, save, and share their own worksheet templates. This also allows them to customize publically shared templates and save them to their account for later use.',
              ],
              dates: ['June 2025', 'September 2025'],
              githubLink: 'osid54/teachers-pet',
              roleText: 'Founder & Sole Developer',
              skills: ['react', 'vercel', 'railway', 'fastapi', 'postgresql']
            })}
          />
          <PaperCard
            src="/assets/logos/medilineLogo.png"
            alt="mediline-njit.com"
            top="30%"
            left="-11%"
            type="paper"
            size='lg'
            rot={3}
            onHoverChange={handleHoverChange}
            onClick={() => openGalleryModal({
              imageSrc: "/assets/logos/medilineLogo.png",
              linkHref: "mediline-njit.com",
              textContent: "Mediline is a healthcare portal that allows patients, doctors, and pharmacists to interact and manage their data, interactions, appointments, prescriptions, invoices, and more, all through dynamic, role-based dashboards. The frontend is built using React and Vite, hosted on Azure. The backend is built using Flask, FastAPI and MySQL, hosted on GCP.",
              galleryImages: [
                '/assets/screenshots/mediline/mediline1.png',
                '/assets/screenshots/mediline/mediline2.png',
                '/assets/screenshots/mediline/mediline3.png',
                '/assets/screenshots/mediline/mediline4.png',
                '/assets/screenshots/mediline/mediline6.png',
                '/assets/screenshots/mediline/mediline5.png',
                '/assets/screenshots/mediline/mediline7.png',
                '/assets/screenshots/mediline/mediline8.png',
              ],
              captions: [
                'Mediline\'s landing page, where a user can see the services that are provided. They can also do a preliminary search for doctors who are with the service.',
                'Users can sign in to view their dashboard with their account info or create an account if needed.',
                'Patients have their own dashboard, where they can check on their active doctors, upcoming appointments, invoice statuses, and more.',
                'Patients can view their account information, active prescriptions, exercise plans, and fill out forms and surveys sent by their doctors. They can also see their progress visualized through graphs.',
                'Doctors also have their own dashboard, where they can view their schedule of appointments, view patient information, and assign medication, create exercise plans, and send invoices.',
                'The final dashboard is for pharmacists, who can check on medication inventory, payment statuses, and incoming prescriptions to be accepted or rejected.',
                'Mediline offers the ability to handle appointments between patients and doctors via live chat rooms.',
                'There is also a discussion forum, where patients and doctors alike can share healthcare routines and comment on others\'.',
              ],
              dates: ['February 2025', 'May 2025'],
              githubLink: 'RonSarcauga/CS_490_Mediline_Frontend',
              roleText: 'Frontend Developer',
              skills: ['react', 'flask', 'mysql', 'fastapi']
            })}
          />
          <PaperCard
            src="/assets/logos/chefasapLogo.png"
            alt="ChefAsap"
            top="18.5%"
            left="-7%"
            type="paper"
            size='xs'
            rot={-12}
            onHoverChange={handleHoverChange}
            onClick={() => openGalleryModal({
              imageSrc: "/assets/logos/chefasapLogo.png",
              //linkHref: "",
              textContent: "ChefAsap is a mobile application allowing users to book chefs for personalized cooking experiences. The app is complete with menu creation, location-based searching, booking calendars, end-to-end messaging, and Stripe-integrated payments. The frontend uses React Native with Expo Router and the backend uses Flask with PostgreSQL, hosted on Render.",
              galleryImages: [
                '/assets/screenshots/chefasap/chefasap1.png',
                '/assets/screenshots/chefasap/chefasap2.png',
                '/assets/screenshots/chefasap/chefasap3.png',
                '/assets/screenshots/chefasap/chefasap4.png',
                '/assets/screenshots/chefasap/chefasap5.png',
                '/assets/screenshots/chefasap/chefasap6.png',
                '/assets/screenshots/chefasap/chefasap7.png',
              ],
              captions: [
                'ChefAsap\'s landing page, where a user can sign up to create an account and sign in to the app once an account is created.',
                'Chefs have the ability to edit their schedules, displayed cuisines, and descriptions from their profile. They also have the ability to manage their menu, adding items section by section.',
                'Customers have the ability to do a location based search for chefs in their area. There are many filters available, and they can view favorite and recent chefs as well.',
                'When a customer selects a chef, they can view their basic info, schedule, and menu. From the menu, they can add items to their cart and checkout, ending in a booking request to the chef.',
                'Both chefs and customers alike can view their upcoming and past bookings in a calendar view as well as a detailed list view.',
                'Customers also have the ability to chat with chefs in-app to discuss details about their bookings, like giving directions or asking for substitutions.',
                'Payment was fully integrated using a Stripe sandbox environment, allowing customers to securely pay for their bookings through the app.',
              ],
              dates: ['September 2025', 'December 2025'],
              githubLink: 'michaelmarut/CS491-ChefAsap',
              roleText: 'Tech Lead & Full Stack Developer',
              skills: ['react', 'expo', 'flask', 'postgresql']
            })}
          />
        </div>

        {/* skills */}
        <div className="absolute top-[30%] left-[77%] w-full h-full pointer-events-none">
          <img
            className='absolute top-[3%] left-[1%] -translate-x-1/2 z-10 h-[4%]'
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
              top="19%"
              left="0%"
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
          <div className="absolute top-[12%] left-[4%] w-full h-full pointer-events-none">
            <PaperCard
              src="/assets/symbols/aws.png"
              alt="AWS"
              top="-7%"
              left="4%"
              type='sticker'
              size="sm"
              rot={-3}
              onHoverChange={handleHoverChange}
            />
            <PaperCard
              src="/assets/symbols/gcp.png"
              alt="GCP"
              top="0%"
              left="0.5%"
              type='sticker'
              size="sm"
              rot={-4}
              onHoverChange={handleHoverChange}
            />
            <PaperCard
              src="/assets/symbols/vercel.png"
              alt="Vercel"
              top="1%"
              left="6%"
              type='sticker'
              size="sm"
              rot={8}
              onHoverChange={handleHoverChange}
            />
            <PaperCard
              src="/assets/symbols/railway.png"
              alt="Railway"
              top="8%"
              left="2.5%"
              type='sticker'
              size="sm"
              rot={12}
              onHoverChange={handleHoverChange}
            />
            <PaperCard
              src="/assets/symbols/render.png"
              alt="Render"
              top="8%"
              left="8%"
              type='sticker'
              size="sm"
              rot={-4}
              onHoverChange={handleHoverChange}
            />
          </div>
          {/* webdev */}
          <div className="absolute top-[44%] left-[7%] w-full h-full pointer-events-none">
            <PaperCard
              src="/assets/symbols/mysql.png"
              alt="MySQL"
              top="-1%"
              left="-5%"
              type='sticker'
              size="sm"
              rot={2}
              onHoverChange={handleHoverChange}
            />
            <PaperCard
              src="/assets/symbols/postgresql.png"
              alt="PostgreSQL"
              top="9%"
              left="-5.5%"
              type='sticker'
              size="sm"
              rot={-9}
              onHoverChange={handleHoverChange}
            />
            <PaperCard
              src="/assets/symbols/react.png"
              alt="React"
              top="-3%"
              left=".5%"
              type='sticker'
              size="sm"
              rot={6}
              onHoverChange={handleHoverChange}
            />
            <PaperCard
              src="/assets/symbols/flask.png"
              alt="Flask"
              top="0%"
              left="6%"
              type='sticker'
              size="sm"
              rot={-10}
              onHoverChange={handleHoverChange}
            />
            <PaperCard
              src="/assets/symbols/css.png"
              alt="CSS"
              top="7%"
              left="0%"
              type='sticker'
              size="sm"
              rot={-8}
              onHoverChange={handleHoverChange}
            />
            <PaperCard
              src="/assets/symbols/html.png"
              alt="HTML"
              top="8%"
              left="5%"
              type='sticker'
              size="sm"
              rot={5}
              onHoverChange={handleHoverChange}
            />
            <PaperCard
              src="/assets/symbols/fastapi.png"
              alt="FastAPI"
              top="-8.5%"
              left="5.5%"
              type='sticker'
              size="sm"
              rot={7}
              onHoverChange={handleHoverChange}
            />
            <PaperCard
              src="/assets/symbols/expo.png"
              alt="Expo"
              top="-12%"
              left=".5%"
              type='sticker'
              size="sm"
              rot={-1}
              onHoverChange={handleHoverChange}
            />
          </div>

          {/* tools */}
          <div className="absolute top-[42%] left-[-16%] w-full h-full pointer-events-none">
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
            <PaperCard
              src="/assets/symbols/jira.png"
              alt="Jira"
              top="0%"
              left="10.5%"
              type='sticker'
              size="sm"
              rot={7}
              onHoverChange={handleHoverChange}
            />
          </div>
        </div>

        { /* certifications */}
        <div className="absolute top-[62%] left-[48%] w-full h-full pointer-events-none">
          <img
            className='absolute top-[4%] left-[0%] -translate-x-1/2 z-10 h-[5%]'
            src='/assets/titles/certifications.png'
            alt='Certifications'
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
        <div className="absolute top-[22%] left-[9%] w-full h-full pointer-events-none">
          <img
            className='absolute top-[-7%] left-[6%] -translate-x-1/2 z-10 h-[4%]'
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
            onClick={() => window.open("https://www.linkedin.com/in/omar-siddiqui-6296363b0", "_blank")}
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
            left="-.25%"
            type="postit"
            logo="/assets/logos/githubLogo.png"
            rot={8}
            logoOffsetX={3}
            onClick={() => window.open("https://github.com/osid54", "_blank")}
            onHoverChange={handleHoverChange}
          />
          <PaperCard
            src="/assets/postits/postit3.png"
            alt="Email Me"
            top="17%"
            left="7%"
            type="postit"
            logo="/assets/logos/email.png"
            hue={-280}
            rot={10}
            logoOffsetX={3}
            onClick={() => window.location.href = 'mailto:2004.osid54@gmail.com'}
            onHoverChange={handleHoverChange}
          />
        </div>

        {/* papers */}
        <div className="absolute top-[24%] left-[32%] w-full h-full pointer-events-none">
          <PaperCard
            src="/assets/papers/aboutme.jpg"
            alt="About Me"
            top="0%"
            left="0%"
            type="paper"
            rot={-5}
            onHoverChange={handleHoverChange}
            onClick={() => openPDFModal({
              pdfSrc: '/assets/pdfs/Omar-Siddiqui-About-Me.pdf',
              downloadFileName: 'Omar-Siddiqui-About-Me.pdf',
              imageUrl: "/assets/pdfs/aboutme.jpg",
              bgUrl: "paper4",
              downloadLabel: "About Me"
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
              pdfSrc: '/assets/pdfs/Omar-Siddiqui-Resume.pdf',
              downloadFileName: 'Omar-Siddiqui-Resume.pdf',
              imageUrl: "/assets/pdfs/resume.jpg",
              bgUrl: "paper3",
              downloadLabel: "Resume"
            })}
          />
        </div>

        {/* stickers */}
        <PaperCard
          src="/assets/stickers/stickerNJIT.png"
          alt="New Jersey Institute of Technology"
          top="11%"
          left="76%"
          type='sticker'
          size="lg"
          rot={-8}
          onHoverChange={handleHoverChange}
        />
        <PaperCard
          src="/assets/stickers/menteeGo.png"
          alt="MenteeGo Education"
          top="10%"
          left="87%"
          type='sticker'
          size="sm"
          rot={6}
          onHoverChange={handleHoverChange}
        />
        {/*
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
      */}

        {/* pins */}
        <div className="absolute top-[81%] left-[31%] w-full h-full pointer-events-none">
          <img
            className='absolute top-[0%] left-[00%] z-10 h-[4%]'
            src='/assets/pins/pin1.png'
            alt='Red Pin'
            style={{ filter: 'hue-rotate(0deg)' }}
          />
          <img
            className='absolute top-[-2%] left-[4%] z-10 h-[4%]'
            src='/assets/pins/pin1.png'
            alt='Blue Pin'
            style={{ filter: 'hue-rotate(200deg)' }}
          />
          <img
            className='absolute top-[3%] left-[3%] z-10 h-[4%]'
            src='/assets/pins/pin1.png'
            alt='Green Pin'
            style={{ filter: 'hue-rotate(110deg)' }}
          />
        </div>
        <img
          className='absolute top-[33%] left-[90%] z-10 h-[4%]'
          src='/assets/pins/pin1.png'
          alt='Red Pin'
          style={{ filter: 'hue-rotate(0deg)' }}
        />
        <img
          className='absolute top-[12%] left-[7%] z-10 h-[4%]'
          src='/assets/pins/pin1.png'
          alt='Blue Pin'
          style={{ filter: 'hue-rotate(200deg)' }}
        />
        <img
          className='absolute top-[9%] left-[84%] z-10 h-[4%]'
          src='/assets/pins/pin1.png'
          alt='Green Pin'
          style={{ filter: 'hue-rotate(110deg)' }}
        />

        <Tooltip
          text={tooltip.text}
          x={tooltip.x}
          y={tooltip.y}
          visible={tooltip.show}
        />
      </div>

      {/* Modals */}
      {
        activeGalleryModal && (
          <GalleryModal
            isOpen={true}
            onClose={closeGalleryModal}
            imageSrc={activeGalleryModal.imageSrc}
            linkHref={activeGalleryModal.linkHref}
            textContent={activeGalleryModal.textContent}
            galleryImages={activeGalleryModal.galleryImages}
            captions={activeGalleryModal.captions}
            dates={activeGalleryModal.dates}
            githubLink={activeGalleryModal.githubLink}
            roleText={activeGalleryModal.roleText}
            skills={activeGalleryModal.skills}
          />
        )
      }
      {
        activePDFModal && (
          <PDFModal
            isOpen={true}
            onClose={closePDFModal}
            pdfSrc={activePDFModal.pdfSrc}
            downloadFileName={activePDFModal.downloadFileName}
            imageUrl={activePDFModal.imageUrl}
            bgUrl={activePDFModal.bgUrl}
            downloadLabel={activePDFModal.downloadLabel}
          />
        )
      }
    </>
  );
}
