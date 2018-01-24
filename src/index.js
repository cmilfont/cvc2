import 'typeface-roboto';
import 'normalize.css';
import './css/zonaextrema.css';
import './css/static.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
