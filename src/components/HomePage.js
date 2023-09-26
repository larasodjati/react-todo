import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import styles from './HomePage.module.css';

function HomePage() {
  return (
    <div className={styles.heroSection}>
      <h1 className={styles.headerHomepage}>Welcome to Todo App</h1>
      <Link to="/todo-list">
        <button className={styles.homeButton}>My Todo List</button>
      </Link>
      <Footer />
    </div>
  );
}

export default HomePage;
