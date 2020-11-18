import { ClientsActionDispatchTypes } from '../../Actions/action.types';
import { FETCH_CLIENTS, Client } from '../../Actions/clients.action';
import { CREATE_CLIENT } from '../../Actions/create.action';
import { DELETE_CLIENT } from '../../Actions/delete.action';
import { UPDATE_CLIENT } from '../../Actions/update.action';

// helpers
import { updateClientState } from './helpers';

// all our listings state lives
export const initialState: InitialStateProp = {};

export interface InitialStateProp {
  clients?: Client[];
  completed?: number;
  persons?: number;
  billings?: number;
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
      const client = action.payload;
      const clients: Client[] = [...state.clients, client];
      return {
        ...state,
        ...updateClientState(clients),
      };
    }
    case DELETE_CLIENT: {
      const _id = action.payload;
      return {
        ...state,
        clients: state.clients?.filter((item) => item._id !== _id),
      };
    }
    // case UPDATE_CLIENT: {
    //   const client = action.payload;
    //   return {
    //     ...state,
    //     ...updateClientState()
    //   }
    // }
    default:
      return state;
  }
};
