import { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';
import HomePage from './pages/homepage/HomePage';
import ShopPage from './pages/shop/Shop';
import SignInAndSignUp from './pages/signInAndSignUp/SignInAndSignUp';
import { auth } from './firebase/FireBaseUtils';

class App extends Component {
  constructor() {
    super()
  
    this.state = {
       currentUser: null
    }
  }

  unsuscribedFromAuth = null;

  componentDidMount() {
    this.unsuscribedFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user })

      console.log(user);
    })
  }

  componentWillUnmount() {
    this.unsuscribedFromAuth();
  }
  
  
  render() {
    return (
      <Fragment>
      <Header currentUser={this.state.currentUser} />
      <Switch>
      <Route exact path='/' component={HomePage} />
      <Route path='/shop' component={ShopPage} />
      <Route path='/signin' component={SignInAndSignUp} />
      </Switch>
    </Fragment>
    );
  }
}

export default App;
