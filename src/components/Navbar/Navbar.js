import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

class NavbarComponent extends Component {
  render() {
    return (
      <NavbarChunk>
        <BannerArea>
          <h1>
            Projects Tracker
          </h1>
        </BannerArea>
        <LinksArea>
          <Link to="/">
            Home
          </Link>
          {' | '}
          <Link to="manage">
            Manage
          </Link>
        </LinksArea>
      </NavbarChunk>
    );
  }
}

export default NavbarComponent;

const NavbarChunk = styled.div`
  background: #ADE9DD;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 50px 100px;
  grid-template-areas:
    "banner empty links account ribbon";
`;
const BannerArea = styled.div`
  grid-area: banner;
  h1 {
    margin: 0;
    font-size: 25px;
  }
`;
const LinksArea = styled.div`
  grid-area: links;
  text-align: right;
  font-size: 20px;
  line-height: 35px;
  a {
    color: black;
    text-decoration: none;
  }
`;
