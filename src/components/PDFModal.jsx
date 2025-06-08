import React from 'react';

const PDFModal = ({ isOpen, onClose, pdfSrc, imageUrl, downloadFileName, bgUrl, downloadLabel }) => {
  if (!isOpen) return null;

  const isPdfDownload = pdfSrc && pdfSrc.toLowerCase().endsWith('.pdf');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      onClick={onClose}
    >
      <div className="bg-white p-4 rounded-lg shadow-lg w-3/4 h-3/4 flex flex-col relative"
        style={{ backgroundImage: `url(assets/papers/${bgUrl}.jpg)` }}
        onClick={(e) => e.stopPropagation()}

      >
        <button
          onClick={onClose}
          className="absolute top-[3%] right-[3%] text-gray-700 hover:text-red-500 text-2xl font-bold cursor-pointer"
        >
          &times;
        </button>

        <div
          className="flex-grow overflow-y-auto mb-4 flex flex-col rounded-lg text-center"
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Document"
              className="w-full object-contain"
            />
          ) : (
            <p>No image available to display.</p>
          )}
        </div>

        {(isPdfDownload || imageUrl) && downloadFileName && (
          <div className="flex justify-center h-[20vh] items-center">
            <a
              href={isPdfDownload ? pdfSrc : imageUrl}
              download={downloadFileName}
              className="flex bg-gray-400 rounded-full hover:bg-gray-300 font-semibold text-3xl h-[80%] w-1/2 justify-center items-center text-center cursor-pointer"
              style={{ fontFamily: 'Architex', backgroundBlendMode: 'overlay' }}
            >
              <span 
              style={{ position: 'relative', top: '5px' }}>
                Download {downloadLabel}
              </span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFModal;