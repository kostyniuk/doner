'use client';

import React from 'react';
import Column from './column';
import TodoModal from './todo-modal';
import TodoInput from './todo-input';
import TagsSection from './tags-section';
import { useTodos } from './use-todos';
import { useModal } from './use-modal';
import { Tag as TagType, getColumnTodos, getColumnColor, getColumnTitle, getNextStatus } from './helper';
import { TODO_STATUSES, TAG_CONFIGS, UI_TEXT, PRIORITIES } from './constants';

const initialTodos = [
  { id: 1, text: 'Design database schema', status: TODO_STATUSES.BACKLOG, priority: PRIORITIES.HIGH, tags: [TAG_CONFIGS.documentation.id] },
  { id: 2, text: 'Write documentation', status: TODO_STATUSES.BACKLOG, priority: PRIORITIES.MEDIUM, tags: [TAG_CONFIGS.documentation.id] },
  { id: 3, text: 'Fix login issue', status: TODO_STATUSES.BACKLOG, priority: PRIORITIES.URGENT, tags: [TAG_CONFIGS.bug.id] },
  { id: 4, text: 'Implement authentication', status: TODO_STATUSES.IN_PROGRESS, priority: PRIORITIES.HIGH, tags: [TAG_CONFIGS.feature.id] },
  { id: 5, text: 'Build user profile page', status: TODO_STATUSES.IN_PROGRESS, priority: PRIORITIES.MEDIUM, tags: [TAG_CONFIGS.feature.id] },
  { id: 6, text: 'Update dependencies', status: TODO_STATUSES.DONE, priority: PRIORITIES.LOW },
  { id: 7, text: 'Deploy to production', status: TODO_STATUSES.DONE, priority: PRIORITIES.HIGH },
  { id: 8, text: 'Plan sprint retrospective', status: TODO_STATUSES.DONE, priority: PRIORITIES.MEDIUM },
];

const TodosPage = () => {
  const { todos, addTodo, updateTodo, deleteTodo, moveTodo } = useTodos(initialTodos);
  const { modalTodo, isModalOpen, openModal, closeModal } = useModal();

  const tags: TagType[] = Object.values(TAG_CONFIGS);

  const statuses = Object.values(TODO_STATUSES);

  const handleAddTag = () => {
    // TODO: Implement add tag functionality
  };

  return (
    <div className="flex-1 min-h-screen bg-[#121212] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-8">{UI_TEXT.TODO_APP}</h1>

        {/* Input Section */}
        <TodoInput
          onAddTodo={addTodo}
          tags={tags}
          className="mb-12"
        />

        {/* Kanban Board */}
        <div className="grid grid-cols-3 gap-8 mb-12">
          {statuses.map((status) => (
            <Column
              key={status}
              columnTodos={getColumnTodos(todos, status)}
              columnColor={getColumnColor(status)}
              columnTitle={getColumnTitle(status)}
              tags={tags}
              onMoveTodo={moveTodo}
              getNextStatus={getNextStatus}
              onEdit={openModal}
            />
          ))}
        </div>

        {/* Modal */}
        <TodoModal
          todo={modalTodo}
          tags={tags}
          isOpen={isModalOpen}
          onClose={closeModal}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
        />
      </div>
    </div>
  );
};

export default TodosPage;
