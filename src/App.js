import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css";
import Calculator from "./Calculator";
function App() {
  return (
    <BrowserRouter>
       

        <Routes>
          <Route path='/' element={<Calculator/>} />
          <Route path='/MyCalc' element={<Calculator/>} />

          
        </Routes>
    </BrowserRouter>
  );
}
export default App;