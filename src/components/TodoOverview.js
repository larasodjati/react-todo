import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  CartesianGrid
} from 'recharts';

import styles from './TodoOverview.module.css';

const COLORS = ['#3F2344', '#223D7B', '#FE634B', '#00A781', '#3c3744'];

function TodoOverview() {
  const location = useLocation();
  const todoList = location.state ? location.state.todoList : [];

  const navigate = useNavigate(); // useNavigate to get navigate function
  const handleTodoListPageButton = () => {
    navigate('/todo-list');
  };

  // Calculate completed and pending tasks
  const completedTasks = todoList.filter((todo) => todo.completed);
  const pendingTasks = todoList.filter((todo) => !todo.completed);

  // Calculate weekly completion data
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDate = new Date();

  // Calculate the start date (Sunday) and end date (Saturday) of the current week
  const startDate = new Date(currentDate);
  startDate.setDate(currentDate.getDate() - currentDate.getDay()); // Go back to the beginning of the week (Sunday)

  const endDate = new Date(currentDate);
  endDate.setDate(startDate.getDate() + 6); // Go to the end of the week (Saturday)

  const weeklyCompletionData = daysOfWeek.map((day, index) => {
    const currentDay = new Date(startDate);
    currentDay.setDate(startDate.getDate() + index);

    // Count completed tasks for the current day within the date range
    const completedInDateRange = completedTasks.filter((todo) => {
      const todoCompletedAt = new Date(todo.completedAt);

      return (
        todo.completed &&
        currentDay <= todoCompletedAt && // Check if the task is on or after the current day
        todoCompletedAt <= endDate // Check if the task is on or before the end of the week
      );
    }).length;

    return {
      day: `${currentDay.getMonth() + 1}/${currentDay.getDate()}`,
      completed: completedInDateRange
    };
  });

  // Calculate pending todo by category
  const pendingCategories = {};

  todoList.map((todo) => {
    const category = todo.category;
    if (!todo.completed) {
      if (!pendingCategories[category]) {
        pendingCategories[category] = [todo];
      } else {
        pendingCategories[category] = pendingCategories[category].concat(todo);
      }
      console.log('pendingCategories', pendingCategories[category]);
    }
    return pendingCategories[category];
  });

  // Convert the pendingCategories object into an array of objects
  const pendingCategoriesArray = Object.keys(pendingCategories).map(
    (category) => ({
      name: category,
      todos: pendingCategories[category]
    })
  );

  return (
    <div className={styles.overviewContainer}>
      <div className={styles.buttonContainer}>
        <button
          onClick={handleTodoListPageButton}
          className={styles.todoListPageButton}
        >
          <i className="fa-solid fa-arrow-left"> Back to Todo List</i>
        </button>
      </div>

      <h2>Todo Overview</h2>

      {/* Display the number of completed and pending tasks */}
      <div className={styles.overviewSum}>
        <div className={styles.overviewBox}>
          <p className={styles.completedTasks}>Completed Tasks:</p>
          <p className={styles.taskCount}>{completedTasks.length}</p>
        </div>
        <div className={styles.overviewBox}>
          <p className={styles.completedTasks}>Pending Tasks:</p>
          <p className={styles.taskCount}>{pendingTasks.length}</p>
        </div>
      </div>

      {/* Weekly Completion Chart */}
      <div className={styles.chartContainer}>
        <h3>Weekly Completion</h3>
        <BarChart width={600} height={350} data={weeklyCompletionData}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip className={styles.tooltip} />
          <CartesianGrid className={styles.cartesianGrid} />
          <Bar dataKey="completed" name="Todo completed" fill="#4e689c" />
          <Legend className={styles.legendChart} />
        </BarChart>

        {/* Custom Legend for Date Range */}
        <div className={styles.legendChart}>
          <span className={styles.legendText}>Date:</span>{' '}
          {weeklyCompletionData[0].day} - {weeklyCompletionData[6].day}
        </div>
      </div>

      {/* Pending Categories Pie Chart */}
      <h3>Pending Tasks by Category</h3>
      <PieChart width={600} height={300}>
        <Pie
          data={pendingCategoriesArray}
          dataKey="todos.length"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          label
        >
          {pendingCategoriesArray.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip className={styles.tooltip} />
        <Legend
          iconType="circle"
          iconSize={10}
          layout="vertical"
          verticalAlign="middle"
          align="right"
          formatter={(value, entry) => ` ${value}`}
        />
      </PieChart>
    </div>
  );
}

export default TodoOverview;
