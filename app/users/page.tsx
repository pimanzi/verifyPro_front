'use client';

import { Box, Typography } from '@mui/material';
import { useTheme } from '@/contexts/ThemeContext';

export default function UsersPage() {
  const { primaryColor, colors } = useTheme();

  return (
    <Box>
      <Typography
        variant="h3"
        sx={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 600,
          color: primaryColor,
          mb: 2,
          fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' },
        }}
      >
        Users Page
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontFamily: 'Poppins, sans-serif',
          color: colors.textSecondary,
          fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1rem' },
        }}
      >
        Manage and view all users in your system.
      </Typography>
    </Box>
  );
}
