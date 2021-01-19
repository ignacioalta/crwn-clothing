import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51IB1yUCjjuTdjsm3Lyf569qxbEfKGGFBDdJsXAVH4bMKY8nWzcQzmDW0K7JuxvxEee6dEKFsPhtgWARn7Gqipgr400mCNSLH8v';

  const onToken = token => {
    alert('Payment Successful')
  }

  return (
    <StripeCheckout
    label='Pay Now'
    name='Shop Clothing'
    billingAddress
    shippingAddress
    image='https://svgshare.com/i/CUz.svg'
    description={`Your total is $${price}`}
    amount={priceForStripe}
    panelLabel='Pay Now'
    token={onToken}
    stripeKey={publishableKey}
   />
  )
}

export default StripeCheckoutButton;
