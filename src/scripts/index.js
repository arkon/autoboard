import React from 'react';
import { render } from 'react-dom';
import * as OfflinePluginRuntime from '@lcdp/offline-plugin/runtime';

import CRCMaker from './components/CRCMaker';

import '../styles/styles.scss';

render(<CRCMaker />, document.getElementById('main'));

// Install the service worker after everything instantiates correctly
OfflinePluginRuntime.install();
