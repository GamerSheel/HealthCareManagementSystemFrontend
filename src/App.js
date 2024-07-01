import logo from './logo.svg';
import './App.css';
import RouteFrontend from './Route';

function App() {
  return (
    <div className="App"  style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <RouteFrontend />
      {/* <header className="App-header">
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
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
