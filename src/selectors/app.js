import { createSelector } from 'reselect';

export const stateAppSelector = state => state.app;

export const titleBannerSelector = createSelector(
  stateAppSelector,
  ({ title, banner }) => ({
    title,
    banner,
  }),
);

export const authorSelector = createSelector(
  stateAppSelector,
  ({ author }) => author,
);