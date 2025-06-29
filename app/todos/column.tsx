import React from 'react';
import { Todo as TodoType, Tag } from './helper';
import Todo from './todo';
import { TodoStatus } from './constants';

interface ColumnProps {
  columnTodos: TodoType[];
  columnColor: string;
  columnTitle: string;
  tags: Tag[];
  onMoveTodo: (todoId: number, newStatus: TodoStatus) => void;
  getNextStatus: (currentStatus: TodoStatus) => TodoStatus;
  onEdit: (todo: TodoType) => void;
}

const Column: React.FC<ColumnProps> = ({ 
  columnTodos, 
  columnColor, 
  columnTitle, 
  tags, 
  onMoveTodo, 
  getNextStatus,
  onEdit
}) => {
  return (
    <div
      className={`
        space-y-4 
        border-t-2 
        pt-4 
        ${columnColor}
        min-h-[400px]
      `}
    >
      <h2 className="text-2xl font-semibold mb-6">{columnTitle}</h2>
      <div className="space-y-4">
        {columnTodos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            tags={tags}
            onMoveTodo={onMoveTodo}
            getNextStatus={getNextStatus}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;