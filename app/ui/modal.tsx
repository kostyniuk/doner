import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  header?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = '',
  size = 'md',
  header,
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'w-full max-w-md mx-4',
    md: 'w-full max-w-lg mx-4',
    lg: 'w-full max-w-2xl mx-4',
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className={`glass-card-modal ${sizeClasses[size]} max-h-[90vh] flex flex-col relative ${className}`} style={{ minHeight: 0 }}>
        {/* Close button always at top right */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 p-6 text-gray-200 hover:text-white text-2xl transition-colors z-10"
          style={{ lineHeight: 1, marginTop: 9, marginRight: 8 }}
          aria-label="Close"
        >
          ×
        </button>
        {/* Custom header node, flush with modal top */}
        {header}
        <div className="p-6 flex-1 min-h-0 overflow-y-auto flex flex-col">
          {/* Default header if no custom header provided and title exists */}
          {!header && title && (
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">{title}</h2>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
