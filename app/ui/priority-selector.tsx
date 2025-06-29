import React from 'react';
import { Priority, PRIORITY_CONFIGS, UI_TEXT } from '../todos/constants';

interface PrioritySelectorProps {
  selectedPriority?: Priority;
  onPriorityChange: (priority: Priority) => void;
  label?: string;
  className?: string;
}

const PrioritySelector: React.FC<PrioritySelectorProps> = ({
  selectedPriority,
  onPriorityChange,
  label,
  className = ''
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}
      <div className="grid grid-cols-2 gap-2">
        {Object.values(PRIORITY_CONFIGS).map((priority) => {
          const isSelected = selectedPriority === priority.id;
          return (
            <button
              key={priority.id}
              onClick={() => onPriorityChange(priority.id)}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                ${isSelected 
                  ? `${priority.bgColor} ${priority.color.replace('border-l-', 'border-')} border-2` 
                  : 'bg-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#3a3a3a]'
                }
              `}
            >
              <div className={`w-2 h-2 rounded-full ${priority.color.replace('border-l-', 'bg-')}`}></div>
              {priority.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PrioritySelector; 