import React from 'react';

const PdfModal = ({ isOpen, onClose, pdfUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/95 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal - Full Screen */}
      <div className="relative w-full h-full flex flex-col">
        {/* Header */}
        <div className="relative z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-lg">
          <h2 className="text-2xl font-light text-black">Learn More About SNI</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-300"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* PDF Viewer - Full Screen */}
        <div className="relative flex-1 bg-gray-100">
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
            className="w-full h-full"
            title="SNI Information PDF"
            style={{ border: 'none' }}
          />
        </div>
      </div>
    </div>
  );
};

export default PdfModal;
