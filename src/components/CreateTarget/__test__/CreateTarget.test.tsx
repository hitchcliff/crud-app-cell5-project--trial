import { RenderResult, fireEvent } from '@testing-library/react';
import * as React from 'react';
import CreateTarget from '../CreateTarget';

import { setup, storeFactory } from '../../../test/helper';
import { Provider } from 'react-redux';

describe('CreateTarget componennt', () => {
  const inputElement = 'target-input';
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

  it('should render all 5 input elements', () => {
    const { getAllByTestId } = wrapper;
    const input = getAllByTestId(inputElement);
    expect(input.length).toBe(5);
  });
});
