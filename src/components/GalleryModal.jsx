import React, { useState, useRef, useEffect } from 'react';

const GalleryModal = ({ isOpen, onClose, imageSrc, linkHref, textContent, galleryImages }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [edgeColors, setEdgeColors] = useState({
        center: { top: '#000', bottom: '#000' },
        left: { top: '#000', bottom: '#000' },
        right: { top: '#000', bottom: '#000' },
    });
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

    if (!isOpen) return null;

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length);
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
                    className="absolute top-2 right-2 text-gray-700 hover:text-red-500 text-2xl font-bold"
                >
                    &times;
                </button>

                <div
                    className="flex flex-grow-0 h-[30vh] mb-4 rounded-xl"
                    style={{ backgroundColor: 'rgba(255,255,255,0.5)', backgroundBlendMode: 'overlay' }}
                >
                    <div className="flex flex-col w-1/2">
                        <div className="h-1/2">
                            <img src={imageSrc} alt="Modal Content" className="w-full h-full object-contain" />
                        </div>
                        <div className="h-1/2 flex items-center justify-center rounded-md text-4xl font-semibold"
                            style={{ fontFamily: 'Architex' }}
                        >
                            <a
                                href={linkHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline break-all "
                            >
                                {linkHref}
                            </a>
                        </div>
                    </div>
                    <div className="w-[45%] overflow-y-auto text-center flex items-center justify-center text-gray-800 text-2xl font-semibold"
                        style={{ fontFamily: 'Architex' }}
                    >
                        <p>{textContent}</p>
                    </div>
                </div>

                <div className="flex items-center justify-center relative overflow-hidden h-[55vh]">
                    <button onClick={handlePrevImage} className="absolute bg-gray-400 rounded-full z-20 h-[20%] w-[4%] left-[1%] font-extrabold hover:bg-gray-300">
                        &lt;
                    </button>

                    <div
                        className="absolute left-0 w-1/4 h-[20vh] z-0 transform translate-x-1/4 rounded-lg shadow-lg"
                        style={{
                            background: `linear-gradient(to bottom, ${edgeColors.left.top}, ${edgeColors.left.bottom})`,
                        }}
                    >
                        <img
                            ref={leftRef}
                            src={currentImageIndex > 0 ? galleryImages[currentImageIndex - 1] : galleryImages[galleryImages.length - 1]}
                            alt="Left preview"
                            className="w-full h-full object-contain z-1 pointer-events-none absolute"
                        />
                    </div>

                    <div
                        className="relative w-2/3 h-[50vh] rounded-lg flex items-center justify-center z-10 shadow-lg"
                        style={{
                            background: `linear-gradient(to bottom, ${edgeColors.center.top}, ${edgeColors.center.bottom})`,
                        }}
                    >
                        <img
                            ref={centerRef}
                            src={galleryImages[currentImageIndex]}
                            alt={`Gallery Image ${currentImageIndex + 1}`}
                            className="max-h-full max-w-full object-contain rounded-lg"
                        />
                    </div>

                    <div
                        className="absolute right-0 w-1/4 h-[20vh] z-0 transform -translate-x-1/4 rounded-lg shadow-lg"
                        style={{
                            background: `linear-gradient(to bottom, ${edgeColors.right.top}, ${edgeColors.right.bottom})`,
                        }}
                    >
                        <img
                            ref={rightRef}
                            src={currentImageIndex + 1 < galleryImages.length ? galleryImages[currentImageIndex + 1] : galleryImages[0]}
                            alt="Right preview"
                            className="w-full h-full object-contain z-1 pointer-events-none absolute"
                        />
                    </div>

                    <button onClick={handleNextImage} className="absolute bg-gray-400 rounded-full z-20 h-[20%] w-[4%] right-[1%] font-extrabold hover:bg-gray-300">
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GalleryModal;
