import {applyMiddleware, createStore, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { syncReduxAndTitle } from 'redux-title';



export default function (initialState = {}) {
    const store = createStore(rootReducer, initialState, compose(
        applyMiddleware(thunk)
        )
    );

    syncReduxAndTitle(store);

    if (module.hot) {
        module.hot.accept('../reducers', () =>
            store.replaceReducer(require('../reducers').default)
        );
    }

    return store;
}
