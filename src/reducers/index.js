import {combineReducers} from 'redux';
import customers from './customers';
import products from './products';
import invoices from './invoices';
import modals from './modals';
import {titleReducer} from 'redux-title';

export default combineReducers({
    customers: customers,
    products: products,
    invoices: invoices,
    modals: modals,
    title: titleReducer
})