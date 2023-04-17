import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import * as OfflinePluginRuntime from '@lcdp/offline-plugin/runtime';

import CRCMaker from './components/CRCMaker';

import '../styles/styles.scss';

const root = ReactDOMClient.createRoot(document.getElementById('main'));
root.render(<CRCMaker />);

// Install the service worker after everything instantiates correctly
OfflinePluginRuntime.install();
