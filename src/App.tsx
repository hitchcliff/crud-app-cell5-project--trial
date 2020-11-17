import React from 'react';
import './App.scss';

// main components
import { Overview, Sidebar, Table } from './components';

const App = () => {
  return (
    <div className="App">
      <div className="col col--sidebar">
        <Sidebar />
      </div>
      <div className="col col--overview">
        <Table />
        <Overview />
      </div>
    </div>
  );
};

export default App;
