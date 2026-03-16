import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GoScreenFull, GoScreenNormal, GoArrowRight, GoArrowLeft } from 'react-icons/go';

const GalleryModal = ({
    isOpen,
    onClose,
    imageSrc,
    linkHref,
    textContent,
    galleryImages,
    captions,
    dates,
    githubLink,
    roleText,
    skills,
}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(0);
    const [maxImageHeight, setMaxImageHeight] = useState(null);
    const [fullscreen, setFullscreen] = useState(false);

    const centerRef = useRef();
    const leftRef = useRef();
    const rightRef = useRef();

    useEffect(() => {
        const preloadImages = async () => {
            const heights = await Promise.all(
                galleryImages.map(
                    src =>
                        new Promise((resolve) => {
                            const img = new Image();
                            img.onload = () => resolve(img.naturalHeight);
                            img.src = src;
                        })
                )
            );
            const maxHeight = Math.max(...heights);
            setMaxImageHeight(maxHeight);
        };

        preloadImages();
    }, []);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') handlePrevImage();
            else if (e.key === 'ArrowRight') handleNextImage();
            else if (e.key === 'Escape') fullscreen ? toggleFullscreen() : onClose();
            else if (e.key === 'f') toggleFullscreen();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, currentImageIndex, fullscreen]);

    if (!isOpen) return null;

    const handleNextImage = () => {
        setTimeout(() => {
            setPrevIndex(currentImageIndex);
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
        }, 100);
    };

    const handlePrevImage = () => {
        setTimeout(() => {
            setPrevIndex(currentImageIndex);
            setCurrentImageIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length);
        }, 100);
    };

    const toggleFullscreen = () => {
        setFullscreen(!fullscreen);
    };

    const [visible, setVisible] = useState(true);
    async function fadeAway() {
        setVisible(false);
        await new Promise((resolve) => setTimeout(resolve, 250));
        onClose();
    };

    const stickerSize = (100 / (skills.length + 1)).toFixed(0).toString();
    const logoSticker = (skill, index) => {
        const imageSrc = `/assets/symbols/${skill}.png`;
        return (
            <motion.div
                key={index}
                className={`flex justify-center items-center`}
                initial={{ rotate: -3 + index % 3, filter: `drop-shadow(-1px 1px 1px rgba(0, 0, 0, .2))`, height: `${stickerSize}%`, x: 5 + ((index - skills.length) % 3) * skills.length }}
            >
                <img src={imageSrc} alt={`${imageSrc}`} className={`h-full w-auto object-contain object-center`} />
            </motion.div>
        )
    };

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
            <AnimatePresence className="fixed inset-0 flex items-center justify-center">
                {visible && <motion.div
                    className="fixed inset-0 flex items-center justify-center opacity-0"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
                    onClick={!fullscreen ? fadeAway : null}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: .25 }}
                    exit={{ opacity: 0 }}
                />}
            </AnimatePresence>
            <AnimatePresence className='absolute flex items-center justify-center z-5 pointer-events-none '>
                {visible && <motion.div
                    className="absolute w-[90vw] xl:w-[80vw] aspect-[208/125] bg-contain bg-center bg-no-repeat "
                    style={{ backgroundImage: `url(assets/papers/manilaFolder1.png)` }}
                    onClick={(e) => e.stopPropagation()}
                    initial={{ y: 800 }}
                    animate={{ y: 0 }}
                    transition={{ type: visible ? "spring" : "tween", bounce: visible ? 0.25 : 0 }}
                    exit={{ y: 1000 }}
                >
                    {linkHref ?
                        <>
                            <motion.div
                                className={`absolute top-[6%] left-[11%] h-[30%] w-[30%] flex flex-col justify-center items-center gap-1 bg-no-repeat bg-contain bg-center`}
                                style={{
                                    backgroundImage: `url(assets/cards/card3.png)`
                                }}
                                initial={{ rotate: 2, filter: `drop-shadow(-2px 2px 2px rgba(0, 0, 0, .2))` }}
                            >
                                <img src={imageSrc} alt={`${imageSrc}`} className={`w-[95%] h-auto max-h-[70%] object-contain`} />

                                <motion.div
                                    className="absolute top-[-2%] -left-[22%] w-[67%] h-[18%] flex flex-col items-center justify-center bg-no-repeat bg-contain bg-center pointer-events-none"
                                    style={{ backgroundImage: `url(assets/postits/tapeSmall.png)` }}
                                    initial={{ rotate: -20, filter: `drop-shadow(-1px 1px 1px rgba(0, 0, 0, .2))` }}
                                />

                                <motion.div
                                    className="absolute -bottom-[5%] -right-[21%] w-[75%] h-[20%] flex flex-col items-center justify-center text-gray-700 text-[8px]/3 sm:text-sm/4 md:text-base lg:text-xl/6 xl:text-2xl xxl:text-2xl/8 xxxl:text-3xl 4k:text-4xl font-semibold bg-no-repeat bg-contain bg-center pointer-events-none"
                                    style={{ fontFamily: 'Architex', backgroundImage: `url(assets/postits/tape.png)` }}
                                    initial={{ rotate: -15, filter: `drop-shadow(-1px 1px 1px rgba(0, 0, 0, .2))` }}
                                >
                                    <div className="relative left-[2%] top-[5%] w-[100%]">
                                        {dates && <p className="text-center text-nowrap">{dates[0]} - {dates[1]}</p>}
                                    </div>
                                </motion.div>

                                <div
                                    className="flex items-center justify-center rounded-md text-[9px]/2.5 sm:text-base/3 md:text-lg/4 lg:text-[22px]/6 xl:text-2xl/7 xxl:text-[28px]/8 2xl:text-[30px]/8 xxxl:text-4xl 4k:text-5xl/14 font-semibold text-center"
                                    style={{ fontFamily: 'Architex' }}
                                >
                                    <a
                                        href={"https://www." + linkHref + "/"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-500 hover:underline break-all"
                                    >
                                        {"https://www." + linkHref + "/"}
                                    </a>
                                </div>

                            </motion.div>
                        </>
                        :
                        <>
                            <motion.div
                                className={`absolute top-[5%] left-[8%] h-1/3 w-1/5 flex flex-col justify-center items-center gap-4 bg-no-repeat bg-contain bg-center`}
                                style={{
                                    backgroundImage: `url(assets/postits/postit4.png)`,
                                }}
                                initial={{ rotate: -5, filter: `drop-shadow(-2px 2px 2px rgba(0, 0, 0, .2))` }}
                            >
                                <img src={imageSrc} alt={`${imageSrc}`} className={`w-[95%] h-auto max-h-[70%] object-contain`} />
                            </motion.div>
                            <motion.div
                                className="absolute top-[20%] left-[30%] w-[12%] h-[20%] flex flex-col items-center justify-center text-gray-700 text-[8px]/3 sm:text-sm/4 md:text-base lg:text-xl/6 xl:text-2xl xxl:text-2xl/8 xxxl:text-3xl 4k:text-4xl font-semibold bg-no-repeat bg-contain bg-center pointer-events-none"
                                style={{ fontFamily: 'Architex', backgroundImage: `url(assets/postits/postitRect.png)` }}
                                initial={{ rotate: -15, filter: `drop-shadow(-2px 2px 2px rgba(0, 0, 0, .2))` }}
                            >
                                <div className="relative left-[2%] top-[5%]">
                                    {dates && <p className="text-center text-nowrap">{dates[0]} -<br />{dates[1]}</p>}
                                </div>
                            </motion.div>
                            <motion.div
                                className="absolute top-[4%] left-[30%] w-[12%] h-[20%] flex flex-col items-center justify-center text-gray-700 text-[8px]/3 sm:text-sm/4 md:text-base lg:text-xl/6 xl:text-2xl xxl:text-2xl/8 xxxl:text-3xl 4k:text-4xl font-semibold bg-no-repeat bg-contain bg-center pointer-events-none"
                                style={{ fontFamily: 'Architex', backgroundImage: `url(assets/postits/postitRect.png)` }}
                                initial={{ rotate: 10, filter: `drop-shadow(-2px 2px 2px rgba(0, 0, 0, .2))` }}
                            >
                                <div className="relative left-[2%] top-[5%]">
                                    {dates && <p className="text-center text-nowrap">Made for mobile -<br />No live demo</p>}
                                </div>
                            </motion.div>
                        </>
                    }

                    <motion.div
                        className="absolute top-[5%] right-[4.5%] w-[50%] h-[90%] flex flex-col items-center justify-start text-gray-800 text-[9px]/2.5 sm:text-base/3 md:text-lg/4 lg:text-[22px]/6 xl:text-2xl/7 xxl:text-[28px]/8 2xl:text-[30px]/8 xxxl:text-4xl 4k:text-5xl/14 font-semibold bg-no-repeat bg-contain bg-center "
                        style={{ fontFamily: 'Architex', backgroundImage: `url(assets/papers/paper6.png)` }}
                        initial={{ rotate: -3, filter: `drop-shadow(-2px 2px 2px rgba(0, 0, 0, .2))` }}
                    />

                    <motion.div
                        className="absolute top-[5%] right-[4%] w-[50%] h-[90%] flex flex-col items-center justify-start text-gray-800 text-[9px]/2.5 sm:text-base/3 md:text-lg/4 lg:text-[22px]/6 xl:text-2xl/7 xxl:text-[28px]/8 2xl:text-[30px]/8 xxxl:text-4xl 4k:text-5xl/14 font-semibold bg-no-repeat bg-contain bg-center"
                        style={{ fontFamily: 'Architex', backgroundImage: `url(assets/papers/paper6.png)` }}
                        initial={{ rotate: 1, filter: `drop-shadow(-2px 2px 2px rgba(0, 0, 0, .2))` }}
                    >
                        <div className="relative -right-[3.5%] top-[3%] overflow-y-auto w-[72%] h-[40%]">
                            <p className="text-justify whitespace-pre-line">{textContent}</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="absolute bottom-[8%] right-[11%] w-1/3 h-1/3 flex flex-col items-center justify-center font-semibold bg-no-repeat bg-contain bg-center"
                        style={{ backgroundImage: `url(assets/cards/card3.png)` }}
                        initial={{ rotate: 12, filter: `drop-shadow(-2px 2px 2px rgba(0, 0, 0, .2))` }}
                    />

                    <motion.div
                        className="absolute bottom-[10%] right-[12%] w-1/3 h-1/3 flex flex-col items-center justify-center font-semibold bg-no-repeat bg-contain bg-center"
                        style={{ backgroundImage: `url(assets/cards/card3.png)` }}
                        initial={{ rotate: -2, filter: `drop-shadow(-2px 2px 2px rgba(0, 0, 0, .2))` }}
                    />

                    <motion.div
                        className="absolute bottom-[10%] right-[11%] w-1/3 h-1/3 flex flex-col items-center justify-center text-gray-800 text-[9px]/2.5 sm:text-base/3 md:text-lg/4 lg:text-[22px]/6 xl:text-2xl/7 xxl:text-[28px]/8 2xl:text-[30px]/8 xxxl:text-4xl 4k:text-5xl/14 font-semibold bg-no-repeat bg-contain bg-center"
                        style={{ fontFamily: 'Architex', backgroundImage: `url(assets/cards/card3.png)` }}
                        initial={{ rotate: 5, filter: `drop-shadow(-2px 2px 2px rgba(0, 0, 0, .2))` }}
                    >
                        <div
                            className="absolute top-[0%] -left-[1.5%] h-1/3 w-[25%] flex flex-col items-center justify-center bg-no-repeat bg-cover bg-center"
                            style={{ backgroundImage: `url(assets/postits/postitCircle.png)` }}
                        >
                            <p className="text-[8px]/3 sm:text-sm/4 md:text-base lg:text-xl/6 xl:text-2xl xxl:text-2xl/8 xxxl:text-3xl 4k:text-4xl text-center">{currentImageIndex + 1}/{galleryImages.length}</p>
                        </div>

                        <div className="h-[95%] flex flex-col justify-end items-center">
                            <div className="flex justify-start items-center h-[85%] w-[90%] overflow-y-auto">
                                <p className="text-justify whitespace-pre-wrap h-full">{'\t\t' + captions[currentImageIndex]}</p>
                            </div>
                        </div>

                        <motion.div
                            className="absolute bottom-[0%] -right-[10.8%] w-1/3 h-1/3 flex flex-col items-center justify-center font-semibold bg-no-repeat bg-contain bg-center"
                            style={{ backgroundImage: `url(assets/pins/paperClip.png)` }}
                            initial={{ rotate: 95, filter: `drop-shadow(-2px 2px 2px rgba(0, 0, 0, .2))` }}
                        />
                    </motion.div>

                    <motion.button
                        onClick={() => window.open("https://github.com/" + githubLink, "_blank")}
                        className="absolute z-20 h-[10%] aspect-square right-[34%] top-[43.5%] cursor-pointer flex items-center justify-center text-center bg-no-repeat bg-contain bg-center border-4 border-gray-100 rounded-full opacity-90"
                        style={{ fontFamily: 'Architex', backgroundImage: `url(assets/logos/githubCircle.webp)` }}
                        initial={{ rotate: 0, filter: `drop-shadow(-1px 1px 1px rgba(0, 0, 0, .2))` }}
                        whileHover={{
                            scale: 1.05,
                            rotate: 2,
                            filter: 'drop-shadow(-1px 1px 1px rgba(0, 0, 0, .2)) drop-shadow(0 0 3px rgba(255,255,255,0.8))'
                        }}
                    />

                    <motion.div
                        className="absolute right-[13%] top-[40%] w-[20%] h-[20%] flex flex-col items-center justify-center text-gray-700 text-[8px]/3 sm:text-sm/4 md:text-base lg:text-xl/6 xl:text-2xl xxl:text-2xl/8 xxxl:text-3xl 4k:text-4xl font-semibold bg-no-repeat bg-contain bg-center pointer-events-none"
                        style={{ fontFamily: 'Architex', backgroundImage: `url(assets/postits/postitLong.png)` }}
                        initial={{ rotate: 4, filter: `drop-shadow(-2px 2px 2px rgba(0, 0, 0, .2))` }}
                    >
                        <div className="relative top-[5%] overflow-y-auto w-[100%]">
                            {roleText &&
                                roleText.indexOf("&") > -1 
                                ? <p className="text-center whitespace-no-wrap">{roleText.split("&")[0]} &<br/>{roleText.split("&")[1]}</p>
                                : <p className="text-center whitespace-no-wrap">{roleText}</p>
                            }
                        </div>
                    </motion.div>

                    <motion.div className="absolute bottom-[8%] -left-[1%] w-[45%] h-[45%] flex items-center justify-center transition-colors duration-100 ease-in bg-cover"
                        style={{ backgroundImage: `url(assets/papers/paper3.jpg)` }}
                        initial={{ rotate: -12, filter: `drop-shadow(-2px 2px 2px rgba(0, 0, 0, .2))` }}
                    >
                        <div className="absolute h-full w-full z-10 mix-blend-normal opacity-50 pointer-events-none bg-black/50" />

                        <img
                            ref={leftRef}
                            src={
                                currentImageIndex > 0
                                    ? galleryImages[currentImageIndex - 1]
                                    : galleryImages[galleryImages.length - 1]
                            }
                            alt="Left preview"
                            className={`max-h-[95%] max-w-[95%] object-contain rounded-xl border-2 border-gray-300`}
                        />
                    </motion.div>

                    <motion.div className="absolute bottom-[10%] left-[7%] w-[45%] h-[45%] flex items-center justify-center transition-colors duration-100 ease-in bg-cover "
                        style={{ backgroundImage: `url(assets/papers/paper3.jpg)` }}
                        initial={{ rotate: 5, filter: `drop-shadow(-2px 2px 2px rgba(0, 0, 0, .2))` }}
                    >
                        <div className="absolute h-full w-full z-10 mix-blend-normal opacity-50 pointer-events-none bg-black/30" />

                        <img
                            ref={rightRef}
                            src={
                                currentImageIndex + 1 < galleryImages.length
                                    ? galleryImages[currentImageIndex + 1]
                                    : galleryImages[0]
                            }
                            alt="Right preview"
                            className={`max-h-[95%] max-w-[95%] object-contain rounded-xl border-2 border-gray-300`}
                        />
                    </motion.div>

                    <motion.div className="absolute bottom-[7%] left-[0%] w-1/2 h-1/2 flex items-center justify-center transition-colors duration-100 ease-in bg-cover "
                        style={{ backgroundImage: `url(assets/papers/paper3.jpg)` }}
                        initial={{ rotate: -2, filter: `drop-shadow(-2px 2px 2px rgba(0, 0, 0, .2))` }}
                    >
                        <img
                            ref={centerRef}
                            src={galleryImages[currentImageIndex]}
                            alt={`Gallery Image ${currentImageIndex + 1}`}
                            className={`max-h-[95%] max-w-[95%] object-contain border-3 border-gray-300`}
                        />

                        <img className="absolute h-full w-full top-0 left-0 right-0 bottom-0 z-10 mix-blend-darken opacity-20 object-cover pointer-events-none" src={`assets/papers/paper3.jpg`} />

                        <button
                            onClick={toggleFullscreen}
                            className="absolute cursor-pointer z-20 h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 right-[2%] top-[2%] items-center justify-center flex"
                        >
                            <GoScreenFull className='rounded-lg h-[90%] w-[90%] hover:h-full hover:w-full text-white hover:opacity-50 bg-gray-500/50' />
                        </button>

                        <motion.button
                            whileHover={{ rotate: 1 }}
                            onClick={handlePrevImage}
                            className="absolute z-20 h-[15%] w-[30%] -left-[9%] -bottom-[8%] cursor-pointer flex items-center justify-center text-center bg-no-repeat bg-contain bg-center"
                            style={{ fontFamily: 'Architex', backgroundImage: `url(assets/postits/arrowL2.png)` }}
                            initial={{ rotate: 0, filter: `drop-shadow(-2px 2px 2px rgba(0, 0, 0, .2))` }}
                        />

                        <motion.button
                            whileHover={{ rotate: -2 }}
                            onClick={handleNextImage}
                            className="absolute z-20 h-[15%] w-[30%] -right-[9%] -bottom-[8%] cursor-pointer flex items-center justify-center text-center bg-no-repeat bg-contain bg-center"
                            style={{ fontFamily: 'Architex', backgroundImage: `url(assets/postits/arrowR2.png)` }}
                            initial={{ rotate: -1, filter: `drop-shadow(-2px 2px 2px rgba(0, 0, 0, .2))` }}
                        />
                    </motion.div>
                    <div className='absolute right-[3.8%] top-[36%] flex flex-col justify-between items-center h-[28%] w-[4.5%]'>
                        {skills.map((skill, index) => logoSticker(skill, index))}
                    </div>
                </motion.div>}
            </AnimatePresence>
            <AnimatePresence >
                {fullscreen &&
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center opacity-0"
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
                        onClick={toggleFullscreen}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: .25 }}
                        exit={{ opacity: 0 }}
                    >
                        <div
                            className="absolute top-8 left-[2.5%] text-6xl rounded-xl bg-gray-500/50 p-3 h-20 w-20 text-center items-end justify-center flex"
                            style={{ fontFamily: 'Architex' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {currentImageIndex + 1}/{galleryImages.length}
                        </div>

                        <img
                            ref={centerRef}
                            src={galleryImages[currentImageIndex]}
                            alt={`Gallery Image ${currentImageIndex + 1}`}
                            className={`w-[90%] lg:h-[90%] lg:w-auto border-3 rounded-xl`}
                            onClick={(e) => e.stopPropagation()}
                        />

                        <button
                            onClick={toggleFullscreen}
                            className="absolute cursor-pointer z-20 h-20 w-20 right-[2.5%] top-8 items-center justify-center flex"
                        >
                            <GoScreenNormal className='rounded-xl h-[90%] w-[90%] hover:h-full hover:w-full text-white bg-gray-500/50' />
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                            className="absolute cursor-pointer z-20 h-20 w-30 left-[1%] bottom-[2%] items-center justify-center flex"
                        >
                            <GoArrowLeft className='rounded-full h-[90%] w-[90%] hover:h-full hover:w-full text-white bg-gray-500/50' />
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                            className="absolute cursor-pointer z-20 h-20 w-30 right-[1%] bottom-[2%] items-center justify-center flex"
                        >
                            <GoArrowRight className='rounded-full h-[90%] w-[90%] hover:h-full hover:w-full text-white bg-gray-500/50' />
                        </button>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    );
};

export default GalleryModal;