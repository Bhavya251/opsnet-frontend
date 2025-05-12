import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, IconButton, Avatar, Typography, Divider, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useTheme } from '../../context/ThemeContext';

const ChatWindow = ({ currentChat, socket }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);
  const { theme } = useTheme();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Fetch messages for the current chat
    if (currentChat) {
      // TODO: Fetch messages from API
      const dummyMessages = [
        { id: 1, sender: 'user1', text: 'Hello there!', timestamp: new Date(), isCurrentUser: false },
        { id: 2, sender: 'me', text: 'Hi! How are you?', timestamp: new Date(), isCurrentUser: true },
      ];
      setMessages(dummyMessages);
    }
  }, [currentChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (message.trim() === '' && !file) return;
    
    const newMessage = {
      id: Date.now(),
      sender: 'me',
      text: message,
      file: file,
      timestamp: new Date(),
      isCurrentUser: true,
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
    setFile(null);
    
    // TODO: Send message via WebSocket
    if (socket) {
      socket.emit('sendMessage', {
        chatId: currentChat.id,
        message: newMessage,
      });
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setMessage(selectedFile.name);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    // Note: This only clears the local view, messages remain in the database
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 64px)',
        backgroundColor: theme.colors.background,
      }}
    >
      {currentChat ? (
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: 2,
              backgroundColor: theme.colors.surface,
              borderBottom: `1px solid ${theme.colors.muted}`,
            }}
          >
            <Avatar sx={{ mr: 2 }}>{currentChat.username.charAt(0).toUpperCase()}</Avatar>
            <Typography variant="h6" sx={{ color: theme.colors.text }}>
              {currentChat.username}
            </Typography>
            <Button
              onClick={handleClearChat}
              sx={{ 
                ml: 'auto',
                color: theme.colors.text,
                '&:hover': {
                  backgroundColor: theme.colors.muted,
                },
              }}
            >
              Clear Chat
            </Button>
          </Box>
          
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              padding: 2,
              backgroundColor: theme.colors.background,
            }}
          >
            {messages.map((msg) => (
              <Box
                key={msg.id}
                sx={{
                  display: 'flex',
                  justifyContent: msg.isCurrentUser ? 'flex-end' : 'flex-start',
                  mb: 2,
                }}
              >
                {!msg.isCurrentUser && (
                  <Avatar sx={{ mr: 1, alignSelf: 'flex-end' }}>
                    {msg.sender.charAt(0).toUpperCase()}
                  </Avatar>
                )}
                
                <Box
                  sx={{
                    maxWidth: '70%',
                    padding: 1.5,
                    borderRadius: msg.isCurrentUser 
                      ? '18px 18px 0 18px' 
                      : '18px 18px 18px 0',
                    backgroundColor: msg.isCurrentUser 
                      ? theme.colors.primary 
                      : theme.colors.surface,
                    color: msg.isCurrentUser 
                      ? theme.colors.text 
                      : theme.colors.text,
                  }}
                >
                  {msg.file ? (
                    <Box>
                      <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                        File: {msg.file.name}
                      </Typography>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          mt: 1,
                          backgroundColor: theme.colors.secondary,
                          '&:hover': {
                            backgroundColor: theme.colors.primary,
                          },
                        }}
                      >
                        Download
                      </Button>
                    </Box>
                  ) : (
                    <Typography variant="body1">{msg.text}</Typography>
                  )}
                  <Typography 
                    variant="caption" 
                    display="block" 
                    sx={{ 
                      textAlign: 'right',
                      color: msg.isCurrentUser 
                        ? theme.colors.text 
                        : theme.colors.muted,
                    }}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Typography>
                </Box>
                
                {msg.isCurrentUser && (
                  <Avatar sx={{ ml: 1, alignSelf: 'flex-end' }}>You</Avatar>
                )}
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Box>
          
          <Box
            sx={{
              display: 'flex',
              padding: 2,
              backgroundColor: theme.colors.surface,
              borderTop: `1px solid ${theme.colors.muted}`,
            }}
          >
            <IconButton 
              component="label"
              sx={{ color: theme.colors.primary }}
            >
              <input
                type="file"
                hidden
                onChange={handleFileChange}
              />
              <AttachFileIcon />
            </IconButton>
            
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
              sx={{
                mx: 2,
                '& .MuiInputLabel-root': { color: theme.colors.primary },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: theme.colors.primary },
                  '&:hover fieldset': { borderColor: theme.colors.secondary },
                },
                '& .MuiInputBase-input': { 
                  color: theme.colors.text,
                },
              }}
            />
            
            <IconButton
              onClick={handleSendMessage}
              disabled={!message.trim() && !file}
              sx={{ color: theme.colors.primary }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            color: theme.colors.text,
          }}
        >
          <Typography variant="h6">
            Select a chat to start messaging
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ChatWindow;