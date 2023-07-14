import React from 'react';

function InputWithLabel(props) {
  return (
    <>
      <label htmlFor="todoTitle">Title</label>
      <input
        type="text"
        id="todoTitle"
        name="title"
        value={props.todoTitle}
        onChange={props.handleTitleChange}
      />
    </>
  );
}

export default InputWithLabel;
