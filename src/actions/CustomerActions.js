import {
    GET_CUSTOMER_REQUEST,
    GET_CUSTOMER_SUCCESS,
    GET_CUSTOMER_FAIL,
    POST_CUSTOMER_REQUEST,
    POST_CUSTOMER_SUCCESS,
    POST_CUSTOMER_FAIL,
    ADD_QUEUE_DELETE,
    CLEAR_QUEUE_DELETE,
    DELETE_CUSTOMER_REQUEST,
    DELETE_CUSTOMER_SUCCESS,
    DELETE_CUSTOMER_FAIL,
    ADD_QUEUE_EDIT,
    CLEAR_QUEUE_EDIT,
    EDIT_CUSTOMER_REQUEST,
    EDIT_CUSTOMER_SUCCESS,
    EDIT_CUSTOMER_FAIL
} from '../constants/Customers';

//get list customers
function requestGetCustomers() {
    return {
        type: GET_CUSTOMER_REQUEST
    }
}

function receiveCustomers(json) {
    return {
        type: GET_CUSTOMER_SUCCESS,
        json
    }
}

export function fetchCustomers() {
    return dispatch => {
        dispatch(requestGetCustomers());
        return fetch('/api/customers',{
            method: 'GET'
        })
            .then(response => response.json())
            .then(json => dispatch(receiveCustomers(json)))
            .catch(error => {throw error});
    }
}

function requestCreateCustomers() {
    return {
        type: POST_CUSTOMER_REQUEST
    }
}

function createNewCustomer(json) {
    return {
        type: POST_CUSTOMER_SUCCESS,
        json
    }
}


export function createCustomer(creds) {
    return dispatch => {
        dispatch(requestCreateCustomers());
        return fetch('/api/customers',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'
            },
            credentials: 'same-origin',
            body: `name=${creds.name}&address=${creds.address}&phone=${creds.phone}`
        })
            .then(response => response.json())
            .then(json => dispatch(createNewCustomer(json)))
            .catch(error => {throw error});
    }
}

//add customer to queue delete
function appendQueueCustomerDelete(id) {
    return {
        type: ADD_QUEUE_DELETE,
        id
    }
}
function deleteQueueCustomerDelete() {
    return {
        type: CLEAR_QUEUE_DELETE
    }
}

export function addQueueCustomerDelete(id) {
    return dispatch => {
        dispatch(appendQueueCustomerDelete(id));
    }
}

export function clearQueueCustomerDelete() {
    return dispatch => {
        dispatch(deleteQueueCustomerDelete());
    }
}

//delete customer
function requestDeleteCustomers() {
    return {
        type: DELETE_CUSTOMER_REQUEST
    }
}

function removeCustomer(json) {
    return {
        type: DELETE_CUSTOMER_SUCCESS,
        json
    }
}


export function deleteCustomer(id) {
    return dispatch => {
        dispatch(requestDeleteCustomers());
        return fetch(`/api/customers/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'
            },
            credentials: 'same-origin'
        })
            .then(response => response.json())
            .then(json => dispatch(removeCustomer(json)))
            .catch(error => {throw error});
    }
}

//add customer to queue edit
function appendQueueCustomerEdit(json) {
    return {
        type: ADD_QUEUE_EDIT,
        json
    }
}
function deleteQueueCustomerEdit() {
    return {
        type: CLEAR_QUEUE_EDIT
    }
}

export function addQueueCustomerEdit(id) {
    return dispatch => {
        // dispatch(requestDeleteCustomers());
        return fetch(`/api/customers/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'
            },
            credentials: 'same-origin'
        })
            .then(response => response.json())
            .then(json => dispatch(appendQueueCustomerEdit(json)))
            .catch(error => {throw error});
    }
}

export function clearQueueCustomerEdit() {
    return dispatch => {
        dispatch(deleteQueueCustomerEdit());
    }
}


//edit customer
function requestEditCustomers() {
    return {
        type: EDIT_CUSTOMER_REQUEST
    }
}

function successEditCustomer(json) {
    return {
        type: EDIT_CUSTOMER_SUCCESS,
        json
    }
}


export function editCustomer(id, creds) {
    return dispatch => {
        dispatch(requestEditCustomers());
        return fetch(`/api/customers/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'
            },
            credentials: 'same-origin',
            body: `name=${creds.name}&address=${creds.address}&phone=${creds.phone}`
        })
            .then(response => response.json())
            .then(json => dispatch(successEditCustomer(json)))
            .catch(error => {throw error});
    }
}