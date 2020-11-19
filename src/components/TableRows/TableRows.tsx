import React, { useEffect, useState } from 'react';
import styles from './TableRows.module.scss';

// types
import { EditableTable } from '.';
import { Client } from '../../Actions/clients.action';

// redux
import { useDispatch } from 'react-redux';

// actions
import { DeleteClientAction } from '../../Actions/delete.action';
import { UpdateClientAction } from '../../Actions/update.action';
import { FormatNumber } from '../../helpers/helpers';
import { PaidClientAction } from '../../Actions/paid.action';

interface ITableRowsProp {
  clients?: Client[];
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

  const [state, set] = useState<EditableTable>({
    first_name: '',
    last_name: '',
    mobile_number: '',
    bills: '',
    gender: '',
  }); // new values temporarily stored

  useEffect(() => {
    setData(clients);
  }, [clients]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const value = target.value;
    const name = target.name;

    set({ [name]: value });
  };

  /**
   * Runs once user clicked `C`
   * @param {string} id - Accepts `ID` as an argument
   */
  const onPaid = (id: string) => {
    dispatch(PaidClientAction(id, 'paid'));
  };

  /**
   * Runs once user clicked `S`
   * @param {string} _id - Accepts `ID` as an argument
   */
  const onSave = (_id: string) => {
    setCurrentIndex(null); // reset

    const found = data?.find((item: Client) => {
      return item._id === _id;
    });
    const newBody = { ...found, ...state };
    dispatch(UpdateClientAction(newBody)); // [DISPATCH]
  };

  /**
   * Runs once user clicked `D`
   * @param {string} id - Accepts `ID` as an argument
   */
  const onDelete = async (id: string) => {
    dispatch(DeleteClientAction(id)); // [DISPATCH]
  };

  /**
   * Runs once user clicked `E`
   * @param id - Accepts an `ID` as an argument
   */
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

        <td>
          {client._id === currentIndex ? (
            <input
              type="text"
              name="first_name"
              className={styles.body__input}
              placeholder={client.first_name}
              value={state.first_name}
              onChange={(e) => onChange(e)} // this is where the logic of adding new values in state
            />
          ) : (
            client.first_name
          )}
        </td>

        <td>
          {client._id === currentIndex ? (
            <input
              type="text"
              name="last_name"
              className={styles.body__input}
              placeholder={client.last_name}
              value={state.last_name}
              onChange={(e) => onChange(e)} // this is where the logic of adding new values in state
            />
          ) : (
            client.last_name
          )}
        </td>

        <td>
          {client._id === currentIndex ? (
            <input
              type="text"
              name="mobile_number"
              className={styles.body__input}
              placeholder={client.mobile_number}
              value={state.mobile_number}
              onChange={(e) => onChange(e)} // this is where the logic of adding new values in state
            />
          ) : (
            client.mobile_number
          )}
        </td>

        <td>
          {client._id === currentIndex ? (
            <input
              type="text"
              name="bills"
              className={styles.body__input}
              placeholder={client.bills ? client.bills.toString() : undefined}
              value={state.bills}
              onChange={(e) => onChange(e)} // this is where the logic of adding new values in state
            />
          ) : (
            FormatNumber(client.bills)
          )}
        </td>

        <td className={styles.body__actions}>
          {/* Sends HTTP Request to the Server to `update` the item
          then updates the Redux State. Dispatch actions then sent to Reducers*/}
          <button
            className={currentIndex === client._id ? styles.save : styles.edit}
            onClick={() => onEdit(client._id)}
          >
            E
          </button>

          {/* Sends HTTP Request to the Server to `delete` the item
          then updates the Redux State. Dispatch actions then sent to Reducers*/}
          <button
            className={styles.delete}
            onClick={() => onDelete(client._id)}
          >
            D
          </button>

          {/* Sends HTTP Request to the Server to `complete` the item
          then updates the Redux State. Dispatch actions then sent to Reducers*/}
          <button
            className={client.paid ? styles.paid : styles.unPaid}
            onClick={() => onPaid(client._id)}
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
