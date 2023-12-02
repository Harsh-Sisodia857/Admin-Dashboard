import React, { useContext } from 'react';
import Navbar from './component/Navbar';
import './App.css'
import Home from './component/Home';
import { Toaster } from "react-hot-toast";
import AdminContext from './context/adminContext';
import Spinner from './component/Spinner';

function App() {

  const { loading } = useContext(AdminContext);
  return (
    <div className="app">
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      {loading ? <Spinner /> : <Home />}
    </div>
  );
}

export default App
