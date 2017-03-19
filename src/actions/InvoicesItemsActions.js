import {
    GET_INVOICES_ITEMS_REQUEST,
    GET_INVOICES_ITEMS_SUCCESS,
    GET_INVOICES_ITEMS_FAIL,
    POST_INVOICES_ITEMS_REQUEST,
    POST_INVOICES_ITEMS_SUCCESS,
    POST_INVOICES_ITEMS_FAIL,
    ADD_QUEUE_DELETE,
    CLEAR_QUEUE_DELETE,
    DELETE_INVOICES_ITEMS_REQUEST,
    DELETE_INVOICES_ITEMS_SUCCESS,
    DELETE_INVOICES_ITEMS_FAIL,
    ADD_QUEUE_EDIT,
    CLEAR_QUEUE_EDIT,
    EDIT_INVOICES_ITEMS_REQUEST,
    EDIT_INVOICES_ITEMS_SUCCESS,
    EDIT_INVOICES_ITEMS_FAIL
} from '../constants/InvoicesItems';

//get list INVOICES_ITEMS
function requestGetInvoicesItems() {
    return {
        type: GET_INVOICES_ITEMS_REQUEST
    }
}

function receiveInvoicesItems(json) {
    return {
        type: GET_INVOICES_ITEMS_SUCCESS,
        json
    }
}

export function fetchInvoicesItems(id) {
    return dispatch => {
        dispatch(requestGetInvoicesItems());
        return fetch(`/api/invoices/${id}/items`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'
            },
            credentials: 'same-origin'
        })
            .then(response => response.json())
            .then(json => dispatch(receiveInvoicesItems(json)))
            .catch(error => {throw error});
    }
}

function requestCreateInvoicesItems() {
    return {
        type: POST_INVOICES_ITEMS_REQUEST
    }
}

function createNewInvoicesItems(json) {
    return {
        type: POST_INVOICES_ITEMS_SUCCESS,
        json
    }
}


export function createInvoicesItems(id, creds) {
    return dispatch => {
        dispatch(requestCreateInvoicesItems());
        return fetch(`/api/invoices/${id}/items`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'
            },
            credentials: 'same-origin',
            body: `product_id=${creds.product_id}&quantity=${creds.quantity}`
        })
            .then(response => response.json())
            .then(json => dispatch(createNewInvoicesItems(json)))
            .catch(error => {throw error});
    }
}

//add InvoicesItems to queue delete
function appendQueueInvoicesItemsDelete(id) {
    return {
        type: ADD_QUEUE_DELETE,
        id
    }
}
function deleteQueueInvoicesItemsDelete() {
    return {
        type: CLEAR_QUEUE_DELETE
    }
}

export function addQueueInvoicesItemsDelete(id) {
    return dispatch => {
        dispatch(appendQueueInvoicesItemsDelete(id));
    }
}

export function clearQueueInvoicesItemsDelete() {
    return dispatch => {
        dispatch(deleteQueueInvoicesItemsDelete());
    }
}

//delete InvoicesItems
function requestDeleteInvoicesItems() {
    return {
        type: DELETE_INVOICES_ITEMS_REQUEST
    }
}

function removeInvoicesItems(json) {
    return {
        type: DELETE_INVOICES_ITEMS_SUCCESS,
        json
    }
}


export function deleteInvoicesItems(invoice_id, id) {
    return dispatch => {
        dispatch(requestDeleteInvoicesItems());
        return fetch(`/api/invoices/${invoice_id}/items/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'
            },
            credentials: 'same-origin'
        })
            .then(response => response.json())
            .then(json => dispatch(removeInvoicesItems(json)))
            .catch(error => {throw error});
    }
}

//add InvoicesItems to queue edit
function appendQueueInvoicesItemsEdit(json) {
    return {
        type: ADD_QUEUE_EDIT,
        json
    }
}
function deleteQueueInvoicesItemsEdit() {
    return {
        type: CLEAR_QUEUE_EDIT
    }
}

export function addQueueInvoicesItemsEdit(id) {
    return dispatch => {
        // dispatch(requestDeleteInvoicesItems());
        return fetch(`/api/invoices/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'
            },
            credentials: 'same-origin'
        })
            .then(response => response.json())
            .then(json => dispatch(appendQueueInvoicesItemsEdit(json)))
            .catch(error => {throw error});
    }
}

export function clearQueueInvoicesItemsEdit() {
    return dispatch => {
        dispatch(deleteQueueInvoicesItemsEdit());
    }
}


//edit InvoicesItems
function requestEditInvoicesItems() {
    return {
        type: EDIT_INVOICES_ITEMS_REQUEST
    }
}

function successEditInvoicesItems(json) {
    return {
        type: EDIT_INVOICES_ITEMS_SUCCESS,
        json
    }
}


export function editInvoicesItems(invoice_id, id, creds) {
    return dispatch => {
        dispatch(requestEditInvoicesItems());
        return fetch(`/api/invoices/${invoice_id}/items/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'
            },
            credentials: 'same-origin',
            body: `product_id=${creds.product_id}&quantity=${creds.quantity}`
        })
            .then(response => response.json())
            .then(json => dispatch(successEditInvoicesItems(json)))
            .catch(error => {throw error});
    }
}