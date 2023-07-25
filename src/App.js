import React from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

// const useSemiPersistentState = () => {
//   const [todoList, setTodoList] = React.useState(
//     JSON.parse(localStorage.getItem('savedTodoList')) || []
//   );

//   React.useEffect(() => {
//     localStorage.setItem('savedTodoList', JSON.stringify(todoList));
//   }, [todoList]);

//   return [todoList, setTodoList];
// };

function App() {
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: {
            todoList: JSON.parse(localStorage.getItem('savedTodoList')) || []
          }
        });
      }, 2000);
    }).then((result) => {
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
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
    </>
  );
}

export default App;
