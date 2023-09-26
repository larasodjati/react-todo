import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoContainer from './components/TodoContainer';
import TodoCalendar from './components/TodoCalendar';
import HomePage from './components/HomePage';
import TodoOverview from './components/TodoOverview';
import styles from './globalStyles.module.css';

const REACT_APP_TABLE_NAME = process.env.REACT_APP_TABLE_NAME;

function App() {
  const [isNightMode, setIsNightMode] = useState(false);

  // toggle night mode
  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
  };

  return (
    <div className={isNightMode ? styles.nightMode : ''}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/todo-list"
            element={
              <TodoContainer
                tableName={REACT_APP_TABLE_NAME}
                isAddTodoForm={true}
                isNightMode={isNightMode}
                toggleNightMode={toggleNightMode}
              />
            }
          />
          <Route
            path="/calendar"
            element={<TodoCalendar isNightMode={isNightMode} />}
          />
          <Route
            path="/overview"
            element={<TodoOverview isNightMode={isNightMode} />}
          />
          <Route path="*" element={<h1>Not Found Page</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
