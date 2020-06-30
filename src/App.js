import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import './App.css';

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Main from './routes/main/Main';
import Auth from './routes/auth/Auth';
import Maps from './routes/maps/Maps';
import Stats from './routes/stats/Stats';
import Confirm from './routes/confirm/Confirm';
import NotFound from './routes/not-found/NotFound';

function App(props) {
  
  // console.log(props);
  
  return (
    <div className="text-center">
      <Header />
      <div className="content">
        <Switch>
          <Route exact path="/" component={ Main } />
          <Route path="/auth" component={ Auth } />
          <Route path="/maps" component={ Maps } />
          <Route path="/stats" component={ Stats } />          
          <Route path="/confirm" component={ Confirm } />
          <Route component={ NotFound } />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
