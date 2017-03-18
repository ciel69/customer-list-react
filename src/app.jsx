import React from 'react';
import {render} from 'react-dom';
import {browserHistory, Router} from 'react-router';
import {Provider} from 'react-redux';
import routes from './routes';
import configureStore from './store/configureStore';

import 'react-select/dist/react-select.css';
const store = configureStore();

const component = (
    <Provider store={store}>
        <Router history={browserHistory}>
            {routes(store)}
        </Router>
    </Provider>
);

render(component, document.getElementById('app-root'));

// render(<div>Place your application here</div>, document.getElementById('app-root'));
