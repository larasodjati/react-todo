import React from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

const useSemiPersistentState = () => {
  const [todoList, setTodoList] = React.useState(
    JSON.parse(localStorage.getItem('savedTodoList')) || []
  );

  React.useEffect(() => {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList));
  }, [todoList]);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };
  const lastAddedTodo =
    todoList.length > 0 ? todoList[todoList.length - 1].title : '';

  return [todoList, setTodoList, addTodo, lastAddedTodo];
};

function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <p>
        New thing to do is <strong>{lastAddedTodo}</strong>
      </p>
      <TodoList todoList={todoList} />
    </div>
  );
}

export default App;
