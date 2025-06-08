import React, { useState, useRef, useEffect } from 'react';

const GalleryModal = ({ isOpen, onClose, imageSrc, linkHref, textContent, galleryImages, captions }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(0);
    const [edgeColors, setEdgeColors] = useState({
        center: { top: '#000', bottom: '#000' },
        left: { top: '#000', bottom: '#000' },
        right: { top: '#000', bottom: '#000' },
    });
    const [fade, setFade] = useState(false);
    const [maxImageHeight, setMaxImageHeight] = useState(null);

    const centerRef = useRef();
    const leftRef = useRef();
    const rightRef = useRef();

    const getEdgeColor = (img) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);

        const middleX = Math.floor(img.naturalWidth / 2);
        const topPixel = ctx.getImageData(middleX, 0, 1, 1).data;
        const bottomPixel = ctx.getImageData(middleX, img.naturalHeight - 1, 1, 1).data;

        return {
            top: `rgb(${topPixel[0]}, ${topPixel[1]}, ${topPixel[2]})`,
            bottom: `rgb(${bottomPixel[0]}, ${bottomPixel[1]}, ${bottomPixel[2]})`,
        };
    };

    useEffect(() => {
        const updateColors = () => {
            try {
                const centerColor = getEdgeColor(centerRef.current);
                const leftColor = getEdgeColor(leftRef.current);
                const rightColor = getEdgeColor(rightRef.current);
                setEdgeColors({ center: centerColor, left: leftColor, right: rightColor });
            } catch (err) {
                console.error('Error extracting edge colors', err);
            }
        };

        const allLoaded =
            centerRef.current?.complete &&
            leftRef.current?.complete &&
            rightRef.current?.complete;

        if (allLoaded) updateColors();
        else {
            const handleLoad = () => updateColors();
            centerRef.current?.addEventListener('load', handleLoad);
            leftRef.current?.addEventListener('load', handleLoad);
            rightRef.current?.addEventListener('load', handleLoad);

            return () => {
                centerRef.current?.removeEventListener('load', handleLoad);
                leftRef.current?.removeEventListener('load', handleLoad);
                rightRef.current?.removeEventListener('load', handleLoad);
            };
        }
    }, [currentImageIndex]);

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
                    className="flex flex-grow-0 h-[30vh] mb-4 rounded-xl items-center"
                    style={{ backgroundColor: 'rgba(255,255,255,0.5)', backgroundBlendMode: 'overlay' }}
                >
                    <div className="flex justify-center items-center h-[90%] w-1/2 mx-auto">
                        <div className="flex flex-col w-full gap-4">
                            <div className="h-1/2">
                                <img src={imageSrc} alt="Modal Content" className="w-full h-full object-contain" />
                            </div>
                            <div
                                className="h-1/2 flex items-center justify-center rounded-md text-4xl font-semibold text-center"
                                style={{ fontFamily: 'Architex' }}
                            >
                                <a
                                    href={linkHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-500 hover:underline break-all"
                                >
                                    {linkHref}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div
                        className="w-[45%] flex flex-col items-center justify-center text-gray-800 text-2xl font-semibold"
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
                            background: `linear-gradient(to bottom, ${edgeColors.left.top}, ${edgeColors.left.bottom})`,
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
                            background: `linear-gradient(to bottom, ${edgeColors.center.top}, ${edgeColors.center.bottom})`,
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
                            className="w-full text-center text-black px-4 py-2 max-h-[20%] text-xl font-medium"
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', fontFamily: 'Architex' }}
                        >
                            <span style={{ position: 'relative', top: '5px' }}>({currentImageIndex+1}/{galleryImages.length}) {captions[currentImageIndex]}</span>
                        </div>
                    </div>

                    <div
                        className="absolute right-0 w-1/4 z-0 transform -translate-x-1/4 rounded-lg shadow-lg transition-all duration-500 border-2"
                        style={{
                            background: `linear-gradient(to bottom, ${edgeColors.right.top}, ${edgeColors.right.bottom})`,
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
