import React from 'react';
import CreateTarget from '../CreateTarget/CreateTarget';
import Search from '../Search/Search';
import Sorting from '../SortingOptions/SortingOptions';
import styles from './index.module.scss';

/**
 * Functional react component for congratulatory message.
 * @function
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is missing)
 */
const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      {/* header */}
      <div className={styles.sidebar__header}>
        <h1>Bomberman</h1>
        <p>We don’t bomb people, but we keep your payments.</p>
      </div>

      {/* minor components */}
      <div className={styles.sidebar_filters}>
        <Sorting />
        <CreateTarget />
        <Search />
      </div>
    </aside>
  );
};
export default Sidebar;
