import { STATUS_CODES } from 'http';
import { ClientsActionDispatchTypes } from '../../Actions/action.types';
import { FETCH_CLIENTS, Client } from '../../Actions/clients.action';
import { CREATE_CLIENT } from '../../Actions/create.action';
import { DELETE_CLIENT } from '../../Actions/delete.action';
import { UPDATE_CLIENT } from '../../Actions/update.action';

// helpers
import { updateClientState } from './helpers';

// all our listings state lives
export const initialState: InitialStateProp = {
  clients: [],
};

export interface InitialStateProp {
  clients?: Client[];
}

/**
 * Reducer that pushes `payload` into store
 * @param state - Initial state
 * @param action - Dispatch types actions
 */
export const ClientsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_CLIENTS: {
      return {
        ...state,
        clients: action.payload,
      };
    }

    case CREATE_CLIENT: {
      return {
        ...state,
        clients: !state ? action.payload : [...state.clients, action.payload],
      };
    }

    /**
     * A bug in here, `DeleteClientAction` is adding an ID directly to Reducer
     * It doesn't switch in the `case`, putting on top will solve the problem but will create new
     */
    // case DELETE_CLIENT: {
    //   return {
    //     ...state,
    //     clients: action.payload,
    //   };
    // }

    case UPDATE_CLIENT: {
      const client = action.payload; // new body
      const filteredData: any = [...state.clients].filter(
        (item) => item._id !== client._id
      );
      const clients = [...filteredData, client];

      return {
        ...state,
        clients,
      };
    }

    default:
      return state;
  }
};
