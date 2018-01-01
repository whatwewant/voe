import React, { Component } from 'react';
import Loadable from 'react-loadable';
import JssProvider from 'react-jss/lib/JssProvider';
import styled from 'styled-components';
import { withStyles, MuiThemeProvider } from 'material-ui/styles';

import Button from 'material-ui/IconButton';
import IconBurger from 'material-ui-icons/Menu';
import wrapDisplayName from 'recompose/wrapDisplayName';
import createContext from '../utils/createStyleContext';

// import SideBar from './SideBar';

const SideBar = Loadable({
  loading: () => null,
  loader: () => import('./SideBar'),
});

const MenuButton = styled.div`
  position: fixed;
  top: 1.5pc;
  margin: 0 0 0 .5pc;
  border: none;
  background: 0 0;
  outline: 0;
  z-index: 8;
`;


const Menu = (props) => (
  <MenuButton>
    <Button {...props}>
      <IconBurger />
    </Button>
  </MenuButton>
);

const FooterWrap = styled.div`
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  // margin-top: 20px;
`;

const CopyrightWrap = styled.div`
  font-size: 12px;
  color: rgb(158, 158, 158);
  font-weight: 400;
`;

const Copyright = ({ content }) => (
  <CopyrightWrap>Copyright ©{content}</CopyrightWrap>
);

const Footer = (props) => (
  <FooterWrap>
    <Copyright content="2017 Viosey's Blog" />
  </FooterWrap>
);

// Apply some reset
const styles = theme => ({
  '@global': {
    html: {
      background: theme.palette.background.default,
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
    },
    body: {
      margin: 0,
    },
  },
  root: {
    backgroundColor: '#E6E8E9',
  },
});

let AppWrapper = props => (
  <div className={props.classes.root}>{props.children}</div>
);

AppWrapper = withStyles(styles)(AppWrapper);

const context = createContext();

function withRoot() {
  return Page => {
    class WithRoot extends Component {
      state = {
        menuOpen: false,
      };
  
      componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
          jssStyles.parentNode.removeChild(jssStyles);
        }
      }
  
      onToggleMenu = () => {
        this.setState({ menuOpen: !this.state.menuOpen });
      };
  
      render() {
        const { menuOpen } = this.state;
  
        return (
          <JssProvider registry={context.sheetsRegistry} jss={context.jss}>
            <MuiThemeProvider theme={context.theme} sheetsManager={context.sheetsManager}>
              <AppWrapper>
                <SideBar open={menuOpen} onRequestClose={this.onToggleMenu} />
                <Menu onClick={this.onToggleMenu} />
                <Page
                  {...this.props}
                />
                <Footer />
              </AppWrapper>
            </MuiThemeProvider>
          </JssProvider>
        );
      }
    }
  
    if (process.env.NODE_ENV !== 'production') {
      WithRoot.displayName = wrapDisplayName(Page, 'withRoot');
    }
  
    return WithRoot;
  };
}

export default withRoot;