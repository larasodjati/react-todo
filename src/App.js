import React from 'react';

const todoList = [
    {
        id: 1,
        title: 'Washing dishes',
    },
    {
        id: 2,
        title: 'Feeding cats',
    },
    {
        id: 3,
        title: 'Morning walk',
    },
];

function App() {
    return (
        <div>
            <h1>Todo List</h1>
            <ul>
                {todoList.map(function (item) {
                    return <li key={item.id}>{item.title}</li>;
                })}
            </ul>
        </div>
    );
}

export default App;
