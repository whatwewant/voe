import React, { PureComponent } from 'react';
import styled from 'styled-components';

// import { withStyles } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
`;

const Progress = styled(LinearProgress)`
  height: 2px !important;
  background-color: transparent !important;

  // @TODO
  & > div {
    background-color: #d2d6d8 !important;
  }
`;

// @withStyles({
//   root: {
//     backgroundColor: 'red',
//   },
//   accentColor: {
//     color: '#fff',
//   },
//   accentColorBar: {
//     color: 'green',
//   },
// })
export default class Loading extends PureComponent {
  render() {
    return (
      <Wrapper>
        <Progress />
      </Wrapper>
    );
  }
}
