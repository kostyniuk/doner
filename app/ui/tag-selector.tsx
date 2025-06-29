import React from 'react';
import { Tag as TagType } from '@/app/todos/helper';

interface TagSelectorProps {
  tags: TagType[];
  selectedTags: string[];
  onTagToggle: (tagId: string) => void;
  label?: string;
  className?: string;
}

const TagSelector: React.FC<TagSelectorProps> = ({
  tags,
  selectedTags,
  onTagToggle,
  label,
  className = '',
}) => {
  const isTagSelected = (tagId: string) => {
    return selectedTags.some(selectedTag =>
      selectedTag.toLowerCase() === tagId.toLowerCase(),
    );
  };

  const getTagStyles = (tag: TagType, selected: boolean) => {
    if (selected) {
      // Parse the tag color to extract background and text colors
      if (tag.color === 'bg-red-500/20 text-red-500') {
        return { backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' };
      } else if (tag.color === 'bg-blue-900/20 text-blue-400') {
        return { backgroundColor: 'rgba(30, 58, 138, 0.2)', color: '#60a5fa' };
      } else if (tag.color === 'bg-purple-500/20 text-purple-400') {
        return { backgroundColor: 'rgba(168, 85, 247, 0.2)', color: '#a78bfa' };
      }
    }

    return { backgroundColor: '#2a2a2a', color: '#9ca3af' };
  };

  const getHoverStyles = (tag: TagType) => {
    if (tag.color === 'bg-red-500/20 text-red-500') {
      return { backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' };
    } else if (tag.color === 'bg-blue-900/20 text-blue-400') {
      return { backgroundColor: 'rgba(30, 58, 138, 0.2)', color: '#60a5fa' };
    } else if (tag.color === 'bg-purple-500/20 text-purple-400') {
      return { backgroundColor: 'rgba(168, 85, 247, 0.2)', color: '#a78bfa' };
    }

    return { backgroundColor: '#2a2a2a', color: '#9ca3af' };
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const selected = isTagSelected(tag.id);
          return (
            <button
              key={tag.id}
              onClick={() => onTagToggle(tag.id)}
              style={getTagStyles(tag, selected)}
              onMouseEnter={(e) => {
                if (!selected) {
                  Object.assign(e.currentTarget.style, getHoverStyles(tag));
                }
              }}
              onMouseLeave={(e) => {
                if (!selected) {
                  Object.assign(e.currentTarget.style, getTagStyles(tag, selected));
                }
              }}
              className="px-3 py-1 rounded-full text-sm cursor-pointer"
            >
              {tag.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TagSelector;
