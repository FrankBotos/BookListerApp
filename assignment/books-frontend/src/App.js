import logo from './logo.svg';
import './App.css';

import Home from './Pages/Home';
import AddNew from './Pages/AddNew';
import NotFound from './Pages/NotFound';
import Navigation from './Components/Navigation';
import EditBook from './Pages/EditBook';
import About from './Pages/About';

import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {
  return (

    <BrowserRouter>
    <Navigation/>
    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/AddNew" element={<AddNew />} />
          <Route path="/EditBook" element={<EditBook />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
