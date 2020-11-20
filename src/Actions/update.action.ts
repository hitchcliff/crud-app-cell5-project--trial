import axios from 'axios';
import { Dispatch } from 'react';
import { ClientsActionDispatchTypes } from './action.types';

/**
 * A function that accepts `body` as an `args`
 * The body represents the objects of the actual data in the table.
 * This creator will send an HTTP `patch` request through Rest API
 * @function
 * @param body
 */
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
