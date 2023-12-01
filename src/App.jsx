import React from 'react';
import Navbar from './component/Navbar';
import './App.css'
import Home from './component/Home';
import { Toaster } from "react-hot-toast";

function App() {

  return (
    <div className="app">
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <Home />
    </div>
  );
}

export default App
