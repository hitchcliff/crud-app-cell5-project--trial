import {
  ListingProperty,
  ClientsActionDispatchTypes,
  FETCH_CLIENTS_LOADING,
  FETCH_CLIENTS_SUCCESS,
  FETCH_CLIENTS_FAILED,
} from '../../Actions/clients.action';

export const initialState: IClientsReducerProp = {};

interface IClientsReducerProp {
  state?: ListingProperty;
  loading?: boolean;
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
    case FETCH_CLIENTS_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_CLIENTS_SUCCESS: {
      return {
        ...state,
        state: action.payload,
      };
    }

    case FETCH_CLIENTS_FAILED: {
      return {
        loading: false,
      };
    }
    default:
      return state;
  }
};
