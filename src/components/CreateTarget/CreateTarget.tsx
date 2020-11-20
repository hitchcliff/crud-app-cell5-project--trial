import React, { useState } from 'react';
import styles from './CreateTarget.module.scss';
import cx from 'classnames';

import Buttons from '../Buttons/Buttons';

import { connect } from 'react-redux';
import { EditableTable } from '../TableRows';

import { CreateClientAction } from '../../Actions/create.action';
import { isEmpty, isGender, isNumber, isString } from '../../helpers/helpers';

const defaultState = {
  first_name: '',
  last_name: '',
  mobile_number: '',
  bills: '',
  gender: '',
  first_name_error: '',
  last_name_error: '',
  gender_error: '',
  bills_error: '',
  mobile_error: '',
  paid: false, // by default, newly added clients are `not` paid
};

/**
 * Functional react component for congratulatory message.
 * @function
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is missing)
 */
const CreateTarget = (props: any) => {
  const [state, set] = useState<EditableTable | any>(defaultState);

  /**
   * A function that validates the form inputs.
   * It sets the `error` in state based on the passed `obj`
   * @function
   * @param obj - Takes a type `EditableTable | null` as `args`
   * @returns {boolean} - Returns either tru or false
   */
  const validate = () => {
    let first_name_error = '';
    let last_name_error = '';
    let gender_error = '';
    let bills_error = '';
    let mobile_error = '';
    const empty = 'should not be empty';

    if (isEmpty(state?.first_name)) {
      first_name_error = empty;
    }

    if (isEmpty(state?.last_name)) {
      last_name_error = empty;
    }

    if (isEmpty(state?.mobile_number)) {
      mobile_error = empty;
    }
    if (isEmpty(state?.gender) || !isGender(state?.gender)) {
      gender_error = 'should be mail or female';
    }

    if (isEmpty(state?.bills) || !isNumber(state?.bills)) {
      bills_error = 'should be a number';
    }

    if (
      first_name_error ||
      last_name_error ||
      gender_error ||
      bills_error ||
      mobile_error
    ) {
      set({
        ...state,
        first_name_error,
        last_name_error,
        gender_error,
        bills_error,
        mobile_error,
      });
      return false;
    }
    return true;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      props.CreateClientAction(state);
      set(defaultState); // simple reset once form submit
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const name = target?.name;
    let value;

    if (name === 'bills') {
      value = parseInt(target?.value);
    } else {
      value = target?.value;
    }

    // add a default paid to `false` that's why we are spreading here
    set({
      ...state,
      [name]: value,
    });
  };

  return (
    <div className={styles.target}>
      {/* heading */}
      <h4>Add new target</h4>

      {/* form is the wrapper. group is the one who holds our inputs*/}
      {/* group__input is the `BEM` class to each Inputs */}
      <form onSubmit={(e) => onSubmit(e)}>
        <div className={styles.group}>
          <div className={styles.groups}>
            {/* error */}
            {state.first_name_error ? (
              <div
                className={
                  state.first_name_error
                    ? styles.group__labelActive
                    : styles.group__labelHidden
                }
              >
                {state.first_name_error}
              </div>
            ) : null}
            {/* actual input */}
            <input
              data-test="input"
              className={styles.group__input}
              type="text"
              name="first_name"
              placeholder="First name"
              value={state?.first_name}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={styles.groups}>
            {/* error */}
            {state.last_name_error ? (
              <div className={styles.group__label}>{state.last_name_error}</div>
            ) : null}
            {/* actual input */}
            <input
              data-test="input"
              className={styles.group__input}
              type="text"
              name="last_name"
              placeholder="Last name"
              value={state?.last_name}
              onChange={(e) => onChange(e)}
            />
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.groups}>
            {/* error */}
            {state.gender_error ? (
              <div className={styles.group__label}>{state.gender_error}</div>
            ) : null}
            {/* actual input */}
            <input
              data-test="input"
              className={styles.group__input}
              type="text"
              name="gender"
              placeholder="Gender"
              value={state?.gender}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={styles.groups}>
            {/* error */}
            {state.mobile_error ? (
              <div className={styles.group__label}>{state.mobile_error}</div>
            ) : null}
            {/* actual input */}
            <input
              data-test="input"
              className={styles.group__input}
              type="text"
              name="mobile_number"
              placeholder="Mobile"
              value={state?.mobile_number}
              onChange={(e) => onChange(e)}
            />
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.groups}>
            {/* error */}
            {state.bills_error ? (
              <div className={styles.group__label}>{state.bills_error}</div>
            ) : null}
            {/* actual input */}
            <input
              data-test="input"
              className={styles.group__input}
              type="number"
              name="bills"
              placeholder="Bills"
              value={state?.bills}
              onChange={(e) => onChange(e)}
            />
          </div>
          <Buttons isTypeSubmit text="Submit" />
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    state,
  };
};
export default connect(mapStateToProps, { CreateClientAction })(CreateTarget);
