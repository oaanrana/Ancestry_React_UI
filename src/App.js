import logo from './logo.svg';
import './App.css';
import Login from './components/login';

function giveNames() {
  return "Tejul Oaan Dmitrii"
}

function App() {
  return (
    <div className="App">

      <h1>Welcome to the My Ancestry Beta!</h1>
      <Login></Login>
    </div>
  );
}

export default App;
