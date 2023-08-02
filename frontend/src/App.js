
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import NavBar from './components/NavBar';
import TimeTracker from './components/TimeTracker';
import AdminHome from './components/AdminHome';


function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/tracker' element={<TimeTracker/>}/>
        <Route path='/adminHome' element={<AdminHome/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
