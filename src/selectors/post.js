import { createSelector } from 'reselect';

import { stateAppSelector } from './app';
import { stateCategorySelector } from './category';

export const statePostSelector = state => state.post;

// one
export const retrieve = (post, category) => ({
  ...post,
  category: category[post.category],
});

// const limitPostSelector = (offset = 0, limit = 5) => createSelector(
//   postSelector,
//   posts => Object.values(posts).slice(offset, limit),
// );

// many
export default createSelector(
  [statePostSelector, stateCategorySelector],
  (posts = {}, category) => {
    return Object.values(posts).map(post => retrieve(post, category));
  },
);

export const currentPostSelector = createSelector(
  stateAppSelector,
  ({ post }) => post,
);