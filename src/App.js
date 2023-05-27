import logo from './logo.svg';
import './App.css';
import {BrowserRouter , Route, Routes } from 'react-router-dom';
import Outlethome from './Component.js/Outlethome';
import Home from './Component.js/Home';
import Login from './Component.js/Login';
import Passengerlist from './Component.js/Passengerlist';
import Department from './Component.js/Department';
import Simplecontextprovider from './Component.js/Simplecontext';

function App() {
  return (
    <>
     <BrowserRouter>
      <Simplecontextprovider>
      <Routes>
        <Route exact path="/login" element={<Login/>}/>
        <Route path="/" element={< Outlethome />}>
          <Route  index element={<Home/>} />
          <Route path='passengerlist' element={<Passengerlist />} />
          <Route path='department' element={<Department/>} />
          
          
        </Route>
      </Routes>
      </Simplecontextprovider>
      </BrowserRouter>
    </>
  );
}

export default App;
