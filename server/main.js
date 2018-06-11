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

/*
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

    var i, j;
    for (i = 0; i < Discussions.topics.length; i++) {

     
      Discussions.topics[i].threads = Threads.find({
        topicId: Discussions.topics[i]._id
      }).fetch();



      for (j = 0; j < Discussions.topics[i].threads.length; j++) {

        console.log('loop to posts' + Discussions.topics[i].threads.length);
        console.log('post:' + Discussions.topics[i].threads[j]._id)
        Discussions.topics[i].threads[j].posts = Posts.find({
          threadId: Discussions.topics[i].threads[j]._id
        }).fetch();
      }
    }
    return Discussions;
  }
})*/