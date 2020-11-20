import React from 'react';
import styles from './InputErrors.module.scss';

import { CreateTargetDefaultState } from '../CreateTarget/CreateTarget';

import { myConfig } from '../Buttons/Buttons';
import { useSpring, animated } from 'react-spring';
interface IInputErrorsProp {
  errors: CreateTargetDefaultState;
  state: boolean;
}
/**
 * Functional react component for congratulatory message.
 * @function
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is missing)
 */
const InputErrors = ({ errors, state }: IInputErrorsProp) => {
  const {
    first_name_error,
    last_name_error,
    mobile_error,
    gender_error,
    bills_error,
  } = errors;

  const spring = useSpring({
    transform: state ? `translateY(30px)` : `translateY(0px)`,
    config: myConfig,
  });

  return (
    <div className={styles.errors}>
      <animated.span style={spring} className={styles.error__first_name}>
        {first_name_error}
      </animated.span>
      <animated.span style={spring} className={styles.errors__last_name}>
        {last_name_error}
      </animated.span>
      <animated.span style={spring} className={styles.errors__mobile}>
        {mobile_error}
      </animated.span>
      <animated.span style={spring} className={styles.errors__gender}>
        {gender_error}
      </animated.span>
      <animated.span style={spring} className={styles.bills_error}>
        {bills_error}
      </animated.span>
    </div>
  );
};
export default InputErrors;
