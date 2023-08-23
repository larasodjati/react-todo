import React, { useState } from 'react';
import PropTypes from 'prop-types';

function TodoListItem({ todo, onRemoveTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [newPriority, setNewPriority] = useState(todo.priority);
  const [completed, setCompleted] = useState(todo.completed || false);
  const [completedAt, setCompletedAt] = useState(todo.completedAt || null);

  const handleRemoveTodo = () => {
    onRemoveTodo(todo.id);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onUpdateTodo(todo.id, newTitle, newPriority, completed, completedAt);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setNewTitle(todo.title);
    setNewPriority(todo.priority);
    setIsEditing(false);
  };
  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setNewPriority(event.target.value);
  };

  const handleCompletedToggle = () => {
    const newCompletedAt = new Date().toISOString();
    setCompleted(!completed);
    if (!completed) {
      setCompletedAt(newCompletedAt); // set to current time if marking as completed
    } else {
      setCompletedAt(null);
    }
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input type="text" value={newTitle} onChange={handleTitleChange} />
          <select value={newPriority} onChange={handlePriorityChange}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <label>
            Completed:
            <input
              type="checkbox"
              checked={completed}
              onChange={handleCompletedToggle}
            />
          </label>
          <button onClick={handleCancelClick}>Cancel</button>
          <button onClick={handleSaveClick}>Save</button>
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
    completed: PropTypes.bool,
    completedAt: PropTypes.string
  }),
  onRemoveTodo: PropTypes.func,
  onUpdateTodo: PropTypes.func
};
export default TodoListItem;
