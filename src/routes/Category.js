import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'dva';
import { createSelector } from 'reselect';

import { withStyles } from 'material-ui/styles';
import List, { ListItem } from 'material-ui/List';

import { Abstruct } from '../components/Article';

import { currentCategorySelector } from '../selectors/category';
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
  currentCategorySelector,
  (posts, cat) => ({
    posts: posts.filter(e => e.category.id === cat),
    cat,
  }),
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
