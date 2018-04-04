import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { createSelector } from 'reselect';
import { connect } from 'dva';

import { withStyles } from 'material-ui/styles';
import List, { ListItem } from 'material-ui/List';

import FlatList from '../components/FlatList';
import { Abstruct } from '../components/Article';
import Empty from '../components/Empty';

import { stateCategorySelector } from '../selectors/category';
import { currentArchievePostSelector } from '../selectors/archieve';
import { statePostSelector } from '../selectors/post';

const styles = theme => ({});

const mapState = createSelector(
  currentArchievePostSelector,
  statePostSelector,
  stateCategorySelector,
  (keys, posts, cats) => ({ posts: keys.map(e => ({ ...posts[e], category: cats[posts[e].category] })) }),
);

const mapActions = dispatch => ({
  toArchieve(archieve) {
    dispatch({ type: 'app/set/archieve', payload: archieve });
  },
});

@connect(mapState, mapActions)
@withStyles(styles)
export default class Archieve extends PureComponent {
  static defaultProps = {
    toArchieve: () => null,
  };

  componentWillMount() {
    this.props.toArchieve(this.getArchieve(this.props));
  }

  componentWillReceiveProps(nextProps) {
    if (this.getArchieve(this.props) !== this.getArchieve(nextProps)) {
      this.props.toArchieve(this.getArchieve(nextProps));
    }
  }

  getArchieve = (props) => `${props.match.params.year}/${props.match.params.month}`;

  render() {
    const { classes, posts } = this.props;

    return (
      <FlatList
        data={posts}
        renderEmpty={() => (
          <Empty />
        )}
        renderItem={({ item: post }) => (
          <Abstruct {...post} />
        )}
      />
    );
  }
}
