import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from "@chakra-ui/react"
import store from './store/store'
import { Provider } from 'react-redux'
import App from './App';
import reportWebVitals from './reportWebVitals';
import "@fontsource/fredericka-the-great/400.css"
import "@fontsource/fredoka-one/400.css"
import theme from "./theme"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
