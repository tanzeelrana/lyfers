// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FF5A00',
    },
    secondary: {
      main: '##FFFFFF',
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
    MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: 'white',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            backgroundColor: 'white',
            borderRadius: '10px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
          },
          },
        },
      },
  },
});

export default theme;
