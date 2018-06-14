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

  'click .topicsBtn'(event) {
    event.preventDefault();

    var topicId = event.currentTarget.id.substring(3);

    var objToAdd = {
          _id: Random.id(),
          content: $('#inp' + topicId).val()
        };

    Forum.update({ _id: topicId }, {
      $push: {threads: objToAdd}
    }, function (error, result) {
      if (result) {
        Bert.alert('Gespeichert', 'success');
      };
      if (error) {
        Bert.alert('Fehler beim Speichern', 'danger');
      };
    });  
  },

  'click .postBtn'(event) {
    event.preventDefault();

    var topicId = event.currentTarget.id.substring(3);

    var objToAdd = {
          _id: Random.id(),
          content: $('#inp' + topicId).val()
        };

    Forum.update({ _id: topicId }, {
      $push: {threads: objToAdd}
    }, function (error, result) {
      if (result) {
        Bert.alert('Gespeichert', 'success');
      };
      if (error) {
        Bert.alert('Fehler beim Speichern', 'danger');
      };
    });  
  }

});