import React, { useState } from 'react';
import styles from './Buttons.module.scss';
import PropTypes from 'prop-types';

import { useSpring, animated } from 'react-spring';

export const myConfig = {
  mass: 10,
  tension: 150,
  friction: 26,
};

interface IButtonsProp {
  isLink?: boolean;
  link?: string;
  text: string;
  isPrimary?: boolean;
  isTypeSubmit?: boolean;
  handleClick?: any;
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
  handleClick,
}: IButtonsProp) => {
  const [hover, setHover] = useState(false);
  const spring = useSpring({
    position: 'relative',
    top: hover ? '-20px' : '0px',
    config: myConfig,
  });
  return (
    <animated.button
      style={spring}
      type={isTypeSubmit ? 'submit' : undefined}
      className={isPrimary ? styles.primary : styles.general}
      onClick={(e) => handleClick && handleClick(e)}
      onPointerOver={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      {/* if its link, we render `a` tag */}
      {isLink ? <a href={link}>{text}</a> : text}
    </animated.button>
  );
};

// Proptypes
Buttons.propTypes = {
  link: PropTypes.string,
  text: PropTypes.string.isRequired,
  isPrimary: PropTypes.bool,
  isLink: PropTypes.bool,
  isTypeSubmit: PropTypes.bool,
};

export default Buttons;
