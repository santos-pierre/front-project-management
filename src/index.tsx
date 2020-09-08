import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/tailwind.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import RouterSwitch from './components/RouterSwitch/RouterSwitch';
import store from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <RouterSwitch />
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
