/* global VERSION */

import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import { actions as settingsActions } from '../../sagaDucks/settings/settings';
import { actions as authActions } from '../../sagaDucks/auth/auth';
import { actions as projectsActions } from '../../sagaDucks/projects/projects';
import { Navbar, LoaderOverlay } from '../../components';
import { localStorage } from '../../services';

class HomeLayout extends Component {
  constructor(props) {
    super(props);
    const { initAuth } = props;
    initAuth();
  }

  componentWillMount() {
    const {
      requestList, requestSettings,
    } = this.props;
    // clear cache if local version doesn't match published version
    const versionCache = localStorage.getItem('VERSION');
    if (!versionCache || VERSION !== versionCache.data) {
      localStorage.clearAll();
      localStorage.setItem('VERSION', VERSION);
    }
    // only fetch stuff when authenticated
    requestList();
    requestSettings();
  }

  render() {
    const {
      children, authenticated,
    } = this.props;
    let page;
    if (typeof authenticated === 'undefined') {
      page = (<LoaderOverlay />);
    } else {
      page = !authenticated
        ? (
          <Redirect to="/" />
        ) : (
          <HomeLayoutArea>
            <NavbarArea>
              <Navbar {...this.props} />
            </NavbarArea>
            <MainArea>
              {React.Children.map(children, child => React.cloneElement(child, {
                ...this.props,
              }))}
            </MainArea>
          </HomeLayoutArea>
        );
    }
    return (page);
  }
}

const mapStateToProps = state => (
  {
    ajaxInProgress: state.common.ajaxInProgress,
    projects: state.projects.list,
    sort: state.projects.sort,
    settings: state.settings.settings,
    user: state.auth.user,
    authenticated: state.auth.authenticated,
    loggedIn: state.auth.loggedIn,
    activeColorPicker: state.settings.activeColorPicker,
  }
);

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    ...authActions,
    ...settingsActions,
    ...projectsActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeLayout);

const HomeLayoutArea = styled.div`
  display: grid;
  grid-template-rows: 5px 40px 1fr;
  grid-template-columns: 1fr;
  grid-template-areas:
    "pad"
    "navbar"
    "main";
  height: 100vh;
`;
const NavbarArea = styled.div`
  grid-area: navbar;
`;
const MainArea = styled.div`
  grid-area: main;
  background: #F5F5F5;
  padding: 0 10px;
`;
