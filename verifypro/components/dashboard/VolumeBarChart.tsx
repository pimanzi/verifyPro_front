'use client';

import { Card, CardContent, Typography, Box } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '../../contexts/ThemeContext';

export default function VolumeBarChart() {
  const { darkMode, colors, primaryColor } = useTheme();

  const departments = [
    'Finance',
    'Retail A',
    'Retail B',
    'Vendor X',
    'Vendor Y',
  ];
  const volumes = [85, 72, 65, 58, 45];

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
          Volume by Department
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
          <BarChart
            xAxis={[{ scaleType: 'band', data: departments }]}
            series={[
              {
                data: volumes,
                color: primaryColor,
              },
            ]}
            height={280}
            margin={{ left: 50, right: 20, top: 20, bottom: 50 }}
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
                fontSize: '0.75rem',
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
