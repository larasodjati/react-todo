import React from 'react';

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
      {todoList.map(function (item) {
        return;
      })}
    </ul>
  );
}

export default TodoList;
