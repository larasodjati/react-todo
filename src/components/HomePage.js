import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

function HomePage() {
  return (
    <div className={styles.heroSection}>
      <h1 className={styles.headerHomepage}>Welcome to TodoTize</h1>
      <p className={styles.homeDescription}>Organize your day with ease.</p>
      <Link to="/todo-list">
        <button className={styles.homeButton}> My Todo List</button>
      </Link>
    </div>
  );
}

export default HomePage;
