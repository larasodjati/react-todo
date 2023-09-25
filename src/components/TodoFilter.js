import React from 'react';
import PropTypes from 'prop-types';
import styles from './TodoFilter.module.css';

function TodoFilter({
  filterOptions,
  sortBy,
  handleFilterChange,
  handleSortChange
}) {
  return (
    <div className={styles.filterForm}>
      {/* filter By */}
      <div className={styles.filterOptions}>
        <label>Filter By:</label>
        <select
          className={styles.filterSelect}
          value={filterOptions.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <select
          className={styles.filterSelect}
          value={filterOptions.priority}
          onChange={(e) => handleFilterChange('priority', e.target.value)}
        >
          <option value="All">All Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      {/* sort By */}
      <div className={styles.sortOptions}>
        <label>Sort By:</label>
        <select
          className={styles.sortSelect}
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="Title A-Z">Title: 'A-Z'</option>
          <option value="Title Z-A">Title: 'Z-A'</option>
          <option value="Due Date">Due Date</option>
          <option value="Newly Added">Newly Added</option>
        </select>
      </div>
    </div>
  );
}

TodoFilter.propTypes = {
  filterOptions: PropTypes.shape({
    status: PropTypes.string,
    priority: PropTypes.string
  }),
  sortBy: PropTypes.string,
  handleFilterChange: PropTypes.func,
  handleSortChange: PropTypes.func
};
export default TodoFilter;
