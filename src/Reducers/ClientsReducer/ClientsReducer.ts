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
import { updateClientState, updatePaymentClientState } from './helpers';

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
      let clients;
      if (!state.clients) {
        clients = [action.payload];
      } else {
        clients = [...state.clients, action.payload];
      }
      return {
        ...state,
        ...updateClientState(clients),
      };
    }

    case DELETE_CLIENT: {
      const id = action.payload;
      if (!state.clients) return;
      const clients = [...state.clients].filter((item: Client) => item._id !== id);
      return {
        ...state,
        ...updateClientState(clients),
      };
    }

    case UPDATE_CLIENT: {
      const client = action.payload; // new body
      let filteredData: any;
      if (!state.clients) {
        filteredData = [];
      } else {
        filteredData = [...state.clients].filter((item) => item._id !== client._id);
      }

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
      if (!state.clients) return;
      return {
        ...state,
        ...updatePaymentClientState(_id, [...state.clients], true),
      };
    }

    case UNPAID_CLIENT: {
      const _id = action.payload;
      if (!state.clients) return;
      return {
        ...state,
        ...updatePaymentClientState(_id, [...state.clients], false),
      };
    }
    default:
      return state;
  }
};
