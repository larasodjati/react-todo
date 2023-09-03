import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './TodoListItem.module.css';

function TodoListItem({ todo, onRemoveTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [newPriority, setNewPriority] = useState(todo.priority);
  const [newCategory, setNewCategory] = useState(todo.category);
  const [completed, setCompleted] = useState(todo.completed || false);
  const [completedAt, setCompletedAt] = useState(todo.completedAt || null);
  const [newDueDate, setNewDueDate] = useState(todo.dueDate);

  const handleRemoveTodo = () => {
    onRemoveTodo(todo.id);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateClick = () => {
    onUpdateTodo(
      todo.id,
      newTitle,
      newPriority,
      newCategory,
      newDueDate,
      completed,
      completedAt
    );
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setNewTitle(todo.title);
    setNewPriority(todo.priority);
    setNewCategory(todo.category);
    setNewDueDate(todo.dueDate);
    setIsEditing(false);
  };
  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setNewPriority(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setNewCategory(event.target.value);
  };

  const handleDueDateChange = (event) => {
    setNewDueDate(event.target.value);
  };

  const handleCompletedToggle = () => {
    const newCompletedValue = !completed;
    const newCompletedAt = newCompletedValue ? new Date().toISOString() : null; // Set completedAt based on the new value
    setCompleted(newCompletedValue); // Update the state
    setCompletedAt(newCompletedAt); // Update the completedAt state
    onUpdateTodo(
      todo.id,
      newTitle,
      newPriority,
      newCategory,
      newDueDate,
      newCompletedValue,
      newCompletedAt
    );
  };
  return (
    <div className={styles.itemContainer}>
      <div className={styles.listItem}>
        {isEditing ? (
          // Editing Mode
          <div className={styles.editingBlock}>
            <input
              type="text"
              value={newTitle}
              onChange={handleTitleChange}
              className={styles.inputFields}
            />
            <select
              value={newPriority}
              onChange={handlePriorityChange}
              className={styles.selectFields}
            >
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <select
              value={newCategory}
              onChange={handleCategoryChange}
              className={styles.selectFields}
            >
              <option value="">Select Category</option>
              <option value="All">All</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Birthday">Birthday</option>
              <option value="Wishlist">Wishlist</option>
            </select>
            <input
              type="date"
              value={newDueDate}
              onChange={handleDueDateChange}
              className={styles.inputFields}
            />
            <label>
              Completed:
              <input
                type="checkbox"
                checked={completed}
                onChange={handleCompletedToggle}
                className={styles.inputFields}
              />
            </label>
            <div className={styles.updateBtnContainer}>
              <button
                onClick={handleCancelClick}
                className={styles.updateButton}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateClick}
                className={styles.updateButton}
              >
                Update
              </button>
            </div>
          </div>
        ) : (
          // Display Mode
          <>
            <div className={styles.titleContainer}>
              <label>
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={handleCompletedToggle}
                />
                <span className={styles.todoListTitle}>{todo.title}</span>
              </label>
              <div className={styles.flexibleSpace}></div>
              <div className={styles.todoListBtnContainer}>
                <button onClick={handleEditClick} className={styles.editButton}>
                  <i className="fas fa-file-pen"></i>
                </button>
                <button
                  onClick={handleRemoveTodo}
                  className={styles.editButton}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
            {/*Subattributes*/}
            <div className={styles.subattributeContainer}>
              <div className={styles.subattribute}>
                Priority: {todo.priority}
              </div>
              <div className={styles.subattribute}>
                Category: {todo.category}
              </div>
              <div className={styles.subattribute}>
                Due Date: {new Date(todo.dueDate).toLocaleDateString()}
              </div>
              {completed && completedAt && (
                <div className={styles.subattribute}>
                  Completed At: {new Date(completedAt).toLocaleDateString()}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    priority: PropTypes.string,
    dueDate: PropTypes.string,
    completed: PropTypes.bool,
    completedAt: PropTypes.string
  }),
  onRemoveTodo: PropTypes.func,
  onUpdateTodo: PropTypes.func
};
export default TodoListItem;
