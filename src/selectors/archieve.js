import { createSelector } from 'reselect';

import { stateAppSelector } from './app';

export const stateArchieveSelector = state => state.archieve;

export const currentArchieveSelector = createSelector(
  stateAppSelector,
  ({ archieve }) => archieve,
);

export const currentArchievePostSelector = createSelector(
  currentArchieveSelector,
  stateArchieveSelector,
  (current, data) => {
    console.log(current, data);
    return (data[current] || {}).posts;
  },
);