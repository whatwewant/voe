import { createSelector } from 'reselect';

import { stateAppSelector } from './app';

export const stateCategorySelector = state => state.category;

export const currentCategorySelector = createSelector(
  stateAppSelector,
  ({ category }) => category,
);