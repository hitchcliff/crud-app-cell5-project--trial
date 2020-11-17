import React, { useCallback, useEffect, useState } from 'react';
import { Client } from '../../Actions/clients.action';
import styles from './TableRows.module.scss';
interface ITableRows {
  clients: Client[];
}

interface EditableTable {
  gender?: string;
  first_name?: string;
  last_name?: string;
  mobile_number?: string;
  bills?: number;
  paid?: boolean;
  isPaid?: number;
}

/**
 * Functional react component for congratulatory message.
 * @function
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is missing)
 */
const TableRows = ({ clients }: ITableRows): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState<number | null>();
  const [state, set] = useState<EditableTable>({}); // new values temporarily stored

  const onSave = (id: number) => {
    setCurrentIndex(null); // reset
    const test = clients.find((item) => {
      return item.id === id;
    });

    const newTest = { ...test, ...state };
    console.log(newTest);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const value = target.value;
    const name = target.name;

    set({ [name]: value });
  };

  const onEdit = (id: number) => {
    setCurrentIndex(id);
    // if currentIndex === id, that means user is saving
    if (id === currentIndex) {
      onSave(id);
    }
  };

  // Simply map the clients array from the server
  const mappingClients = clients.map((client: Client, index: number) => {
    const { id, gender, first_name, last_name, mobile_number, bills } = client;
    return (
      <tr key={index} className={styles.body}>
        <td>{index + 1}</td>

        {/* If any Edit button is clicked, we then compare the `id` and `currentIndex` which was
                set in `onEdit()` FE. Show `input` if true */}
        <td>
          {id === currentIndex ? (
            <input
              type="text"
              name="gender"
              className={styles.body__input}
              placeholder={gender} // telling typescript to accept undefined values
              onChange={(e) => onChange(e)} // this is where the logic are of adding new values in state
            />
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
          <button onClick={() => onEdit(id)}>
            {currentIndex === id ? 'save' : 'edit'}
          </button>
        </td>
      </tr>
    );
  });

  return <>{mappingClients}</>;
};
export default TableRows;
