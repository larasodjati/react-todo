import React from 'react';

function TodoListItem({ todo }) {
  return (
    <div>
      <li>
        {todo.title}
        <button>Remove</button>
      </li>
    </div>
  );
}

export default TodoListItem;
