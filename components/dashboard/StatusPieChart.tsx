'use client';

import { Card, CardContent, Typography, Box } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { useTheme } from '../../contexts/ThemeContext';

export default function StatusPieChart() {
  const { darkMode, colors } = useTheme();

  const data = [
    { id: 0, value: 65, label: 'Verified', color: '#10B981' },
    { id: 1, value: 25, label: 'Pending', color: '#F59E0B' },
    { id: 2, value: 10, label: 'Failed', color: '#EF4444' },
  ];

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
          Status Breakdown
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: { xs: 250, sm: 300 },
            width: '100%',
            overflow: 'hidden',
            color: colors.text,
            '& .MuiChartsLegend-series text': {
              fill: `${colors.text} !important`,
            },
            '& .MuiChartsLegend-label': {
              fill: `${colors.text} !important`,
            },
            '& .MuiChartsLegend-root text': {
              fill: `${colors.text} !important`,
            },
            '& text': {
              fill: `${colors.text} !important`,
            },
            '& g text': {
              fill: `${colors.text} !important`,
            },
            '& svg text': {
              fill: `${colors.text} !important`,
            },
          }}
        >
          <PieChart
            series={[
              {
                data,
              },
            ]}
            width={300}
            height={280}
            slotProps={{
              legend: {
                position: { vertical: 'bottom', horizontal: 'center' },
              },
            }}
            sx={{
              maxWidth: '100%',
              '& svg': {
                maxWidth: '100%',
                height: 'auto',
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
