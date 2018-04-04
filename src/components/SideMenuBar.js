import React, { cloneElement } from 'react';
import styled from 'styled-components';
import { Link as rLink } from 'dva/router';

import Drawer from 'material-ui/Drawer';
import Paper from 'material-ui/Paper';
import { MenuList, MenuItem as rMenuItem } from 'material-ui/Menu';
import Divider from 'material-ui/Divider';

import Inbox from 'material-ui-icons/Inbox';
import ChromeReadMode from 'material-ui-icons/ChromeReaderMode';
import Dropdown from 'material-ui-icons/ArrowDropDown';
import Info from 'material-ui-icons/Info';

import NOOP from '../utils/noop';

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

const MenuItem = styled(rMenuItem)`
  &:hover {
    background-color: #cecece;
  }
`;

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

export default class SideBar extends React.PureComponent {

  static defaultProps = {
    renderHeader: NOOP,
    renderFooter: NOOP,
  };

  state = {
    menus: this.props.menus,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.menus !== nextProps.menus) {
      this.setState({ menus: nextProps.menus });
    }
  }

  onMenuSelect = (key, isSubMenu = false) => {
    if (!isSubMenu) {
      return this.props.onClose();
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
    const { open, onClose, renderHeader, renderFooter } = this.props;
    const { menus } = this.state;

    const drawerProps = {
      open,
      onClose,
    };

    return (
      <Drawer {...drawerProps}>
        <Wrapper>
          {renderHeader()}
          <VoeMenu
            menus={menus}
            onMenuSelect={this.onMenuSelect}
          />
          {renderFooter()}
        </Wrapper>
      </Drawer>
    );
  }
}
