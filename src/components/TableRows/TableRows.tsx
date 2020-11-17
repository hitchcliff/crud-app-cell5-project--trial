import React from 'react';
import { Client } from '../../Actions/clients.action';
import styles from './TableRows.module.scss';
interface ITableRows {
  clients: Client[];
}
/**
 * Functional react component for congratulatory message.
 * @function
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is missing)
 */
const TableRows = ({ clients }: ITableRows): JSX.Element => {
  // Simply map the clients array from the server
  const mappingClients = clients.map((client: Client, index: number) => {
    return (
      <tr key={index} className={styles.body}>
        <td>{index}</td>
        <td>{client.gender}</td>
        <td>{client.first_name}</td>
        <td>{client.last_name}</td>
        <td>{client.mobile_number}</td>
        <td>${client.bills}</td>

        {/* delete, update, and toggle complete */}
        <td className={styles.body__actions}>
          <button>edit</button>
        </td>
      </tr>
    );
  });

  return <>{mappingClients}</>;
};
export default TableRows;
