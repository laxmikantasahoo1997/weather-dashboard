import { Skeleton, Stack } from '@mui/material'
import React from 'react'

const Loader = ({ height}) => {

  return (
    <Stack direction="row" spacing={2}>
        <Skeleton variant="rectangular" animation="wave" width={"100%"}  height={height} />
    </Stack>
  );
};

export default Loader;
