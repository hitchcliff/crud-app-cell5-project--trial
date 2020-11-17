import Axios from 'axios';
import { Dispatch } from 'react';

/**
 * This is a `ClientsAction`, the one who will req. HTTP in the Server
 */
export const ClientsAction = () => async (
  dispatch: Dispatch<ClientsActionDispatchTypes>
) => {
  try {
    //   if loading
    dispatch({
      type: FETCH_CLIENTS_LOADING,
    });

    const { data }: any = Axios.get(
      'https://raw.githubusercontent.com/hitchcliff/fake-apis/main/cell5-crud-app.json'
    );

    //   if success
    dispatch({
      type: FETCH_CLIENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    //   if failed
    dispatch({
      type: FETCH_CLIENTS_FAILED,
    });
  }
};

// Contants
export const FETCH_CLIENTS_SUCCESS = 'FETCH_CLIENTS_SUCCESS';
export const FETCH_CLIENTS_FAILED = 'FETCH_CLIENTS_FAILED';
export const FETCH_CLIENTS_LOADING = 'FETCH_CLIENTS_LOADING';

// Below are `Types`
// success
interface FetchClientsSuccess {
  type: typeof FETCH_CLIENTS_SUCCESS;
  payload: ListingProperty;
}

// failed
interface FetchClientsFailed {
  type: typeof FETCH_CLIENTS_FAILED;
}

// loading
interface FetchClientsLoading {
  type: typeof FETCH_CLIENTS_LOADING;
}

export interface ListingProperty {
  meta?: string;
  params?: { date: string }; // temporary string for testing purposes
  properties?: {
    clients: Client[];
  };
}

export interface Client {
  id: number;
  first_name: string;
  last_name: string;
  mobile_number: string;
  bills: number;
  paid: boolean;
  isPaid: 1;
}

export type ClientsActionDispatchTypes =
  | FetchClientsLoading
  | FetchClientsSuccess
  | FetchClientsFailed;
