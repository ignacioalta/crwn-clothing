import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollectionsForPreview } from '../../redux/shop/shopSelectors';
import './collectionsOverview.scss';
import PreviewCollection from '../previewCollection/PreviewCollection';
 
const CollectionsOverview = ({ collections }) => {
  return (
    <div className='collections-overview'>
      {collections.map(({ id, ...otherCollectionsProps }) => (
      <PreviewCollection 
      key={id} {...otherCollectionsProps} />
    ))}
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview
})

export default connect(mapStateToProps)(CollectionsOverview);
