import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InputWithLabel from './InputWithLabel';

function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState('');
  const [todoPriority, setTodoPriority] = useState('');

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handlePriorityChange = (event) => {
    const newTodoPriority = event.target.value;
    setTodoPriority(newTodoPriority);
  };
  const handleAddTodo = (event) => {
    event.preventDefault();
    if (todoTitle.trim() !== '') {
      onAddTodo({ id: Date.now(), title: todoTitle, priority: todoPriority });
      console.log(todoTitle);
      setTodoTitle('');
      setTodoPriority('');
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

      <div>
        <label>Priority:</label>
        <select value={todoPriority} onChange={handlePriorityChange}>
          <option value="">Select Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <button type="submit">Add</button>
    </form>
  );
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func
};

export default AddTodoForm;
