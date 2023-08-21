import React, { useState } from 'react';
import InputWithLabel from './InputWithLabel';

function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState('');

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };
  const handleAddTodo = (event) => {
    event.preventDefault();
    if (todoTitle.trim() !== '') {
      onAddTodo({ id: Date.now(), title: todoTitle });
      console.log(todoTitle);
      setTodoTitle('');
    }
  };
  return (
    <form onSubmit={handleAddTodo}>
      <InputWithLabel
        todoTitle={todoTitle}
        handleTitleChange={handleTitleChange}
      >
        Title
      </InputWithLabel>
      <button>Add</button>
    </form>
  );
}

export default AddTodoForm;
