import Axios from 'axios';
import { Dispatch } from 'react';
import { ClientsActionDispatchTypes } from './action.types';

export const UnPaidClientAction = (_id: string, str: string) => async (
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
