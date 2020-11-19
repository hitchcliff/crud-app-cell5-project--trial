import React, { ReactElement } from 'react';

import Enzyme, { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new EnzymeAdapter() });

import Search from '../Search';
import { Provider } from 'react-redux';
import { findByTestAttr, storeFactory } from '../../../test/helper';

/**
 * Factory function to create a shallow wrapper for App components
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @param {object} state  - Initial State
 * @returns {ShallowWrapper}
 */
const setup: any = (props: {}, state: any) => {
  const store = storeFactory(state);
  const wrapper = mount(
    <Provider store={store}>
      <Search {...props} />
    </Provider>
  );
  return wrapper;
};

describe('Search component', () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = setup();
  });

  const input = 'input';

  test('component render correctly', () => {
    expect(wrapper).toBeTruthy();
  });

  test('input component should exist', () => {
    const inputElement = findByTestAttr(wrapper, input);
    expect(inputElement.length).toBe(1);
  });

  test('on input `change`, state should change accordingly', () => {
    const testObj = { target: { value: 'test' } };
    const inputElement = findByTestAttr(wrapper, input);
    inputElement.simulate('change', testObj);
    wrapper.update();

    // confirm the change in the input through checking the value
    const value = inputElement.props().value;
    expect(value).toBe(''); // failed test
  });
});
