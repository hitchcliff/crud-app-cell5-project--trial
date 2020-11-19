import React, { useState } from 'react';
import styles from './CreateTarget.module.scss';

import Buttons from '../Buttons/Buttons';

import { connect } from 'react-redux';
import { EditableTable } from '../TableRows';

import { ClientsAction } from '../../Actions/clients.action';
import { CreateClientAction } from '../../Actions/create.action';
/**
 * Functional react component for congratulatory message.
 * @function
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is missing)
 */
const CreateTarget = (props: any) => {
  const [state, set] = useState<EditableTable | null>({
    first_name: '',
    last_name: '',
    mobile_number: '',
    bills: '',
    gender: '',
    paid: false, // by default, newly added clients are `not` paid
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.CreateClientAction(state);
    set({
      first_name: '',
      last_name: '',
      mobile_number: '',
      bills: '',
      gender: '',
      paid: false,
    });

    props.ClientsAction();
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
export default connect(mapStateToProps, { CreateClientAction, ClientsAction })(
  CreateTarget
);
