import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {stateModel} from '../interfaces';

export default function configureStore(initialState: stateModel) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk, logger, reduxImmutableStateInvariant())
    );
}
