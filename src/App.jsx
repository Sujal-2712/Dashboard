import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './pages/Login';
import AddWheelCompany from './pages/AddWheelCompany';
import Rajkot from './components/Rajkot';
import Surat from './components/Surat';
import GenerateCode from './pages/GenerateCode';
import Layout from './components/Layout';
import ShowDetails from './components/ShowDetails';
import ShowDetails_Surat from './components/ShowDetails_Surat';
import RFID from './components/RFID';
import RFID_Surat from './components/RFID_Surat';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user" element={<Layout />}>
          <Route index element={<Rajkot />} />
          <Route path="/user/surat" element={<Surat />} />
          <Route path="/user/GenerateCode" element={<GenerateCode />} />
          <Route path="/user/AddWheelCompany" element={<AddWheelCompany />} />
          <Route path="/user/showdetails" element={<ShowDetails />} />
          <Route path="/user/showdetails/surat" element={<ShowDetails_Surat />} />
          <Route path="/user/rfid" element={<RFID />} />
          <Route path="/user/rfid/surat" element={<RFID_Surat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
