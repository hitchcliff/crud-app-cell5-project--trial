import { ClientsActionDispatchTypes } from '../../Actions/action.types';
import { FETCH_CLIENTS, Client } from '../../Actions/clients.action';
import { CREATE_CLIENT } from '../../Actions/create.action';
import { DELETE_CLIENT } from '../../Actions/delete.action';
import { PAID_CLIENT } from '../../Actions/paid.action';
import { SEARCH_CLIENT } from '../../Actions/search.action';
import { SORT_CLIENT } from '../../Actions/sort.action';
import { UNPAID_CLIENT } from '../../Actions/unpaid.action';
import { UPDATE_CLIENT } from '../../Actions/update.action';

// helpers
import { updateClientState } from './helpers';

// all our listings state lives
export const initialState: InitialStateProp = {
  clients: [],
  persons: 0,
  completed: 0,
  billings: 0,
};

export interface InitialStateProp {
  clients?: Client[];
  persons: number;
  completed: number;
  billings: number;
}

/**
 * Reducer that pushes `payload` into store
 * @param state - Initial state
 * @param action - Dispatch types actions
 */
export const ClientsReducer = (
  state = initialState,
  action: ClientsActionDispatchTypes
) => {
  switch (action.type) {
    case FETCH_CLIENTS: {
      const clients: Client[] = action.payload;
      return {
        ...state,
        ...updateClientState(clients),
      };
    }

    case CREATE_CLIENT: {
      const clients = [...state.clients, action.payload];
      return {
        ...state,
        ...updateClientState(clients),
      };
    }

    case DELETE_CLIENT: {
      const id = action.payload;
      const clients = [...state.clients].filter(
        (item: Client) => item._id !== id
      );
      return {
        ...state,
        ...updateClientState(clients),
      };
    }

    case UPDATE_CLIENT: {
      const client = action.payload; // new body
      const filteredData: any = [...state.clients].filter(
        (item) => item._id !== client._id
      );
      const clients = [...filteredData, client];

      return {
        ...state,
        ...updateClientState(clients),
      };
    }

    case SEARCH_CLIENT: {
      return {
        ...state,
        ...updateClientState(action.payload),
      };
    }

    case SORT_CLIENT: {
      return {
        ...state,
        ...updateClientState(action.payload),
      };
    }

    case PAID_CLIENT: {
      const _id = action.payload;
      const client = [...state.clients].filter((item) => item._id === _id)[0];
      const modifiedClients = [...state.clients].filter(
        (item) => item._id !== client._id
      );

      const newBody = { ...client, ...{ paid: true } };

      const clients = [...modifiedClients, newBody];
      return {
        ...state,
        ...updateClientState(clients),
      };
    }

    case UNPAID_CLIENT: {
      const _id = action.payload;
      const client = [...state.clients].filter((item) => item._id === _id)[0];
      const modifiedClients = [...state.clients].filter(
        (item) => item._id !== client._id
      );

      const newBody = { ...client, ...{ paid: false } };

      const clients = [...modifiedClients, newBody];
      return {
        ...state,
        ...updateClientState(clients),
      };
    }
    default:
      return state;
  }
};
