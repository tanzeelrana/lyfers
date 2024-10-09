import { Box, Typography } from '@mui/material';

export default function PageNotFound() {
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
      Page Not Found!.
    </Typography>
    
  </Box>
  );
}
