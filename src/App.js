import React from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

function App() {
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  function fetchTodoList() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: {
            todoList: JSON.parse(localStorage.getItem('savedTodoList')) || []
          }
        });
      }, 2000);
    });
  }
  React.useEffect(() => {
    fetchTodoList().then((result) => {
      setTodoList(result.data.todoList);
      setIsLoading(false);
    });
  }, []);

  React.useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  const [removedTodo, setRemovedTodo] = React.useState(null);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };
  const lastAddedTodo =
    todoList.length > 0 ? todoList[todoList.length - 1].title : '';

  const removeTodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);

    const removedItem = todoList.find((todo) => todo.id === id);
    setRemovedTodo(removedItem);
  };
  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      {removedTodo && (
        <p>
          <strong>{removedTodo.title}</strong> has been removed.
        </p>
      )}
      <p>
        New thing to do is <strong>{lastAddedTodo}</strong>
      </p>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
      )}
    </>
  );
}

export default App;
