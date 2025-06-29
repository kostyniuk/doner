import { useState } from 'react';
import { Todo } from './helper';
import { TODO_STATUSES } from './constants';

export const useTodos = (initialTodos: Todo[] = []) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (text: string, tags?: string[], description?: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      description,
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
    setTodos(prev => {
      // Find the todo to move
      const todoToMove = prev.find(todo => todo.id === todoId);
      if (!todoToMove) return prev;

      // Remove the todo from its current position
      const todosWithoutMoved = prev.filter(todo => todo.id !== todoId);
      
      // Find the index where todos of the new status start
      const newStatusIndex = todosWithoutMoved.findIndex(todo => todo.status === newStatus);
      
      if (newStatusIndex === -1) {
        // If no todos exist with the new status, add it at the beginning
        return [{ ...todoToMove, status: newStatus }, ...todosWithoutMoved];
      }
      
      // Insert the moved todo at the beginning of its new status group
      const beforeNewStatus = todosWithoutMoved.slice(0, newStatusIndex);
      const afterNewStatus = todosWithoutMoved.slice(newStatusIndex);
      
      return [
        ...beforeNewStatus,
        { ...todoToMove, status: newStatus },
        ...afterNewStatus,
      ];
    });
  };

  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    moveTodo,
  };
};
