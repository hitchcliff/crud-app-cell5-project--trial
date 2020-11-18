import Axios from 'axios';
import { Dispatch } from 'react';
import { ClientsActionDispatchTypes } from './action.types';
import { Client } from './clients.action';

export const SearchClientAction = (s: string) => async (
  dispatch: Dispatch<ClientsActionDispatchTypes>
) => {
  try {
    // this only search for first name
    const { data } = await Axios.get(
      `http://localhost:5000/clients/?search=${s}`
    );
    dispatch({
      type: SEARCH_CLIENT,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Constants FETCH_CLIENTS
export const SEARCH_CLIENT = 'SEARCH_CLIENT';
export interface SearchClient {
  type: typeof SEARCH_CLIENT;
  payload: Client[];
}
