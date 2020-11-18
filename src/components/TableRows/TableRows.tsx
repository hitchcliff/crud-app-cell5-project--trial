import React, { useCallback, useEffect, useState } from 'react';
import styles from './TableRows.module.scss';

// types
import { EditableTable } from '.';
import { Client } from '../../Actions/clients.action';

// redux
import { connect } from 'react-redux';
import { RootStore } from '../../Store';

// actions
import { DeleteClientAction } from '../../Actions/delete.action';
import { UpdateClientAction } from '../../Actions/update.action';

/**
 * Functional react component for congratulatory message.
 * @function
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is missing)
 */
const TableRows = (props: any): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState<string | null>();
  const [data, setData] = useState<Client[]>();
  const [state, set] = useState<EditableTable>({
    first_name: '',
    last_name: '',
    mobile_number: '',
    bills: '',
    gender: '',
  }); // new values temporarily stored

  const {
    state: { clients },
  } = props;

  // set the data
  useEffect(() => {
    const req = setTimeout(() => {
      setData(clients);
    });
    return () => {
      clearTimeout(req);
    };
  }, [clients]);

  const onSave = (_id: string) => {
    setCurrentIndex(null); // reset
    const findItem = data?.find((item) => {
      return item._id === _id;
    });

    props.UpdateClientAction({ ...findItem, ...state }); // patch
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const value = target.value;
    const name = target.name;

    set({ [name]: value });
  };

  const handleClick = (id: string, type: string) => {
    if (type === 'edit') {
      setCurrentIndex(id);
      // if currentIndex === id, that means user is saving
      if (id === currentIndex) {
        onSave(id);
      }
    } else if (type === 'delete') {
      props.DeleteClientAction(id); // delete
    }
  };

  // Simply map the clients array from the server
  const mappingClients = data?.map((client: Client, index: number) => {
    const { _id, gender, paid } = client;
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
          {_id === currentIndex ? (
            <input
              type="text"
              name="gender"
              className={styles.body__input}
              placeholder={gender}
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
            className={currentIndex === _id ? styles.save : styles.edit}
            onClick={() => handleClick(_id, 'edit')}
          >
            E
          </button>
          <button
            className={styles.delete}
            onClick={() => handleClick(_id, 'delete')}
          >
            D
          </button>
          <button
            className={paid ? styles.paid : styles.unPaid}
            onClick={() => handleClick(_id, 'complete')}
          >
            C
          </button>
        </td>
      </tr>
    );
  });

  return <>{mappingClients}</>;
};

const mapStateToProps = (state: RootStore) => {
  return {
    state: state.listings,
  };
};
export default connect(mapStateToProps, {
  DeleteClientAction,
  UpdateClientAction,
})(TableRows);
