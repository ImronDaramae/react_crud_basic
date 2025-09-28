import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose} // Close on overlay click
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000, // Ensure it's above other content
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking modal content
        style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          maxWidth: '500px',
          width: '90%',
        }}
      >
        {children}
        <button onClick={onClose} style={{ marginTop: '15px' }}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;