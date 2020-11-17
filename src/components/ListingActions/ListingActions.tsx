import React from 'react';
import styles from './ListingActions.module.scss';
/**
 * Functional react component for congratulatory message.
 * @function
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is missing)
 */
const ListingActions = () => {
  return (
    <ul className={styles.actions}>
      <li>
        <button>1</button>
        <button>2</button>
        <button>3</button>
      </li>
    </ul>
  );
};
export default ListingActions;
