import logo from './logo.svg';
import './App.css';

function giveNames() {
  return "Tejul Oaan Dmitrii"
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >

          Hello World
          Tejul was here 2
          Dmitrii was here 3
        </a>
      </header>
    </div>
  );
}

export default App;
