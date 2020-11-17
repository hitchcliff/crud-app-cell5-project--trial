import { combineReducers } from 'redux';
import { ClientsReducer } from './ClientsReducer/ClientsReducer';

const RootReducer = combineReducers({
  listings: ClientsReducer,
});

export default RootReducer;
