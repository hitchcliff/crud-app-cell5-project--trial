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
export const UnPaidClientAction = (_id: string) => async (
  dispatch: Dispatch<ClientsActionDispatchTypes>
) => {
  try {
    await Axios.patch(`http://localhost:5000/clients/unpaid/${_id}`);
    dispatch({
      type: UNPAID_CLIENT,
      payload: _id,
    });
  } catch (error) {
    console.log(error);
  }
};

// Constants FETCH_CLIENTS
export const UNPAID_CLIENT = 'UNPAID_CLIENT';
export interface UnPaidClient {
  type: typeof UNPAID_CLIENT;
  payload: string;
}
