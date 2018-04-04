import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { createSelector } from 'reselect';
import { connect } from 'dva';

import { withStyles } from 'material-ui/styles';
import List, { ListItem } from 'material-ui/List';

import FlatList from '../components/FlatList';
import { Abstruct } from '../components/Article';

import postSelector from '../selectors/post';

const styles = theme => ({});

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
      <FlatList
        data={posts}
        renderItem={post => (
          <Abstruct {...post} />
        )}
      />
    );
  }
}
