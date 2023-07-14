import React from 'react';

function InputWithLabel() {
  return (
    <>
      <label htmlFor="todoTitle">Title</label>
      <input
        type="text"
        id="todoTitle"
        name="title"
        value={todoTitle}
        onChange={handleTitleChange}
      />
    </>
  );
}

export default InputWithLabel;
