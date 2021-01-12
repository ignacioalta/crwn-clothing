import { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';
import HomePage from './pages/homepage/HomePage';
import ShopPage from './pages/shop/Shop';

function App() {
  return (
    <Fragment>
      <Header />
      <Switch>
      <Route exact path='/' component={HomePage} />
      <Route path='/shop' component={ShopPage} />
      </Switch>
    </Fragment>
  );
}

export default App;
