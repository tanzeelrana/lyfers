import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App";
import Parse from "parse";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/Theme';
const queryClient = new QueryClient({});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);



root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={20000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);

// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <ToastContainer autoClose={3000} />
//       <App />
//     </Provider>
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
