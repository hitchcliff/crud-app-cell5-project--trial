import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { TestActions } from './Actions/test.action';
import { RootStore } from './Store';

function App() {
  const state = useSelector((state: RootStore) => state.test);
  const { loading, testTodos } = state;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(TestActions());
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This is a boilerplate for{' '}
          <code>React, Redux, Thunk, and Typescript</code>.
        </p>
      </header>
      Results:
      <div className="results">
        {!loading &&
          testTodos?.length &&
          [...testTodos].map((testItem) => (
            <div className="test" key={testItem.id}>
              <p>{testItem.title}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
