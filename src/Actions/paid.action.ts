import Axios from 'axios';
import { Dispatch } from 'react';
import { ClientsActionDispatchTypes } from './action.types';

export const PaidClientAction = (_id: string, str: string) => async (
  dispatch: Dispatch<ClientsActionDispatchTypes>
) => {
  try {
    await Axios.patch(`http://localhost:5000/clients/${str}/${_id}`);
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
