import React from 'react';
import App from './App';

// enzyme
import { shallow, ShallowWrapper } from 'enzyme';

/**
 * Function that return shallow `component`
 * @returns {ShallowWrapper}
 */
const setup = () => {
  const wrapper = shallow(<App />);
  return wrapper;
};

describe('App component tests', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  test('should render without error', () => {
    expect(wrapper.length).toBe(1);
  });
});
