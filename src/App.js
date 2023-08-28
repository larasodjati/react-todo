import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoContainer from './components/TodoContainer';
import TodoCalendar from './components/TodoCalendar';

const REACT_APP_TABLE_NAME = process.env.REACT_APP_TABLE_NAME;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <TodoContainer
              tableName={REACT_APP_TABLE_NAME}
              isAddTodoForm={true}
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
