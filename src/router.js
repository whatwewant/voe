import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import App from './routes/App';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  );
}

export default RouterConfig;
