import React, { useEffect, useState } from 'react';
import styles from './Table.module.scss';

// redux
import { connect } from 'react-redux';
import { RootStore } from '../../Store';

// action creators
import { ClientsAction } from '../../Actions/clients.action';
import TableRows from '../TableRows/TableRows';

/**
 * Functional react component for congratulatory message.
 * @function
 * @returns {JSX.Element} - Rendered component (o null if `success` prop is missing)
 */
const Table = (props: any) => {
  // fetch the the `clients` here to avoid confusion in `TableRows` component
  useEffect(() => {
    const req = setTimeout(() => {
      props.ClientsAction();
    });
    return () => {
      clearTimeout(req);
    };
  }, []);

  return (
    <div className={styles.table}>
      <table className={styles.table__container}>
        <tbody>
          {/* These are the Main headers of the Table */}
          <tr className={styles.headers}>
            <th>ID</th>
            <th>Gender</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Mobile Number</th>
            <th>Bills</th>
            <th>Actions</th>
          </tr>

          {/* this component has a complicated logic involved */}
          {/* each and every rows have 3 buttons */}
          {/* delete, update, and toggle complete */}
          {/* a good reason to detach this into small component */}
          <TableRows />
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state: RootStore) => {
  return {
    listings: state.listings,
  };
};

export default connect(mapStateToProps, { ClientsAction })(Table);
