import React from 'react';
import {
  HashRouter, Route, Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import HomeLayout from './HomeLayout/HomeLayout';
import LoginLayout from './LoginLayout/LoginLayout';
import loadableCons from './loadableCons';

const AppRoute = ({ container: Container, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <Layout>
        <Container {...props} />
      </Layout>
    )}
  />
);

export default () => (
  <HashRouter>
    <Switch>
      <AppRoute exact path="/" layout={LoginLayout} container={loadableCons.Login} />
      <AppRoute exact path="/track" layout={HomeLayout} container={loadableCons.Home} />
      <AppRoute exact path="/manage" layout={HomeLayout} container={loadableCons.Manage} />
      <AppRoute exact path="/settings" layout={HomeLayout} container={loadableCons.Settings} />
      <AppRoute exact path="/*" layout={HomeLayout} container={loadableCons.NotFound} />
    </Switch>
  </HashRouter>
);

AppRoute.propTypes = {
  container: PropTypes.func.isRequired,
  layout: PropTypes.func.isRequired,
};
