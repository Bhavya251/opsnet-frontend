import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, TextField } from '@mui/material';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ setCurrentChat }) => {
  const [chats, setChats] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { theme } = useTheme();
  const { user } = useAuth();

  useEffect(() => {
    // TODO: Fetch chats from API
    const dummyChats = [
      { id: 1, username: 'user1', lastMessage: 'Hello there!', timestamp: new Date() },
      { id: 2, username: 'user2', lastMessage: 'How are you?', timestamp: new Date(Date.now() - 3600000) },
      { id: 3, username: 'user3', lastMessage: 'See you later', timestamp: new Date(Date.now() - 86400000) },
    ];
    setChats(dummyChats);
  }, [user]);

  const filteredChats = chats.filter(chat =>
    chat.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 360,
        height: 'calc(100vh - 64px)',
        backgroundColor: theme.colors.surface,
        borderRight: `1px solid ${theme.colors.muted}`,
        overflowY: 'auto',
      }}
    >
      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search chats..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
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
      </Box>
      
      <Divider sx={{ borderColor: theme.colors.muted }} />
      
      <List>
        {filteredChats.map((chat) => (
          <ListItem
            key={chat.id}
            button
            onClick={() => setCurrentChat(chat)}
            sx={{
              '&:hover': {
                backgroundColor: theme.colors.muted,
              },
            }}
          >
            <ListItemAvatar>
              <Avatar>{chat.username.charAt(0).toUpperCase()}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={chat.username}
              secondary={chat.lastMessage}
              primaryTypographyProps={{ color: theme.colors.text }}
              secondaryTypographyProps={{ color: theme.colors.primary }}
            />
            <Typography 
              variant="caption" 
              sx={{ 
                color: theme.colors.primary,
                alignSelf: 'flex-start',
                mt: 1,
              }}
            >
              {new Date(chat.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;