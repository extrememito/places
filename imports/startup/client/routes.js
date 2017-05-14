import React from 'react';
import { render } from 'react-dom';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory
} from 'react-router';

import App from '../../client/App';
import AddPlace from '../../client/ui/components/AddPlace'
import Place from '../../client/ui/components/Place'
import Register from '../../client/ui/components/Register'
import Login from '../../client/ui/components/Login'
import User from '../../client/ui/components/User'
import Edit from '../../client/ui/components/edit/Edit'
import AddImage from '../../client/ui/components/edit/AddImage.js'

Meteor.startup( () => {
  render(
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <Route path="addplace" component={AddPlace} />
          <Route path="register" component={Register} />
          <Route path="login" component={Login} />
          <Route path="user/:userId" component={User} />
          <Route path="edit/:placeId(/:tab)" component={Edit} />
            <Route path=":placeId" component={Place} />
          </Route>
      </Router>,
      document.getElementById('render-target')
  );
});
