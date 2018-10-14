import React from 'react';
import styled from 'styled-components';

const LoadingOverlayComponent = () => (
  <ManageLoader>
    <Spinner className="lds-ring">
      <div />
      <div />
      <div />
      <div />
    </Spinner>
  </ManageLoader>
);

export default LoadingOverlayComponent;

const ManageLoader = styled.div`
  position: absolute;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.41);
  z-index: 2;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: 1fr min-content 1fr;
  grid-template-rows: 1fr min-content 1fr;
  grid-template-areas:
    "top top top"
    "left loader right"
    "bot bot bot";
`;
const Spinner = styled.div`
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
  grid-area: loader;
  cursor: wait;
  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 51px;
    height: 51px;
    margin: 6px;
    border: 6px solid #AEEADE;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #AEEADE transparent transparent transparent;
  }
  div:nth-child(1) {
    animation-delay: -0.45s;
  }
  div:nth-child(2) {
    animation-delay: -0.3s;
  }
  div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
