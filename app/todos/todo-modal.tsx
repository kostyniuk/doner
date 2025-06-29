import React, { useState, useEffect } from 'react';
import { Todo as TodoType, Tag as TagType } from './helper';
import Modal from '../ui/modal';
import Button from '../ui/button';
import Input from '../ui/input';
import TagSelector from '../ui/tag-selector';
import { TODO_STATUS_DISPLAY_NAMES, UI_TEXT, BUTTON_VARIANTS } from './constants';

interface TodoModalProps {
  todo: TodoType | null;
  tags: TagType[];
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (todoId: number, updates: Partial<TodoType>) => void;
  onDelete: (todoId: number) => void;
}

const TodoModal: React.FC<TodoModalProps> = ({
  todo,
  tags,
  isOpen,
  onClose,
  onUpdate,
  onDelete,
}) => {
  const [editedText, setEditedText] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    if (todo) {
      setEditedText(todo.text);
      setSelectedTags(todo.tags || []);
    }
  }, [todo]);

  const handleSave = () => {
    if (todo && editedText.trim() !== '') {
      onUpdate(todo.id, {
        text: editedText.trim(),
        tags: selectedTags.length > 0 ? selectedTags : undefined,
      });
      onClose();
    }
  };

  const handleDelete = () => {
    if (todo) {
      onDelete(todo.id);
      onClose();
    }
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev => {
      const normalizedTagId = tagId.toLowerCase();
      const isAlreadySelected = prev.some(tag => tag.toLowerCase() === normalizedTagId);
      
      if (isAlreadySelected) {
        return prev.filter(tag => tag.toLowerCase() !== normalizedTagId);
      } else {
        return [...prev, tagId];
      }
    });
  };

  const getStatusDisplay = (status: TodoType['status']) => {
    return TODO_STATUS_DISPLAY_NAMES[status] || status;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={UI_TEXT.EDIT_TODO}
    >
      <div className="space-y-4">
        {/* Todo Text */}
        <Input
          value={editedText}
          onChange={setEditedText}
          label={UI_TEXT.TASK_NAME}
          placeholder={UI_TEXT.ENTER_TASK_NAME}
        />

        {/* Tags */}
        <TagSelector
          tags={tags}
          selectedTags={selectedTags}
          onTagToggle={toggleTag}
          label={UI_TEXT.TAGS}
        />

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {UI_TEXT.STATUS}
          </label>
          <div className="text-white bg-[#2a2a2a] rounded-lg px-3 py-2">
            {todo ? getStatusDisplay(todo.status) : ''}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button
            variant={BUTTON_VARIANTS.DANGER}
            onClick={handleDelete}
            className="flex-1"
          >
            {UI_TEXT.DELETE}
          </Button>
          <Button
            variant={BUTTON_VARIANTS.SECONDARY}
            onClick={onClose}
            className="flex-1"
          >
            {UI_TEXT.CANCEL}
          </Button>
          <Button
            variant={BUTTON_VARIANTS.PRIMARY}
            onClick={handleSave}
            disabled={editedText.trim() === ''}
            className="flex-1"
          >
            {UI_TEXT.SAVE}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TodoModal; 