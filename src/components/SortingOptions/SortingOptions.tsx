import React, { useEffect, useState } from 'react';
import { act } from 'react-dom/test-utils';
import { useDispatch } from 'react-redux';
import { IBoxSwitchesType } from '.';
import { SortClientAction } from '../../Actions/sort.action';
import { BoxSwitches } from './data';
import styles from './SortingOptions.module.scss';

/**
 * Functional react component for congratulatory message.
 * @function
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is missing)
 */
const SortingOptions = () => {
  const [state, set] = useState<string>('');
  const [active, setActive] = useState<number>(0); // current index

  const dispatch = useDispatch();

  useEffect(() => {
    const res = setTimeout(() => {
      dispatch(SortClientAction(state));
    });
    return () => {
      clearTimeout(res);
    };
  }, [state]);

  const handleClick = (id: number, item: IBoxSwitchesType) => {
    setActive(id); // id = `0`, set active to `1`
    set(item.dsc);

    if (active === id) {
      setActive(0); // id = `1`, set active to `0`
      set(item.asc);
    }
  };

  const mapBoxesSwitches = BoxSwitches.map((item) => {
    return (
      <div key={item.id} className={styles.box}>
        <p>{item.title}</p>
        <button
          className={
            active === item.id ? styles.box__switchActive : styles.box__switch
          }
          onClick={(e) => handleClick(item.id, item)}
        />
      </div>
    );
  });

  return (
    <div className={styles.sorting}>
      {/* heading */}
      <h4>Sorting options</h4>

      {/* switches */}
      <div className={styles.boxes}>{mapBoxesSwitches}</div>
    </div>
  );
};
export default SortingOptions;
