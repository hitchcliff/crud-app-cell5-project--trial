import React from 'react';
import { Overview, Sidebar, Table } from './components';

const App = () => {
  return (
    <div className="App">
      <Sidebar />
      <Table />
      <Overview />
    </div>
  );
};

export default App;
