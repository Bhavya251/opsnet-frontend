import io from 'socket.io-client';
import { getToken } from './auth';

const socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:8080', {
  auth: {
    token: getToken(),
  },
  autoConnect: false,
});

export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

export const subscribeToChat = (chatId, callback) => {
  socket.emit('subscribe', chatId);
  socket.on('message', callback);
};

export const unsubscribeFromChat = (chatId) => {
  socket.emit('unsubscribe', chatId);
  socket.off('message');
};

export const sendMessage = (chatId, message) => {
  socket.emit('sendMessage', { chatId, message });
};

export default socket;