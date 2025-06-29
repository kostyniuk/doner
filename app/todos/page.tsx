'use client';

import React, { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  status: 'backlog' | 'in_progress' | 'done';
  tags?: string[];
}

interface Tag {
  id: string;
  name: string;
  color: string;
}

const TodosPage = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Design database schema', status: 'backlog', tags: ['Documentation'] },
    { id: 2, text: 'Write documentation', status: 'backlog', tags: ['Documentation'] },
    { id: 3, text: 'Fix login issue', status: 'backlog', tags: ['Bug'] },
    { id: 4, text: 'Implement authentication', status: 'in_progress', tags: ['Feature'] },
    { id: 5, text: 'Build user profile page', status: 'in_progress', tags: ['Feature'] },
    { id: 6, text: 'Update dependencies', status: 'done' },
    { id: 7, text: 'Deploy to production', status: 'done' },
    { id: 8, text: 'Plan sprint retrospective', status: 'done' },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const tags: Tag[] = [
    { id: 'bug', name: 'Bug', color: 'bg-red-500/20 text-red-500' },
    { id: 'documentation', name: 'Documentation', color: 'bg-blue-900/20 text-blue-400' },
    { id: 'feature', name: 'Feature', color: 'bg-purple-500/20 text-purple-400' },
  ];

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue.trim(),
        status: 'backlog',
        tags: selectedTag ? [selectedTag] : undefined,
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
      setSelectedTag('');
    }
  };

  const getColumnTodos = (status: Todo['status']) => {
    return todos.filter(todo => todo.status === status);
  };

  const getColumnColor = (status: Todo['status']) => {
    switch (status) {
      case 'backlog':
        return 'border-t-blue-500';
      case 'in_progress':
        return 'border-t-yellow-500';
      case 'done':
        return 'border-t-green-500';
      default:
        return '';
    }
  };

  const getColumnTitle = (status: Todo['status']) => {
    switch (status) {
      case 'backlog':
        return 'Backlog';
      case 'in_progress':
        return 'In Progress';
      case 'done':
        return 'Done';
      default:
        return '';
    }
  };

  const moveTodo = (todoId: number, newStatus: Todo['status']) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === todoId ? { ...todo, status: newStatus } : todo
      )
    );
  };

  const getNextStatus = (currentStatus: Todo['status']): Todo['status'] => {
    switch (currentStatus) {
      case 'backlog':
        return 'in_progress';
      case 'in_progress':
        return 'done';
      case 'done':
        return 'backlog';
      default:
        return 'backlog';
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-[#121212] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-8">Todo App</h1>
        
        {/* Input Section */}
        <div className="flex gap-4 mb-12">
          <div className="flex-1 flex items-center gap-2 bg-[#1f1f1f] rounded-xl px-4">
            <span className="text-2xl text-gray-400">+</span>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="Add task"
              className="flex-1 bg-transparent text-white text-lg py-4 outline-none placeholder-gray-500"
            />
          </div>
          <button
            onClick={addTodo}
            className="px-8 py-4 bg-[#1f1f1f] text-white text-lg rounded-xl hover:bg-[#2a2a2a] transition-colors"
          >
            Save
          </button>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-3 gap-8 mb-12">
          {(['backlog', 'in_progress', 'done'] as const).map((status) => (
            <div
              key={status}
              className={`
                space-y-4 
                border-t-2 
                pt-4 
                ${getColumnColor(status)}
                min-h-[400px]
              `}
            >
              <h2 className="text-2xl font-semibold mb-6">{getColumnTitle(status)}</h2>
              <div className="space-y-4">
                {getColumnTodos(status).map((todo) => (
                  <div
                    key={todo.id}
                    className="bg-[#1f1f1f] rounded-lg p-4 hover:bg-[#2a2a2a] transition-colors group cursor-pointer"
                    onClick={() => moveTodo(todo.id, getNextStatus(todo.status))}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <p className="text-lg text-white flex-1">{todo.text}</p>
                      <button
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white text-sm"
                        title={`Move to ${getColumnTitle(getNextStatus(todo.status))}`}
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
                            <span
                              key={tag.id}
                              className={`px-3 py-1 rounded-full text-sm ${tag.color}`}
                            >
                              {tag.name}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tags Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Tags</h2>
          <div className="flex gap-3 items-center">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className={`px-4 py-2 rounded-full text-sm ${tag.color}`}
              >
                {tag.name}
              </span>
            ))}
            <button
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <span className="text-xl">+</span>
              <span>Add tag</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodosPage;