import React from 'react';
import styles from './Buttons.module.scss';

interface IButtonsProp {
  isLink?: boolean;
  link?: string;
  text: string;
  isPrimary?: boolean;
  isTypeSubmit?: boolean;
}

/**
 * Functional react component for congratulatory message
 * @function - This works like a normal button but customizable
 * @param {IButtonsProp} param0 - You can pass `link`, `text`, `isPrimary`, `isLink`, & `isTypeSubmit`
 */
const Buttons = ({
  link,
  text,
  isPrimary,
  isLink,
  isTypeSubmit,
}: IButtonsProp) => {
  const onSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <button
      type={isTypeSubmit ? 'submit' : undefined}
      className={isPrimary ? styles.primary : styles.general}
      onSubmit={(e) => onSubmit(e)}
    >
      {/* if its link, we render `a` tag */}
      {isLink ? <a href={link}>{text}</a> : text}
    </button>
  );
};

Buttons.propTypes = {};

export default Buttons;
