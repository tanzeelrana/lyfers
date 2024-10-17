import React from 'react';
import { Box, Typography } from '@mui/material';

export default function AccessDeniedPage() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      flexDirection="column"
      textAlign="center"
    >
      <Typography variant="h3">Whoops!</Typography>
      <Typography variant="h6" fontWeight="bold" mt={2}>
        403 access denied
      </Typography>
      <Typography variant="body2" mt={1} color="textSecondary">
        Access Denied: You do not have permission to view this page.
      </Typography>
    </Box>
  );
}
