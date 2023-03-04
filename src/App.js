import logo from './construction.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img 
          src={logo} 
          className="App-logo" 
          alt="logo" />
        <a
          className="App-link"
          href="https://github.com/Kaygijzen"
          target="_blank"
          rel="noopener noreferrer"
        >
          View my GitHub profile
        </a>
      </header>
    </div>
  );
}

export default App;
