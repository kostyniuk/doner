import React from 'react';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  disabled?: boolean;
  className?: string;
  onKeyPress?: (e: React.KeyboardEvent) => void;
  bgClassName?: string;
  noBorder?: boolean;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  label,
  type = 'text',
  disabled = false,
  className = '',
  onKeyPress,
  bgClassName = 'bg-[#2a2a2a]',
  noBorder = false,
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full ${bgClassName} ${noBorder ? '' : 'border border-gray-600'} rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-700 disabled:cursor-not-allowed' + (noBorder ? ' focus:ring-0 focus:border-transparent focus-visible:ring-0 focus-visible:border-transparent' : '')}`}
      />
    </div>
  );
};

export default Input;
