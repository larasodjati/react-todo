import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
      newCompletedValue,
      newCompletedAt
    );
  };
  return (
    <div>
      {isEditing ? (
        <div>
          <input type="text" value={newTitle} onChange={handleTitleChange} />
          <select value={newPriority} onChange={handlePriorityChange}>
            <option value="">Select Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select value={newCategory} onChange={handleCategoryChange}>
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
          />
          <label>
            Completed:
            <input
              type="checkbox"
              checked={completed}
              onChange={handleCompletedToggle}
            />
          </label>
          <button onClick={handleCancelClick}>Cancel</button>
          <button onClick={handleUpdateClick}>Update</button>
        </div>
      ) : (
        <div>
          <label>
            <input
              type="checkbox"
              checked={completed}
              onChange={handleCompletedToggle}
            />
            {todo.title}
          </label>
          <div>Priority: {todo.priority}</div>

          <div>Category: {todo.category}</div>

          <div>Due Date: {new Date(todo.dueDate).toLocaleDateString()}</div>

          <div>
            {completed && completedAt && (
              <div>
                Completed At: {new Date(completedAt).toLocaleDateString()}
              </div>
            )}
          </div>
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={handleRemoveTodo}>Remove</button>
        </div>
      )}
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
