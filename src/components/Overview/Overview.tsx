import React from 'react';
import styles from './Overview.module.scss';
import PropTypes from 'prop-types';

// redux
import { connect } from 'react-redux';
import { RootStore } from '../../Store';

// componentts
import AccountSettings from '../AccountSettings/AccountSettings';
import Card from '../Card/Card';

export interface IOverviewProp {
  persons: number;
  billings: number;
  completed: number;
}
/**
 * Functional react component for congratulatory message.
 * @function
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is missing)
 */
const Overview = (props: any) => {
  const { persons, billings, completed }: IOverviewProp = props;
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
          <Card title="Persons" value={persons} />
          <Card title="Billings" value={billings} />
          <Card title="Completed" value={completed} />
        </div>
      </div>
    </div>
  );
};

Overview.propTypes = {
  props: PropTypes.shape({
    persons: PropTypes.number.isRequired,
    billings: PropTypes.number.isRequired,
    completed: PropTypes.number.isRequired,
  }),
};

const mapStateToProps = (state: RootStore) => {
  return {
    persons: state.listings.persons,
    billings: state.listings.billings,
    completed: state.listings.completed,
  };
};

export default connect(mapStateToProps)(Overview);
