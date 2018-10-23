import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LoginLayout extends Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        {children}
      </div>
    );
  }
}

LoginLayout.propTypes = {
  children: PropTypes.object.isRequired,
};

export default LoginLayout;
