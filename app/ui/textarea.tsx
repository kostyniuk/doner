import React from 'react';

interface TextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  rows?: number;
  transparent?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({
  value,
  onChange,
  placeholder,
  label,
  disabled = false,
  className = '',
  rows = 4,
  transparent = false,
}) => {
  const baseTextareaClasses = transparent
    ? 'w-full bg-transparent border-none rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-transparent resize-vertical'
    : 'w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-700 disabled:cursor-not-allowed resize-vertical';

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={baseTextareaClasses}
      />
    </div>
  );
};

export default Textarea;
