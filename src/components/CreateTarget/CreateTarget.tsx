import React, { useState } from 'react';
import styles from './CreateTarget.module.scss';

import Buttons from '../Buttons/Buttons';
/**
 * Functional react component for congratulatory message.
 * @function
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is missing)
 */
const CreateTarget = () => {
  const [state, set] = useState({});

  const handleClick = (str: any) => {
    console.log('from button', str);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const value = target.value;
    const name = target.name;
    set({
      ...state,
      [name]: value,
    });
  };

  console.log(state);
  return (
    <div className={styles.target}>
      {/* heading */}
      <h4>Add new target</h4>

      {/* form is the wrapper. group is the one who holds our inputs*/}
      {/* group__input is the `BEM` class to each Inputs */}
      <form>
        <div className={styles.group}>
          <input
            className={styles.group__input}
            type="text"
            name="first_name"
            placeholder="First name"
            onChange={(e) => onChange(e)}
          />
          <input
            className={styles.group__input}
            type="text"
            name="last_name"
            placeholder="Last name"
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className={styles.group}>
          <input
            className={styles.group__input}
            type="text"
            name="gender"
            placeholder="Gender"
            onChange={(e) => onChange(e)}
          />
          <input
            className={styles.group__input}
            type="text"
            name="mobile_number"
            placeholder="Contact number"
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className={styles.group}>
          <input
            className={styles.group__input}
            type="text"
            name="bills"
            placeholder="$ `Bills`"
            onChange={(e) => onChange(e)}
          />
          <Buttons isTypeSubmit text="Submit" handleClick={handleClick} />
        </div>
      </form>
    </div>
  );
};
export default CreateTarget;
