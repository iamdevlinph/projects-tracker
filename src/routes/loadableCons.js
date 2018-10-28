import Loadable from 'react-loadable';

import { Loading } from '../components';

const fakeDelay = ms => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

export default {
  Home: Loadable({
    loader: () => fakeDelay(500).then(() => import('../containers/Home/Home')),
    loading: Loading,
  }),

  Manage: Loadable({
    loader: () => fakeDelay(500).then(() => import('../containers/Manage/Manage')),
    loading: Loading,
  }),

  NotFound: Loadable({
    loader: () => fakeDelay(500).then(() => import('../containers/NotFound/NotFound')),
    loading: Loading,
  }),

  Settings: Loadable({
    loader: () => fakeDelay(500).then(() => import('../containers/Settings/Settings')),
    loading: Loading,
  }),

  Login: Loadable({
    loader: () => fakeDelay(500).then(() => import('../containers/Login/Login')),
    loading: Loading,
  }),
};
