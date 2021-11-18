import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typograpgy from '@mui/material/Typography';
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
  const [error, setError] = useState();
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);

  const getNewData = async () => {
    try {
      const res = await api.get(
        `/history?limit=${limit}&offset=${page * limit}`
      );

      const { count: histCount, rows: hist } = res?.data;

      if (!hist || !Array.isArray(hist)) {
        setCount(0);
        return setHistory([]);
      }

      setCount(histCount);
      setHistory(hist);
    } catch (err) {
      setError('Failed to get history.');
    }
  };

  const handlePageChange = async (_event, newPage) => {
    try {
      setPage(newPage);

      const res = await api.get(
        `/history?limit=${limit}&offset=${newPage * limit}`
      );

      const { count: histCount, rows: hist } = res?.data;

      if (!hist || !Array.isArray(hist)) {
        setCount(0);
        return setHistory([]);
      }

      setCount(histCount);
      setHistory(hist);
    } catch (err) {
      setError('Failed to get history.');
    }
  };

  const handleLimitChange = async (event) => {
    const newLimit = event.target.value;

    try {
      setLimit(parseInt(newLimit, 10));
      setPage(0);

      const res = await api.get(`/history?limit=${newLimit}&offset=0`);

      const { count: histCount, rows: hist } = res?.data;

      if (!hist || !Array.isArray(hist)) {
        setCount(0);
        return setHistory([]);
      }

      setCount(histCount);
      setHistory(hist);
    } catch (err) {
      setError('Failed to get history.');
    }
  };

  useEffect(() => {
    const getHistory = async () => {
      try {
        const res = await api.get(
          `/history?limit=${limit}&offset=${page * limit}`
        );

        const { count: histCount, rows: hist } = res?.data;

        if (!hist || !Array.isArray(hist)) {
          setCount(0);
          return setHistory([]);
        }

        setCount(histCount);
        setHistory(hist);
      } catch (err) {
        setError('Failed to get history.');
      }
    };

    getHistory();
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
              <TablePagination
                count={count}
                rowsPerPageOptions={[5, 10]}
                rowsPerPage={limit}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
              />
            </Table>
          </TableContainer>
          {error ? (
            <Typograpgy sc={{ color: 'red' }}>{error}</Typograpgy>
          ) : null}
        </Grid>
      </Grid>
    </Box>
  );
};

export default History;
