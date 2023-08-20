import React from 'react';

function TodoListItem({ todo, onRemoveTodo, onEditTodo }) {
  const handleRemoveTodo = () => {
    onRemoveTodo(todo.id);
  };
  return (
    <div>
      <li>
        {todo.title}
        <button onClick={onEditTodo}>Edit</button>
        <button onClick={handleRemoveTodo}>Remove</button>
      </li>
    </div>
  );
}

export default TodoListItem;
