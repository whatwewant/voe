import React from 'react';
import dynamic from 'dva/dynamic';
import { Router, Route } from 'dva/router';

import Loading from './components/Loading';

dynamic.setDefaultLoadingComponent = Loading;

function RouterConfig({ app, history }) {
  const App = dynamic({
    app,
    component: () => import('./routes/App'),
  });

  return (
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  );
}

export default RouterConfig;
