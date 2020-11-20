import Axios from 'axios';
import { Dispatch } from 'react';
import { ClientsActionDispatchTypes } from './action.types';

/**
 * A function that accepts `_id` as an `args`
 * The ID represents the `_id` of the client of the actual data in the table.
 * This creator will send an HTTP `patch` request through Rest API
 * @function
 * @param _id - Accepts ID as an `args`
 */
export const PaidClientAction = (_id: string) => async (
  dispatch: Dispatch<ClientsActionDispatchTypes>
) => {
  try {
    await Axios.patch(`http://localhost:5000/clients/paid/${_id}`);
    dispatch({
      type: PAID_CLIENT,
      payload: _id,
    });
  } catch (error) {
    console.log(error);
  }
};

// Constants FETCH_CLIENTS
export const PAID_CLIENT = 'PAID_CLIENT';
export interface PaidClient {
  type: typeof PAID_CLIENT;
  payload: string;
}
