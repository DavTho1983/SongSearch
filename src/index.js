import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import axios from 'axios';

axios.defaults.baseURL = "https://itunes.apple.com";

ReactDOM.render( < App / > , document.getElementById('root'));

serviceWorker.unregister();