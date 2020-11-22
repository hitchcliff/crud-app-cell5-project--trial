// redux
import { applyMiddleware, createStore } from 'redux';
import { middleware } from '../Store';
import RootReducer from '../Reducers';

// testing
import { render, RenderResult } from '@testing-library/react';

/**
 * A function that renders the component to be used in testing
 * @function
 * @param component - Accepts a `JSX.Element` and `any` type
 * @return - Returns the rendered component from `testing-library/react`
 */
export const setup = (component: any): RenderResult => {
  return render(component);
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

/**
 * A function that checks the input value whether `true` or `false` has
 * that value
 * @function
 * @param e - Accepts an HTMLElement
 * @param inputValue - The string you needed to match
 * @param wrapper - The actual `wrapper` or return value from `render`
 */
export const hasInputValue = (
  e: HTMLElement,
  inputValue: string,
  wrapper: RenderResult
) => {
  return wrapper.getByDisplayValue(inputValue) === e;
};
