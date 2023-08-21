import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

function TodoContainer({ tableName }) {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [removedTodo, setRemovedTodo] = useState(null);

  const REACT_APP_AIRTABLE_API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;
  const REACT_APP_AIRTABLE_BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID;
  const REACT_APP_TABLE_NAME = process.env.REACT_APP_TABLE_NAME;
  const apiBaseUrl = `https://api.airtable.com/v0/${REACT_APP_AIRTABLE_BASE_ID}/${REACT_APP_TABLE_NAME}`;

  const fetchAndCheckResponse = async (url, options) => {
    const response = await fetch(url, options);
    if (!response.ok) {
      const message = `Error: ${response.status}`;
      throw new Error(message);
    }
    return await response.json();
  };

  useEffect(() => {
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
        const todos = data.records.map((todo) => ({
          id: todo.id,
          title: todo.fields.title
        }));

        setTodoList(todos);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [tableName, REACT_APP_AIRTABLE_API_KEY, apiBaseUrl]);

  const addTodo = async (title) => {
    const newRecord = {
      fields: {
        title: title
      }
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${REACT_APP_AIRTABLE_API_KEY}`
      },
      body: JSON.stringify(newRecord)
    };
    const url = `${apiBaseUrl}`;

    try {
      const data = await fetchAndCheckResponse(url, options);
      setTodoList([...todoList, data]);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateTodo = async (id, newTitle) => {
    const updateTodos = {
      fields: {
        title: newTitle
      }
    };

    const options = {
      method: 'PATCH', // Use PATCH to update existing records
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${REACT_APP_AIRTABLE_API_KEY}`
      },
      body: JSON.stringify(updateTodos)
    };

    const updateUrl = `${apiBaseUrl}/${id}`;

    try {
      await fetchAndCheckResponse(updateUrl, options);
      // Update the local todoList with the updated data
      const updatedTodoList = todoList.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title: newTitle
          };
        }
        return todo;
      });
      setTodoList(updatedTodoList);
    } catch (error) {
      console.log(error.message);
    }
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
      setTodoList(todoList.filter((todo) => todo.id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  const lastAddedTodo =
    todoList.length > 0 ? todoList[todoList.length - 1].title : '';
  return (
    <>
      <h1>Todo List for {tableName}</h1>
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
        <TodoList
          todoList={todoList}
          onRemoveTodo={removeTodo}
          onUpdateTodo={updateTodo}
        />
      )}
    </>
  );
}
TodoContainer.propTypes = {
  tableName: PropTypes.string
};

export default TodoContainer;
