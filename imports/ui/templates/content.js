import './content.html';

import {
  Threads
} from '../../../imports/api/collections.js';

import {
  Posts
} from '../../../imports/api/collections.js';


if (Meteor.isClient) {

  Template.content.helpers({
    allTopics: function () {
      var Discussions = ReactiveMethod.call("allTopics");
      if (Discussions) {
        return Discussions.topics;
      }
    }
  })
}

Template.content.events({

  'click .topicsBtn' (event) {
    event.preventDefault();

    var topicId = event.currentTarget.id.substring(3);

    Threads.insert({
      //author: user.emails[0].address,
      createdAt: new Date(),
      topicId: topicId,
      content: $('#inp' + topicId).val()
    }, function (error, result) {
      if (result) {
        Bert.alert('Gespeichert', 'success');
      };
      if (error) {
        Bert.alert('Fehler beim Speichern', 'danger');
      };
    });
  },

  'click .postBtn' (event) {
    event.preventDefault();

    var threadId = event.currentTarget.id.substring(3)

    Posts.insert({
      //author: user.emails[0].address,
      createdAt: new Date(),
      threadId: threadId,
      content: $('#inp' + threadId).val()
    }, function (error, result) {
      if (result) {
        Bert.alert('Post gespeichert', 'success');
      };
      if (error) {
        Bert.alert('Fehler beim Speichern des Posts', 'danger');
      };
    });
  }
});