import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

function CategoryTabs() {
  const navigate = useNavigate();

  const handleCategoryClick = (selectedCategory) => {
    if (selectedCategory === 'All') {
      navigate('/');
    } else {
      navigate(`/category/${selectedCategory}`);
    }
  };

  return (
    <nav>
      <ul>
        <li onClick={() => handleCategoryClick('All')}>
          <Link to="/">All</Link>
        </li>
        <li onClick={() => handleCategoryClick('Work')}>
          <Link to="/category/Work">Work</Link>
        </li>
        <li onClick={() => handleCategoryClick('Personal')}>
          <Link to="/category/Personal">Personal</Link>
        </li>
        <li onClick={() => handleCategoryClick('Birthday')}>
          <Link to="/category/Birthday">Birthday</Link>
        </li>
        <li onClick={() => handleCategoryClick('Wishlist')}>
          <Link to="/category/Work">Wishlist</Link>
        </li>
      </ul>
    </nav>
  );
}

export default CategoryTabs;
