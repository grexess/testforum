import './newEntries.html';

import {
    Forum
} from '../../../imports/api/collections.js';

Template.newEntries.events({

    'click .newThreadClose'(event) {
        event.preventDefault();
        $('#newThread').hide();
    },

    'click .newPostClose'(event) {
        event.preventDefault();
        $('#newPost').hide();
    },

    'click .newThreadSend'(event) {
        event.preventDefault();

        var topicId = $('#threadId').data("id");

        var objToAdd = {
            _id: Random.id(),
            content: $('#newThreadInput').val(),
            createdBy: Meteor.user().emails[0].address,
            createdAt: new Date()
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

        $('#newThread').hide();
    },

    'click .newPostSend'(event) {
        event.preventDefault();

        var threadId = $('#postId').data("threadId");
        var forumId = $('#postId').data("forumId");

        //array of all threads
        var threads = Forum.find({ "_id": forumId }).fetch()[0].threads;
        //current Thread
        var currThread = $.grep(threads, function (e) { return e._id == threadId; })[0];
        //add new field to current thread

        var objToAdd = {
            _id: Random.id(),
            content: $('#newPostInput').val(),
            createdBy: Meteor.user().emails[0].address,
            createdAt: new Date()
        };

        var currPosts = currThread.comment;

        if (currPosts) {
            currPosts.push(objToAdd)
        }else{
          //first post
            currThread.comment = [objToAdd];
        }

        Forum.update({ _id: forumId }, {
            $set: { threads: threads }
        }, function (error, result) {
            if (result) {
                Bert.alert('Gespeichert', 'success');
            };
            if (error) {
                Bert.alert('Fehler beim Speichern', 'danger');
            };
        });

        $('#newPost').hide();
    }
});