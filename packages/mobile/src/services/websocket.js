import socketio from 'socket.io-client';

const client = socketio('http://192.168.1.105:3333');

export default client;
