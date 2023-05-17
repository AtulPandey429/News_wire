import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';
import AppRoute from './routes';
import { Provider } from 'react-redux';
import ReduxStore from './store/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={ReduxStore()}>
			<AppRoute />
		</Provider>
	</React.StrictMode>
);
