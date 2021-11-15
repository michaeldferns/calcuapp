import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import React from 'react';

const Calculate = () => {
  return (
    <Box sx={{ border: 1, p: 2, borderRadius: 5, boxShadow: 5 }}>
      <Grid container item spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ width: '100%', p: 2, borderRadius: 2, bgcolor: 'black' }}>
            <Typography color="white">Solution here</Typography>
          </Box>
        </Grid>
        <Grid container item spacing={2} xs={12}>
          <Grid item xs={3}>
            <Button variant="contained" color="primary" sx={{ width: '100%' }}>
              AC
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" color="primary" sx={{ width: '100%' }}>
              +/-
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" color="primary" sx={{ width: '100%' }}>
              &#8730;
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" color="primary" sx={{ width: '100%' }}>
              &#247;
            </Button>
          </Grid>
        </Grid>
        <Grid container item spacing={2} xs={12}>
          <Grid item xs={3}>
            <Button variant="contained" color="primary" sx={{ width: '100%' }}>
              7
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" color="primary" sx={{ width: '100%' }}>
              8
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" color="primary" sx={{ width: '100%' }}>
              9
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" color="primary" sx={{ width: '100%' }}>
              &#215;
            </Button>
          </Grid>
        </Grid>
        <Grid container item spacing={2} xs={12}>
          <Grid item xs={3}>
            <Button variant="contained" color="primary" sx={{ width: '100%' }}>
              4
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" color="primary" sx={{ width: '100%' }}>
              5
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" color="primary" sx={{ width: '100%' }}>
              6
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" color="primary" sx={{ width: '100%' }}>
              &#8722;
            </Button>
          </Grid>
          <Grid container item spacing={2} xs={12}>
            <Grid container item spacing={2} xs={9}>
              <Grid container item spacing={2} xs={12}>
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ width: '100%' }}
                  >
                    1
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ width: '100%' }}
                  >
                    2
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ width: '100%' }}
                  >
                    3
                  </Button>
                </Grid>
              </Grid>
              <Grid container item spacing={2} xs={12}>
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ width: '100%' }}
                  >
                    0
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ width: '100%' }}
                  >
                    &#46;
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ width: '100%' }}
                  >
                    &#61;
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid container item xs={3}>
              <Button
                variant="contained"
                color="primary"
                sx={{ height: '100%', width: '100%' }}
              >
                &#43;
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Calculate;
