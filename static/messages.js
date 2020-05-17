document.addEventListener('DOMContentLoaded', () => {

	// only allow non-empty input field messages
	document.querySelector('#submit_message').disabled = true;

	if (document.querySelector('#submit_message').value.length > 0) {
		document.querySelector('#submit_message').disabled = false;
	} else {
		document.querySelector('submit_message') = true;
	}

	// connecting to the websocket
	var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

	// after web socket connection configure/enable the messages to work
	socket.on('connect', () => {
		document.querySelector('#send_message').onsubmit = () => {
		// get needed data and emit that message has been sent
		const message = document.querySelector('#message').value;
		const username = localStorage.getItem('user');
		const current_channel = localStorage.getItem('current_channel');
		socket.emit('send message', {'message': message, 'username': username, 'current_channel': current_channel})

		// make the message empty again
		document.querySelector('#message').value = '';
		document.querySelector('#submit_message').disabled = true;
		return false;
	};
});

	socket.on('cast message', data => {

		var new_message = data.slice(32);
        // Create new item for list
        const li = document.createElement('li');
        li.innerHTML = new_message;

        var sid = data.slice(0,32);

        if (sid == socket.id)
        {
        	li.className += "list-group-item list-group-item-primary";
        }

        else li.className += "list-group-item list-group-item-info";

       // Write the message to screen
        document.querySelector('#messages').prepend(li);
    });
});