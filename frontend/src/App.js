import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import CatList from './components/CatList';
import Register from './components/Register';
import Login from './components/Login';
import Navbars from './components/Navbar';
import Home from './components/Home';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (username) => {
    setLoggedIn(true);
    setUsername(username);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
  };

  return (
    <Router>
      <div className="container">
        <Navbars loggedIn={loggedIn} username={username} handleLogout={handleLogout} />

        <div className="mt-3">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route
              path="/login"
              render={() =>
                !loggedIn ? (
                  <Login handleLogin={handleLogin} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route exact path="/cats" component={CatList} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
