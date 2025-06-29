import { useState } from 'react';
import { Todo } from './helper';
import { TODO_STATUSES } from './constants';

export const useTodos = (initialTodos: Todo[] = []) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (text: string, tags?: string[]) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      status: TODO_STATUSES.BACKLOG,
      tags,
    };
    setTodos(prev => [...prev, newTodo]);
  };

  const updateTodo = (todoId: number, updates: Partial<Todo>) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === todoId ? { ...todo, ...updates } : todo,
      ),
    );
  };

  const deleteTodo = (todoId: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== todoId));
  };

  const moveTodo = (todoId: number, newStatus: Todo['status']) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === todoId ? { ...todo, status: newStatus } : todo,
      ),
    );
  };

  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    moveTodo,
  };
};
