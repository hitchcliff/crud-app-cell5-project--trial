import React, { useEffect } from 'react';
import styles from './Table.module.scss';

// action creators
import TableRows from '../TableRows/TableRows';
import { useDispatch, useSelector } from 'react-redux';
import { ClientsAction } from '../../Actions/clients.action';
import { RootStore } from '../../Store';

/**
 * Functional react component for congratulatory message.
 * @function
 * @returns {JSX.Element} - Rendered component (o null if `success` prop is missing)
 */
const Table = () => {
  const state = useSelector((item: RootStore) => item.listings);
  const dispatch = useDispatch();

  // fetch the the `clients` here to avoid confusion in `TableRows` component
  useEffect(() => {
    const req = setTimeout(() => {
      dispatch(ClientsAction());
    });
    return () => {
      clearTimeout(req);
    };
  }, [dispatch]);

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

          {/* this component has a complicated logic involved
           each and every rows have 3 buttons
           delete, update, and toggle complete
           a good reason to detach this into small component */}
          <TableRows clients={state?.clients} />
        </tbody>
      </table>
    </div>
  );
};

export default Table;
