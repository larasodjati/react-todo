import React from 'react';

function AddTodoForm(props) {
  const handleAddTodo = (event) => {
    const todoTitle = event.target.title.value;
    props.onAddTodo(todoTitle);
    console.log(todoTitle);
    event.preventDefault();
    event.target.reset();
  };
  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title</label>
      <input type="text" id="todoTitle" name="title"></input>
      <button>Add</button>
    </form>
  );
}

export default AddTodoForm;
