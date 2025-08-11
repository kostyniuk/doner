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
  const [showNewTagInput, setShowNewTagInput] = useState(false);
  const [newTagValue, setNewTagValue] = useState('');
  const [localTags, setLocalTags] = useState<TagType[]>(tags);

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

  const handleAddNewTag = () => {
    if (newTagValue.trim() !== '') {
      const newTag: TagType = {
        id: newTagValue.trim().toLowerCase().replace(/\s+/g, '-'),
        name: newTagValue.trim(),
        color: 'bg-blue-900/20 text-blue-400',
      };
      setLocalTags(prev => [...prev, newTag]);
      setSelectedTag([newTag.id]);
      setNewTagValue('');
      setShowNewTagInput(false);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Input + Actions in one row */}
      <div className="glass-card flex items-center gap-3 px-4 py-2">
        <span className="text-2xl text-gray-300">+</span>
        <Input
          value={inputValue}
          onChange={setInputValue}
          onKeyPress={handleKeyPress}
          placeholder={UI_TEXT.ADD_TASK}
          className="flex-1 bg-transparent border-none shadow-none"
          bgClassName="bg-transparent"
          noBorder={true}
        />
        <Button
          onClick={() => setShowDescription(!showDescription)}
          variant={BUTTON_VARIANTS.GHOST}
          size={BUTTON_SIZES.MD}
        >
          {showDescription ? 'Hide' : 'Add'} Description
        </Button>
        <Button
          onClick={handleAddTodo}
          variant="custom"
          size={BUTTON_SIZES.LG}
          disabled={inputValue.trim() === ''}
          className="bg-[#1ed760] hover:bg-[#21e065] text-black font-bold cursor-pointer"
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
          className="glass-card p-4"
          transparent
        />
      )}

      {/* Tag Selection + Add New Tag */}
      <div className="flex flex-wrap gap-2 items-center">
        <TagSelector
          tags={localTags}
          selectedTags={selectedTag}
          onTagToggle={toggleTag}
          label={UI_TEXT.ADD_TAG_OPTIONAL}
        />
        <div className="ml-2 mt-6">
          {showNewTagInput ? (
            <Input
              value={newTagValue}
              onChange={setNewTagValue}
              onKeyPress={e => {
                if (e.key === 'Enter') handleAddNewTag();
              }}
              placeholder="New tag name"
              className="w-32 text-sm"
              noBorder={true}
              bgClassName="bg-transparent"
            />
          ) : (
            <Button
              onClick={() => setShowNewTagInput(true)}
              variant={BUTTON_VARIANTS.GHOST}
              size={BUTTON_SIZES.SM}
              className="px-3 py-1 rounded-full text-sm cursor-pointer text-[#9ca3af] bg-white/10 hover:bg-white/20"
            >
              <span className="text-2xl leading-none">+</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoInput;
