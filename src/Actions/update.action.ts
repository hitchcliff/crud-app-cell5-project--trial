import axios from 'axios';

import { Dispatch } from 'react';
import { ClientsActionDispatchTypes } from './action.types';
import { Client } from './clients.action';

// types
import { EditableTable } from '../components/TableRows';

export const UpdateClientAction = (body: EditableTable) => async (
  dispatch: Dispatch<ClientsActionDispatchTypes>
) => {
  try {
    console.log(body);
    await axios.patch(`http://localhost:5000/clients/${body.id}`, body);

    dispatch({
      type: UPDATE_CLIENT,
      payload: body,
    });
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
