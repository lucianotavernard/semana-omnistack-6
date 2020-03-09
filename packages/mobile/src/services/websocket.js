import socketio from 'socket.io-client';

const client = socketio('http://localhost:3333');

export default client;
