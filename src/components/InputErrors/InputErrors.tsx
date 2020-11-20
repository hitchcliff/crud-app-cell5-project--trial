import React from 'react';
import { CreateTargetDefaultState } from '../CreateTarget/CreateTarget';
import styles from './InputErrors.module.scss';
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
  return (
    <div className={styles.errors}>
      <span className={styles.errors__first_name}>{first_name_error}</span>
      <span className={styles.errors__last_name}>{last_name_error}</span>
      <span className={styles.errors__mobile}>{mobile_error}</span>
      <span className={styles.errors__gender}>{gender_error}</span>
      <span className={styles.bills_error}>{bills_error}</span>
    </div>
  );
};
export default InputErrors;
