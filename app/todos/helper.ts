import { TODO_STATUSES, TODO_STATUS_DISPLAY_NAMES, TODO_STATUS_COLORS, TodoStatus } from './constants';

export interface Todo {
  id: number;
  text: string;
  status: TodoStatus;
  tags?: string[];
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export const getColumnTodos = (todos: Todo[], status: TodoStatus) => {
  return todos.filter(todo => todo.status === status);
};

export const getColumnColor = (status: TodoStatus) => {
  return TODO_STATUS_COLORS[status] || '';
};

export const getColumnTitle = (status: TodoStatus) => {
  return TODO_STATUS_DISPLAY_NAMES[status] || '';
};

export const getNextStatus = (currentStatus: TodoStatus): TodoStatus => {
  switch (currentStatus) {
    case TODO_STATUSES.BACKLOG:
      return TODO_STATUSES.IN_PROGRESS;
    case TODO_STATUSES.IN_PROGRESS:
      return TODO_STATUSES.DONE;
    case TODO_STATUSES.DONE:
      return TODO_STATUSES.BACKLOG;
    default:
      return TODO_STATUSES.BACKLOG;
  }
}; 