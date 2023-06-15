import React from 'react';
import './App.css';
import Navbar from './components/index';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Home from './pages';
import Overview from './pages/overview';
import UI from './pages/ui';
import Talents from './pages/talents';
import Talents2 from './pages/talents2';
 
function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/overview' element={<Overview />} />
                <Route path='/ui' element={<UI />} />
                <Route path='/talents2' element={<Talents2 />} />
            </Routes>
        </Router>
    );
}
 
export default App;

// import React from "react";
// import DocViewer from "./pages/doc.js";

// export default function App() {
//   return (
//     <div className="App">
//       <h1>Sample Doc file:</h1>
//       <DocViewer source="https://docs.google.com/document/d/1_Ou_DofYLw2k8gxFPEouvfDfn4_M2kgx16BYm4Bg_Vc" />
//     </div>
//   );
// }

