import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './CategoryDropdown.module.css';

function CategoryDropdown({ categories, onSelectCategory, selectedCategory }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleCategoryClick = (category) => {
    onSelectCategory(category);
    toggleDropdown();
  };
  return (
    <div className={styles.categoryDropdown}>
      <button onClick={toggleDropdown} className={styles.categoryBtn}>
        {selectedCategory ? `Category: ${selectedCategory}` : 'Select Category'}
      </button>
      {isOpen && (
        <ul className={styles.dropdownContent}>
          {categories.map((category) => (
            <li key={category} onClick={() => handleCategoryClick(category)}>
              {category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

CategoryDropdown.propTypes = {
  categories: PropTypes.array.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string
};
export default CategoryDropdown;
