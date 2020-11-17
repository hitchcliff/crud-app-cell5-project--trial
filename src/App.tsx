import React from 'react';
import './App.component.scss';

// main components
import { Overview, Sidebar, Table } from './components';

const App = () => {
  return (
    <div className="App">
      <div className="container container--sidebar sidebar">
        <Sidebar />
      </div>
      <div className="container container--main">
        <Table />
        <Overview />
      </div>
    </div>
  );
};

export default App;
