import Axios from 'axios';
import { Dispatch } from 'react';

/**
 * This is a `ClientsAction`, the one who will req. HTTP in the Server
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

export interface ListingProperty {
  meta?: string;
  params?: { deadline: string };
  clients: Client[];
}

export interface Client {
  id: string;
  first_name: string;
  last_name: string;
  gender: string;
  mobile_number: string;
  bills: number;
  paid: boolean;
}

export type ClientsActionDispatchTypes = FetchClients;
