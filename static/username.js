document.addEventListener('DOMContentLoaded', () => {

        //localStorage.clear();

        if (localStorage.getItem('user')) {
            let username = localStorage.getItem('user');
            document.querySelector('#welcome_message').innerHTML = `Welcome back ${username}!`;
        }

        else {


            $("#prompt_username").modal({
                backdrop: 'static',
                keyboard: false
            });

            // By default, submit button is disabled
            document.querySelector('#submit_name').disabled = true;

            document.querySelector('#welcome_message').innerHTML = `Pick a username!`;

            // Enable button only if there is text in the input field
            document.querySelector('#username').onkeyup = () => {

                if (document.querySelector('#username').value.length > 2 && document.querySelector('#username').value.length < 12)
                    document.querySelector('#submit_name').disabled = false;
                else
                    document.querySelector('#submit_name').disabled = true;
            }


        document.querySelector('#input_name').onsubmit = () => {

            // Say hello to the user
            let username = document.querySelector('#username').value;
            // Store username in local storage
            localStorage.setItem('user', username);
            document.querySelector('#welcome_message').innerHTML = `Hello ${username}!`;
            $("#prompt_username").modal('hide');
            // Stop form from submitting
            return false;
        }


        }


    });