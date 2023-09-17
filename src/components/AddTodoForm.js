import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InputWithLabel from './InputWithLabel';
import styles from './AddTodoForm.module.css';
import { capitalizedTitle } from '../utils/utils';

function AddTodoForm({ onAddTodo, onClose, isAddingTodo }) {
  const [todoTitle, setTodoTitle] = useState('');
  const [todoPriority, setTodoPriority] = useState('');
  const [todoCategory, setTodoCategory] = useState('');
  const [todoDueDate, setTodoDueDate] = useState('');

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    const newCapitalizedTodoTitle = capitalizedTitle(newTodoTitle);
    setTodoTitle(newCapitalizedTodoTitle);
  };

  const handlePriorityChange = (event) => {
    const newTodoPriority = event.target.value;
    setTodoPriority(newTodoPriority);
  };

  const handleCategoryChange = (event) => {
    const newTodoCategory = event.target.value;
    setTodoCategory(newTodoCategory);
  };

  const handleDueDateChange = (event) => {
    const newDueDate = event.target.value;
    setTodoDueDate(newDueDate);
  };
  const handleAddTodo = (event) => {
    event.preventDefault();
    if (todoTitle.trim() !== '') {
      // convert Due Date into user friendly form
      // refers to https://stackoverflow.com/questions/17545708/parse-date-without-timezone-javascript/39209842#39209842
      const dueDateUTC = new Date(todoDueDate);
      const offsetDueDate = dueDateUTC.getTimezoneOffset() * 60000;
      const formattedDueDate = new Date(
        dueDateUTC.getTime() + offsetDueDate
      ).toISOString();
      onAddTodo({
        id: Date.now(),
        title: todoTitle,
        priority: todoPriority,
        category: todoCategory !== null ? todoCategory : 'All',
        dueDate: formattedDueDate
      });
      console.log(todoTitle);
      setTodoTitle('');
      setTodoPriority('');
      setTodoCategory('');
      setTodoDueDate('');
      onClose();
    }
  };

  const handleCancelAdd = () => {
    console.log('Cancel button clicked');
    onClose();
  };
  return (
    <div
      className={`${styles.modalContainer} ${
        isAddingTodo ? styles.showModal : ''
      }`}
    >
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={handleCancelAdd}>
          X
        </button>
        {isAddingTodo && (
          <>
            <h2>Add New Todo</h2>
            <form onSubmit={handleAddTodo}>
              <InputWithLabel
                todoTitle={todoTitle}
                handleTitleChange={handleTitleChange}
              >
                Title:
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

                <label>Due Date:</label>
                <input
                  type="date"
                  value={todoDueDate}
                  onChange={handleDueDateChange}
                />
              </div>
              <div className={styles.buttonGroup}>
                <button type="submit" className={styles.addButton}>
                  Add
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  isAddingTodo: PropTypes.bool.isRequired
};

export default AddTodoForm;
