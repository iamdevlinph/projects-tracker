import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import swal from 'sweetalert2';
import { actions as settingsActions } from '../../sagaDucks/settings/settings';
import { actions as authActions } from '../../sagaDucks/auth/auth';
import { actions as projectsActions } from '../../sagaDucks/projects/projects';
import { Navbar } from '../../components';
import localStorage from '../../services/localStorage';

class HomeLayout extends Component {
  componentWillMount() {
    const {
      requestList, requestSettings, initAuth,
    } = this.props;
    requestList();
    requestSettings();
    initAuth();
  }

  render() {
    const {
      children, user,
    } = this.props;
    const informedUserCache = localStorage.isCached('informedUserCache');
    if (user && user.email !== 'iamdevlinph@gmail.com' && (!informedUserCache || !informedUserCache.flag)) {
      swal({
        title: 'You are not Devlin',
        text: 'Other users currently don\'t have any functions right now',
        type: 'info',
        footer: '<a href="https://github.com/iamdevlinph/projects-tracker/issues/13" target="blank">Read more</a>',
        allowOutsideClick: false,
      });
      localStorage.setItem('informedUserCache', { flag: true });
    }
    return (
      <NoSidebarArea>
        <NavbarArea>
          <Navbar />
        </NavbarArea>
        <MainArea>
          {React.Children.map(children, child => React.cloneElement(child, {
            ...this.props,
          }))}
        </MainArea>
      </NoSidebarArea>
    );
  }
}

HomeLayout.propTypes = {
  requestList: PropTypes.func.isRequired,
  requestSettings: PropTypes.func.isRequired,
  initAuth: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
  user: PropTypes.object,
};

HomeLayout.defaultProps = {
  user: null,
};

const mapStateToProps = state => (
  {
    projects: state.projects.list,
    sort: state.projects.sort,
    settings: state.settings.settings,
    user: state.auth.user,
    loggedIn: state.auth.loggedIn,
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

const NoSidebarArea = styled.div`
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
