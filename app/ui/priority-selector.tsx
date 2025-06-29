import React from 'react';
import { Priority, PRIORITY_CONFIGS } from '@/app/todos/constants';

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
  className = '',
}) => {
  const getPriorityStyles = (priority: typeof PRIORITY_CONFIGS[keyof typeof PRIORITY_CONFIGS]) => {
    const isSelected = selectedPriority === priority.id;
    if (isSelected) {
      return {
        backgroundColor: priority.bgColor === 'bg-green-400/10' ? 'rgba(74, 222, 128, 0.1)' :
          priority.bgColor === 'bg-blue-400/10' ? 'rgba(96, 165, 250, 0.1)' :
            priority.bgColor === 'bg-orange-400/10' ? 'rgba(251, 146, 60, 0.1)' :
              priority.bgColor === 'bg-red-400/10' ? 'rgba(248, 113, 113, 0.1)' : '#2a2a2a',
        borderColor: priority.color === 'border-l-green-400' ? '#4ade80' :
          priority.color === 'border-l-blue-400' ? '#60a5fa' :
            priority.color === 'border-l-orange-400' ? '#fb923c' :
              priority.color === 'border-l-red-400' ? '#f87171' : 'transparent',
        borderWidth: '2px',
        color: 'white',
        transition: 'none',
      };
    }
    return {
      backgroundColor: '#2a2a2a',
      borderColor: 'transparent',
      borderWidth: '1px',
      color: '#9ca3af',
      transition: 'none',
    };
  };

  const getHoverStyles = (priority: typeof PRIORITY_CONFIGS[keyof typeof PRIORITY_CONFIGS]) => {
    return {
      backgroundColor: priority.bgColor === 'bg-green-400/10' ? 'rgba(74, 222, 128, 0.1)' :
        priority.bgColor === 'bg-blue-400/10' ? 'rgba(96, 165, 250, 0.1)' :
          priority.bgColor === 'bg-orange-400/10' ? 'rgba(251, 146, 60, 0.1)' :
            priority.bgColor === 'bg-red-400/10' ? 'rgba(248, 113, 113, 0.1)' : '#2a2a2a',
      borderColor: priority.color === 'border-l-green-400' ? '#4ade80' :
        priority.color === 'border-l-blue-400' ? '#60a5fa' :
          priority.color === 'border-l-orange-400' ? '#fb923c' :
            priority.color === 'border-l-red-400' ? '#f87171' : 'transparent',
      borderWidth: '2px',
      color: 'white',
      transition: 'none',
    };
  };

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
              style={getPriorityStyles(priority)}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  Object.assign(e.currentTarget.style, getHoverStyles(priority));
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  Object.assign(e.currentTarget.style, getPriorityStyles(priority));
                }
              }}
              className="flex items-center px-3 py-2 rounded-lg text-sm font-medium border"
            >
              {priority.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PrioritySelector;
