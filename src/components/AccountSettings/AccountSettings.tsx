import React from 'react';
import styles from './AccountSettings.module.scss';

import StaticProfile from '../../assets/Profile.png';
/**
 * Functional react component for congratulatory message.
 * @function
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is missing)
 */
const AccountSettings = () => {
  return (
    <nav className={styles.header}>
      <div className={styles.header__container}>
        <img className={styles.image} src={StaticProfile} alt="Mr. John" />
        <button>Logout</button>
      </div>
    </nav>
  );
};
export default AccountSettings;
