import axios from 'axios';
import { Dispatch } from 'react';
import { EditableTable } from '../components/TableRows';
import { ClientsActionDispatchTypes } from './action.types';
import { Client } from './clients.action';

/**
 * A function that accepts `value` as an `args`
 * The `value` represents the actual data from the Form inputs in `CreateTarget.tsx`
 * This creator will send an HTTP `post` request through Rest API
 * @function
 * @param {EditableTable} value - Accepts ID as an `args`
 */
export const CreateClientAction = (value: EditableTable) => async (
  dispatch: Dispatch<ClientsActionDispatchTypes>
) => {
  try {
    const obj: EditableTable = {
      first_name: value.first_name,
      last_name: value.last_name,
      mobile_number: value.mobile_number,
      gender: value.gender,
      bills: value.bills,
      paid: value.paid,
    };
    const { data } = await axios.post('http://localhost:5000/clients', obj);
    dispatch({
      type: CREATE_CLIENT,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Constants FETCH_CLIENTS
export const CREATE_CLIENT = 'CREATE_CLIENT';
export interface CreateClient {
  type: typeof CREATE_CLIENT;
  payload: Client;
}
