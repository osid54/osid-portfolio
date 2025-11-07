import React, { useState, useRef, useEffect } from 'react';
import { GoScreenFull, GoScreenNormal, GoArrowRight, GoArrowLeft } from 'react-icons/go';

const GalleryModal = ({ isOpen, onClose, imageSrc, linkHref, textContent, galleryImages, captions }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(0);
    const [fade, setFade] = useState(false);
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
    }, [isOpen, currentImageIndex]);

    if (!isOpen) return null;

    const handleNextImage = () => {
        setFade(true);
        setTimeout(() => {
            setPrevIndex(currentImageIndex);
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
            setFade(false);
        }, 300);
    };

    const handlePrevImage = () => {
        setFade(true);
        setTimeout(() => {
            setPrevIndex(currentImageIndex);
            setCurrentImageIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length);
            setFade(false);
        }, 300);
    };

    const toggleFullscreen = () => {
        setFullscreen(!fullscreen);
    };

    return (
        <div
            className="fixed inset-0 z-30 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
            onClick={!fullscreen ? onClose : null}
        >
            <div
                className="p-4 rounded-xl shadow-lg w-[60%] relative flex flex-col"
                style={{ backgroundImage: `url(assets/papers/paper5.jpg)` }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-[1%] right-[1%] text-gray-700 hover:text-red-500 text-2xl font-bold cursor-pointer"
                >
                    &times;
                </button>

                <div
                    className="flex flex-grow-0 h-[30vh] mb-4 rounded-xl items-center gap-[2%]"
                    style={{ backgroundColor: 'rgba(255,255,255,0.5)', backgroundBlendMode: 'overlay' }}
                >
                    <div className="flex justify-center items-center h-[90%] w-[45%] mx-auto">
                        <div className="flex flex-col w-[95%] gap-4">
                            <div className="h-1/2 justify-items-center">
                                <img src={imageSrc} alt="Modal Content" className="h-full object-contain" />
                            </div>
                            <div
                                className="h-1/2 flex items-center justify-center rounded-md text-4xl font-semibold text-center"
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
                        </div>
                    </div>
                    <div
                        className="w-[50%] flex flex-col items-center justify-center text-gray-800 text-4xl font-semibold"
                        style={{ fontFamily: 'Architex' }}
                    >
                        <div className="overflow-y-auto max-h-[28vh] px-2">
                            <p className="text-center whitespace-pre-line">{textContent}</p>
                        </div>
                    </div>
                </div>
                <br />
                <div className="flex items-center justify-center relative overflow-hidden transition-colors duration-300 ease-in">
                    <button
                        onClick={handlePrevImage}
                        className="absolute z-20 h-[15%] w-[10%] left-[4%] bottom-[4%] cursor-pointer items-center justify-center flex"
                    >
                        <GoArrowLeft className='rounded-full h-[90%] w-[90%] hover:h-full hover:w-full text-white bg-gray-500/50' />
                    </button>

                    <div
                        className="absolute left-0 w-1/3 z-0 transform translate-x-1/8 rounded-lg shadow-lg transition-all duration-300 ease-in border-2 border-white bg-white"
                    >
                        <img
                            ref={leftRef}
                            src={
                                currentImageIndex > 0
                                    ? galleryImages[currentImageIndex - 1]
                                    : galleryImages[galleryImages.length - 1]
                            }
                            alt="Left preview"
                            className={`max-h-full max-w-full object-contain transition-opacity duration-300 ease-in ${fade ? 'opacity-0' : 'opacity-100'} rounded-lg`}
                        />
                    </div>

                    <div
                        className="w-2/3 max-h-full rounded-lg flex flex-col items-center justify-start z-10 shadow-lg transition-all duration-300 ease-in border-4 overflow-hidden bg-white"
                    >
                        <div className="flex-1 w-full flex items-center justify-center">
                            <button
                                onClick={toggleFullscreen}
                                className="absolute cursor-pointer z-20 h-12 w-12 right-[17.5%] top-[2%] items-center justify-center flex"
                            >
                                <GoScreenFull className='rounded-lg h-[90%] w-[90%] hover:h-full hover:w-full text-white hover:opacity-50 bg-gray-500/50' />
                            </button>
                            <img
                                ref={centerRef}
                                src={galleryImages[currentImageIndex]}
                                alt={`Gallery Image ${currentImageIndex + 1}`}
                                className={`max-h-full max-w-full object-contain transition-opacity duration-300 ease-in ${fade ? 'opacity-0' : 'opacity-100'}`}
                            />
                        </div>
                        <div
                            className="w-full text-center text-black px-4 py-2 max-h-[20%] text-3xl font-medium"
                            style={{ backgroundColor: 'rgba(255, 255, 255, 1)', fontFamily: 'Architex' }}
                        >
                            <span style={{ position: 'relative', top: '5px' }}>({currentImageIndex + 1}/{galleryImages.length}) {captions[currentImageIndex]}</span>
                        </div>
                    </div>

                    <div
                        className="absolute right-0 w-1/3 z-0 transform -translate-x-1/8 rounded-lg shadow-lg transition-all duration-300 ease-in border-2 bg-white"
                    >
                        <img
                            ref={rightRef}
                            src={
                                currentImageIndex + 1 < galleryImages.length
                                    ? galleryImages[currentImageIndex + 1]
                                    : galleryImages[0]
                            }
                            alt="Right preview"
                            className={`max-h-full max-w-full object-contain transition-opacity duration-300 ease-in ${fade ? 'opacity-0' : 'opacity-100'} rounded-lg`}
                        />
                    </div>

                    <button
                        onClick={handleNextImage}
                        className="absolute z-20 h-[15%] w-[10%] right-[4%] bottom-[4%] cursor-pointer items-center justify-center flex"
                    >
                        <GoArrowRight className='rounded-full h-[90%] w-[90%] hover:h-full hover:w-full text-white bg-gray-500/50' />
                    </button>
                </div>
                <br />
            </div>
            {fullscreen &&
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center "
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
                    onClick={toggleFullscreen}
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
                        className={`w-[80%] h-auto border-3 rounded-xl`}
                        onClick={(e) => e.stopPropagation()}
                    />
                    
                    <button
                        onClick={toggleFullscreen}
                        className="absolute cursor-pointer z-20 h-20 w-20 right-[2.5%] top-8 items-center justify-center flex"
                    >
                        <GoScreenNormal className='rounded-xl h-[90%] w-[90%] hover:h-full hover:w-full text-white bg-gray-500/50' />
                    </button>
                </div>
            }
        </div>
    );
};

export default GalleryModal;
