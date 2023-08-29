import React, { useState, useEffect } from 'react';
import { useParams, Outlet, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';
import CategoryTabs from './CategoryTabs';
import styles from './TodoContainer.module.css';

function TodoContainer({ tableName, isAddTodoForm }) {
  const { category } = useParams();
  const navigate = useNavigate();

  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [removedTodo, setRemovedTodo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(category || 'All');
  const [isAddingTodo, setIsAddingTodo] = useState(false);

  const onSelectCategory = (newCategory) => {
    setSelectedCategory(newCategory);
  };

  const handleCloseAddTodoForm = () => {
    setIsAddingTodo(false);
  };

  const toggleAddTodo = () => {
    console.log('button clicked');
    setIsAddingTodo(!isAddingTodo);
  };

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
          dueDate: todo.fields.dueDate || null,
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

  useEffect(() => {
    // Only fetch calendar events after todoList is updated by fetchData
    const calendarEvents = todoList.map((todo) => ({
      title: todo.title,
      start: new Date(todo.dueDate),
      end: new Date(todo.dueDate)
    }));

    setCalendarEvents(calendarEvents);
  }, [todoList]);

  const postTodo = async (todo) => {
    const postTodos = {
      fields: {
        title: todo.title,
        priority: todo.priority,
        category: todo.category,
        dueDate: todo.dueDate
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
    newTodo.category = newTodo.category || selectedCategory || 'All';
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
    newDueDate,
    newCompleted,
    newCompletedAt
  ) => {
    console.log('updateTodo received values:');
    console.log('newCompleted:', newCompleted);
    console.log('newCompletedAt:', newCompletedAt);
    const updateTodos = {
      fields: {
        title: newTitle,
        priority: newPriority,
        category: newCategory,
        dueDate: newDueDate,
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
            dueDate: newDueDate,
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

  // search bar function
  const filteredTodoList = todoList.filter((todo) => {
    const matchCategory =
      selectedCategory === 'All' || todo.category === selectedCategory;
    const matchSearchTerm = todo.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchCategory && matchSearchTerm;
  });

  // handle view calendar click
  const handleViewCalendarClick = () => {
    navigate('/calendar', { state: { events: calendarEvents } });
  };
  return (
    <>
      <div className={styles.appContainer}>
        <h1 className={styles.mainHeader}>Todo List</h1>
        <CategoryTabs
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
        />
        <>
          <input
            type="text"
            placeholder="Search todos"
            value={searchTerm}
            onChange={handleSearch}
          />
        </>

        <button
          onClick={() => {
            toggleAddTodo();
            console.log('Button Clicked');
          }}
        >
          Add New Todo
        </button>

        <button onClick={handleViewCalendarClick}>View Calendar</button>

        {isAddTodoForm && (
          <AddTodoForm
            onAddTodo={addTodo}
            onClose={handleCloseAddTodoForm}
            selectedCategory={selectedCategory || 'All'}
            isAddingTodo={isAddingTodo}
          />
        )}

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
          <>
            <Outlet />
            <TodoList
              todoList={filteredTodoList}
              onRemoveTodo={removeTodo}
              onUpdateTodo={updateTodo}
            />
          </>
        )}
      </div>
    </>
  );
}
TodoContainer.propTypes = {
  tableName: PropTypes.string,
  isAddTodoForm: PropTypes.bool
};

export default TodoContainer;
