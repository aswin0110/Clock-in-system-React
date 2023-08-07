
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import NavBar from './components/NavBar';
import TimeTracker from './components/TimeTracker';
import AdminHome from './components/AdminHome';
import AddUser from './components/AddUser';
import ViewUsers from './components/ViewUsers';


function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/tracker' element={<TimeTracker/>}/>
        <Route path='/adminHome' element={<AdminHome/>}/>
        <Route path='/addUser' element={<AddUser data={{email:'',password:'',uname:'',designation:'',mobileNo:''}} method = 'post'/>}/>
        <Route path='/viewUsers' element={<ViewUsers/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
