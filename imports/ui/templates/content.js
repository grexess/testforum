import './content.html';

Template.content.onCreated(function () {
    Meteor.subscribe('topics');
    console.log("Topics subscribed");
  });
  