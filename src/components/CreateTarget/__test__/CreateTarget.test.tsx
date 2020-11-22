import { RenderResult, fireEvent, cleanup, getAllByText } from '@testing-library/react';
import * as React from 'react';
import CreateTarget from '../CreateTarget';

import { hasInputValue, setup, storeFactory } from '../../../test/helper';
import { Provider } from 'react-redux';

// constant declaration
const inputElement = 'target-input';
const formElement = 'form';

// input values
// order matters
// do not change
const inputValues = ['first name value', 'last name value', 'male', 'mobile number', 123];

// errors values
// order matters
// do not change if possible
const errors = [
  'first name should not be empty',
  'last name should not be empty',
  'gender should be male or female',
  'mobile number should not be empty',
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

  describe('error tests on submit and validations', () => {
    let input: HTMLElement[];
    let form: HTMLElement;
    let inputArr = [];

    beforeEach(() => {
      const { getAllByTestId, getByTestId } = wrapper;
      input = getAllByTestId(inputElement);
      form = getByTestId(formElement);

      inputArr = new Array(input.length); // array
    });

    /**
     * Validating a form that don't have any values inside the input
     */
    test('empty inputs should have 5 errors', () => {
      fireEvent.submit(form);

      for (let i = 0; i < inputArr.length; i++) {
        // ascertions
        wrapper.getAllByText(errors[i]);
      }
    });

    /**
     * Gender should only accept `male` and `female` on submit
     */
    test('gender input should only receive either male or female', () => {
      const genderError = wrapper.getByTestId('gender-err');
      fireEvent.change(input[2], { target: { value: inputValues[2] } });
      fireEvent.submit(form);

      // ascertions
      expect(genderError).toBeEmptyDOMElement();
    });

    /**
     * Bills should only accept `numbers` on submit
     */
    test('bills input should only recieve numbers', () => {
      const billsError = wrapper.getByTestId('bills-err');
      fireEvent.change(input[4], { target: { value: inputValues[4] } });
      fireEvent.submit(form);

      // ascertions
      expect(billsError).toBeEmptyDOMElement();
    });

    /**
     * First name, last name, and mobile number accepts `string` on submit
     */
    test('first name, last name, and mobile number only receive strings', () => {
      const firstError = wrapper.getByTestId('first-name-err');
      const lastError = wrapper.getByTestId('last-name-err');
      const mobileError = wrapper.getByTestId('mobile-number-err');

      fireEvent.change(input[0], { target: { value: inputValues[0] } });
      fireEvent.change(input[1], { target: { value: inputValues[1] } });
      fireEvent.change(input[3], { target: { value: inputValues[3] } });

      // ascertions
      expect(firstError).toBeEmptyDOMElement();
      expect(lastError).toBeEmptyDOMElement();
      expect(mobileError).toBeEmptyDOMElement();
    });

    /**
     * If required fields are met, input should be set to `empty`
     */
    test('should receive no errors if success on submit', () => {
      const firstError = wrapper.getByTestId('first-name-err');
      const lastError = wrapper.getByTestId('last-name-err');
      const mobileError = wrapper.getByTestId('mobile-number-err');
      const genderError = wrapper.getByTestId('gender-err');
      const billsError = wrapper.getByTestId('bills-err');

      for (let i = 0; i < inputArr.length; i++) {
        fireEvent.change(input[i], { target: { value: inputValues[i] } });
      }

      fireEvent.submit(form);

      // ascertions
      expect(firstError).toBeEmptyDOMElement();
      expect(lastError).toBeEmptyDOMElement();
      expect(mobileError).toBeEmptyDOMElement();
      expect(genderError).toBeEmptyDOMElement();
      expect(billsError).toBeEmptyDOMElement();
    });
  });
});
