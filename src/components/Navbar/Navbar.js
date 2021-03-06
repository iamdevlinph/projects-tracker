/* global VERSION */

import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import AccountDropdown from '../AccountDropdown/AccountDropdown';

const NavbarComponent = (props) => {
  const { loggedIn } = props;
  return (
    <NavbarChunk>
      <BannerArea>
        <h1>
          <a href="/">
            Github Projects Tracker
            <VersionNumber>{VERSION}</VersionNumber>
          </a>
        </h1>
      </BannerArea>
      <LinksArea>
        <NavLink to="/track" activeClassName="active-link">
          Home
        </NavLink>
        {loggedIn ? (
          <NavLink to="/manage" activeClassName="active-link">
            Manage
          </NavLink>
        ) : null}
        <NavLink to="/settings" activeClassName="active-link">
          Settings
        </NavLink>
        <AccountDropdown className="dropdown" {...props} />
        <a href="https://github.com/iamdevlinph/projects-tracker" target="blank" className="bold">
          Github
          {' '}
          <i className="fas fa-external-link-alt" />
        </a>
      </LinksArea>
    </NavbarChunk>
  );
};

export default NavbarComponent;

const NavbarChunk = styled.div`
  background: #ADE9DD;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 20px;
  grid-template-areas:
    "banner links r-pad";
`;
const BannerArea = styled.div`
  grid-area: banner;
  h1 {
    margin: 0;
    font-size: 25px;
  }
  a {
    color: black;
    text-decoration: none;
  }
`;
const LinksArea = styled.div`
  grid-area: links;
  text-align: right;
  font-size: 14px;
  line-height: 40px;
  a {
    color: black;
    text-decoration: none;
    &.active-link {
      text-decoration: underline;
    }
    border-right: 1px solid black;
    padding: 0 4px;
  }
  .dropdown i {
    border-right: 1px solid black;
    padding: 0 4px;
    line-height: 18px;
  }
`;
const VersionNumber = styled.span`
  font-size: 12px;
  margin-left: 5px;
`;
