import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import HomePage from './pages/Homepage';
import LoginPage from './pages/loginPage';
import UserlistComponent from './Components/UserListComponent';
import DataListComponent from './Components/DataListComponent';
import AdminListComponent from './Components/AdminListComponent';

function App() {
  return (
    <Router>
    <Routes>
    <Route exect path = '/'  element = {<LoginPage/>}/>
    <Route exect path = '/login'  element = {<LoginPage/>}/>
    <Route exect path = '/boothData'  element = {<DataListComponent/>}/>
    <Route exect path = '/usersData'  element = {<UserlistComponent/>}/>
    <Route exect path = '/adminsData'  element = {<AdminListComponent/>}/>
    </Routes>
  </Router>
  );
}

export default App;
