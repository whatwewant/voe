import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { createSelector } from 'reselect';
import { connect } from 'dva';

import { withStyles } from 'material-ui/styles';
import List, { ListItem } from 'material-ui/List';

import { Abstruct } from '../components/Article';

import postSelector from '../selectors/post';

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

const mapState = createSelector(
  postSelector,
  posts => ({ posts }),
);

@connect(mapState)
@withStyles(styles)
export default class Archieve extends PureComponent {
  render() {
    const { classes, posts } = this.props;

    return (
      <List className={classes.many}>
        {posts.map((e, i) => (
          <ListItem key={i} className={classes.one}>
            <Abstruct {...e} />
          </ListItem>
        ))}
      </List>
    );
  }
}
