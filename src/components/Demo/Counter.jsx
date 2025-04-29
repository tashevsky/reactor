import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from '../../redux/actions';
import { Box, Button, Typography } from '@mui/material';

const Counter = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count);

  return (
    <Box sx={{ p: 2, textAlign: 'center' }}>
      <Typography variant="h6">Counter</Typography>
      <Typography variant="h4">{count}</Typography>
      <Button
        variant="contained"
        onClick={() => dispatch(increment())}
        sx={{ mr: 1 }}
      >
        +
      </Button>
      <Button
        variant="contained"
        onClick={() => dispatch(decrement())}
      >
        -
      </Button>
    </Box>
  );
};

export default Counter;