document.addEventListener('DOMContentLoaded', () => {

    // Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
    const username = localStorage.getItem('user');

    document.querySelector('#submit_channel').disabled = true;


        // Enable button only if there is text in the input field
        document.querySelector('#channel_name').onkeyup = () => {
    	if (document.querySelector('#channel_name').value.length > 2)
        	document.querySelector('#submit_channel').disabled = false;
        else
        	document.querySelector('#submit_channel').disabled = true;
        };


	     // wait for click on .list class
	            document.querySelectorAll(".channel-links").forEach(link => {
                    link.onclick = () => {
                        const current_channel = link.dataset.channel;
                        localStorage.setItem('current_channel', current_channel);
                        // Clear the messages before joining the new channel
                        document.querySelector('#messages').delete(li)
                        // join the new room
                        socket.emit('joined channel', {'room': current_channel, 'username': username});
                        // do not reload
                        return false;
                    };
                });

	if (localStorage.getItem('current_channel'))
    		{
            // when user is known and room is stored, join the right room straight away (e.g. after opening the page)
            const current_channel = localStorage.getItem('current_channel');
            socket.emit('join', {'room': current_channel, 'username': username});
		}
	// if no room is stored locally, join the main channel
	else localStorage.setItem('current_channel', 'General Channel');

});
