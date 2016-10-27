import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import CRCMaker from './components/CRCMaker';

require('./styles/styles.scss');

render(
  <AppContainer>
    <CRCMaker />
  </AppContainer>,
document.getElementById('main'));

// REACT HMR
if (module.hot) {
  module.hot.accept('./components/CRCMaker', () => {
    const NextHotLoaded = require('./components/CRCMaker.js').default; // eslint-disable-line
    ReactDOM.render(
      <AppContainer>
        <NextHotLoaded />
      </AppContainer>
      ,
      document.getElementById('main')
    );
  });
}