import React from 'react';
import Directory from '../../components/Directory/Directory';

import { HomePageContainer } from './homePageStyles';

import './homePage.scss';


const HomePage = () => {
  return (
    <HomePageContainer className='homepage'>
      <Directory /> 
    </HomePageContainer>
  )
}

export default HomePage;
