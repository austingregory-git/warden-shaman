import React from 'react';
import './App.css';
import Navbar from './components/index';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Home from './pages';
import Overview from './pages/overview';
import UI from './pages/ui';
import Talents from './pages/talents';
 
function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/overview' element={<Overview />} />
                <Route path='/ui' element={<UI />} />
                <Route path='/talents' element={<Talents />} />
            </Routes>
        </Router>
    );
}
 
export default App;
