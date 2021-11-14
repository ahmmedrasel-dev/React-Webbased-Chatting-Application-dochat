import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import App from './components/App';
import Register from './components/auth/Register'
import Login from './components/auth/Login'

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  )
}


ReactDOM.render(<Routing />, document.getElementById('root'));