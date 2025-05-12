import React, { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from './chat/Sidebar';
import ChatWindow from './chat/ChatWindow';
import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const { theme } = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: theme.colors.background,
      }}
    >
      <Sidebar setCurrentChat={setCurrentChat} />
      <ChatWindow currentChat={currentChat} />
    </Box>
  );
};

export default Dashboard;