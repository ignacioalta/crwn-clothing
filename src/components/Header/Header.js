import React from 'react';
import { ReactComponent as Logo } from '../../assets/crown.svg.svg';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartHidden } from '../../redux/cart/cartSelectors';
import { selectCurrentUser } from '../../redux/user/userSelector';

import { auth } from '../../firebase/FireBaseUtils';
import CartIcon from '../CartIcon/CartIcon';
import CartDropdown from '../CartDropdown/CartDropdown';

import { 
  HeaderContainer, 
  LogoContainer, 
  OptionsContainer, 
  OptionLink 
} from './headerStyles';

const Header = ({ currentUser, hidden }) => {
  return (
    <HeaderContainer>
      <LogoContainer to='/'>
      <Logo className='logo' />
      </LogoContainer>
      <OptionsContainer>
        <OptionLink to='/shop'>
          SHOP
        </OptionLink>
        <OptionLink to='/shop'>
          CONTACT
        </OptionLink>
        {
          currentUser ? (
          <OptionLink as='div' onClick={() => auth.signOut()}>
            SIGN OUT
          </OptionLink>
          ): (
          <OptionLink to='/signin'>
            SIGN IN
          </OptionLink>)
        }
        <CartIcon />
      </OptionsContainer>
      {
        hidden ? null : <CartDropdown />
      }
    </HeaderContainer>
  )
}

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden 
})

export default connect(mapStateToProps)(Header);
