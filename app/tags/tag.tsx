import React from 'react';

interface TagProps {
  id: string | number;
  name: string;
  color: string;
  count?: number;
  variant?: 'chip' | 'card';
  onDelete?: (id: string | number) => void;
  onClick?: () => void;
  className?: string;
}

const Tag: React.FC<TagProps> = ({
  id,
  name,
  color,
  count,
  variant = 'chip',
  onDelete,
  onClick,
  className = '',
}) => {
  if (variant === 'chip') {
    return (
      <span
        className={`px-3 py-1 rounded-full text-sm ${color} ${className}`}
        onClick={onClick}
      >
        {name}
      </span>
    );
  }

  if (variant === 'card') {
    return (
      <div
        className={`bg-[#1f1f1f] rounded-lg p-6 hover:bg-[#252525] transition-colors ${className}`}
        onClick={onClick}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full ${color}`} />
            <h3 className="font-semibold text-white">{name}</h3>
          </div>
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
              className="text-gray-500 hover:text-red-400 transition-colors p-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>

        {count !== undefined && (
          <div className="text-gray-400 text-sm">
            {count} {count === 1 ? 'task' : 'tasks'}
          </div>
        )}

        {count !== undefined && (
          <div className="mt-4">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-full bg-gray-700 rounded-full h-1">
                <div
                  className={`h-1 rounded-full ${color}`}
                  style={{ width: `${Math.min((count / 5) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default Tag;
