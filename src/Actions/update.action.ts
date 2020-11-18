import axios from 'axios';
import { Dispatch } from 'react';
import { ClientsActionDispatchTypes } from './action.types';

export const UpdateClientAction = (body: any) => async (
  dispatch: Dispatch<ClientsActionDispatchTypes>
) => {
  try {
    await axios.patch(`http://localhost:5000/clients/${body._id}`, body);
    dispatch({
      type: UPDATE_CLIENT,
      payload: body,
    });
  } catch (error) {
    console.log(error);
  }
};

// Constants FETCH_CLIENTS
export const UPDATE_CLIENT = 'UPDATE_CLIENT';
export interface UpdateClient {
  type: typeof UPDATE_CLIENT;
  payload: any;
}
