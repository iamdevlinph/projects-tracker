import React from 'react';
import {
  HashRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import HomeLayout from './HomeLayout/HomeLayout';
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
      <Route exact path="/">
        <Redirect to="/track" />
      </Route>
      <AppRoute exact path="/track" layout={HomeLayout} container={loadableCons.Home} />
      <AppRoute exact path="/manage" layout={HomeLayout} container={loadableCons.Manage} />
      <AppRoute exact path="/*" layout={HomeLayout} container={loadableCons.NotFound} />
    </Switch>
  </HashRouter>
);

AppRoute.propTypes = {
  container: PropTypes.func.isRequired,
  layout: PropTypes.func.isRequired,
};
