import { ClientsActionDispatchTypes } from '../../Actions/action.types';
import { FETCH_CLIENTS, Client } from '../../Actions/clients.action';
import { CREATE_CLIENT } from '../../Actions/create.action';

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
        clients,
        persons: clients.length,
        completed: clients.filter((item) => item.paid === true).length, // filter the item that has an array then calculate the length
        billings: clients.map((item) => item.bills).reduce((a, b) => a + b), // get all the bills and put it in to an array, then reduce it into 1 value
      };
    }
    case CREATE_CLIENT: {
      const client: Client = action.payload;
      return {
        ...state,
        clients: [...state.clients, client], // adding a new item to the state
      };
    }
    default:
      return state;
  }
};
