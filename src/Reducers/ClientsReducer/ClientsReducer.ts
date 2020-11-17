import {
  ListingProperty,
  ClientsActionDispatchTypes,
  FETCH_CLIENTS,
} from '../../Actions/clients.action';

// seems to be having problems with TS and Connect
// This is just a workaround without using useSelectors hooks
export const initialState: ListingProperty = {
  clients: [],
};

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
      return action.payload;
    }
    default:
      return state;
  }
};
