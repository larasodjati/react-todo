import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InputWithLabel from './InputWithLabel';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.module.css'; // for styling

function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState('');
  const [todoPriority, setTodoPriority] = useState(false);
  const [todoDueDate, setTodoDueDate] = useState(null);

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handlePriorityChange = (event) => {
    const newPriority = event.target.value;
    setTodoPriority(newPriority);
  };

  const handleDueDateChange = (date) => {
    setTodoDueDate(date);
  };
  const handleAddTodo = (event) => {
    event.preventDefault();
    if (todoTitle.trim() !== '') {
      onAddTodo({
        id: Date.now(),
        title: todoTitle,
        priority: todoPriority,
        dueDate: todoDueDate
      });
      console.log(todoTitle, todoPriority, todoDueDate);
      setTodoTitle('');
      setTodoPriority('');
      setTodoDueDate(null);
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

      <div>
        <label>Due Date:</label>
        <DatePicker
          selected={todoDueDate}
          onChange={handleDueDateChange}
          dateFormat="MM-dd-yyyy"
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func
};

export default AddTodoForm;
