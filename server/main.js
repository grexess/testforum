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

Meteor.publish('topics', function () {
  console.log('topics published');
  return Topics.find();
});

Meteor.publish('topic', function (id) {
  check(id, String);
  return Topics.find({
    _id: id
  });
});

Meteor.publish('threads', function (topicId) {
  console.log('Server: ' + topicId);
  return Threads.find({
    //topicId: topicId
  });
});

Meteor.publish('thread', function (id) {
  check(id, String);
  return Threads.find({
    _id: id
  });
});

Meteor.publish('posts', function (threadId) {
  return Posts.find({
    threadId: threadId
  });
});

Meteor.publish('post', function (id) {
  check(id, String);
  return Posts.find({
    _id: id
  });
});

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
  }
})