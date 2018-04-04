import React, { PureComponent } from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem } from 'material-ui/List';

import NOOP from '../utils/noop';

const styles = theme => ({
  many: {
    maxWidth: 900,
    margin: '0 auto',
    paddingTop: 168,

    '@media (max-width: 480px)': {
      paddingTop: 8,
    },
  },
  one: {
    padding: 0,
  },
});

@withStyles(styles)
export default class FlatList extends PureComponent {
  static defaultProps = {
    data: [],
    renderItem: NOOP,
    renderEmpty: NOOP,
  };

  render() {
    const { data, classes, renderItem, renderEmpty } = this.props;

    return (
      <List className={classes.many}>
        {data.length === 0 && renderEmpty()}
        {data.map((e, index) => (
          <ListItem key={e.id || index.toString()} className={classes.one}>
            {renderItem({ item: e, index })}
          </ListItem>
        ))}
      </List>
    );
  }
}