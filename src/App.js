import { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/userActions';

import './App.css';
import Header from './components/Header/Header';
import HomePage from './pages/homepage/HomePage';
import ShopPage from './pages/shop/Shop';
import SignInAndSignUp from './pages/signInAndSignUp/SignInAndSignUp';
import { auth, createUserProfileDocument } from './firebase/FireBaseUtils';

class App extends Component {
  unsuscribedFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsuscribedFromAuth = auth.onAuthStateChanged( async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
        })
      }

      setCurrentUser({userAuth})
    })
  }

  componentWillUnmount() {
    this.unsuscribedFromAuth();
  }
  
  
  render() {
    return (
      <Fragment>
      <Header />
      <Switch>
      <Route exact path='/' component={HomePage} />
      <Route path='/shop' component={ShopPage} />
      <Route path='/signin' component={SignInAndSignUp} />
      </Switch>
    </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);
