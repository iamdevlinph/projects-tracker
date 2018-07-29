import Loadable from 'react-loadable';

import { Loading } from '../components';

const fakeDelay = ms => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

export default {
  Home: Loadable({
    loader: () => fakeDelay(2000).then(() => import('../containers/Home/Home')),
    loading: Loading,
  }),

  About: Loadable({
    loader: () => fakeDelay(2000).then(() => import('../containers/About/About')),
    loading: Loading,
  }),
};
