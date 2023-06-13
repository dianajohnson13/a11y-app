import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import './App.css';
import Checker from './pages/Checker';
import Signup from './pages/Signup';

export default function App() {
  return (
    <Router>
      <div className="App">
        <header>
          {/* logo placeholder */}
          <div className='header-content'>
            <strong>A11y Checker</strong>
          </div>
        </header>
        <main>
          <Routes>
              <Route path="/" element={<Checker />}/>
              <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
