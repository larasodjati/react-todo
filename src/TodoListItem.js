import React, { useState } from 'react';

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

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input type="text" value={newTitle} onChange={handleTitleChange} />
          <button onClick={handleSaveClick}>Save</button>
        </div>
      ) : (
        <div>
          <li>{todo.title}</li>
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={handleRemoveTodo}>Remove</button>
        </div>
      )}
    </div>
  );
}

export default TodoListItem;
