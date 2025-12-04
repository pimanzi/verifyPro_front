'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  IconButton,
  Avatar,
  Paper,
} from '@mui/material';
import {
  Add as AddIcon,
  Close as CloseIcon,
  PersonAdd as PersonAddIcon,
} from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';

export default function ManageUsersPage() {
  const { primaryColor, colors, darkMode } = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'User',
    status: 'Active',
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    // Reset form
    setFormData({
      name: '',
      email: '',
      role: 'User',
      status: 'Active',
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    // TODO: Add API call to create user
    console.log('Creating user:', formData);
    handleCloseDialog();
    // Show success message
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      {/* Page Header */}
      <Box
        sx={{
          mb: 4,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
        }}
      >
        <Box>
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
            Manage Users
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'Poppins, sans-serif',
              color: colors.textSecondary,
              fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1rem' },
            }}
          >
            Add and manage user accounts in the system
          </Typography>
        </Box>

        {/* Add User Button */}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
          sx={{
            backgroundColor: primaryColor,
            color: '#FFFFFF',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            textTransform: 'none',
            px: { xs: 3, sm: 4 },
            py: { xs: 1.2, sm: 1.5 },
            fontSize: { xs: '0.875rem', sm: '1rem' },
            borderRadius: 2,
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
          Add User
        </Button>
      </Box>

      {/* Info Card */}
      <Paper
        sx={{
          p: { xs: 3, sm: 4, md: 5 },
          backgroundColor: darkMode ? colors.paper : '#FFFFFF',
          borderRadius: 3,
          border: `1px solid ${colors.border}`,
          textAlign: 'center',
          maxWidth: 600,
          mx: 'auto',
          mt: 6,
        }}
      >
        <Avatar
          sx={{
            width: { xs: 80, sm: 100 },
            height: { xs: 80, sm: 100 },
            bgcolor: `${primaryColor}20`,
            color: primaryColor,
            mx: 'auto',
            mb: 3,
          }}
        >
          <PersonAddIcon sx={{ fontSize: { xs: '2.5rem', sm: '3rem' } }} />
        </Avatar>
        <Typography
          variant="h5"
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            color: colors.text,
            mb: 2,
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
          }}
        >
          User Management
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'Poppins, sans-serif',
            color: colors.textSecondary,
            fontSize: { xs: '0.875rem', sm: '1rem' },
            lineHeight: 1.7,
          }}
        >
          Click the &quot;Add User&quot; button above to create a new user
          account. You can assign roles, set permissions, and manage user
          details from this interface.
        </Typography>
      </Paper>

      {/* Add User Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: colors.paper,
            borderRadius: 3,
            border: `1px solid ${colors.border}`,
          },
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pb: 2,
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              color: colors.text,
            }}
          >
            Add New User
          </Typography>
          <IconButton
            onClick={handleCloseDialog}
            sx={{
              color: colors.textSecondary,
              '&:hover': {
                backgroundColor: colors.hover,
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 3 }}>
          <Stack spacing={3}>
            {/* Name Field */}
            <TextField
              fullWidth
              label="Full Name"
              placeholder="Enter user's full name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: colors.text,
                  fontFamily: 'Poppins, sans-serif',
                  '& fieldset': {
                    borderColor: colors.border,
                  },
                  '&:hover fieldset': {
                    borderColor: primaryColor,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: primaryColor,
                  },
                },
                '& .MuiInputLabel-root': {
                  color: colors.textSecondary,
                  fontFamily: 'Poppins, sans-serif',
                  '&.Mui-focused': {
                    color: primaryColor,
                  },
                },
              }}
            />

            {/* Email Field */}
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              placeholder="user@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: colors.text,
                  fontFamily: 'Poppins, sans-serif',
                  '& fieldset': {
                    borderColor: colors.border,
                  },
                  '&:hover fieldset': {
                    borderColor: primaryColor,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: primaryColor,
                  },
                },
                '& .MuiInputLabel-root': {
                  color: colors.textSecondary,
                  fontFamily: 'Poppins, sans-serif',
                  '&.Mui-focused': {
                    color: primaryColor,
                  },
                },
              }}
            />

            {/* Role Select */}
            <FormControl fullWidth>
              <InputLabel
                sx={{
                  color: colors.textSecondary,
                  fontFamily: 'Poppins, sans-serif',
                  '&.Mui-focused': { color: primaryColor },
                }}
              >
                Role
              </InputLabel>
              <Select
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                label="Role"
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
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Moderator">Moderator</MenuItem>
                <MenuItem value="User">User</MenuItem>
              </Select>
            </FormControl>

            {/* Status Select */}
            <FormControl fullWidth>
              <InputLabel
                sx={{
                  color: colors.textSecondary,
                  fontFamily: 'Poppins, sans-serif',
                  '&.Mui-focused': { color: primaryColor },
                }}
              >
                Status
              </InputLabel>
              <Select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                label="Status"
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
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            pb: 3,
            pt: 2,
            borderTop: `1px solid ${colors.border}`,
          }}
        >
          <Button
            onClick={handleCloseDialog}
            sx={{
              color: colors.textSecondary,
              fontFamily: 'Poppins, sans-serif',
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: colors.hover,
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!formData.name || !formData.email}
            sx={{
              backgroundColor: primaryColor,
              color: '#FFFFFF',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              textTransform: 'none',
              px: 4,
              '&:hover': {
                backgroundColor: darkMode ? '#0EA472' : '#0A2820',
              },
              '&:disabled': {
                backgroundColor: colors.border,
                color: colors.textSecondary,
              },
            }}
          >
            Add User
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
