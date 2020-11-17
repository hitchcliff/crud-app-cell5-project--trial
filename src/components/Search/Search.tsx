import React from 'react';
import styles from './Search.module.scss';
/**
 * Functional react component for congratulatory message.
 * @function
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is missing)
 */
const Search = () => {
  return (
    <div className={styles.search}>
      {/* a search input that has a `BEM` naming convention */}
      <input
        className={styles.search__input}
        name="s"
        type="text"
        placeholder="Look for targets"
      />
    </div>
  );
};
export default Search;
