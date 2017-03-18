import {
    GET_INVOICES_REQUEST,
    GET_INVOICES_SUCCESS,
    GET_INVOICES_FAIL,
    POST_INVOICES_REQUEST,
    POST_INVOICES_SUCCESS,
    POST_INVOICES_FAIL,
    ADD_QUEUE_DELETE,
    CLEAR_QUEUE_DELETE,
    DELETE_INVOICES_REQUEST,
    DELETE_INVOICES_SUCCESS,
    DELETE_INVOICES_FAIL,
    ADD_QUEUE_EDIT,
    CLEAR_QUEUE_EDIT,
    EDIT_INVOICES_REQUEST,
    EDIT_INVOICES_SUCCESS,
    EDIT_INVOICES_FAIL
} from '../constants/INVOICES';

//get list Invoices
function requestGetInvoices() {
    return {
        type: GET_INVOICES_REQUEST
    }
}

function receiveInvoices(json) {
    return {
        type: GET_INVOICES_SUCCESS,
        json
    }
}

export function fetchInvoices() {
    return dispatch => {
        dispatch(requestGetInvoices());
        return fetch('/api/invoices',{
            method: 'GET'
        })
            .then(response => response.json())
            .then(json => dispatch(receiveInvoices(json)))
            .catch(error => {throw error});
    }
}

function requestCreateInvoices() {
    return {
        type: POST_INVOICES_REQUEST
    }
}

function createNewInvoices(json) {
    return {
        type: POST_INVOICES_SUCCESS,
        json
    }
}


export function createInvoices(creds) {
    return dispatch => {
        dispatch(requestCreateInvoices());
        return fetch('/api/invoices',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'
            },
            credentials: 'same-origin',
            body: `customer_id=${creds.customer_id}&discount=${creds.discount}`
        })
            .then(response => response.json())
            .then(json => dispatch(createNewInvoices(json)))
            .catch(error => {throw error});
    }
}

//add INVOICES to queue delete
function appendQueueInvoicesDelete(id) {
    return {
        type: ADD_QUEUE_DELETE,
        id
    }
}
function deleteQueueInvoicesDelete() {
    return {
        type: CLEAR_QUEUE_DELETE
    }
}

export function addQueueInvoicesDelete(id) {
    return dispatch => {
        dispatch(appendQueueInvoicesDelete(id));
    }
}

export function clearQueueInvoicesDelete() {
    return dispatch => {
        dispatch(deleteQueueInvoicesDelete());
    }
}

//delete INVOICES
function requestDeleteInvoices() {
    return {
        type: DELETE_INVOICES_REQUEST
    }
}

function removeInvoices(json) {
    return {
        type: DELETE_INVOICES_SUCCESS,
        json
    }
}


export function deleteInvoices(id) {
    return dispatch => {
        dispatch(requestDeleteInvoices());
        return fetch(`/api/invoices/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'
            },
            credentials: 'same-origin'
        })
            .then(response => response.json())
            .then(json => dispatch(removeInvoices(json)))
            .catch(error => {throw error});
    }
}

//add INVOICES to queue edit
function appendQueueInvoicesEdit(json) {
    return {
        type: ADD_QUEUE_EDIT,
        json
    }
}
function deleteQueueInvoicesEdit() {
    return {
        type: CLEAR_QUEUE_EDIT
    }
}

export function addQueueInvoicesEdit(id) {
    return dispatch => {
        // dispatch(requestDeleteINVOICES());
        return fetch(`/api/invoices/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'
            },
            credentials: 'same-origin'
        })
            .then(response => response.json())
            .then(json => dispatch(appendQueueInvoicesEdit(json)))
            .catch(error => {throw error});
    }
}

export function clearQueueInvoicesEdit() {
    return dispatch => {
        dispatch(deleteQueueInvoicesEdit());
    }
}


//edit INVOICES
function requestEditInvoices() {
    return {
        type: EDIT_INVOICES_REQUEST
    }
}

function successEditInvoices(json) {
    return {
        type: EDIT_INVOICES_SUCCESS,
        json
    }
}


export function editInvoices(id, creds) {
    return dispatch => {
        dispatch(requestEditInvoices());
        return fetch(`/api/invoices/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'
            },
            credentials: 'same-origin',
            body: `name=${creds.name}&price=${creds.price}`
        })
            .then(response => response.json())
            .then(json => dispatch(successEditInvoices(json)))
            .catch(error => {throw error});
    }
}