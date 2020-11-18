import { Dispatch } from 'react';
import axios from 'axios';
import { ClientsActionDispatchTypes } from './action.types';

export const DeleteClientAction = (_id: string) => async (
  dispatch: Dispatch<ClientsActionDispatchTypes>
) => {
  try {
    await axios.delete(`http://localhost:5000/clients/${_id}`);

    dispatch({
      type: DELETE_CLIENT,
      payload: _id,
    });
  } catch (error) {
    console.log(error);
  }
};

// Constants FETCH_CLIENTS
export const DELETE_CLIENT = 'CREATE_CLIENT';
export interface DeleteClient {
  type: typeof DELETE_CLIENT;
  payload: string;
}
