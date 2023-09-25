import React, { useState, useEffect } from 'react';
import { useParams, Outlet, useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';
import CategoryDropdown from './CategoryDropdown';
import styles from './TodoContainer.module.css';
import TodoFilter from './TodoFilter';
import TodoListPage from '../page/TodoListPage';
import { Hourglass } from 'react-loader-spinner';

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
  const [filterOptions, setFilterOptions] = useState({
    status: 'All',
    priority: 'All'
  });
  const [sortBy, setSortBy] = useState('Newly Added');
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage, setTodosPerPage] = useState(5);

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
          createdAt: todo.fields.createdAt || null,
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
    const now = new Date().toISOString();
    const postTodos = {
      fields: {
        title: todo.title,
        priority: todo.priority,
        category: todo.category,
        dueDate: todo.dueDate,
        createdAt: now
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
      setTodoList([newTodo, ...todoList]);
    }
    fetchData();
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

  // handle search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // search bar and category function
  const filteredTodoList = todoList.filter((todo) => {
    const matchCategory =
      selectedCategory === 'All' || todo.category === selectedCategory;
    const matchSearchTerm = todo.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchCategory && matchSearchTerm;
  });

  // handle filter and sort
  const handleFilterChange = (filterType, value) => {
    setFilterOptions({
      ...filterOptions,
      [filterType]: value
    });
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  // filter and sort based on status, priority, due date
  const filteredAndSortedTodoList = filteredTodoList
    .filter((todo) => {
      if (filterOptions.priority === 'All') {
        return true;
      }
      return todo.priority === filterOptions.priority;
    })

    .filter((todo) => {
      if (filterOptions.status === 'All') {
        return true;
      }
      if (filterOptions.status === 'Completed') {
        return todo.completed;
      }
      if (filterOptions.status === 'Pending') {
        return !todo.completed;
      }
      return false;
    })

    .sort((a, b) => {
      if (sortBy === 'Title A-Z') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'Title Z-A') {
        return b.title.localeCompare(a.title);
      } else if (sortBy === 'Due Date') {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else if (sortBy === 'Newly Added') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });

  // handle view calendar click
  const handleViewCalendarClick = () => {
    navigate('/calendar', { state: { events: calendarEvents } });
  };

  // handle overview button
  const handleOverviewButton = () => {
    navigate('/overview', { state: { todoList } });
  };

  // handle pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleTodosPerPageChange = (newTodosPerPage) => {
    setTodosPerPage(newTodosPerPage);
    setCurrentPage(1);
  };

  // calculate the index range for the current page
  const startIndex = (currentPage - 1) * todosPerPage;
  const endIndex = startIndex + todosPerPage;
  const todosForCurrentPage = filteredAndSortedTodoList.slice(
    startIndex,
    endIndex
  );

  return (
    <>
      <div className={styles.appContainer}>
        <Link to="/" className={styles.mainHeaderLink}>
          <h1 className={styles.mainHeader}>Todo List</h1>
        </Link>
        <div className={styles.headerContainer}>
          <button onClick={handleOverviewButton} className={styles.overviewBtn}>
            Overview
          </button>
          <CategoryDropdown
            categories={['All', 'Work', 'Personal', 'Birthday', 'Wishlist']}
            onSelectCategory={onSelectCategory}
            selectedCategory={selectedCategory}
          />
          <>
            <form className={styles.searchForm}>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
                className={styles.searchInput}
              />
              <i className="fa-solid fa-magnifying-glass"></i>
            </form>
          </>
          <button
            onClick={() => {
              toggleAddTodo();
            }}
            className={styles.addTodoBtn}
          >
            Add Todo
          </button>

          <button
            onClick={handleViewCalendarClick}
            className={styles.viewCalendarBtn}
          >
            Calendar
          </button>
        </div>

        <hr className={styles.headerLine} />
        <TodoFilter
          filterOptions={filterOptions}
          sortBy={sortBy}
          handleFilterChange={handleFilterChange}
          handleSortChange={handleSortChange}
        />
        {isAddTodoForm && (
          <AddTodoForm
            onAddTodo={addTodo}
            onClose={handleCloseAddTodoForm}
            selectedCategory={selectedCategory || 'All'}
            isAddingTodo={isAddingTodo}
          />
        )}

        {removedTodo && (
          <p className={styles.removedTodoText}>
            <strong>{removedTodo.title} has been removed</strong>
          </p>
        )}
        {isLoading ? (
          <div className={styles.loadingContainer}>
            <Hourglass color="#00BFFF" height={120} width={100} />
          </div>
        ) : (
          <>
            <Outlet />
            <TodoList
              todoList={todosForCurrentPage}
              onRemoveTodo={removeTodo}
              onUpdateTodo={updateTodo}
            />
            <TodoListPage
              currentPage={currentPage}
              totalPages={Math.ceil(
                filteredAndSortedTodoList.length / todosPerPage
              )}
              onChangePage={handlePageChange}
              todosPerPage={todosPerPage}
              onTodosPerPageChange={handleTodosPerPageChange}
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
