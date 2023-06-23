import React from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

function App() {
  const [todoList, setTodoList] = React.useState([]);
  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };
  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <p>
        New thing to do is <strong>{}</strong>
      </p>
      <TodoList todoList={todoList} />
    </div>
  );
}

export default App;
