import React, { ReactElement } from 'react';

import { shallow, ShallowWrapper } from 'enzyme';

import SortingOptions from '../SortingOptions';

/**
 * Factory function to create a shallow wrapper for App components
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @param {object} state  - Initial State
 * @returns {ShallowWrapper}
 */
const setup: any = (props: {}, state: any) => {
  const wrapper: ShallowWrapper<ReactElement> = shallow(
    <SortingOptions {...props} />
  );
  return wrapper;
};

describe('SortingOptions component', () => {
  test('component render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toBeTruthy();
  });
});
