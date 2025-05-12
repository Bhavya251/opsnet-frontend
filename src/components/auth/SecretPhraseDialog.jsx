import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const SecretPhraseDialog = ({ open, onClose }) => {
  const [phrase, setPhrase] = useState('');
  const [error, setError] = useState('');
  const [isFirstTime, setIsFirstTime] = useState(false);
  const { checkSecretPhrase, user } = useAuth();
  const { theme } = useTheme();

  const handleSubmit = async () => {
    if (!phrase.trim()) {
      setError('Please enter a phrase');
      return;
    }
    
    const result = await checkSecretPhrase(phrase);
    if (result.success) {
      if (result.isFirstTime) {
        setIsFirstTime(true);
      } else {
        onClose();
      }
    } else {
      setError(result.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ backgroundColor: theme.colors.surface, color: theme.colors.text }}>
        {isFirstTime ? 'Set Your Secret Phrase' : 'Enter Your Secret Phrase'}
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: theme.colors.surface }}>
        {isFirstTime ? (
          <Typography variant="body1" sx={{ mb: 2, color: theme.colors.text }}>
            Since this is your first time logging in, please set a secret phrase that will be used for additional security.
          </Typography>
        ) : (
          <Typography variant="body1" sx={{ mb: 2, color: theme.colors.text }}>
            Please enter your secret phrase to continue.
          </Typography>
        )}
        
        <TextField
          autoFocus
          margin="dense"
          label="Secret Phrase"
          type="text"
          fullWidth
          variant="outlined"
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
          sx={{
            '& .MuiInputLabel-root': { color: theme.colors.primary },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: theme.colors.primary },
              '&:hover fieldset': { borderColor: theme.colors.secondary },
            },
            '& .MuiInputBase-input': { color: theme.colors.text },
          }}
        />
        
        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ backgroundColor: theme.colors.surface }}>
        <Button 
          onClick={onClose}
          sx={{ color: theme.colors.text }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit}
          sx={{ color: theme.colors.primary }}
        >
          {isFirstTime ? 'Set Phrase' : 'Verify'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SecretPhraseDialog;