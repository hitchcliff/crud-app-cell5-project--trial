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
import { PaidClientAction } from '../../Actions/paid.action';
import { UnPaidClientAction } from '../../Actions/unpaid.action';

import { FormatNumber, validationCheck } from '../../helpers/helpers';

interface ITableRowsProp {
  clients?: Client[];
}

const EditableTableObject = {
  first_name: '',
  last_name: '',
  mobile_number: '',
  bills: '',
  gender: '',
};

/**
 * Functional react component for congratulatory message.
 * @function
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is missing)
 */
const TableRows = ({ clients }: ITableRowsProp): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState<string | null>();
  const [data, setData] = useState<Client[]>();
  const dispatch = useDispatch();

  const [state, set] = useState<EditableTable>(EditableTableObject);

  useEffect(() => {
    setData(clients);
  }, [clients]);

  /**
   * A function that tracks the changes from the user.
   * Sets the `[name]: value` from the state
   * @param e - Accepts event as an `args`
   */
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    let value = target.value;
    const name = target.name;

    set({
      [name]: value,
    });
  };

  /**
   * Runs once user clicked `S`
   * @param {string} _id - Accepts `ID` as an argument
   */
  const onSave = (_id: string) => {
    setCurrentIndex(null); // reset
    // if state is equal to our original `EdiitableTableObject`, then simply returns
    if (state === EditableTableObject) return;

    const found = data?.find((item: Client) => {
      return item._id === _id;
    });

    const newBody = { ...found, ...state };

    // check body if we have the expected types of inputs
    const isValid = validationCheck(newBody);
    if (!isValid) return;
    dispatch(UpdateClientAction(newBody)); // [DISPATCH]
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
            onClick={() => dispatch(DeleteClientAction(client._id))}
          >
            D
          </button>

          {/* Sends HTTP Request to the Server to `complete` the item
          then updates the Redux State. Dispatch actions then sent to Reducers*/}
          <button
            className={styles.paid}
            onClick={() => dispatch(PaidClientAction(client._id))}
            disabled={client.paid ? true : false}
          >
            P
          </button>

          {/* Sends HTTP Request to the Server to `incomplete` the item
          then updates the Redux State. Dispatch actions then sent to Reducers*/}
          <button
            className={styles.unPaid}
            onClick={() => dispatch(UnPaidClientAction(client._id))}
            disabled={client.paid ? false : true}
          >
            U
          </button>
        </td>
      </tr>
    );
  });

  return <>{mappingClients}</>;
};

export default TableRows;
