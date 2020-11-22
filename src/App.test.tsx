import React from 'react';
import App from './App';

import { Provider } from 'react-redux';
import { setup, storeFactory } from './test/helper';

describe('App component', () => {
  test('should render correctly', () => {
    const store = storeFactory({});
    const wrapper = setup(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(wrapper).toBeTruthy();
  });
});
