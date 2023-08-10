import React from 'react';
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import {LoginPage, SignupPage} from "./Routes"
import { useEffect } from 'react';
const App = () => {
  useEffect(() => {
    console.log('Component mounted');
    document.title = 'E-Shopping';
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/loginPage' element={<LoginPage/>}/>
        <Route path='/sign-up' element={<SignupPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
