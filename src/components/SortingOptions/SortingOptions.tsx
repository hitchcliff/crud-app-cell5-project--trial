import React, { useCallback, useEffect, useState } from 'react';
import styles from './SortingOptions.module.scss';

import { IBoxSwitchesType } from '.';
import { SortClientAction } from '../../Actions/sort.action';

import { BoxSwitches } from './data';
import { useDispatch } from 'react-redux';

import { useSprings, animated } from 'react-spring';
import { myConfig } from '../Buttons/Buttons';

/**
 * Functional react component for congratulatory message.
 * @function
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is missing)
 */
const SortingOptions = () => {
  const [state, set] = useState<string>('');
  const [active, setActive] = useState<number>(0); // current index
  // for React spring
  const [currentHoveredItem, set2] = useState<number>(0);

  const dispatch = useDispatch();

  /**
   * This is springs used to map te switches to create
   * each and every configs for each item instead of using `useSpring`
   * @function
   */
  const springs = useSprings(
    BoxSwitches.length,
    BoxSwitches.map((_, i) => ({
      backgroundColor: currentHoveredItem === i ? '#8b2635' : '#2e3532',
      padding: currentHoveredItem === i ? '30px' : '10px',
      config: myConfig,
    }))
  );

  /**
   * A hook used to sort items in the table
   */
  useEffect(() => {
    const res = setTimeout(() => {
      dispatch(SortClientAction(state));
    });
    return () => {
      clearTimeout(res);
    };
  }, [state, dispatch]);

  /**
   * Map all the items through the total springs we have
   * so we can easily add a `style` to listed type items
   * @function
   * @returns {JSX.Element}
   */
  const springsMapItems = useCallback(() => {
    const handleClick = (id: number, item: IBoxSwitchesType) => {
      setActive(id); // id = `0`, set active to `1`
      set(item.dsc);

      if (active === id) {
        setActive(0); // id = `1`, set active to `0`
        set(item.asc);
      }
    };
    return springs.map((spring, index) => {
      return (
        <div
          data-test="box"
          key={index}
          className={styles.box}
          // set the state for currently hovered item
          onMouseOver={() => set2(index)}
          onMouseOut={() => set2(index)}
        >
          <p>{BoxSwitches[index].title}</p>
          <animated.button
            data-test="button"
            className={
              active === BoxSwitches[index].id
                ? styles.box__switchActive
                : styles.box__switch
            }
            onClick={() => handleClick(BoxSwitches[index].id, BoxSwitches[index])}
            style={{ ...spring }}
          />
        </div>
      );
    });
  }, [springs, active]);

  return (
    <div data-test={`${active ? 'active' : ''}`} className={styles.sorting}>
      {/* heading */}
      <h4>Sorting options</h4>

      {/* switches */}
      <div className={styles.boxes}>{springsMapItems()}</div>
    </div>
  );
};

export default SortingOptions;
