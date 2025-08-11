import React, { useState, useEffect } from 'react';
import { Todo as TodoType, Tag as TagType } from '@/app/todos/helper';
import Modal from '@/app/ui/modal';
import Button from '@/app/ui/button';
import Input from '@/app/ui/input';
import Textarea from '@/app/ui/textarea';
import TagSelector from '@/app/ui/tag-selector';
import PrioritySelector from '@/app/ui/priority-selector';
import { UI_TEXT, BUTTON_VARIANTS, Priority } from '@/app/todos/constants';

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
  const [editedDescription, setEditedDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<Priority | undefined>(undefined);

  useEffect(() => {
    if (todo) {
      setEditedText(todo.text);
      setEditedDescription(todo.description || '');
      setSelectedTags(todo.tags || []);
      setSelectedPriority(todo.priority);
    }
  }, [todo]);

  const handleSave = () => {
    if (todo && editedText.trim() !== '') {
      onUpdate(todo.id, {
        text: editedText.trim(),
        description: editedDescription.trim() || undefined,
        tags: selectedTags.length > 0 ? selectedTags : undefined,
        priority: selectedPriority,
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

  const handlePriorityChange = (priority: Priority) => {
    setSelectedPriority(selectedPriority === priority ? undefined : priority);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      size="lg"
      header={
        <div className="w-full px-6 pt-6 pb-2" style={{ maxWidth: '650px' }}>
          <Input
            value={editedText}
            onChange={setEditedText}
            placeholder={UI_TEXT.ENTER_TASK_NAME}
            className="text-xl font-bold shadow-none px-0 py-0 m-0 w-full focus:ring-0 focus:border-transparent"
            bgClassName="bg-transparent"
            noBorder={true}
          />
        </div>
      }
    >
      <div className="space-y-4">
        {/* Priority */}
        <PrioritySelector
          selectedPriority={selectedPriority}
          onPriorityChange={handlePriorityChange}
          label={UI_TEXT.PRIORITY}
        />

        {/* Tags */}
        <TagSelector
          tags={tags}
          selectedTags={selectedTags}
          onTagToggle={toggleTag}
          label={UI_TEXT.TAGS}
        />

        {/* Description */}
        <Textarea
          value={editedDescription}
          onChange={setEditedDescription}
          label={UI_TEXT.DESCRIPTION}
          placeholder={UI_TEXT.ENTER_DESCRIPTION}
          rows={6}
          className="glass-card p-2"
          transparent
        />

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button
            variant="glassDanger"
            onClick={handleDelete}
            className="flex-1"
          >
            {UI_TEXT.DELETE}
          </Button>
          <Button
            variant="glass"
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
