import './content.html';
import './login.html';

import {
  Forum
} from '../../../imports/api/collections.js';

Template.content.onCreated(function () {
  console.log("Content Page created");
  Meteor.subscribe('forum');
});


if (Meteor.isClient) {

  Template.content.helpers({
    forum() {
      return Forum.find({});
    }
  });

}

Template.content.events({

  'click .postBtn'(event) {
    event.preventDefault();

    var topicId = event.currentTarget.id.substring(3);

    var objToAdd = {
      _id: Random.id(),
      content: $('#inp' + topicId).val()
    };

    Forum.update({ _id: topicId }, {
      $push: { threads: objToAdd }
    }, function (error, result) {
      if (result) {
        Bert.alert('Gespeichert', 'success');
      };
      if (error) {
        Bert.alert('Fehler beim Speichern', 'danger');
      };
    });
  },

  'click .newThread'(event) {
    event.preventDefault();
    $('#newThread').show();
    $('#threadName').text(event.currentTarget.dataset.name);
    $('#threadId').data("id", event.currentTarget.dataset.id);
  },

  'click .newPost'(event) {
    event.preventDefault();
    $('#newPost').show();
    $('#postId').data("threadId", event.currentTarget.dataset.threadid);
    $('#postId').data("forumId", event.currentTarget.dataset.forumid);
  }
});