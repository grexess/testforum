import './login.html';

Template.login.events({

    'click #login' (event) {
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password, function (error) {
            if (error) {
                Bert.alert(error.reason, 'danger');
            } else {
                Bert.alert("User logged on", 'success');
                $('#id01').hide();
            }
        });
    },

    'click .gologin' (event) {
        event.preventDefault();
        $('#id01').show();
        $('#id02').hide();
        $('#id03').hide();
    },

    'click .goreset' (event) {
        event.preventDefault();
        $('#id01').hide();
        $('#id02').hide();
        $('#id03').show();
    }    ,

    'click .goregister' (event) {
        event.preventDefault();
        $('#id01').hide();
        $('#id03').hide();
        $('#id02').show();
    }
});