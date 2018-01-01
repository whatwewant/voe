import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'dva';
import { createSelector } from 'reselect';

import Article from '../components/Article';

import { statePostSelector, currentPostSelector } from '../selectors/post';

const Wrap = styled.div`
  padding-top: 165px; // 8px;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 480px) {
    display: block;
    padding-top: 0px;
  }
`;

const mapState = createSelector(
  [statePostSelector, currentPostSelector],
  (posts, postId) => ({
    post: posts[postId] || {},
  }),
);

const mapActions = dispatch => ({
  toPost(post) {
    dispatch({ type: 'app/set/post', payload: post });
  },
});

@connect(mapState, mapActions)
export default class Post extends PureComponent {

  componentWillMount() {
    this.props.toPost(this.props.match.params.id);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { post } = this.props;
    return (
      <Wrap>
        <Article {...post} />
      </Wrap>
    );
  }
}