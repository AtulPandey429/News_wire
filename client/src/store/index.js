import { createStore, applyMiddleware, compose } from 'redux';
import appReducers from './reducers/index';
import promiseMiddleware from 'redux-promise';

const ReduxStore = () => {
	const webToolEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	const middlewareEnhancers = applyMiddleware(promiseMiddleware);
	const composedEnhancers = webToolEnhancers(middlewareEnhancers);
	const store = createStore(appReducers, composedEnhancers);
	return store;
};

export default ReduxStore;
