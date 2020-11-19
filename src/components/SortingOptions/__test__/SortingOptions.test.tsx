import React from 'react';

import { mount, shallow, ShallowWrapper } from 'enzyme';

import SortingOptions from '../SortingOptions';
import { findByTestAttr, storeFactory } from '../../../test/helper';
import { connect, Provider } from 'react-redux';

const ConnectedComponent = connect()(SortingOptions);

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
      <SortingOptions />
    </Provider>
  );

  return wrapper;
};

describe('SortingOptions component', () => {
  const box = 'box';
  const button = 'button';
  const active = 'active';
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  test('component render correctly', () => {
    expect(wrapper).toBeTruthy();
  });

  test('box element that holds the switches', () => {
    const boxElement = findByTestAttr(wrapper, box);
    expect(boxElement.length).not.toBe(0);
  });

  test('button element', () => {
    const buttonElement = findByTestAttr(wrapper, button);
    expect(buttonElement.length).not.toBe(0);
  });

  test('button on click set a `string` value in state', () => {
    const buttonElement = findByTestAttr(wrapper, button);
    buttonElement.at(0).simulate('click');
    buttonElement.update();

    // find the state handler once user clicks the button
    const activeState = findByTestAttr(wrapper, active);
    expect(activeState.length).toBe(1);
  });
});
