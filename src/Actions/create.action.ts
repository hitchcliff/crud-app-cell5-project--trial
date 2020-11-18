import axios from 'axios';
import { Dispatch } from 'react';
import { EditableTable } from '../components/TableRows';
import { Client } from './clients.action';

export const CreateAction = (value: EditableTable) => async (
  dispatch: Dispatch<any>
) => {
  try {
    const { data } = await axios.post('http://localhost:5000/clients', value);
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
