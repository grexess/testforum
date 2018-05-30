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
 
  Meteor.subscribe('topics');
  /*
  Meteor.subscribe('posts');
  console.log("Collections subscribed");
*/

});

Template.content.helpers({

  getThreads: function (id) {

    console.log(id);
    /*
    Meteor.call('getThreads', id, function (error, result) {
      if(result){
        alert('result');
      }
      if(error){
        alert('error');
      }
    });*/
  }
})


if (Meteor.isClient) {
  Template.content.helpers({
    topics() {
      return Topics.find({});
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
