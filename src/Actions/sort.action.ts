import Axios from 'axios';
import { Dispatch } from 'react';
import { ClientsActionDispatchTypes } from './action.types';
import { Client } from './clients.action';

export const SortClientAction = (s: string) => async (
  dispatch: Dispatch<ClientsActionDispatchTypes>
) => {
  try {
    let res;
    // this only sort `asc` & `dsc` order
    if (s === '') {
      res = await Axios.get(`http://localhost:5000/clients/`);
    } else {
      res = await Axios.get(`http://localhost:5000/clients/?search=${s}`);
    }

    dispatch({
      type: SORT_CLIENT,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Constants FETCH_CLIENTS
export const SORT_CLIENT = 'SORT_CLIENT';
export interface SortClient {
  type: typeof SORT_CLIENT;
  payload: Client[];
}
