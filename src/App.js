import React from 'react';
import { Provider } from 'react-redux';
import { injectGlobal } from 'styled-components';

import Routes from './routes';
import store from './store';

export default () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

// Global style
// eslint-disable-next-line
injectGlobal`
  body {
    font-family: 'Space Mono', monospace;
    margin: 0;
  }
`;

// listen to store changes
// store.subscribe(() => {
//   console.log(store.getState());
// });
