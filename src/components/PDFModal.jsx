import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GoDownload, GoX } from 'react-icons/go';


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
        className="bg-white p-4 rounded-lg shadow-lg w-5/6 md:w-3/5 h-auto max-h-5/6 flex flex-col relative"
          style={{ backgroundImage: `url(assets/papers/${bgUrl}.jpg)` }}
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: visible ? "spring" : "tween", bounce: visible ? 0.25 : 0 }}
          exit={{ scale: 0 }}
        >
          <button
            onClick={onClose}
            className="absolute cursor-pointer z-20 min-h-5 min-w-5 h-[5%] w-[5%] right-[2%] top-[3%] items-center justify-center flex text-gray-500/70 hover:text-red-500/70"
          >
            <GoX className='rounded-sm md:rounded-lg h-full w-full hover:h-full hover:w-full' />
          </button>

          <div
            className="grow overflow-y-auto mb-4 flex flex-col rounded-lg text-center scrollbar scrollbar-thumb-gray-500 scrollbar-track-transparent"
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

          {(isPdfDownload || imageUrl) && downloadFileName && ( //h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12
            <div className="absolute cursor-pointer z-20 min-h-5 min-w-5 h-[5%] w-[5%] right-[3%] bottom-[3%] items-center justify-center flex">
              <a
                href={isPdfDownload ? pdfSrc : imageUrl}
                download={downloadFileName}
                className="h-full w-full"
              >
                <GoDownload className='rounded-sm lg:rounded-lg h-full w-full hover:h-full hover:w-full text-white hover:opacity-50 bg-gray-500/50' />
              </a>
            </div>
          )}
        </motion.div>}
      </AnimatePresence>
    </div>
  );
};

export default PDFModal;