import React, { ReactElement } from 'react';

import { shallow, ShallowWrapper } from 'enzyme';

import CreateTarget from '../CreateTarget';
import { findByTestAttr, storeFactory } from '../../../test/helper';
import { doesNotReject } from 'assert';

/**
 * Factory function to create a shallow wrapper for App components
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @param {object} state  - Initial State
 * @returns {ShallowWrapper}
 */
const setup: any = (props: {}, state: any) => {
  const store = storeFactory(state);
  const wrapper: ShallowWrapper<ReactElement> = shallow(
    <CreateTarget {...props} store={store} />
  )
    .dive()
    .dive();
  return wrapper;
};

describe('CreateTarget component', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    wrapper = setup();
  });
  test('component render correctly', () => {
    expect(wrapper).toBeTruthy();
  });

  const input = 'input';

  test('inputs should render success', () => {
    const inputElement = findByTestAttr(wrapper, input);
    console.log(inputElement);
    expect(inputElement.length).not.toBe(0);
  });

  test('input must be updated once `state` changed on `change` event', () => {
    const obj = { target: { value: 'kevin', name: 'first_name' } };
    const inputElement = findByTestAttr(wrapper, 'input');
    inputElement.at(0).simulate('focus');
    inputElement.at(0).simulate('change', { target: { value: 'Changed' } });
    inputElement.at(0).simulate('keyDown', {
      which: 27,
      target: {
        blur() {
          // Needed since <EditableText /> calls target.blur()
          inputElement.simulate('blur');
        },
      },
    });
    const value = inputElement.at(0).prop('value');
    expect(value).toEqual('Changed');

    // inputElement.at(0).simulate('focus');
    // inputElement.at(0).simulate('change', obj);
    // wrapper.update();

    // // onchange, check the value
    // const value = inputElement.at(0).prop('value');
    // expect(value).toBe(obj.target);
  });
});
