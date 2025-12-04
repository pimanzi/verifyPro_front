'use client';

import { Card, CardContent, Typography, Box } from '@mui/material';
import { useTheme } from '../../contexts/ThemeContext';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function SystemHealth() {
  const { darkMode, colors } = useTheme();

  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 3,
        backgroundColor: darkMode ? colors.paper : '#FFFFFF',
        border: `1px solid ${colors.border}`,
        transition: 'background-color 0.3s ease',
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography
          variant="h6"
          sx={{
            color: colors.text,
            fontSize: { xs: '1rem', sm: '1.125rem' },
            fontWeight: 600,
            mb: 3,
          }}
        >
          System Health
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {/* System Status */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: '#10B98120',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CheckCircleIcon sx={{ color: '#10B981', fontSize: '1.5rem' }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  color: colors.text,
                  opacity: 0.7,
                  fontSize: '0.813rem',
                  mb: 0.5,
                }}
              >
                System Status
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: '#10B981',
                  fontSize: '1.125rem',
                  fontWeight: 700,
                }}
              >
                Online
              </Typography>
            </Box>
          </Box>

          {/* Requests Today */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: darkMode ? '#10B98120' : '#0B312720',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TrendingUpIcon
                sx={{
                  color: darkMode ? '#10B981' : '#0B3127',
                  fontSize: '1.5rem',
                }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  color: colors.text,
                  opacity: 0.7,
                  fontSize: '0.813rem',
                  mb: 0.5,
                }}
              >
                Requests Today
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: colors.text,
                  fontSize: '1.125rem',
                  fontWeight: 700,
                }}
              >
                1,248
              </Typography>
            </Box>
          </Box>

          {/* Error Rate */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: '#F59E0B20',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ErrorOutlineIcon sx={{ color: '#F59E0B', fontSize: '1.5rem' }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  color: colors.text,
                  opacity: 0.7,
                  fontSize: '0.813rem',
                  mb: 0.5,
                }}
              >
                Error Rate
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: colors.text,
                  fontSize: '1.125rem',
                  fontWeight: 700,
                }}
              >
                0.3%
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
