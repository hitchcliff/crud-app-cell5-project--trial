import React, { useCallback, useEffect, useState } from 'react';
import { Client } from '../../Actions/clients.action';
import styles from './TableRows.module.scss';

interface ITableRows {
  clients: Client[];
}

interface EditableTable {
  id?: number;
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
  const [data, setData] = useState<Client[]>();
  const [state, set] = useState<EditableTable>({}); // new values temporarily stored

  useEffect(() => {
    const req = setTimeout(() => {
      setData(clients);
    });
    return () => {
      clearTimeout(req);
    };
  }, [clients]);

  const onSave = (id: number) => {
    setCurrentIndex(null); // reset
    const findItem = data?.find((item) => {
      return item.id === id;
    });

    const found = { ...findItem, ...state }; // once it is found
    const filter = data?.filter((item) => item.id !== found.id); // start filtering the data
    const newData: any = [found, ...filter]; // spread the data
    setData(newData);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const value = target.value;
    const name = target.name;

    set({ [name]: value });
  };

  const onEdit = (id: number, type: string) => {
    if (type === 'edit') {
      setCurrentIndex(id);
      // if currentIndex === id, that means user is saving
      if (id === currentIndex) {
        onSave(id);
      }
    } else if (type === 'delete') {
      const deleteValue = data?.filter((item) => item.id !== id);
      setData(deleteValue);
    }
  };

  // Simply map the clients array from the server
  const mappingClients = data?.map((client: Client, index: number) => {
    const { id, gender, paid } = client;
    return (
      <tr
        key={index}
        className={styles.body}
        data-color={`${paid ? 'completed' : 'not-completed'}`}
      >
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
              onChange={(e) => onChange(e)} // this is where the logic of adding new values in state
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
          <button
            className={currentIndex === id ? styles.save : styles.edit}
            onClick={() => onEdit(id, 'edit')}
          >
            E
          </button>
          <button
            className={styles.delete}
            onClick={() => onEdit(id, 'delete')}
          >
            D
          </button>
          <button
            className={paid ? styles.paid : styles.unPaid}
            onClick={() => onEdit(id, 'complete')}
          >
            C
          </button>
        </td>
      </tr>
    );
  });

  return <>{mappingClients}</>;
};
export default TableRows;
