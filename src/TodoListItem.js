import React from 'react';

function TodoListItem({ todo, onRemoveTodo }) {
  const handleRemoveTodo = () => {
    onRemoveTodo(todo.id);
  };
  return (
    <div>
      <li>
        {todo.title}
        <button onClick={handleRemoveTodo}>Remove</button>
      </li>
    </div>
  );
}

export default TodoListItem;
