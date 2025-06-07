// PDFModal.jsx (No changes)
import React from 'react';

const PDFModal = ({ isOpen, onClose, pdfSrc, imageUrl, downloadFileName }) => {
  if (!isOpen) return null;

  const isPdf = pdfSrc && pdfSrc.toLowerCase().endsWith('.pdf');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-3/4 h-3/4 flex flex-col relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 text-2xl font-bold">
          &times;
        </button>

        <div className="flex-grow overflow-y-auto mb-4">
          {isPdf ? (
            <iframe src={pdfSrc} title="PDF Viewer" className="w-full h-full border-0"></iframe>
          ) : (
            <img src={imageUrl} alt="Document" className="w-full h-full object-contain" />
          )}
        </div>

        {(isPdf || imageUrl) && downloadFileName && (
          <div className="flex justify-center">
            <a
              href={isPdf ? pdfSrc : imageUrl}
              download={downloadFileName}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Download {downloadFileName}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFModal;