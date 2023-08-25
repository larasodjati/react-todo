import React from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import TodoContainer from './components/TodoContainer';

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
        <Route
          path="*"
          element={<h1>Not Found Page</h1>} // Replace with your "Not Found" component
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
