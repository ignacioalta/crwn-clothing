import { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';
import HomePage from './pages/homepage/HomePage';
import ShopPage from './pages/shop/Shop';
import SignInAndSignUp from './pages/signInAndSignUp/SignInAndSignUp';
import { auth, createUserProfileDocument } from './firebase/FireBaseUtils';

class App extends Component {
  constructor() {
    super()
  
    this.state = {
       currentUser: null
    }
  }

  unsuscribedFromAuth = null;

  componentDidMount() {
    this.unsuscribedFromAuth = auth.onAuthStateChanged( async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
          console.log(this.state);
        })
      }

      this.setState({ currentUser: userAuth })
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
