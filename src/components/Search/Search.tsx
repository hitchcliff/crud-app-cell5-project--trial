import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ClientsAction } from '../../Actions/clients.action';
import { SearchClientAction } from '../../Actions/search.action';
import styles from './Search.module.scss';
/**
 * Functional react component for congratulatory message.
 * @function
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is missing)
 */
const Search = () => {
  const [state, set] = useState('');
  const dispatch = useDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    set(value);
    setTimeout(() => {
      // if value is empty, call clientsaction
      if (value === '') return dispatch(ClientsAction());
    }, 1000);
  };

  return (
    <div className={styles.search}>
      {/* a search input that has a `BEM` naming convention */}
      <input
        data-test="input"
        className={styles.search__input}
        name="s"
        type="text"
        placeholder="Look for targets"
        value={state}
        onChange={(e) => onChange(e)}
      />
      <button
        className={styles.search__button}
        onClick={() => dispatch(SearchClientAction(state))}
      >
        Search
      </button>
    </div>
  );
};
export default Search;
