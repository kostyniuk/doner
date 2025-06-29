import React, { useState } from 'react';
import Input from '@/app/ui/input';
import Textarea from '@/app/ui/textarea';
import Button from '@/app/ui/button';
import TagSelector from '@/app/ui/tag-selector';
import { Tag as TagType } from '@/app/todos/helper';
import { UI_TEXT, BUTTON_VARIANTS, BUTTON_SIZES } from '@/app/todos/constants';

interface TodoInputProps {
  onAddTodo: (text: string, tags?: string[], description?: string) => void;
  tags: TagType[];
  className?: string;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo, tags, className = '' }) => {
  const [inputValue, setInputValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [selectedTag, setSelectedTag] = useState<string[]>([]);
  const [showDescription, setShowDescription] = useState(false);

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      onAddTodo(
        inputValue.trim(),
        selectedTag.length > 0 ? selectedTag : undefined,
        descriptionValue.trim() || undefined,
      );
      setInputValue('');
      setDescriptionValue('');
      setSelectedTag([]);
      setShowDescription(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddTodo();
    }
  };

  const toggleTag = (tagId: string) => {
    setSelectedTag(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [tagId], // Only allow one tag for new todos
    );
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Input Section */}
      <div className="flex gap-4">
        <div className="flex-1 flex items-center gap-2 bg-[#1f1f1f] rounded-xl px-4">
          <span className="text-2xl text-gray-400">+</span>
          <Input
            value={inputValue}
            onChange={setInputValue}
            onKeyPress={handleKeyPress}
            placeholder={UI_TEXT.ADD_TASK}
            className="flex-1 bg-transparent border-none shadow-none"
          />
        </div>
        <Button
          onClick={() => setShowDescription(!showDescription)}
          variant={BUTTON_VARIANTS.GHOST}
          size={BUTTON_SIZES.MD}
        >
          {showDescription ? 'Hide' : 'Add'} Description
        </Button>
        <Button
          onClick={handleAddTodo}
          variant={BUTTON_VARIANTS.SECONDARY}
          size={BUTTON_SIZES.LG}
          disabled={inputValue.trim() === ''}
        >
          {UI_TEXT.SAVE}
        </Button>
      </div>

      {/* Description Section */}
      {showDescription && (
        <Textarea
          value={descriptionValue}
          onChange={setDescriptionValue}
          placeholder={UI_TEXT.ENTER_DESCRIPTION}
          rows={4}
          className="bg-[#1f1f1f] rounded-xl p-4"
        />
      )}

      {/* Tag Selection */}
      {tags.length > 0 && (
        <TagSelector
          tags={tags}
          selectedTags={selectedTag}
          onTagToggle={toggleTag}
          label={UI_TEXT.ADD_TAG_OPTIONAL}
        />
      )}
    </div>
  );
};

export default TodoInput;
