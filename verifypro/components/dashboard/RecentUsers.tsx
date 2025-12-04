'use client';

import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
} from '@mui/material';
import { useTheme } from '../../contexts/ThemeContext';
import PersonIcon from '@mui/icons-material/Person';

interface User {
  id: number;
  name: string;
  avatar: string;
  role: 'Trader' | 'Auditor' | 'Admin';
  joinDate: string;
}

const users: User[] = [
  {
    id: 1,
    name: 'Kevin Mugisha',
    avatar: 'KM',
    role: 'Auditor',
    joinDate: 'Jan 14, 2025',
  },
  {
    id: 2,
    name: 'Sarah Williams',
    avatar: 'SW',
    role: 'Trader',
    joinDate: 'Jan 13, 2025',
  },
  {
    id: 3,
    name: 'John Kamau',
    avatar: 'JK',
    role: 'Admin',
    joinDate: 'Jan 12, 2025',
  },
  {
    id: 4,
    name: 'Maria Santos',
    avatar: 'MS',
    role: 'Trader',
    joinDate: 'Jan 11, 2025',
  },
];

export default function RecentUsers() {
  const { darkMode, colors, primaryColor } = useTheme();

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return { bg: '#EF444420', text: '#EF4444' };
      case 'Auditor':
        return { bg: '#10B98120', text: '#10B981' };
      case 'Trader':
        return { bg: '#3B82F620', text: '#3B82F6' };
      default:
        return { bg: colors.hover, text: colors.text };
    }
  };

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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: colors.text,
              fontSize: { xs: '1rem', sm: '1.125rem' },
              fontWeight: 600,
            }}
          >
            Recent Users
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: colors.text,
              opacity: 0.6,
              cursor: 'pointer',
              '&:hover': { opacity: 1 },
            }}
          >
            View All →
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {users.map((user) => {
            const roleColors = getRoleColor(user.role);
            return (
              <Box
                key={user.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 1.5,
                  borderRadius: 2,
                  transition: 'background-color 0.2s',
                  '&:hover': {
                    backgroundColor: colors.hover,
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: { xs: 40, sm: 48 },
                    height: { xs: 40, sm: 48 },
                    bgcolor: primaryColor,
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    fontWeight: 600,
                  }}
                >
                  {user.avatar}
                </Avatar>

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      color: colors.text,
                      fontWeight: 600,
                      fontSize: { xs: '0.875rem', sm: '0.938rem' },
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {user.name}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      mt: 0.5,
                    }}
                  >
                    <PersonIcon
                      sx={{
                        fontSize: '0.875rem',
                        color: colors.text,
                        opacity: 0.6,
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        color: colors.text,
                        opacity: 0.6,
                        fontSize: { xs: '0.75rem', sm: '0.813rem' },
                      }}
                    >
                      Joined {user.joinDate}
                    </Typography>
                  </Box>
                </Box>

                <Chip
                  label={user.role}
                  size="small"
                  sx={{
                    bgcolor: roleColors.bg,
                    color: roleColors.text,
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    height: 24,
                    '& .MuiChip-label': {
                      px: 1.5,
                    },
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}
