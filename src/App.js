import { Component, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/userActions';

import './App.css';
import Header from './components/Header/Header';
import HomePage from './pages/homepage/HomePage';
import ShopPage from './pages/shop/Shop';
import SignInAndSignUp from './pages/signInAndSignUp/SignInAndSignUp';
import { auth, createUserProfileDocument } from './firebase/FireBaseUtils';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/userSelector';
import CheckOutPage from './pages/checkout/CheckOut';


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

      setCurrentUser(userAuth);
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
      <Route exact path='/checkout' component={CheckOutPage} />
      <Route 
      exact
      path='/signin' 
      render={() => 
        this.props.currentUser ? (
        <Redirect to='/' />
      ) : (
        <SignInAndSignUp />
      )
      }
      />
      </Switch>
    </Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(App);
