import React, { useEffect } from 'react';
import styles from './Table.module.scss';

// redux
import { connect } from 'react-redux';
import { RootStore } from '../../Store';

// action creators
import { Client, ClientsAction } from '../../Actions/clients.action';

/**
 * Functional react component for congratulatory message.
 * @function
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is missing)
 */
const Table = (props: any) => {
  // ClientsAction creators `must not` be used here
  // Shadow variable gives out error
  const { listings } = props;

  // temporarily run the action
  useEffect(() => {
    const req = setTimeout(() => {
      props.ClientsAction();
    });
    return () => {
      clearTimeout(req);
    };
  }, []);

  // Simply map the clients array from the server
  const mappingClients = listings.clients?.map(
    (client: Client, index: number) => {
      return (
        <tr key={index} className={styles.body}>
          <td>{index}</td>
          <td>{client.gender}</td>
          <td>{client.first_name}</td>
          <td>{client.last_name}</td>
          <td>{client.mobile_number}</td>
          <td>${client.bills}</td>

          {/* our actions has a special logic involved */}
          {/* each and every rows have 3 buttons */}
          {/* delete, update, and edit */}
          <td className={styles.body__actions}>
            <ul>
              <li>
                <button>1</button>
              </li>
              <li>
                <button>2</button>
              </li>
              <li>
                <button>3</button>
              </li>
            </ul>
          </td>
        </tr>
      );
    }
  );

  return (
    <div className={styles.table}>
      <table className={styles.table__container}>
        <tbody>
          <tr className={styles.headers}>
            <th>ID</th>
            <th>Gender</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Mobile Number</th>
            <th>Bills</th>
            <th>Actions</th>
          </tr>
          {listings.clients.length ? mappingClients : null}
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
