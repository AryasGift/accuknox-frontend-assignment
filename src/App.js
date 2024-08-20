import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';

function App() {
  const[searchupdate,setSearchupdate]=useState("")
  return (
    <div className="App">
      <Header update={setSearchupdate}></Header>
      <Dashboard searchelement={searchupdate}></Dashboard>
    </div>
  );
}

export default App;
