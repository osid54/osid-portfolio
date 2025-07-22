import React, { useState, useRef, useEffect } from 'react';

const GalleryModal = ({ isOpen, onClose, imageSrc, linkHref, textContent, galleryImages, captions }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(0);
    const [fade, setFade] = useState(false);
    const [maxImageHeight, setMaxImageHeight] = useState(null);

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
            else if (e.key === 'Escape') onClose();
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

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
            onClick={onClose}
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
                    className="flex flex-grow-0 h-[30vh] mb-4 rounded-xl items-center gap-5"
                    style={{ backgroundColor: 'rgba(255,255,255,0.5)', backgroundBlendMode: 'overlay' }}
                >
                    <div className="flex justify-center items-center h-[90%] w-1/2 mx-auto">
                        <div className="flex flex-col w-full gap-4">
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
                                    {"https://www."+linkHref+"/"}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div
                        className="w-[45%] flex flex-col items-center justify-center text-gray-800 text-4xl font-semibold"
                        style={{ fontFamily: 'Architex' }}
                    >
                        <div className="overflow-y-auto max-h-[28vh] px-2">
                            <p className="text-center whitespace-pre-line">{textContent}</p>
                        </div>
                    </div>
                </div>
                <br />
                <div className="flex items-center justify-center relative overflow-hidden transition-colors duration-500">
                    <button
                        onClick={handlePrevImage}
                        className="absolute bg-gray-400 rounded-full z-20 h-[20%] w-[4%] left-[1%] font-extrabold hover:bg-gray-300 cursor-pointer"
                    >
                        &lt;
                    </button>

                    <div
                        className="absolute left-0 w-1/4 z-0 transform translate-x-1/4 rounded-lg shadow-lg transition-all duration-500 border-2 border-white"
                        style={{
                            background: "white",
                        }}
                    >
                        <img
                            ref={leftRef}
                            src={
                                currentImageIndex > 0
                                    ? galleryImages[currentImageIndex - 1]
                                    : galleryImages[galleryImages.length - 1]
                            }
                            alt="Left preview"
                            className={`max-h-full max-w-full object-contain transition-opacity duration-500 ${fade ? 'opacity-0' : 'opacity-100'} rounded-lg`}
                        />
                    </div>

                    <div
                        className="w-2/3 max-h-full rounded-lg flex flex-col items-center justify-start z-10 shadow-lg transition-all duration-500 border-4 overflow-hidden"
                        style={{
                            background: "white",
                        }}
                    >
                        <div className="flex-1 w-full flex items-center justify-center">
                            <img
                                ref={centerRef}
                                src={galleryImages[currentImageIndex]}
                                alt={`Gallery Image ${currentImageIndex + 1}`}
                                className={`max-h-full max-w-full object-contain transition-opacity duration-500 ${fade ? 'opacity-0' : 'opacity-100'}`}
                            />
                        </div>
                        <div
                            className="w-full text-center text-black px-4 py-2 max-h-[20%] text-3xl font-medium"
                            style={{ backgroundColor: 'rgba(255, 255, 255, 1)', fontFamily: 'Architex' }}
                        >
                            <span style={{ position: 'relative', top: '5px' }}>({currentImageIndex+1}/{galleryImages.length}) {captions[currentImageIndex]}</span>
                        </div>
                    </div>

                    <div
                        className="absolute right-0 w-1/4 z-0 transform -translate-x-1/4 rounded-lg shadow-lg transition-all duration-500 border-2"
                        style={{
                            background: "white",
                        }}
                    >
                        <img
                            ref={rightRef}
                            src={
                                currentImageIndex + 1 < galleryImages.length
                                    ? galleryImages[currentImageIndex + 1]
                                    : galleryImages[0]
                            }
                            alt="Right preview"
                            className={`max-h-full max-w-full object-contain transition-opacity duration-500 ${fade ? 'opacity-0' : 'opacity-100'} rounded-lg`}
                        />
                    </div>

                    <button
                        onClick={handleNextImage}
                        className="absolute bg-gray-400 rounded-full z-20 h-[20%] w-[4%] right-[1%] font-extrabold hover:bg-gray-300 cursor-pointer">
                        &gt;
                    </button>
                </div>
                <br />
            </div>
        </div>
    );
};

export default GalleryModal;
