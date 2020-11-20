import Axios from 'axios';
import { Dispatch } from 'react';
import { ClientsActionDispatchTypes } from './action.types';

/**
 * A function that that sends `get` request to the server
 * Which then will be presented in the Table
 * @function
 * @param _id - Accepts ID as an `args`
 */
export const ClientsAction = () => async (
  dispatch: Dispatch<ClientsActionDispatchTypes>
) => {
  try {
    const { data } = await Axios.get('http://localhost:5000/clients');
    //   if success
    dispatch({
      type: FETCH_CLIENTS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Constants FETCH_CLIENTS
export const FETCH_CLIENTS = 'FETCH_CLIENTS';
export interface FetchClients {
  type: typeof FETCH_CLIENTS;
  payload: Client[];
}

export interface Client {
  _id: string;
  first_name: string;
  last_name: string;
  gender: string;
  mobile_number: string;
  bills: number;
  paid: boolean;
}
