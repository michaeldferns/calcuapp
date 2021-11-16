import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const operations = {
  ADD: 'ADD',
  SUBTRACT: 'SUBTRACT',
  MULTIPLY: 'MULTIPLY',
  DIVIDE: 'DIVIDE',
  SQRT: 'SQRT',
  NEGATE: 'NEGATE',
  CLEAR: 'CLEAR',
  EQUATE: 'EQUATE',
};

const Calculate = () => {
  const [operation, setOperation] = useState();
  const [previousInput, setPreviousInput] = useState();
  const [inputFlag, setInputFlag] = useState(false);
  const [currentInput, setCurrentInput] = useState(0);
  const [display, setDisplay] = useState('0');
  const [disableAll, setDisableAll] = useState(false);
  const [disableOperation, setDisableOperation] = useState(true);
  const [disableClear, setDisableClear] = useState(true);
  const [disableEquals, setDisableEquals] = useState(true);
  const [disableDecimal, setDisableDecimal] = useState(false);
  const [zeroDecimalCount, setZeroDecimalCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!submitting) {
      setDisableAll(false);
    } else {
      setDisableAll(true);
    }
  }, [submitting, setDisableAll]);

  useEffect(() => {
    if (inputFlag) {
      setDisableClear(false);
    } else if (previousInput && !inputFlag) {
      setDisableClear(false);
    } else {
      setDisableClear(true);
    }
  }, [inputFlag, previousInput, setDisableClear]);

  useEffect(() => {
    if (inputFlag && !operation) {
      setDisableOperation(false);
    } else {
      setDisableOperation(true);
    }
  }, [inputFlag, operation, setDisableOperation]);

  useEffect(() => {
    if (previousInput && operation && inputFlag) {
      setDisableEquals(false);
    } else {
      setDisableEquals(true);
    }
  }, [previousInput, operation, inputFlag, setDisableEquals]);

  const reset = () => {
    setOperation(null);
    setPreviousInput(null);
    setInputFlag(false);
    setCurrentInput(0);
    setDisplay('0');
    setDisableOperation(true);
    setDisableClear(true);
    setDisableEquals(true);
    setDisableDecimal(false);
    setZeroDecimalCount(0);
  };

  const executeOperation = async () => {
    setDisableAll(true);

    let value = 0;
    let route = '/calculate';
    let operator = '';

    switch (operation) {
      case operations.ADD:
        route += '/add';
        operator = '\u002b';
        break;
      case operations.SUBTRACT:
        route += '/subtract';
        operator = '\u2212';
        break;
      case operations.MULTIPLY:
        route += '/multiply';
        operator = '\u00d7';
        break;
      case operations.DIVIDE:
        route += '/divide';
        operator = '\u00f7';
        break;
      default:
        break;
    }

    try {
      const res = await api.post(route, {
        currentInput,
        previousInput,
        text: `${previousInput} ${operator} ${currentInput}`,
      });

      value = res?.data?.value;

      setDisplay(value.toString());
      setOperation(null);
      setPreviousInput(null);
      setInputFlag(true);
      setCurrentInput(value);
      setDisableOperation(false);
      setDisableClear(false);
      setDisableEquals(true);
      setDisableDecimal(false);
      setZeroDecimalCount(0);
      setSubmitting(false);
      setDisableAll(false);
    } catch (err) {
      setDisplay('ERR');
      setOperation(null);
      setPreviousInput(null);
      setInputFlag(false);
      setCurrentInput(0);
      setDisableOperation(true);
      setDisableClear(true);
      setDisableEquals(true);
      setDisableDecimal(false);
      setZeroDecimalCount(0);
      setSubmitting(false);
      setDisableAll(false);

      return;
    }
  };

  const executeRoot = async () => {
    setDisableAll(true);

    let value = 0;

    try {
      const res = await api.post('/calculate/root', {
        leftValue: currentInput,
      });

      value = res?.data?.value;

      setDisplay(value.toString());
      setOperation(null);
      setPreviousInput(null);
      setInputFlag(true);
      setCurrentInput(value);
      setDisableOperation(false);
      setDisableClear(false);
      setDisableEquals(true);
      setDisableDecimal(false);
      setZeroDecimalCount(0);
      setSubmitting(false);
      setDisableAll(false);
    } catch (err) {
      setDisplay('ERR');
      setOperation(null);
      setPreviousInput(null);
      setInputFlag(false);
      setCurrentInput(0);
      setDisableOperation(true);
      setDisableClear(true);
      setDisableEquals(true);
      setDisableDecimal(false);
      setZeroDecimalCount(0);
      setSubmitting(false);
      setDisableAll(false);

      return;
    }
  };

  const handleOperation = (operation) => {
    const calculateOperations = [
      operations.ADD,
      operations.SUBTRACT,
      operations.MULTIPLY,
      operations.DIVIDE,
    ];

    // Handle Clear
    if (operation === operations.CLEAR) {
      return reset();
    } else if (calculateOperations.includes(operation)) {
      if (operation === operations.ADD) {
        setDisplay('\u002b');
      } else if (operation === operations.SUBTRACT) {
        setDisplay('\u2212');
      } else if (operation === operations.MULTIPLY) {
        setDisplay('\u00d7');
      } else if (operation === operations.DIVIDE) {
        setDisplay('\u00f7');
      }

      setPreviousInput(currentInput);
      setOperation(operation);
      setCurrentInput(0);
      setDisableDecimal(false);
      setInputFlag(false);
    } else if (operation === operations.SQRT) {
      setOperation(operation);

      executeRoot();
    } else if (operation === operations.NEGATE) {
      if (currentInput) {
        let tempValue = currentInput;

        tempValue *= -1;

        if (currentInput < 0) {
          setDisplay(display.substring(1));
        } else {
          setDisplay(`-${display}`);
        }

        setCurrentInput(tempValue);
      }
    } else if (operation === operations.EQUATE) {
      executeOperation();
    }
  };

  const handleNumberInput = (number) => {
    let tempInput = currentInput.toString();

    // Flip input flag to actvate operation buttons
    if (!inputFlag) {
      setInputFlag(true);
    }

    // Handle decimal input
    if (disableDecimal) {
      if (tempInput.indexOf('.') === -1) {
        tempInput += '.';
      }

      if (number === 0) {
        setZeroDecimalCount(zeroDecimalCount + 1);
      }

      for (let i = 0; i < zeroDecimalCount; i++) {
        tempInput += '0';
      }

      tempInput += number.toString();

      if (number !== 0) {
        setZeroDecimalCount(0);
      }

      setDisplay(tempInput);
      setCurrentInput(Number.parseFloat(tempInput));
      return;
    }

    // Current input must be int
    if (tempInput === '0') {
      tempInput = number.toString();
    } else {
      tempInput += number.toString();
    }

    setDisplay(tempInput);
    setCurrentInput(Number.parseInt(tempInput));
    return;
  };

  const handleDecimalInput = () => {
    let tempInput = currentInput.toString();

    setDisableDecimal(true);
    setInputFlag(true);

    tempInput += '.0';

    setDisplay(tempInput);
    setCurrentInput(Number.parseFloat(tempInput));
    return;
  };

  return (
    <Box
      sx={{
        border: 1,
        p: 2,
        borderRadius: 5,
        boxShadow: 5,
        minWidth: 450,
        maxWidth: 480,
      }}
    >
      <Grid container item justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ width: '100%', p: 2, borderRadius: 2, bgcolor: 'black' }}>
            <Typography align="right" color="white">
              {display}
            </Typography>
          </Box>
        </Grid>
        <Grid container item spacing={2} xs={12}>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: '100%' }}
              disabled={disableClear || disableAll}
              onClick={() => handleOperation(operations.CLEAR)}
            >
              AC
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: '100%' }}
              disabled={disableOperation || disableAll}
              onClick={() => handleOperation(operations.NEGATE)}
            >
              +/-
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: '100%' }}
              disabled={disableOperation || disableAll}
              onClick={() => handleOperation(operations.SQRT)}
            >
              &#8730;
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: '100%' }}
              disabled={disableOperation || disableAll}
              onClick={() => handleOperation(operations.DIVIDE)}
            >
              &#247;
            </Button>
          </Grid>
        </Grid>
        <Grid container item spacing={2} xs={12}>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: '100%' }}
              disabled={disableAll}
              onClick={() => handleNumberInput(7)}
            >
              7
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: '100%' }}
              disabled={disableAll}
              onClick={() => handleNumberInput(8)}
            >
              8
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: '100%' }}
              disabled={disableAll}
              onClick={() => handleNumberInput(9)}
            >
              9
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: '100%' }}
              disabled={disableOperation || disableAll}
              onClick={() => handleOperation(operations.MULTIPLY)}
            >
              &#215;
            </Button>
          </Grid>
        </Grid>
        <Grid container item spacing={2} xs={12}>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: '100%' }}
              disabled={disableAll}
              onClick={() => handleNumberInput(4)}
            >
              4
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: '100%' }}
              disabled={disableAll}
              onClick={() => handleNumberInput(5)}
            >
              5
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: '100%' }}
              disabled={disableAll}
              onClick={() => handleNumberInput(6)}
            >
              6
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: '100%' }}
              disabled={disableOperation || disableAll}
              onClick={() => handleOperation(operations.SUBTRACT)}
            >
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
                    disabled={disableAll}
                    onClick={() => handleNumberInput(1)}
                  >
                    1
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ width: '100%' }}
                    disabled={disableAll}
                    onClick={() => handleNumberInput(2)}
                  >
                    2
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ width: '100%' }}
                    disabled={disableAll}
                    onClick={() => handleNumberInput(3)}
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
                    disabled={disableAll}
                    onClick={() => handleNumberInput(0)}
                  >
                    0
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ width: '100%' }}
                    disabled={disableDecimal || disableAll}
                    onClick={handleDecimalInput}
                  >
                    &#46;
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ width: '100%' }}
                    disabled={disableEquals || disableAll}
                    onClick={() => handleOperation(operations.EQUATE)}
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
                disabled={disableOperation || disableAll}
                onClick={() => handleOperation(operations.ADD)}
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
