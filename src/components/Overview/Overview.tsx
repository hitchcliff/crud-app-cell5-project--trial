import React, { useState } from 'react';
import styles from './Overview.module.scss';
import PropTypes from 'prop-types';

// redux
import { useSelector } from 'react-redux';
import { RootStore } from '../../Store';

// componentts
import AccountSettings from '../AccountSettings/AccountSettings';
import Card from '../Card/Card';

// react spring
import { useSprings, animated } from 'react-spring';
import { myConfig } from '../Buttons/Buttons';

export interface IOverviewProp {
  persons: number;
  billings: number;
  completed: number;
}
/**
 * Functional react component for congratulatory message.
 * @function
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is missing)
 */
const Overview = () => {
  const listings = useSelector((state: RootStore) => state.listings);
  const [hover, setHover] = useState<number>();
  const [isHover, setIsHover] = useState<boolean>(false);

  // static data
  const items = [
    {
      title: 'Persons',
      value: listings?.persons,
    },
    {
      title: 'Billings',
      value: listings?.billings,
    },
    {
      title: 'Completed',
      value: listings?.completed,
    },
  ];

  /**
   * This is springs used to map te switches to create
   * each and every configs for each item instead of using `useSpring`
   * @function
   */
  const springs = useSprings(
    items.length,
    items.map((_, index) => ({
      transform: `translateY(${hover === index && isHover ? '-20px' : '0px'}) scale(${
        hover === index && isHover ? '1.1' : '1'
      })`,
      background: hover === index && isHover ? 'white' : '#e0e2db',
      color: 'white',
      config: myConfig,
    }))
  );

  /**
   * Map all the items through the total springs we have
   * so we can easily add a `style` to listed type items
   * @function
   * @returns {JSX.Element}
   */
  const springsMapItems = springs.map((spring, index) => {
    return (
      <animated.div
        key={index}
        style={{ ...spring }}
        onMouseOver={() => setHover(index)}
        onMouseOut={() => setHover(index)}
        onPointerEnter={() => setIsHover(true)}
        onPointerLeave={() => setIsHover(false)}
      >
        <Card title={`${items[index].title}`} value={items[index].value} />
      </animated.div>
    );
  });

  return (
    <div className={styles.overview}>
      {/* short intro about the app */}
      <div className={styles.heading}>
        {/* summary */}
        <div className={styles.heading__summary}>
          <h3>My clients billings and listings</h3>
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has
            roots in a piece of classical Latin literature from 45 BC, making it over 2000
            years old. Richard McClintock, a Latin professor at Hampden-Sydney College in
            Virginia.
          </p>
        </div>

        {/* account settings where logout button can be found */}
        <div className={styles.heading__settings}>
          {/* account settings micro component */}
          <AccountSettings />
        </div>
      </div>

      {/* cards components that accepts title and value as props */}
      <div className={styles.cards}>
        <h2 className={styles.cards__title}>Overview</h2>
        <div className={styles.cards__container}>{springsMapItems}</div>
      </div>
    </div>
  );
};

Overview.propTypes = {
  props: PropTypes.shape({
    persons: PropTypes.number.isRequired,
    billings: PropTypes.number.isRequired,
    completed: PropTypes.number.isRequired,
  }),
};

export default Overview;
