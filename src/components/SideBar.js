import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'dva';

import rAvatar from 'material-ui/Avatar';
import SideMenuBar from './SideMenuBar';

const TopBar = styled.div`
  height: 25px;
`;

const AuthorWrapper = styled.div`
  height: 158.13px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  background-image: url(${props => props.banner});
  transition: all .2s ease-in-out;
`;

const Avatar = styled(rAvatar)`
  width: 54px !important;
  height: 54px !important;
  margin: 16px;
`;

const EmailWrapper = styled.a`
  position: relative;
  font-size: 14px;
  color: rgb(224, 224, 224);
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  padding: 0 56px 0 1pc;
  height: 3pc;
  line-height: 3pc;
  display: flex;
  align-items: center;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    color: #f5f5f5;
  }
`;

const Email = ({ address }) => (
  <EmailWrapper>
    {address}
  </EmailWrapper>
);

const Author = ({
  banner,
  avatar,
  email,
}) => (
  <AuthorWrapper banner={banner}>
    <TopBar />
    <Avatar src={avatar} />
    <Email address={email} />
  </AuthorWrapper>
);

const mapState = ({ app, menu }) => ({
  menus: menu,
  author: app.author,
});

@connect(mapState)
export default class SideBar extends PureComponent {

  render() {
    const { menus, open, author, onRequestClose } = this.props;

    const drawerProps = {
      open,
      onClose: onRequestClose,
    };

    return (
      <SideMenuBar
        {...drawerProps}
        menus={menus}
        renderHeader={() => <Author {...author} />}
      />
    );
  }
}

