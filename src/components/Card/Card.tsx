import React from 'react';
import styles from './Card.module.scss';
import PropTypes from 'prop-types';
import { FormatNumber } from '../../helpers/helpers';

interface ICardsProp {
  title: string;
  value: number;
}

/**
 * Functional react component for congratulatory message.
 * @function - A `Card` Component that acceps `title`, & `value`
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is missing)
 */
const Card = ({ title, value }: ICardsProp) => {
  return (
    <div className={styles.card}>
      <h5 className={styles.cards__title}>{title}</h5>
      <p className={styles.cards__value}>
        {/* checks whether the title is billings */}
        {title === 'Billings' ? FormatNumber(value) : value}
      </p>
    </div>
  );
};

// Proptypes
Card.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default Card;
