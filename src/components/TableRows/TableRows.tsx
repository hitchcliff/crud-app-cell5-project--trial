import React, { useCallback, useEffect, useState } from 'react';
import styles from './TableRows.module.scss';

// types
import { EditableTable } from '.';
import { Client } from '../../Actions/clients.action';

// redux
import { connect, useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../Store';

// actions
import { ClientsAction } from '../../Actions/clients.action';
import { DeleteClientAction } from '../../Actions/delete.action';
import { UpdateClientAction } from '../../Actions/update.action';
import Axios from 'axios';

interface ITableRowsProp {
  clients: Client[];
}

/**
 * Functional react component for congratulatory message.
 * @function
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is missing)
 */
const TableRows = ({ clients }: ITableRowsProp): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState<string | null>();
  const [data, setData] = useState<Client[]>();
  const dispatch = useDispatch();

  const [test, setTest] = useState<Client[]>();
  const [state, set] = useState<EditableTable>({
    first_name: '',
    last_name: '',
    mobile_number: '',
    bills: '',
    gender: '',
  }); // new values temporarily stored

  // testing
  useEffect(() => {
    setData(clients);
  }, [clients]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const value = target.value;
    const name = target.name;

    set({ [name]: value });
  };

  const onSave = (_id: string) => {
    setCurrentIndex(null); // reset

    /**
     * There is a bug when updating the `state` in `redux`.
     * It is adding another input below the table once its Edited
     * TEMPORARY SOLUTION
     */
    const found = data?.find((item: Client) => {
      return item._id === _id;
    });

    const newBody = { ...found, ...state };
    const filteredData: any = data?.filter((item) => item._id !== _id);
    const finalData = [...filteredData, newBody];
    setData(finalData);
    dispatch(UpdateClientAction(finalData)); // patch
  };

  const onDelete = async (id: string) => {
    /**
     * There is a bug when deleting the `state` in `redux`.
     * We have to loop through our data to delete the state
     * TEMPORARY SOLUTION
     */
    const newData = [...data].filter((item: Client) => item._id !== id);
    setData(newData);
    dispatch(DeleteClientAction(id)); // [DISPATCH]
  };

  const onEdit = (id: string) => {
    setCurrentIndex(id);
    // if currentIndex === id, that means user is saving
    if (id === currentIndex) {
      onSave(id);
    }
  };

  // Simply map the clients array from the server
  if (!data) return <></>;
  const mappingClients = [...data].map((client: Client, index: number) => {
    if (client === null) return;
    return (
      <tr
        key={index}
        className={styles.body}
        data-color={`${client.paid ? 'completed' : 'not-completed'}`}
      >
        <td>{index + 1}</td>

        {/* If any Edit button is clicked, we then compare the `id` and `currentIndex` which was
                set in `onEdit()` FE. Show `input` if true */}
        <td>
          {client._id === currentIndex ? (
            <input
              type="text"
              name="gender"
              className={styles.body__input}
              placeholder={client.gender}
              value={state.gender}
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
            className={currentIndex === client._id ? styles.save : styles.edit}
            onClick={() => onEdit(client._id)}
          >
            E
          </button>
          <button
            className={styles.delete}
            onClick={() => onDelete(client._id)}
          >
            D
          </button>
          <button
            className={client.paid ? styles.paid : styles.unPaid}
            // onClick={() => handleClick(_id, 'complete')}
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
