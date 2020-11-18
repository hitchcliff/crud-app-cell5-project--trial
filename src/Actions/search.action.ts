import Axios from 'axios';
import { Dispatch } from 'react';
import { ClientsActionDispatchTypes } from './action.types';
import { Client } from './clients.action';

export const SearchClientAction = (s: string) => async (
  dispatch: Dispatch<ClientsActionDispatchTypes>
) => {
  try {
    let res;
    // this only search for first name
    if (s === '') {
      res = await Axios.get(`http://localhost:5000/clients/`);
    } else {
      res = await Axios.get(`http://localhost:5000/clients/?search=${s}`);
    }

    dispatch({
      type: SEARCH_CLIENT,
      payload: res.data,
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
