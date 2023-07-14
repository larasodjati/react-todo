import React from 'react';

function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = React.useState('');

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };
  const handleAddTodo = (event) => {
    event.preventDefault();
    if (todoTitle.trim() !== '') {
      onAddTodo({ id: Date.now(), title: todoTitle });
      console.log(todoTitle);
      setTodoTitle('');
    }
  };
  return (
    <form onSubmit={handleAddTodo}>
      <button>Add</button>
    </form>
  );
}

export default AddTodoForm;
