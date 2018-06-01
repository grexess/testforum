import './content.html';

import {
  Topics
} from '../../../imports/api/collections.js';

import {
  Threads
} from '../../../imports/api/collections.js';

import {
  Posts
} from '../../../imports/api/collections.js';

Template.content.onCreated(function (id) {

  //Meteor.subscribe('topics');
  /*
  Meteor.subscribe('posts');
  console.log("Collections subscribed");
*/

});

if (Meteor.isClient) {

  Template.content.helpers({
    allTopics: function () {
      console.log("request allTopics")
      var Discussions = ReactiveMethod.call("allTopics");
      return Discussions.topics;
    }
  })
}

Template.content.events({

  'click .topicsBtn'(event) {
    event.preventDefault();
    var id = event.currentTarget.id.substring(3);

    Meteor.call('createThread', id, $('#inp' + id).val(), function (error, result) {
    });
  }
});
