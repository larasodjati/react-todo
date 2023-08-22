import React, { useState } from 'react';
import PropTypes from 'prop-types';

function TodoListItem({ todo, onRemoveTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleRemoveTodo = () => {
    onRemoveTodo(todo.id);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onUpdateTodo(todo.id, newTitle);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setNewTitle(todo.title);
    setIsEditing(false);
  };
  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input type="text" value={newTitle} onChange={handleTitleChange} />
          <button onClick={handleCancelClick}>Cancel</button>
          <button onClick={handleSaveClick}>Save</button>
        </div>
      ) : (
        <div>
          <li>{todo.title}</li>
          <div>Priotity: {todo.priority}</div>
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
