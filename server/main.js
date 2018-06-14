import {
  Meteor
} from 'meteor/meteor';

import {
  Forum
} from '../imports/api/collections.js';

Forum.allow({
  'insert': function (userId, doc) {
    /* user and doc checks ,
    return true to allow insert */
    return true;
  },
  'remove': function (userId, doc) {
    /* user and doc checks ,
    return true to allow insert */
    return true;
  },
  'update': function (userId, doc) {
    /* user and doc checks ,
    return true to allow insert */
    return true;
  }
});

Meteor.startup(() => {
  if (Forum.find().count() === 0) {
    _.each(['MadEast', 'Andere Events', 'Sonstiges'], function (forumName) {
      Forum.insert({
        name: forumName
      });
    });
  }
});

Meteor.publish('forum', function () {
  return Forum.find({});
});

/*allow CRUD actions for this collection on client side */
Forum.allow({
  'insert': function (thread) {
    return true;
  }
})
