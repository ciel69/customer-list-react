import React from 'react';
import {Route, IndexRoute}  from 'react-router';
import App from './containers/App';
import Home from './components/Home';
import Customers from './components/Customers';
import Products from './components/Products';
import Invoices from './components/Invoices';
import EditInvoice from './components/EditInvoice';


let store;

export default function routes(storeRef) {
    store = storeRef;

    return (
        <Route component={App} path='/'>
            <IndexRoute component={Home} />
            <Route component={Customers} path='customers'/>
            <Route component={Products} path='products'/>
            <Route component={Invoices} path='invoices'/>
            <Route component={EditInvoice} path='invoices/:id'/>
        </Route>
    );
}
