import React from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import TodoContainer from './components/TodoContainer';
import TodoCalendar from './components/TodoCalendar';

const REACT_APP_TABLE_NAME = process.env.REACT_APP_TABLE_NAME;

function App() {
  const { category } = useParams();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <TodoContainer
              tableName={REACT_APP_TABLE_NAME}
              isAddTodoForm={false}
            />
          }
        />
        <Route
          path="/category/:category"
          element={
            <TodoContainer
              tableName={REACT_APP_TABLE_NAME}
              isAddTodoForm={false}
            />
          }
        />
        <Route
          path="/add"
          element={
            <TodoContainer
              tableName={REACT_APP_TABLE_NAME}
              isAddTodoForm={true}
              selectedCategory={category}
            />
          }
        />
        <Route path="/calendar" element={<TodoCalendar />} />
        <Route path="*" element={<h1>Not Found Page</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
