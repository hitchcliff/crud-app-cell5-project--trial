import axios from 'axios';

import { Dispatch } from 'react';
import { ClientsActionDispatchTypes } from './action.types';
import { Client } from './clients.action';

// types
import { EditableTable } from '../components/TableRows';

export const UpdateClientAction = (body: any) => async () => {
  try {
    await axios.patch(`http://localhost:5000/clients/${body._id}`, body);
  } catch (error) {
    console.log(error);
  }
};

// Constants FETCH_CLIENTS
export const UPDATE_CLIENT = 'CREATE_CLIENT';
export interface UpdateClient {
  type: typeof UPDATE_CLIENT;
  payload: any;
}
