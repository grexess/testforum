import './header.html';

Template.header.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    },

    'click .zlogin': function(event){
        event.preventDefault();
        $('#id01').show();
    }

});