import './register.html';

Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('#regmail').val();
        var password = $('#regpwd').val();
        Accounts.createUser({
            email: email,
            password: password
        });
    }
});

