import {combineReducers} from 'redux';
import customers from './customers';
import products from './products';
import invoices from './invoices';
import invoices_item from './invoices_item';
import modals from './modals';
import {titleReducer} from 'redux-title';

export default combineReducers({
    customers: customers,
    products: products,
    invoices: invoices,
    invoices_item: invoices_item,
    modals: modals,
    title: titleReducer
})