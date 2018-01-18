import React, { cloneElement } from 'react';
import styled from 'styled-components';
import { connect } from 'dva';
import { Link as rLink } from 'dva/router';

import Drawer from 'material-ui/Drawer';
import rAvatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import { MenuList, MenuItem as rMenuItem } from 'material-ui/Menu';
import Divider from 'material-ui/Divider';

import Inbox from 'material-ui-icons/Inbox';
import ChromeReadMode from 'material-ui-icons/ChromeReaderMode';
import Dropdown from 'material-ui-icons/ArrowDropDown';
import Info from 'material-ui-icons/Info';

const ICONS = {
  inbox: <Inbox />,
  chromeReadMode: <ChromeReadMode />,
  dropdown: <Dropdown />,
  info: <Info />,
};

const Wrapper = styled.div`
  width: 280px;
  color: #e0e0e0;
  background-color: transparent;
  transition: all .5s cubic-bezier(.55,0,.1,1);

  @media (max-width: 840px) {
    min-width: 15pc;
    width: 15pc;
    transform: translate3d(0, 0, 0);
  }
`;

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

const MenuItem = styled(rMenuItem)`
  &:hover {
    background-color: #cecece;
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

const MenuWrapper = styled.div`
  color: #757575;
`;

const Badge = styled.div`
  color: #fff;
  font-size: 10px;
  font-weight: 400;
  text-shadow: 1px 1px 3px #444;
  user-select: none;
  vertical-align: baseline;
  background-color: #607d8b;
  position: absolute;
  top: 12px;
  right: 27px; // 24px;
  transition: .3s;
  width: 18px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  padding: 0 3px;
`;

const VoeMenuItem = ({ path, divide, iconLeft, iconRight, label, hasSubMenu, badge, submenus, selected, ...rest }) => (
  divide ? <Divider /> : (
    !path ? (
      <MenuItem {...rest}>
        {iconLeft && cloneElement(ICONS[iconLeft], { style: { marginRight: 32 } })}
        {label}
        {iconRight && cloneElement(ICONS[iconRight], {
          style: {
            position: 'absolute',
            right: 24,
            transition: '.3s',
            transform: `rotate(${selected ? '-180deg' : '0deg'})`,
          },
        })}
        {badge ? <Badge>{badge}</Badge> : null}
      </MenuItem>
    ) : (
      <Link to={path}>
        <MenuItem {...rest}>
          {iconLeft && cloneElement(ICONS[iconLeft], { style: { marginRight: 32 } })}
          {label}
          {iconRight && cloneElement(ICONS[iconRight], {
            style: {
              position: 'absolute',
              right: 24,
              transition: '.3s',
              transform: `rotate(${selected ? '-180deg' : '0deg'})`,
            },
          })}
          {badge ? <Badge>{badge}</Badge> : null}
        </MenuItem>
      </Link>
    )
  )
);

const Link = styled(rLink)`
  color: inherit;
  text-decoration: none;
`;

const VoeSubMenu = ({ key, onMenuSelect, submenus = [], ...rest }) => (
  <div>
    <VoeMenuItem {...rest} divider />
    <MenuList style={{ padding: 0 }}>
      {submenus.map(menu => <VoeMenuItem {...menu} onClick={() => onMenuSelect(menu.key)} />)}
    </MenuList>
  </div>
);

const VoeMenu = ({ menus = [], onMenuSelect, ...rest }) => (
  <MenuList>
    {menus.map(menu => menu.selected && menu.submenus
      ? (
        <VoeSubMenu
          {...menu}
          onClick={() => onMenuSelect(menu.key, true)}
          onMenuSelect={onMenuSelect}
        />
      ) : (
        <VoeMenuItem
          {...menu}
          onClick={() => onMenuSelect(menu.key, !!menu.submenus)}
        />
      ))}
  </MenuList>
);

const mapState = ({ app, menu }) => ({
  menus: menu,
  author: app.author,
});

@connect(mapState)
export default class SideBar extends React.PureComponent {
  state = {
    // menus: [
    //   { key: 'home', label: '主页' },
    //   {
    //     key: 'inbox',
    //     iconLeft: <Inbox />,
    //     iconRight: <Dropdown />,
    //     label: '归档',
    //     // selected: true,
    //     submenus: [
    //       { key: 'Oct 2017', label: '十月 2017', badge: 1 },
    //       { key: 'Sep 2017', label: '九月 2017', badge: 1 },
    //       { key: 'Aug 2017', label: '八月 2017', badge: 2 },
    //       { key: 'Jan 2017', label: '六月 2017', badge: 4 },
    //       { key: 'Aus 2017', label: '四月 2017', badge: 1 },
    //     ],
    //   },
    //   {
    //     key: 'category',
    //     iconLeft: <ChromeReadMode />,
    //     iconRight: <Dropdown />,
    //     label: '分类',
    //     hasSubMenu: true,
    //     submenus: [
    //       { key: 'event', label: '事件簿', badge: 3 },
    //       { key: 'share', label: '分享镜', badge: 11 },
    //       { key: 'create', label: '创作集', badge: 6 },
    //       { key: 'tech', label: '技术向', badge: 12 },
    //       { key: 'self-talk', label: '自言语', badge: 3 },
    //     ],
    //   },
    //   { key: 'c-divide', divide: true },
    //   { key: 'about-me', label: '关于我' },
    //   { key: 'tag-cloud', label: '标签云' },
    //   { key: 'friend-link', label: '友情链接' },
    //   { key: 'f-divide', divide: true },
    //   { key: 'theme', label: '主题 - Material', iconRight: <Info /> },
    // ],
    menus: this.props.menus,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.menus !== nextProps.menus) {
      this.setState({ menus: nextProps.menus });
    }
  }

  onMenuSelect = (key, isSubMenu = false) => {
    if (!isSubMenu) {
      return this.props.onRequestClose();
    }

    this.setState({
      menus: this.state.menus.map(menu => {
        if (!menu.submenus) return menu;

        if (key === menu.key) {
          return { ...menu, selected: !menu.selected };
        } else if (key !== menu.key && menu.selected === true) {
          return { ...menu, selected: false };
        } else {
          return menu;
        }
      }),
    });
  };

  render() {
    const { open, author, onRequestClose } = this.props;
    const { menus } = this.state;

    const drawerProps = {
      open,
      onClose: onRequestClose,
    };

    return (
      <Drawer {...drawerProps}>
        <Wrapper>
          <Author {...author} />
          <VoeMenu
            menus={menus}
            onMenuSelect={this.onMenuSelect}
          />
        </Wrapper>
      </Drawer>
    );
  }
}
