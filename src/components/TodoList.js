import React from 'react';
import PropTypes from 'prop-types';
import TodoListItem from './TodoListItem';
import styles from './TodoList.module.css';

export function TodoList({ todoList, onRemoveTodo, onUpdateTodo }) {
  return (
    <ul className={styles.todoList}>
      {todoList.map(function (todo) {
        return (
          <TodoListItem
            key={todo.id}
            todo={todo}
            onRemoveTodo={onRemoveTodo}
            onUpdateTodo={onUpdateTodo}
            className={styles.todoList}
          />
        );
      })}
    </ul>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string.isRequired
    })
  ),
  onRemoveTodo: PropTypes.func,
  onUpdateTodo: PropTypes.func
};
export default TodoList;
