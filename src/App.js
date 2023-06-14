import React from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

function App() {
  const [newTodo, setNewTodo] = React.useState('');
  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={setNewTodo} />
      <p>
        New thing to do is <strong>{newTodo}</strong>
      </p>
      <TodoList />
    </div>
  );
}

export default App;
