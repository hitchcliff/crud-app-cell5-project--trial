import {
  ListingProperty,
  ClientsActionDispatchTypes,
  FETCH_CLIENTS,
  Client,
} from '../../Actions/clients.action';

// seems to be having problems with TS and Connect
// This is just a workaround without using useSelectors hooks
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
      console.log(clients);
      return {
        ...state,
        clients,
        persons: clients.length,
      };
    }
    default:
      return state;
  }
};
