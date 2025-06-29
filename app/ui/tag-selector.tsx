import React from 'react';
import Tag from '../tag/tag';
import { Tag as TagType } from '../todos/helper';

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
  className = ''
}) => {
  const isTagSelected = (tagId: string) => {
    return selectedTags.some(selectedTag => 
      selectedTag.toLowerCase() === tagId.toLowerCase()
    );
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
            <Tag
              key={tag.id}
              id={tag.id}
              name={tag.name}
              color={selected ? tag.color : 'bg-[#2a2a2a] text-gray-400 hover:text-white'}
              variant="chip"
              onClick={() => onTagToggle(tag.id)}
              className="cursor-pointer transition-colors"
            />
          );
        })}
      </div>
    </div>
  );
};

export default TagSelector; 