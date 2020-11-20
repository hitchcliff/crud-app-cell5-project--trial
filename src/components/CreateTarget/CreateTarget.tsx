import React, { useState } from 'react';
import styles from './CreateTarget.module.scss';

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
  paid: false, // by default, newly added clients are `not` paid
};

/**
 * Functional react component for congratulatory message.
 * @function
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is missing)
 */
const CreateTarget = (props: any) => {
  const [state, set] = useState<EditableTable | null>(defaultState);
  const [error, setError] = useState<EditableTable | null>(defaultState);

  /**
   * A function that validates the form inputs.
   * It sets the `error` in state based on the passed `obj`
   * @function
   * @param obj - Takes a type `EditableTable | null` as `args`
   * @returns {boolean} - Returns either tru or false
   */
  const validate = (obj: EditableTable | null) => {
    const errors: EditableTable = {
      first_name: '',
      last_name: '',
      mobile_number: '',
      bills: '',
      gender: '',
    };

    if (isEmpty(obj?.first_name)) {
      errors.first_name = 'should not be empty';
    }

    if (isEmpty(obj?.last_name)) {
      errors.last_name = 'should not be empty';
    }

    if (isEmpty(obj?.mobile_number)) {
      errors.mobile_number = 'should not be empty';
    }

    if (isEmpty(obj?.bills) || !isNumber(obj?.bills)) {
      errors.bills = 'bills must be a number';
    }

    if (isEmpty(obj?.gender) || isGender(obj?.gender)) {
      errors.gender = 'gender must be either male or female';
    }

    setError(errors);
    if (
      errors.bills !== '' ||
      errors.first_name !== '' ||
      errors.last_name !== '' ||
      errors.gender !== '' ||
      errors.mobile_number !== ''
    )
      return false;
    return true;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validate(state);
    console.log(error, isValid);
    if (isValid) return;

    props.CreateClientAction(state);
    set(defaultState); // simple reset once form submit
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
          <input
            data-test="input"
            className={styles.group__input}
            type="text"
            name="first_name"
            placeholder="First name"
            value={state?.first_name}
            onChange={(e) => onChange(e)}
          />
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
        <div className={styles.group}>
          <input
            data-test="input"
            className={styles.group__input}
            type="text"
            name="gender"
            placeholder="Gender"
            value={state?.gender}
            onChange={(e) => onChange(e)}
          />
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
        <div className={styles.group}>
          <input
            data-test="input"
            className={styles.group__input}
            type="number"
            name="bills"
            placeholder="Bills"
            value={state?.bills}
            onChange={(e) => onChange(e)}
          />
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
