import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

const REACT_APP_AIRTABLE_API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;
const REACT_APP_AIRTABLE_BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID;
const REACT_APP_TABLE_NAME = process.env.REACT_APP_TABLE_NAME;

const apiBaseUrl = `https://api.airtable.com/v0/${REACT_APP_AIRTABLE_BASE_ID}/${REACT_APP_TABLE_NAME}`;

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [removedTodo, setRemovedTodo] = useState(null);

  const fetchAndCheckResponse = async (url, options) => {
    const response = await fetch(url, options);
    if (!response.ok) {
      const message = `Error: ${response.status}`;
      throw new Error(message);
    }
    return await response.json();
  };

  const fetchData = async () => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${REACT_APP_AIRTABLE_API_KEY}`
      }
    };
    const url = `${apiBaseUrl}`;

    try {
      const data = await fetchAndCheckResponse(url, options);
      const todos = data.records.map((todo) => {
        const newTodo = {
          id: todo.id,
          title: todo.fields.title
        };
        return newTodo;
      });
      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const postTodo = async (todo) => {
    const postTodos = {
      fields: {
        title: todo.title
      }
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${REACT_APP_AIRTABLE_API_KEY}`
      },
      body: JSON.stringify(postTodos)
    };
    const url = `${apiBaseUrl}`;

    try {
      const data = await fetchAndCheckResponse(url, options);
      return data;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
    postTodo(newTodo);
  };

  const removeTodo = async (id) => {
    const removedItem = todoList.find((todo) => todo.id === id);
    setRemovedTodo(removedItem);

    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);

    const deleteOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${REACT_APP_AIRTABLE_API_KEY}`
      }
    };
    const deleteUrl = `${apiBaseUrl}/${id}`;
    try {
      const response = await fetch(deleteUrl, deleteOptions);
      if (!response.ok) {
        throw new Error(`Error deleting todo item: ${response.status}`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const lastAddedTodo =
    todoList.length > 0 ? todoList[todoList.length - 1].title : '';

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
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
          }
        />
        <Route path="/new" element={<h1>New Todo List</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
