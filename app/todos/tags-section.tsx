import React from 'react';
import Tag from '../tags/tag';
import Button from '@/app/ui/button';
import { Tag as TagType } from '@/app/todos/helper';
import { UI_TEXT, BUTTON_VARIANTS } from '@/app/todos/constants';

interface TagsSectionProps {
  tags: TagType[];
  onAddTag?: () => void;
  className?: string;
}

const TagsSection: React.FC<TagsSectionProps> = ({ 
  tags, 
  onAddTag, 
  className = '' 
}) => {
  return (
    <div className={`mt-12 ${className}`}>
      <h2 className="text-2xl font-semibold mb-6">{UI_TEXT.TAGS}</h2>
      <div className="flex gap-3 items-center">
        {tags.map((tag) => (
          <Tag
            key={tag.id}
            id={tag.id}
            name={tag.name}
            color={tag.color}
            variant="chip"
          />
        ))}
        {onAddTag && (
          <Button
            variant={BUTTON_VARIANTS.GHOST}
            onClick={onAddTag}
            className="flex items-center gap-2"
          >
            <span className="text-xl">+</span>
            <span>{UI_TEXT.ADD_TAG}</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default TagsSection; 