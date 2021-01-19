import React from 'react';
import './checkOut.scss';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItems, selectCartTotal } from '../../redux/cart/cartSelectors';

import './checkOut.scss';
import CheckOutItem from '../../components/CheckoutItem/CheckOutItem';
import StripeCheckoutButton from '../../components/StripeButton/StripeButton';

const CheckOut = ({ cartItems, total }) => {
  return (
    <div className='checkout-page'>
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {
      cartItems.map(cartItem =>
        <CheckOutItem key={cartItem.id} cartItem={cartItem} />
      )
      }
      <div className="total">
        <span>TOTAL: ${total}</span>
        <div className="test-warning">*Please use the following test credit card for payments*
        <br/>
        4242 4242 4242 4242 - Exp: 01/20 - CVW: 123
        </div>
        </div>
        <StripeCheckoutButton price={total}/>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal
})

export default connect(mapStateToProps)(CheckOut);
