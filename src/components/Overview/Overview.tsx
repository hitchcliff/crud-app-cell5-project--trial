import React from 'react';
import AccountSettings from '../AccountSettings/AccountSettings';
import Card from '../Card/Card';
import styles from './Overview.module.scss';
/**
 * Functional react component for congratulatory message.
 * @function
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is missing)
 */
const Overview = () => {
  return (
    <div className={styles.overview}>
      {/* short intro about the app */}
      <div className={styles.heading}>
        {/* summary */}
        <div className={styles.heading__summary}>
          <h3>My clients billings and listings</h3>
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia.
          </p>
        </div>

        {/* account settings where logout button can be found */}
        <div className={styles.heading__settings}>
          {/* account settings micro component */}
          <AccountSettings />
        </div>
      </div>

      {/* cards components that accepts title and value as props */}
      <div className={styles.cards}>
        <h2 className={styles.cards__title}>Overview</h2>
        <div className={styles.cards__container}>
          <Card title="Persons" value={50} />
          <Card title="Billings" value={500} />
          <Card title="Completed" value={25} />
        </div>
      </div>
    </div>
  );
};
export default Overview;
