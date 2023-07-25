
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import NavBar from './components/NavBar';
import TimeTracker from './components/TimeTracker';


function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/tracker' element={<TimeTracker/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
