import {
  Meteor
} from 'meteor/meteor';

import {
  Topics
} from '../imports/api/collections.js';

import {
  Threads
} from '../imports/api/collections.js';

import {
  Posts
} from '../imports/api/collections.js';

Meteor.startup(() => {
  if (Topics.find().count() === 0) {
    _.each(['MadEast', 'Andere Events', 'Sonstiges'], function (topicName) {
      Topics.insert({
        name: topicName
      });
    });
  }
});

/*allow CRUD actions for this collection on client side */
Threads.allow({
  'insert': function (thread) {
    return true;
  }
})

Meteor.methods({
  createThread: function (topicId, content) {
    var thread = {
      //author: user.emails[0].address,
      createdAt: new Date(),
      topicId: topicId,
      content: content
    };
    console.log("create thread:" + thread.topicId + thread.content);
    return Threads.insert({
      //author: user.emails[0].address,
      createdAt: new Date(),
      topicId: topicId,
      content: content
    });
  },

  getThreads: function (topicId) {
    console.log('getThread:' + topicId);
    var x = Threads.find({
      topicId: topicId
    });
    alert(x);
    return x;
  },

  allTopics: function () {
    console.log('topics requested');

    //here we can collect anything
    var Discussions = {};
    Discussions.id = "1";
    debugger;
    Discussions.topics = Topics.find({}).fetch();

    var i;
    for (i = 0; i < Discussions.topics.length; i++) {
      threads = Threads.find({
        topicId: Discussions.topics[i]._id
      }).fetch();
      Discussions.topics[i].threads  =  Threads.find({
        topicId: Discussions.topics[i]._id
      }).fetch();
    }
    return Discussions;
  }
})