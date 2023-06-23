import React from 'react';
import TodoListItem from './TodoListItem';

const todoList = [
  {
    id: 1,
    title: 'Washing dishes'
  },
  {
    id: 2,
    title: 'Feeding cats'
  },
  {
    id: 3,
    title: 'Morning walk'
  }
];

function TodoList() {
  return (
    <ul>
      {todoList.map(function (todo) {
        return <TodoListItem key={todo.id} todo={todo} />;
      })}
    </ul>
  );
}

export default TodoList;
