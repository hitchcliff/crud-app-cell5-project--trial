import React from 'react';
import styles from './CreateTarget.module.scss';

import Buttons from '../Buttons/Buttons';
/**
 * Functional react component for congratulatory message.
 * @function
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is missing)
 */
const CreateTarget = () => {
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
            placeholder="First name"
          />
          <input
            className={styles.group__input}
            type="text"
            placeholder="Last name"
          />
        </div>
        <div className={styles.group}>
          <input
            className={styles.group__input}
            type="text"
            placeholder="Gender"
          />
          <input
            className={styles.group__input}
            type="text"
            placeholder="Contact number"
          />
        </div>
        <div className={styles.group}>
          <input
            className={styles.group__input}
            type="text"
            placeholder="$ `Bills`"
          />
          <Buttons isTypeSubmit={true} text="Submit" />
        </div>
      </form>
    </div>
  );
};
export default CreateTarget;
