import { useState } from 'react';
import { Todo } from './helper';

export const useModal = () => {
  const [modalTodo, setModalTodo] = useState<Todo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (todo: Todo) => {
    setModalTodo(todo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalTodo(null);
    setIsModalOpen(false);
  };

  return {
    modalTodo,
    isModalOpen,
    openModal,
    closeModal,
  };
}; 