import React from 'react';
import { Todo as TodoType, Tag as TagType, getPriorityColor, getPriorityBgColor, getPreviousStatus } from './helper';
import Tag from '../tags/tag';
import { TodoStatus, TODO_STATUSES } from './constants';

interface TodoProps {
  todo: TodoType;
  tags: TagType[];
  onMoveTodo: (todoId: number, newStatus: TodoStatus) => void;
  getNextStatus: (currentStatus: TodoStatus) => TodoStatus;
  onEdit: (todo: TodoType) => void;
}

const Todo: React.FC<TodoProps> = ({ todo, tags, onMoveTodo, getNextStatus, onEdit }) => {
  const priorityColor = todo.priority ? getPriorityColor(todo.priority) : '';
  const priorityBgColor = todo.priority ? getPriorityBgColor(todo.priority) : '';
  const isFirstStatus = todo.status === TODO_STATUSES.BACKLOG;
  const isLastStatus = todo.status === TODO_STATUSES.DONE;

  return (
    <div
      className={`
        glass-card p-4 group cursor-pointer
        ${todo.priority ? priorityBgColor : ''}
        ${todo.priority ? priorityColor : ''}
        border-l-4
      `}
      onClick={() => onEdit(todo)}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <p className="text-lg text-white mb-2">{todo.text}</p>
          {todo.description && (
            <p className="text-sm text-gray-200/80 line-clamp-2">{todo.description}</p>
          )}
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {!isFirstStatus && (
            <button
              className="text-gray-300 hover:text-white text-sm px-1 py-0.5 rounded hover:bg-white/10"
              title={`Move to ${getPreviousStatus(todo.status)}`}
              onClick={(e) => {
                e.stopPropagation();
                onMoveTodo(todo.id, getPreviousStatus(todo.status));
              }}
            >
              ←
            </button>
          )}
          {!isLastStatus && (
            <button
              className="text-gray-300 hover:text-white text-sm px-1 py-0.5 rounded hover:bg-white/10"
              title={`Move to ${getNextStatus(todo.status)}`}
              onClick={(e) => {
                e.stopPropagation();
                onMoveTodo(todo.id, getNextStatus(todo.status));
              }}
            >
              →
            </button>
          )}
        </div>
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
