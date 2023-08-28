import React from 'react';
import styles from './CategoryTabs.module.css';

function CategoryTabs({ onSelectCategory, selectedCategory }) {
  const handleCategoryClick = (selectedCategory) => {
    onSelectCategory(selectedCategory);
  };
  return (
    <nav>
      <ul className={styles.navList}>
        <li
          onClick={() => handleCategoryClick('All')}
          className={`${styles.navItem} ${selectedCategory} === 'All'? styles.active : ''}`}
        >
          All
        </li>
        <li
          onClick={() => handleCategoryClick('Work')}
          className={`${styles.navItem} ${
            selectedCategory === 'Work' ? styles.active : ''
          }`}
        >
          Work
        </li>
        <li
          onClick={() => handleCategoryClick('Personal')}
          className={`${styles.navItem} ${
            selectedCategory === 'Personal' ? styles.active : ''
          }`}
        >
          Personal
        </li>
        <li
          onClick={() => handleCategoryClick('Birthday')}
          className={`${styles.navItem} ${
            selectedCategory === 'Birthday' ? styles.active : ''
          }`}
        >
          Birthday
        </li>
        <li
          onClick={() => handleCategoryClick('Wishlist')}
          className={`${styles.navItem} ${
            selectedCategory === 'Wishlist' ? styles.active : ''
          }`}
        >
          Wishlist
        </li>
      </ul>
    </nav>
  );
}

CategoryTabs.propTypes = {};
export default CategoryTabs;
