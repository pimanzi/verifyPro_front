'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Switch,
  Select,
  MenuItem,
  FormControl,
  Button,
  Divider,
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';

export default function SettingsPage() {
  const { primaryColor, colors, darkMode, toggleDarkMode } = useTheme();
  const [fontStyle, setFontStyle] = useState('Poppins');
  const [language, setLanguage] = useState('English');

  const handleSaveSettings = () => {
    // TODO: Save settings to backend/localStorage
    console.log('Settings saved:', {
      darkMode,
      fontStyle,
      language,
    });
    // Show success notification
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 700,
            color: colors.text,
            mb: 1,
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2rem' },
          }}
        >
          Settings
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'Poppins, sans-serif',
            color: colors.textSecondary,
            fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1rem' },
          }}
        >
          Customize your application preferences.
        </Typography>
      </Box>

      {/* Settings Grid */}
      <Grid container spacing={3}>
        {/* Appearance Section */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper
            sx={{
              p: { xs: 3, sm: 4 },
              backgroundColor: darkMode ? colors.paper : '#FFFFFF',
              borderRadius: 3,
              border: `1px solid ${colors.border}`,
              height: '100%',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600,
                color: colors.text,
                mb: 1,
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
              }}
            >
              Appearance
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: 'Poppins, sans-serif',
                color: colors.textSecondary,
                mb: 3,
                fontSize: { xs: '0.813rem', sm: '0.875rem' },
              }}
            >
              Customize how the application looks and feels
            </Typography>

            <Divider sx={{ mb: 3, borderColor: colors.border }} />

            {/* Dark Mode Toggle */}
            <Box sx={{ mb: 4 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 1,
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 600,
                      color: colors.text,
                      fontSize: { xs: '0.938rem', sm: '1rem' },
                      mb: 0.5,
                    }}
                  >
                    Dark Mode
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: 'Poppins, sans-serif',
                      color: colors.textSecondary,
                      fontSize: { xs: '0.813rem', sm: '0.875rem' },
                    }}
                  >
                    Toggle between light and dark themes
                  </Typography>
                </Box>
                <Switch
                  checked={darkMode}
                  onChange={toggleDarkMode}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: primaryColor,
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: primaryColor,
                    },
                  }}
                />
              </Box>
            </Box>

            {/* Font Style Selector */}
            <Box>
              <Typography
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600,
                  color: colors.text,
                  fontSize: { xs: '0.938rem', sm: '1rem' },
                  mb: 1,
                }}
              >
                Font Style
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  color: colors.textSecondary,
                  fontSize: { xs: '0.813rem', sm: '0.875rem' },
                  mb: 2,
                }}
              >
                Choose your preferred font family
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={fontStyle}
                  onChange={(e) => setFontStyle(e.target.value)}
                  sx={{
                    color: colors.text,
                    fontFamily: 'Poppins, sans-serif',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: colors.border,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: primaryColor,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: primaryColor,
                    },
                    '& .MuiSvgIcon-root': {
                      color: colors.text,
                    },
                  }}
                >
                  <MenuItem value="Poppins">Poppins</MenuItem>
                  <MenuItem value="Roboto">Roboto</MenuItem>
                  <MenuItem value="Inter">Inter</MenuItem>
                  <MenuItem value="Arial">Arial</MenuItem>
                </Select>
              </FormControl>

              {/* Font Preview */}
              <Paper
                sx={{
                  mt: 2,
                  p: 2,
                  backgroundColor: darkMode ? '#0F172A' : '#F8FAFC',
                  border: `1px solid ${colors.border}`,
                  borderRadius: 2,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: `${fontStyle}, sans-serif`,
                    color: colors.text,
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                  }}
                >
                  This is a preview of the <strong>{fontStyle}</strong> font.
                </Typography>
              </Paper>
            </Box>
          </Paper>
        </Grid>

        {/* Preferences Section */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper
            sx={{
              p: { xs: 3, sm: 4 },
              backgroundColor: darkMode ? colors.paper : '#FFFFFF',
              borderRadius: 3,
              border: `1px solid ${colors.border}`,
              height: '100%',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600,
                color: colors.text,
                mb: 1,
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
              }}
            >
              Preferences
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: 'Poppins, sans-serif',
                color: colors.textSecondary,
                mb: 3,
                fontSize: { xs: '0.813rem', sm: '0.875rem' },
              }}
            >
              Manage your application preferences and regional settings
            </Typography>

            <Divider sx={{ mb: 3, borderColor: colors.border }} />

            {/* Language Selector */}
            <Box>
              <Typography
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600,
                  color: colors.text,
                  fontSize: { xs: '0.938rem', sm: '1rem' },
                  mb: 1,
                }}
              >
                Language
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  color: colors.textSecondary,
                  fontSize: { xs: '0.813rem', sm: '0.875rem' },
                  mb: 2,
                }}
              >
                Select your preferred language
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  sx={{
                    color: colors.text,
                    fontFamily: 'Poppins, sans-serif',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: colors.border,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: primaryColor,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: primaryColor,
                    },
                    '& .MuiSvgIcon-root': {
                      color: colors.text,
                    },
                  }}
                >
                  <MenuItem value="English">English</MenuItem>
                  <MenuItem value="French">French</MenuItem>
                  <MenuItem value="Spanish">Spanish</MenuItem>
                  <MenuItem value="German">German</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Save Button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: { xs: 'stretch', sm: 'flex-end' },
          mt: 4,
        }}
      >
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSaveSettings}
          sx={{
            backgroundColor: primaryColor,
            color: '#FFFFFF',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            textTransform: 'none',
            px: { xs: 4, sm: 6 },
            py: { xs: 1.2, sm: 1.5 },
            fontSize: { xs: '0.875rem', sm: '1rem' },
            borderRadius: 2,
            width: { xs: '100%', sm: 'auto' },
            boxShadow: darkMode
              ? '0 4px 12px rgba(16, 185, 129, 0.25)'
              : '0 4px 12px rgba(11, 49, 39, 0.15)',
            '&:hover': {
              backgroundColor: darkMode ? '#0EA472' : '#0A2820',
              boxShadow: darkMode
                ? '0 6px 16px rgba(16, 185, 129, 0.35)'
                : '0 6px 16px rgba(11, 49, 39, 0.25)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          Save Settings
        </Button>
      </Box>
    </Box>
  );
}
