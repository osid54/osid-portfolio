import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const PDFModal = ({ isOpen, onClose, pdfSrc, imageUrl, downloadFileName, bgUrl, downloadLabel }) => {
  if (!isOpen) return null;

  const isPdfDownload = pdfSrc && pdfSrc.toLowerCase().endsWith('.pdf');

  const [visible, setVisible] = useState(true);
  async function fadeAway() {
    setVisible(false);
    await new Promise((resolve) => setTimeout(resolve, 250));
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      <AnimatePresence className="fixed inset-0 flex items-center justify-center">
        {visible && <motion.div
          className="fixed inset-0 flex items-center justify-center opacity-0"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
          onClick={fadeAway}
          whileInView={{ opacity: 1 }}
          transition={{ duration: .25 }}
          exit={{ opacity: 0 }}
        />}
      </AnimatePresence>
      <AnimatePresence>
        {visible && <motion.div 
        className="bg-white p-4 rounded-lg shadow-lg w-3/4 h-auto max-h-3/4 flex flex-col relative"
          style={{ backgroundImage: `url(assets/papers/${bgUrl}.jpg)` }}
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: visible ? "spring" : "tween", bounce: visible ? 0.25 : 0 }}
          exit={{ scale: 0 }}
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-gray-700 hover:text-red-500 text-2xl font-bold cursor-pointer"
          >
            &times;
          </button>

          <div
            className="flex-grow overflow-y-auto mb-4 flex flex-col rounded-lg text-center scrollbar scrollbar-thumb-gray-500 scrollbar-track-transparent"
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
            <div className="flex justify-center h-8 md:h-20 lg:h-30 xxxl:h-40 4k:h-50 items-center">
              <a
                href={isPdfDownload ? pdfSrc : imageUrl}
                download={downloadFileName}
                className="flex rounded-full bg-gray-500 hover:bg-gray-400 font-medium text-base md:text-3xl 4k:text-5xl h-[80%] w-[125px] md:w-[250px] 4k:w-[400px] justify-center items-center text-center cursor-pointer"
                style={{ fontFamily: 'Architex' }}
              >
                <span
                  style={{ position: 'relative', top: '5px' }}>
                  Download {downloadLabel}
                </span>
              </a>
            </div>
          )}
        </motion.div>}
      </AnimatePresence>
    </div>
  );
};

export default PDFModal;