import os
import requests 

from flask import Flask, jsonify, render_template, request, redirect, url_for
from flask_socketio import SocketIO, emit, join_room, leave_room
from datetime import datetime
from collections import defaultdict

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)


	
# create list for the desired channels:
my_channels = {"General Channel"}
all_messages = defaultdict(list)



@app.route("/")
def index():
	return render_template("index.html", my_channels=my_channels)

@app.route("/channels", methods=['POST'])
def channels():
	new_channel = request.form.get('new_channel')
	my_channels.add(new_channel)
	return redirect(url_for("index"))

@socketio.on('send message')
def message(data):
	# basic needed info
	username = data['username']
	message = data['message']
	date = datetime.now().strftime("%a %H:%M ")
	# creating unique session id 
	session_id = request.sid 
	new_message = session_id + message + ' (' + username + ', '+ date +')'
	# record the message
	current_channel = data['current_channel']
	all_messages[current_channel].append(new_message)
	emit('cast message', new_message, current_channel= current_channel)


@socketio.on('joined channel')
def joined_channel(data):
	username = data['username']
	current_channel = data['current_channel']
	join_room(selected_channel)
	# creating unique session id
	session_id = request.sid  
	message = session_id + username + 'has joined room' + current_channel
	for element in all_messages[selected_channel]:
		emit('cast message', element, current_channel=session_id)
	emit('cast message', message, current_channel=current_channel)



if __name__ == '__main__':
	socketio.run(app)