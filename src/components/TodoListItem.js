import React, { useState } from 'react';
import PropTypes from 'prop-types';

function TodoListItem({ todo, onRemoveTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [newPriority, setNewPriority] = useState(todo.priority);

  const handleRemoveTodo = () => {
    onRemoveTodo(todo.id);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onUpdateTodo(todo.id, newTitle, newPriority);
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
          <button onClick={handleCancelClick}>Cancel</button>
          <button onClick={handleSaveClick}>Save</button>
        </div>
      ) : (
        <div>
          <li>{todo.title}</li>
          <div>Priority: {todo.priority}</div>
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
    title: PropTypes.string
  }),
  onRemoveTodo: PropTypes.func,
  onUpdateTodo: PropTypes.func
};
export default TodoListItem;
