import React from 'react';
import styles from './Card.module.scss';

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
    <div className={styles.cards}>
      <h5 className={styles.cards__title}>{title}</h5>
      <p className={styles.cards__value}>
        {/* checks whether the title is billings */}
        {title === 'Billings' ? '$' + value : value}
      </p>
    </div>
  );
};
export default Card;
