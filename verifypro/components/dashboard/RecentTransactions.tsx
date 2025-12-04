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

interface Transaction {
  id: number;
  name: string;
  avatar: string;
  amount: string;
  status: 'Verified' | 'Pending' | 'Failed';
  date: string;
}

const transactions: Transaction[] = [
  {
    id: 1,
    name: 'Emma Richardson',
    avatar: 'ER',
    amount: '$3,500.00',
    status: 'Verified',
    date: 'Jan 14, 2025',
  },
  {
    id: 2,
    name: 'AgroFarm Ltd',
    avatar: 'AF',
    amount: '$4,200.00',
    status: 'Pending',
    date: 'Jan 13, 2025',
  },
  {
    id: 3,
    name: 'CoffeeCo',
    avatar: 'CC',
    amount: '$1,100.00',
    status: 'Failed',
    date: 'Jan 12, 2025',
  },
  {
    id: 4,
    name: 'Daniel Carter',
    avatar: 'DC',
    amount: '$2,850.00',
    status: 'Verified',
    date: 'Jan 11, 2025',
  },
];

export default function RecentTransactions() {
  const { darkMode, colors } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Verified':
        return { bg: '#10B98120', text: '#10B981' };
      case 'Pending':
        return { bg: '#F59E0B20', text: '#F59E0B' };
      case 'Failed':
        return { bg: '#EF444420', text: '#EF4444' };
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
            Recent Transactions
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
          {transactions.map((transaction) => {
            const statusColors = getStatusColor(transaction.status);
            return (
              <Box
                key={transaction.id}
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
                    bgcolor: darkMode ? '#10B981' : '#0B3127',
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    fontWeight: 600,
                  }}
                >
                  {transaction.avatar}
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
                    {transaction.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: colors.text,
                      opacity: 0.6,
                      fontSize: { xs: '0.75rem', sm: '0.813rem' },
                    }}
                  >
                    {transaction.date}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'flex-end', sm: 'center' },
                    gap: { xs: 1, sm: 2 },
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: colors.text,
                      fontWeight: 700,
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                    }}
                  >
                    {transaction.amount}
                  </Typography>
                  <Chip
                    label={transaction.status}
                    size="small"
                    sx={{
                      bgcolor: statusColors.bg,
                      color: statusColors.text,
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      height: 24,
                      '& .MuiChip-label': {
                        px: 1.5,
                      },
                    }}
                  />
                </Box>
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}
