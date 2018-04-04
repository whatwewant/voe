import React, { PureComponent } from 'react';
import styled from 'styled-components';

import EmptyBox from '../assets/empty_box.jpg';

const EmptyWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmptyBanner = styled.img`
  width: 300px; // https://cdn.dribbble.com/users/664887/screenshots/3913473/empty_box.jpg
`;

const Empty = () => (
  <EmptyWrapper>
    <EmptyBanner src={EmptyBox} />
  </EmptyWrapper>
);

export default Empty;