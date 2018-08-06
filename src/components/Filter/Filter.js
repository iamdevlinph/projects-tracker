import React from 'react';
import styled from 'styled-components';

const FilterComponent = () => (
  <Filter>
    <TestButton>
      Authors
    </TestButton>
  </Filter>
);

export default FilterComponent;

/* eslint-disable react/destructuring-assignment */
const Filter = styled.div`
  font-size: 13px;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 1px 0px, rgba(0, 0, 0, 0.24) 0px 1.5px 1px 0px;
  border-left: ${props => `5px solid ${props.status}`};
  display: grid;
  grid-template-columns: 3fr 1fr 70px 120px;
  column-gap: 10px;
  grid-template-areas:
    "repo commit issues pull";
  height: 30px;
`;
const TestButton = styled.div``;
/* eslint-enable react/destructuring-assignment */
