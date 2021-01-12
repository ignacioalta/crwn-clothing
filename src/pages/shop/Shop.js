import React, { Component } from 'react';
import PreviewCollection from '../../components/previeCollection/PreviewCollection';
import SHOP_DATA from './ShopData';

class ShopPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collections: SHOP_DATA
    }
  }

  render() {
    const {collections} = this.state;
    return <div className='shop-page'>
      {
        collections.map(({ id, ...otherCollectionsProps }) => (
          <PreviewCollection 
          key={id} {...otherCollectionsProps} />
        ))
      }
    </div>
  }
}

export default ShopPage;
