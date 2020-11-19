import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import RootReducer from './Reducers';

export const middleware = [thunk];

const Store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

// root reducer type
export type RootStore = ReturnType<typeof RootReducer>;

export default Store;
