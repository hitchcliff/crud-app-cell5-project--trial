import Axios from 'axios';
import { Dispatch } from 'react';
import { ClientsActionDispatchTypes } from './action.types';
import { Client } from './clients.action';

/**
 * A function that accepts `s` as an `args`
 * The ID represents the `s` args will be used to Sort the actual data in the table.
 * This creator will send an HTTP `get` request through Rest API
 * @function
 * @param s - Accepts ID as an `args` and has type of `string`
 */
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
