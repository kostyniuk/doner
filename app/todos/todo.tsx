import React from 'react';
import { Todo as TodoType, Tag as TagType } from './helper';
import Tag from '../tag/tag';
import { TodoStatus } from './constants';

interface TodoProps {
  todo: TodoType;
  tags: TagType[];
  onMoveTodo: (todoId: number, newStatus: TodoStatus) => void;
  getNextStatus: (currentStatus: TodoStatus) => TodoStatus;
  onEdit: (todo: TodoType) => void;
}

const Todo: React.FC<TodoProps> = ({ todo, tags, onMoveTodo, getNextStatus, onEdit }) => {
  return (
    <div
      className="bg-[#1f1f1f] rounded-lg p-4 hover:bg-[#2a2a2a] transition-colors group cursor-pointer"
      onClick={() => onEdit(todo)}
    >
      <div className="flex justify-between items-start mb-3">
        <p className="text-lg text-white flex-1">{todo.text}</p>
        <button
          className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white text-sm"
          title={`Move to ${getNextStatus(todo.status)}`}
          onClick={(e) => {
            e.stopPropagation();
            onMoveTodo(todo.id, getNextStatus(todo.status));
          }}
        >
          →
        </button>
      </div>
      {todo.tags && todo.tags.length > 0 && (
        <div className="flex gap-2">
          {todo.tags.map((tagId) => {
            const tag = tags.find(t => t.id.toLowerCase() === tagId.toLowerCase());
            if (!tag) return null;
            return (
              <Tag
                key={tag.id}
                id={tag.id}
                name={tag.name}
                color={tag.color}
                variant="chip"
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Todo; 