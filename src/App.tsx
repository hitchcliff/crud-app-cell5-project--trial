import React from 'react';
import './App.scss';

// main components
import { Overview, Sidebar, Table } from './components';
import Buttons from './components/Buttons/Buttons';

const App = () => {
  return (
    <div className="App" data-theme="dark">
      <div className="container">
        <div className="container__sidebar">
          <Sidebar />
        </div>
        <div className="container__overview">
          <Overview />
          <Table />
          <div className="overview__button">
            <Buttons isPrimary text="See more (1)" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
