'use client';

import { Card, CardContent, Typography, Box } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { useTheme } from '../../contexts/ThemeContext';

export default function TransactionsLineChart() {
  const { darkMode, colors, primaryColor } = useTheme();

  const xLabels = [
    'Jan 1',
    'Jan 5',
    'Jan 10',
    'Jan 15',
    'Jan 20',
    'Jan 25',
    'Jan 30',
  ];

  const data = [45, 52, 48, 65, 70, 85, 95];

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
            mb: 2,
          }}
        >
          Transactions Over Time
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: { xs: 250, sm: 300 },
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <LineChart
            xAxis={[{ scaleType: 'point', data: xLabels }]}
            series={[
              {
                data,
                color: primaryColor,
                area: true,
                showMark: false,
              },
            ]}
            height={280}
            margin={{ left: 50, right: 20, top: 20, bottom: 30 }}
            sx={{
              width: '100%',
              maxWidth: '100%',
              '& .MuiChartsAxis-line': {
                stroke: colors.border,
              },
              '& .MuiChartsAxis-tick': {
                stroke: colors.border,
              },
              '& .MuiChartsAxis-tickLabel': {
                fill: colors.text,
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
