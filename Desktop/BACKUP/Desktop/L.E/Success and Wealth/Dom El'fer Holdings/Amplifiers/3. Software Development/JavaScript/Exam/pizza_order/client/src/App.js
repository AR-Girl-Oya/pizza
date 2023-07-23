
import React  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import NewPizza from './components/NewPizza';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
              <Route element={<Dashboard/>} path="/" default />   
              <Route element={<NewPizza/>} path ="/new"  default />    
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
