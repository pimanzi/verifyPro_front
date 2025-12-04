'use client';

import { Card, CardContent, Typography, Box } from '@mui/material';
import { useTheme } from '../../contexts/ThemeContext';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  accentColor?: string;
  icon?: React.ReactNode;
}

export default function StatCard({
  title,
  value,
  subtitle,
  accentColor,
  icon,
}: StatCardProps) {
  const { darkMode, colors } = useTheme();

  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 3,
        backgroundColor: darkMode ? colors.paper : '#FFFFFF',
        border: `1px solid ${colors.border}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: darkMode
            ? '0 8px 24px rgba(16, 185, 129, 0.15)'
            : '0 8px 24px rgba(11, 49, 39, 0.1)',
        },
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: colors.text,
              opacity: 0.7,
              fontSize: { xs: '0.813rem', sm: '0.875rem' },
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            {title}
          </Typography>
          {icon && (
            <Box
              sx={{
                color: accentColor || colors.text,
                opacity: 0.7,
              }}
            >
              {icon}
            </Box>
          )}
        </Box>

        <Typography
          variant="h3"
          sx={{
            color: colors.text,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '2.25rem' },
            fontWeight: 700,
            mb: 1,
            lineHeight: 1.2,
          }}
        >
          {value}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: accentColor || colors.text,
            fontSize: { xs: '0.813rem', sm: '0.875rem' },
            opacity: 0.8,
            fontWeight: 500,
          }}
        >
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
}
