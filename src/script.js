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
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./components/CRCMaker', () => {
    const NextHotLoaded = require('./components/CRCMaker.js').default; // eslint-disable-line
    render(
      <AppContainer>
        <NextHotLoaded />
      </AppContainer>,
      document.getElementById('main')
    );
  });
}

// We want to install the web workers after everything instantiates correctly
import { install } from 'offline-plugin/runtime';
install();