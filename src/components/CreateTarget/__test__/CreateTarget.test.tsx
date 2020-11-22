import { RenderResult, fireEvent, cleanup, getAllByText } from '@testing-library/react';
import * as React from 'react';
import CreateTarget from '../CreateTarget';

import { hasInputValue, setup, storeFactory } from '../../../test/helper';
import { Provider } from 'react-redux';

// constant declaration
const inputElement = 'target-input';
const formElement = 'form';
const buttonElement = 'button-submit';

// input values
const inputValues = [
  'first name value',
  'last name value',
  'gender value',
  'mobile number',
  123,
];

// errors values
const errors = [
  'first name should not be empty',
  'last name should not be empty',
  'mobile number should not be empty',
  'gender should be male or female',
  'bills should be a number',
];

// cleanup
afterEach(cleanup);

describe('CreateTarget componennt', () => {
  let wrapper: RenderResult;
  beforeEach(() => {
    const store = storeFactory({});
    wrapper = setup(
      <Provider store={store}>
        <CreateTarget />
      </Provider>
    );
  });

  it('should render correctly', () => {
    expect(wrapper).toBeTruthy();
  });

  it('should render all 5 input elements', () => {
    const { getAllByTestId } = wrapper;
    const input = getAllByTestId(inputElement);

    // ascertions
    expect(input.length).toBe(5);
  });

  describe('error tests on submit', () => {
    let input: HTMLElement[];
    let button: HTMLElement;
    let form: HTMLElement;
    let inputArr = [];

    beforeEach(() => {
      const { getAllByTestId, getByTestId } = wrapper;
      input = getAllByTestId(inputElement);
      button = getByTestId(buttonElement);
      form = getByTestId(formElement);

      inputArr = new Array(input.length); // array
    });

    /**
     * Submitting a form that don't have any values inside the input
     */
    test('empty inputs should have 5 errors', () => {
      fireEvent.submit(form);

      for (let i = 0; i < inputArr.length; i++) {
        wrapper.getAllByText(errors[i]);
      }
    });
  });
});
