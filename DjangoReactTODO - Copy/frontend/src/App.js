import React from 'react';
import logo from './logo.svg';
import './App.css';
import Todo from './components/Todo';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
          <Switch>
              <Route exact path = '/' component = { Todo } />
              <Route exact path = '/header' component = { Header } />
          </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;