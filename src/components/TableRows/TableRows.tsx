import React, { useState } from 'react';
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
  const [currentIndex, setCurrentIndex] = useState<number>();
  const [state, set] = useState<Client>({
    id: 0,
    gender: '',
    first_name: '',
    last_name: '',
    mobile_number: '',
    bills: 0,
    paid: false,
    isPaid: 0,
  });

  const onEdit = (id: number) => {
    setCurrentIndex(id);
  };

  // Simply map the clients array from the server
  const mappingClients = clients.map((client: Client, index: number) => {
    const { id, gender, first_name, last_name, mobile_number, bills } = client;
    return (
      <tr key={index} className={styles.body}>
        <td>{index}</td>

        {/* If any Edit button is clicked, we then compare the `id` and `currentIndex` which was
        set in `onEdit()` FE. Show `input` if true
        */}
        <td>
          {id === currentIndex ? (
            <input type="text" placeholder={gender} />
          ) : (
            client.gender
          )}
        </td>

        <td>{client.first_name}</td>
        <td>{client.last_name}</td>
        <td>{client.mobile_number}</td>
        <td>${client.bills}</td>

        {/* delete, update, and toggle complete */}
        <td className={styles.body__actions}>
          <button onClick={() => onEdit(client.id)}>
            {currentIndex === id ? 'save' : 'edit'}
          </button>
        </td>
      </tr>
    );
  });

  return <>{mappingClients}</>;
};
export default TableRows;
