import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const tableHeadings = [
  {
    id: 'input',
    numeric: false,
    disablePadding: true,
    label: 'Input',
  },
  {
    id: 'value',
    numeric: true,
    disablePadding: false,
    label: 'Value',
  },
  {
    id: 'date',
    numeric: true,
    disablePadding: false,
    label: 'Date',
  },
];

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const getHistoru = async () => {
      try {
        const res = await api.get('/history');

        const hist = res?.data;

        setHistory(hist);
      } catch (err) {
        console.log('error');
      }
    };

    getHistoru();
  }, []);

  return (
    <Box>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={10}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {tableHeadings.map((heading) => (
                    <TableCell key={heading.id}>{heading.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {history.map((hist) => (
                  <TableRow key={hist.id}>
                    <TableCell>{hist.text}</TableCell>
                    <TableCell>{hist.value}</TableCell>
                    <TableCell>
                      {new Date(hist.createdAt).toLocaleDateString('en-us', {
                        day: '2-digit',
                        weekday: 'short',
                        year: '2-digit',
                        hour: 'numeric',
                        minute: 'numeric',
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <TablePagination /> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default History;
