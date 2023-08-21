import React from 'react';
import TodoListItem from './TodoListItem';

function TodoList({ todoList, onRemoveTodo, onUpdateTodo }) {
  return (
    <ul>
      {todoList.map(function (todo) {
        return (
          <TodoListItem
            key={todo.id}
            todo={todo}
            onRemoveTodo={onRemoveTodo}
            onUpdateTodo={onUpdateTodo}
          />
        );
      })}
    </ul>
  );
}

export default TodoList;
