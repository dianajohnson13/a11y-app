import './App.css';
import Checker from './pages/Checker';

export default function App() {
  return (
    <div className="App">
      <header>
        {/* logo placeholder */}
        <div className='header-content'>
          <strong>A11y Checker</strong>
        </div>
      </header>
      <main>
        <Checker />
      </main>
    </div>
  );
}
