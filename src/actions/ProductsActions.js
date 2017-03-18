import {
    GET_PRODUCTS_REQUEST,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAIL,
    POST_PRODUCTS_REQUEST,
    POST_PRODUCTS_SUCCESS,
    POST_PRODUCTS_FAIL,
    ADD_QUEUE_DELETE,
    CLEAR_QUEUE_DELETE,
    DELETE_PRODUCTS_REQUEST,
    DELETE_PRODUCTS_SUCCESS,
    DELETE_PRODUCTS_FAIL,
    ADD_QUEUE_EDIT,
    CLEAR_QUEUE_EDIT,
    EDIT_PRODUCTS_REQUEST,
    EDIT_PRODUCTS_SUCCESS,
    EDIT_PRODUCTS_FAIL
} from '../constants/Products';

//get list Products
function requestGetProducts() {
    return {
        type: GET_PRODUCTS_REQUEST
    }
}

function receiveProducts(json) {
    return {
        type: GET_PRODUCTS_SUCCESS,
        json
    }
}

export function fetchProducts() {
    return dispatch => {
        dispatch(requestGetProducts());
        return fetch('/api/products',{
            method: 'GET'
        })
            .then(response => response.json())
            .then(json => dispatch(receiveProducts(json)))
            .catch(error => {throw error});
    }
}

function requestCreateProducts() {
    return {
        type: POST_PRODUCTS_REQUEST
    }
}

function createNewProducts(json) {
    return {
        type: POST_PRODUCTS_SUCCESS,
        json
    }
}


export function createProducts(creds) {
    return dispatch => {
        dispatch(requestCreateProducts());
        return fetch('/api/products',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'
            },
            credentials: 'same-origin',
            body: `name=${creds.name}&price=${creds.price}`
        })
            .then(response => response.json())
            .then(json => dispatch(createNewProducts(json)))
            .catch(error => {throw error});
    }
}

//add products to queue delete
function appendQueueProductsDelete(id) {
    return {
        type: ADD_QUEUE_DELETE,
        id
    }
}
function deleteQueueProductsDelete() {
    return {
        type: CLEAR_QUEUE_DELETE
    }
}

export function addQueueProductsDelete(id) {
    return dispatch => {
        dispatch(appendQueueProductsDelete(id));
    }
}

export function clearQueueProductsDelete() {
    return dispatch => {
        dispatch(deleteQueueProductsDelete());
    }
}

//delete products
function requestDeleteProducts() {
    return {
        type: DELETE_PRODUCTS_REQUEST
    }
}

function removeProducts(json) {
    return {
        type: DELETE_PRODUCTS_SUCCESS,
        json
    }
}


export function deleteProducts(id) {
    return dispatch => {
        dispatch(requestDeleteProducts());
        return fetch(`/api/products/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'
            },
            credentials: 'same-origin'
        })
            .then(response => response.json())
            .then(json => dispatch(removeProducts(json)))
            .catch(error => {throw error});
    }
}

//add products to queue edit
function appendQueueProductsEdit(json) {
    return {
        type: ADD_QUEUE_EDIT,
        json
    }
}
function deleteQueueProductsEdit() {
    return {
        type: CLEAR_QUEUE_EDIT
    }
}

export function addQueueProductsEdit(id) {
    return dispatch => {
        // dispatch(requestDeleteProducts());
        return fetch(`/api/products/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'
            },
            credentials: 'same-origin'
        })
            .then(response => response.json())
            .then(json => dispatch(appendQueueProductsEdit(json)))
            .catch(error => {throw error});
    }
}

export function clearQueueProductsEdit() {
    return dispatch => {
        dispatch(deleteQueueProductsEdit());
    }
}


//edit products
function requestEditProducts() {
    return {
        type: EDIT_PRODUCTS_REQUEST
    }
}

function successEditProducts(json) {
    return {
        type: EDIT_PRODUCTS_SUCCESS,
        json
    }
}


export function editProducts(id, creds) {
    return dispatch => {
        dispatch(requestEditProducts());
        return fetch(`/api/products/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'
            },
            credentials: 'same-origin',
            body: `name=${creds.name}&price=${creds.price}`
        })
            .then(response => response.json())
            .then(json => dispatch(successEditProducts(json)))
            .catch(error => {throw error});
    }
}