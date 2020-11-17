import React from 'react';
import styles from './Table.module.scss';
/**
 * Functional react component for congratulatory message.
 * @function
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is missing)
 */
const Table = () => {
  return <div className={styles.table}>Hello from table!</div>;
};
export default Table;
