'use client';

import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import * as React from 'react';
import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { BarChart, LineChart } from '@mui/x-charts';
import { DataGrid } from '@mui/x-data-grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {},
});

export default function Home() {
  const [dataset, setDataset] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:3000');

    socket.on('sensor', (data) => {
      setDataset(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Container>
          {/*  */}
          <Box my={2}>
            <Card variant="outlined">
              <CardContent>
                <h1>ESP32 IoT</h1>
              </CardContent>
            </Card>
          </Box>
          {/*  */}
          <Box my={2}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Box>
                  <Card variant="outlined">
                    <CardContent>
                      <h2>Temperature</h2>
                      <Divider />
                      <h3>{dataset[9]?.temperature}°C</h3>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box>
                  <Card variant="outlined">
                    <CardContent>
                      <h2>Humidity</h2>
                      <Divider />
                      <h3>{dataset[9]?.humidity}%</h3>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box>
                  <Card variant="outlined">
                    <CardContent>
                      <h2>Precipitation</h2>
                      <Divider />
                      <h3>{dataset[9]?.precipitation} mm</h3>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            </Grid>
          </Box>
          {/*  */}
          <Box my={2}>
            <Card variant="outlined">
              <CardContent>
                <h2>Weather</h2>
                <Divider />
                <h3>{dataset[0]?.weather}</h3>
                <h4>{dataset[0]?.description}</h4>
              </CardContent>
            </Card>
          </Box>
          {/*  */}
          <Box my={2}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box>
                  <Card variant="outlined">
                    <CardContent>
                      <h2>Temperature</h2>
                      <Divider />
                      {dataset.length > 0 && (
                        <LineChart
                          dataset={dataset}
                          xAxis={[
                            {
                              label: 'Time',
                              scaleType: 'band',
                              dataKey: 'createdAt',
                              valueFormatter: (v) =>
                                new Date(v).toLocaleTimeString(),
                            },
                          ]}
                          yAxis={[
                            {
                              scaleType: 'linear',
                              // label: 'Temperature',
                            },
                          ]}
                          series={[
                            {
                              dataKey: 'temperature',
                              valueFormatter: (v) => `${v}°C`,
                            },
                          ]}
                          height={300}
                          // width={600}
                        />
                      )}
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <Card variant="outlined">
                    <CardContent>
                      <h2>Humidity</h2>
                      <Divider />
                      {dataset.length > 0 && (
                        <LineChart
                          dataset={dataset}
                          xAxis={[
                            {
                              label: 'Time',
                              scaleType: 'band',
                              dataKey: 'createdAt',
                              valueFormatter: (v) =>
                                new Date(v).toLocaleTimeString(),
                            },
                          ]}
                          yAxis={[
                            {
                              scaleType: 'linear',
                              // label: 'Humidity',
                            },
                          ]}
                          series={[
                            {
                              dataKey: 'humidity',
                              valueFormatter: (v) => `${v}%`,
                            },
                          ]}
                          height={300}
                          // width={500}
                        />
                      )}
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            </Grid>
          </Box>
          {/*  */}
          {dataset.length > 0 && (
            <Box my={2}>
              <Card variant="outlined">
                <CardContent>
                  <h2>Precipitation</h2>
                  <Divider />
                  <BarChart
                    dataset={dataset}
                    xAxis={[
                      {
                        label: 'Time',
                        scaleType: 'band',
                        dataKey: 'createdAt',
                        valueFormatter: (v) => new Date(v).toLocaleTimeString(),
                      },
                    ]}
                    yAxis={[
                      {
                        scaleType: 'linear',
                        // label: 'Precipitation',
                        // valueFormatter: (v) => `${v} mm`,
                      },
                    ]}
                    series={[
                      {
                        dataKey: 'precipitation',
                        valueFormatter: (v) => `${v} mm`,
                      },
                    ]}
                    height={300}
                  />
                </CardContent>
              </Card>
            </Box>
          )}
          {/*  */}
          <Box my={2}>
            <DataGrid
              rows={dataset}
              className="data-grid"
              columns={[
                {
                  field: 'createdAt',
                  headerName: 'Time',
                  width: 100,
                  valueFormatter: (v) => new Date(v.value).toLocaleTimeString(),
                },
                { field: 'temperature', headerName: 'Temperature', width: 100 },
                { field: 'humidity', headerName: 'Humidity', width: 100 },
                {
                  field: 'precipitation',
                  headerName: 'Precipitation',
                  width: 100,
                },
                {
                  field: 'weather',
                  headerName: 'Weather',
                  width: 250,
                },
                {
                  field: 'description',
                  headerName: 'Description',
                  width: 500,
                },
              ]}
              pageSize={10}
              rowsPerPageOptions={[10]}
              autoHeight
              disableSelectionOnClick
            />
          </Box>

          {/* <pre>
          <code>{JSON.stringify(dataset, null, 2)}</code>
        </pre> */}
        </Container>
      </Box>
    </ThemeProvider>
  );
}
