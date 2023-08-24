import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

function TodoContainer({ tableName }) {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [removedTodo, setRemovedTodo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

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
          title: todo.fields.title,
          priority: todo.fields.priority,
          category: todo.fields.category,
          completed: todo.fields.completed || false, // set default to false
          completedAt: todo.fields.completedAt || null // set default to null
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
  }, [tableName]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  const postTodo = async (todo) => {
    const postTodos = {
      fields: {
        title: todo.title,
        priority: todo.priority,
        category: todo.category
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
  // wrapper function for postTodo
  const addTodo = async (newTodo) => {
    newTodo.category = selectedCategory;
    const addedTodo = await postTodo(newTodo);
    if (addedTodo) {
      setTodoList([...todoList, { ...newTodo }]);
    }
  };

  const updateTodo = async (
    id,
    newTitle,
    newPriority,
    newCategory,
    newCompleted,
    newCompletedAt
  ) => {
    const updateTodos = {
      fields: {
        title: newTitle,
        priority: newPriority,
        category: newCategory,
        completed: newCompleted,
        completedAt: newCompletedAt
      }
    };

    const options = {
      method: 'PATCH',
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
            title: newTitle,
            priority: newPriority,
            category: newCategory,
            completed: newCompleted,
            completedAt: newCompletedAt
          };
        }
        return todo;
      });
      setTodoList(updatedTodoList);
    } catch (error) {
      console.log('Error updating todo:', error);
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

  // handle search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTodoList = todoList.filter((todo) => {
    const matchCategory =
      selectedCategory === 'All' || todo.category === selectedCategory;
    const matchSearchTerm = todo.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchCategory && matchSearchTerm;
  });

  return (
    <>
      <h1>Todo List</h1>
      <>
        <input
          type="text"
          placeholder="Search todos"
          value={searchTerm}
          onChange={handleSearch}
        />
      </>

      <nav>
        <ul>
          <li
            className={selectedCategory === 'All' ? 'active' : ''}
            onClick={() => setSelectedCategory('All')}
          >
            All
          </li>
          <li
            className={selectedCategory === 'Work' ? 'active' : ''}
            onClick={() => setSelectedCategory('Work')}
          >
            Work
          </li>
          <li
            className={selectedCategory === 'Personal' ? 'active' : ''}
            onClick={() => setSelectedCategory('Personal')}
          >
            Personal
          </li>
          <li
            className={selectedCategory === 'Birthday' ? 'active' : ''}
            onClick={() => setSelectedCategory('Birthday')}
          >
            Birthday
          </li>
          <li
            className={selectedCategory === 'Wishlist' ? 'active' : ''}
            onClick={() => setSelectedCategory('Wishlist')}
          >
            Wishlist
          </li>
        </ul>
      </nav>

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
          todoList={filteredTodoList}
          onRemoveTodo={removeTodo}
          onUpdateTodo={updateTodo}
        />
      )}
    </>
  );
}
TodoContainer.propTypes = {
  tableName: PropTypes.string.isRequired
};

export default TodoContainer;
