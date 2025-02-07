import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Formulario from './components/Formulario';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Routes, Route } from "react-router";
import Detail from './components/Detail';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/crear" element={<Formulario />} />
      <Route path="/editar/:id" element={<Formulario />} />
      <Route path="/detalle/:id" element={<Detail />} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
