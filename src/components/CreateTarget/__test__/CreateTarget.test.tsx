import React from 'react';
import CreateTarget from '../CreateTarget';

import { RenderResult } from '@testing-library/react';

import { setup, storeFactory } from '../../../test/helper';
import { Provider } from 'react-redux';

describe('CreateTarget componentn', () => {
  let wrapper: RenderResult;
  beforeEach(() => {
    const store = storeFactory({});
    wrapper = setup(
      <Provider store={store}>
        <CreateTarget />
      </Provider>
    );
  });

  test('should render correctly', () => {
    expect(wrapper).toBeTruthy();
  });

  test('test text if exist', () => {
    const { getByText } = wrapper;
    getByText('Add new target');
  });
});
