import { ReactWrapper, ShallowWrapper } from 'enzyme';
import { applyMiddleware, createStore } from 'redux';
import RootReducer from '../Reducers';
import { middleware } from '../Store';

/**
 * A function that searches throughout shallow component
 * @function
 * @param {ShallowWrapper} wrapper - Shalow component
 * @param {string} value - Accepts `value` we need to find within
 * @returns {ShallowWrapper} - Returns the `element`
 */
export const findByTestAttr = (
  wrapper: ShallowWrapper | ReactWrapper,
  value: string
) => {
  const component = wrapper.find(`[data-test="${value}"]`);
  return component;
};

/**
 * Creating a store with imported reducers, middleware, globals: RootReducer
 * @function
 * @param {object} initialState - state
 * @returns {RootStore} - Returns the store
 */
export const storeFactory = (initialState: any) => {
  const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
  return createStoreWithMiddleware(RootReducer, initialState);
};
