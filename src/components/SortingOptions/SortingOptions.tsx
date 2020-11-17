import React from 'react';
import { BoxSwitches } from './data';
import styles from './SortingOptions.module.scss';

/**
 * Functional react component for congratulatory message.
 * @function
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is missing)
 */
const Sorting = () => {
  const mapBoxesSwitches = BoxSwitches.map((item) => {
    return (
      <div key={item.id} className={styles.box}>
        <p>{item.title}</p>
        <button className={styles.box__switch} />
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
export default Sorting;
