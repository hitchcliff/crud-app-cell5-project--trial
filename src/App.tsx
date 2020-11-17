import React from 'react';
import './App.scss';

// main components
import { Overview, Sidebar, Table } from './components';

const App = () => {
  return (
    <div className="App" data-theme="dark">
      <div className="container">
        <div className="container__sidebar">
          <Sidebar />
        </div>
        <div className="container__overview">
          <Table />
          <Overview />
        </div>
      </div>
    </div>
  );
};

export default App;
