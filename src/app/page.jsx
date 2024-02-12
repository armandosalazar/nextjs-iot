'use client';

import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:3000');

    socket.on('sensor', (data) => {
      setData(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Box>
      <Container>
        <h1>Dashboard</h1>
        <BarChart
          series={[
            { data: [35, 44, 24, 34] },
            { data: [51, 6, 49, 30] },
            { data: [15, 25, 30, 50] },
            { data: [60, 50, 15, 25] },
          ]}
          height={290}
          xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
        <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </Container>
    </Box>
  );
}
