import { Meteor } from 'meteor/meteor';

import '../imports/api/collections'
import '../imports/api/publications'
import '../imports/api/methods/places'
import '../imports/api/methods/users'
import '../imports/api/methods/images'

Meteor.startup(() => {
  // code to run on server at startup
});
