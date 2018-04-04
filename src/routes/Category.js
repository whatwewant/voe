import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'dva';
import { createSelector } from 'reselect';

import { withStyles } from 'material-ui/styles';
import List, { ListItem } from 'material-ui/List';

import FlatList from '../components/FlatList';
import { Abstruct } from '../components/Article';
import Empty from '../components/Empty';

import { stateCategorySelector, currentCategoryPostSelector } from '../selectors/category';
import { statePostSelector } from '../selectors/post';

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
  currentCategoryPostSelector,
  statePostSelector,
  stateCategorySelector,
  (keys, posts, cats) => ({ posts: keys.map(e => ({ ...posts[e], category: cats[posts[e].category] })) }),
);

const mapActions = dispatch => ({
  toCategory(category) {
    dispatch({ type: 'app/set/category', payload: category });
  },
});

@connect(mapState, mapActions)
@withStyles(styles)
export default class Category extends PureComponent {

  componentWillMount() {
    this.props.toCategory(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.props.toCategory(nextProps.match.params.id);
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.props.toCategory(nextProps.match.params.id);
    }
  }

  render() {
    const { classes, posts } = this.props;
    console.log(posts);

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
