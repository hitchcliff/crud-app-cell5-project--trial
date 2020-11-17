import React from 'react';
import styles from './index.module.scss';
/**
 * Functional react component for congratulatory message.
 * @function
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is missing)
 */
const Sidebar = () => {
  return <aside className={styles.sidebar}>Hello from sidebar</aside>;
};
export default Sidebar;
