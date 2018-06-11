import './content.html';

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
    },
  });
}




Template.content.events({

  'click .topicsBtn'(event) {
    event.preventDefault();

    var topicId = event.currentTarget.id.substring(3);

    var objToAdd = {
      threads: [
        {
          _id: Random.id(),
          content: $('#inp' + topicId).val()
        }
      ]
    };

    Forum.update({ _id: topicId }, {
      $set: objToAdd,
    }, function (error, result) {
      if (result) {
        Bert.alert('Gespeichert', 'success');
      };
      if (error) {
        Bert.alert('Fehler beim Speichern', 'danger');
      };
    });
  }

  /*
  Forum.insert({
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
}*/
});