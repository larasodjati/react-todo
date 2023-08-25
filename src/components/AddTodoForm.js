import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import InputWithLabel from './InputWithLabel';

function AddTodoForm({ onAddTodo }) {
  const navigate = useNavigate();

  const [todoTitle, setTodoTitle] = useState('');
  const [todoPriority, setTodoPriority] = useState('');
  const [todoCategory, setTodoCategory] = useState('');

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handlePriorityChange = (event) => {
    const newTodoPriority = event.target.value;
    setTodoPriority(newTodoPriority);
  };

  const handleCategoryChange = (event) => {
    const newTodoCategory = event.target.value;
    setTodoCategory(newTodoCategory);
  };
  const handleAddTodo = (event) => {
    event.preventDefault();
    if (todoTitle.trim() !== '') {
      onAddTodo({
        id: Date.now(),
        title: todoTitle,
        priority: todoPriority,
        category: todoCategory !== null ? todoCategory : 'All'
      });
      console.log(todoTitle);
      setTodoTitle('');
      setTodoPriority('');
      setTodoCategory('');
    }
  };

  const handleCancelAdd = () => {
    navigate('/');
  };
  return (
    <div>
      <h2>Add New Todo</h2>
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

          <label>Category:</label>
          <select value={todoCategory} onChange={handleCategoryChange}>
            <option value="">Select Category</option>
            <option value="All">All</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Birthday">Birthday</option>
            <option value="Wishlist">Wishlist</option>
          </select>
        </div>
        <button type="submit">Add</button>
        <button type="button" onClick={handleCancelAdd}>
          Cancel
        </button>
      </form>
    </div>
  );
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func,
  selectedCategory: PropTypes.string
};

export default AddTodoForm;
