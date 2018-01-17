import React from 'react';
import { Redirect, Route, Switch } from 'dva/router';
import Loadable from 'react-loadable';
import { withStyles } from 'material-ui/styles';

import Loading from '../components/Loading';
import withRoot from '../components/withRoot';

const Home = Loadable({
  loading: () => <Loading />,
  loader: () => import('./Home'),
});

const Post = Loadable({
  loading: () => <Loading />,
  loader: () => import('./Post'),
});

const Archieve = Loadable({
  loading: () => <Loading />,
  loader: () => import('./Archieve'),
});

const Category = Loadable({
  loading: () => <Loading />,
  loader: () => import('./Category'),
});

@withRoot()
@withStyles(styles)
class App extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/post" component={Post} />
        <Redirect exact from="/archieve" to="/post" />
        <Redirect exact from="/category" to="/post" />
        <Route exact path="/archieve/:id" component={Archieve} />
        <Route exact path="/category/:id" component={Category} />
      </Switch>
    );
  }
}

const styles = {
  root: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

export default App;
