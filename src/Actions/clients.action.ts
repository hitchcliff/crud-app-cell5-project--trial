import Axios from 'axios';
import { Dispatch } from 'react';

/**
 * This is a `ClientsAction`, the one who will req. HTTP in the Server
 */
export const ClientsAction = () => async (
  dispatch: Dispatch<ClientsActionDispatchTypes>
) => {
  try {
    const { data }: any = await Axios.get(
      'https://raw.githubusercontent.com/hitchcliff/fake-apis/main/cell5-crud-app.json'
    );
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
  payload: ListingProperty;
}

export interface ListingProperty {
  meta?: string;
  params?: { deadline: string };
  clients: Client[];
}

export interface Client {
  id: number;
  first_name: string;
  last_name: string;
  gender: string;
  mobile_number: string;
  bills: number;
  paid: boolean;
  isPaid: number;
}

export type ClientsActionDispatchTypes = FetchClients;
