import React, { PureComponent } from 'react';
import styled from 'styled-components';

import Button from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';

const ITEM_HEIGHT = 48;

const Wrap = styled.div`
  position: relative;
`;

export default class DropMenu extends PureComponent {

  static defaultProps = {
    icon: () => null,
    menus: [],
    onSelect: () => null,
  };

  state = {
    anchorEl: null,
    show: false,
  };

  onSelect = (value, index) => {
    this.props.onSelect(value, index);

    setTimeout(() => {
      this.onClose();
    }, 100);
  };

  onOpen = event => this.setState({ anchorEl: event.currentTarget, show: true });

  onClose = () => this.setState({ show: false });

  render() {
    const { icon: Icon, menus, ...restProps } = this.props;
    const { anchorEl, show } = this.state;

    return (
      <Wrap {...restProps}>
        <Button
          aria-label="More"
          aria-owns={open ? 'long-menu' : null}
          aria-haspopup="true"
          onClick={this.onOpen}
        >
          <Icon />
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={show}
          onClick={this.onClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
          }}
        >
          {menus.map((e, i) => (
            <MenuItem
              key={i}
              onClick={() => this.onSelect(e, i)}
            >
              {e.label}
            </MenuItem>
          ))}
        </Menu>
      </Wrap>
    );
  }
}
