import React from 'react';
import PropTypes from 'prop-types';
import styles from './TodoListPage.module.css';

function TodoListPage({
  currentPage,
  totalPages,
  onChangePage,
  todosPerPage,
  onTodosPerPageChange
}) {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onChangePage(i)}
          className={currentPage === i ? styles.active : ''}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.todosPerPage}>
        <label>Todos per page:</label>
        <select
          value={todosPerPage}
          onChange={(e) => onTodosPerPageChange(Number(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
      <div className={styles.navigation}>
        <button
          onClick={() => onChangePage(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.previous}
        >
          <i className="fa-solid fa-angles-left"></i>
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => onChangePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.next}
        >
          <i className="fa-solid fa-angles-right"></i>
        </button>
      </div>
    </div>
  );
}
TodoListPage.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onChangePage: PropTypes.func,
  todosPerPage: PropTypes.number,
  onTodosPerPageChange: PropTypes.func
};
export default TodoListPage;
