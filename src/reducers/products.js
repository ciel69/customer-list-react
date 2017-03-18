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

const initialState = {
    data: [],
    fetching: false,
    error: false
};

export default function (state = initialState, action) {

    switch (action.type) {
        case GET_PRODUCTS_REQUEST:
            return {...state, fetching: true, error: ''};

        case GET_PRODUCTS_SUCCESS:
            return {...state, data: action.json, fetching: false, error: ''};

        case GET_PRODUCTS_FAIL:
            return {...state, error: action.json, fetching: false};

        case POST_PRODUCTS_REQUEST:
            return {...state, fetching: true};

        case POST_PRODUCTS_SUCCESS:
            return {...state, data: [...state.data, action.json], fetching: false, error: ''};

        case ADD_QUEUE_DELETE:
            return {...state, queue_delete: action.id};

        case CLEAR_QUEUE_DELETE:
            return {...state, queue_delete: null};

        case ADD_QUEUE_EDIT:
            return {...state, queue_edit: action.json};

        case CLEAR_QUEUE_EDIT:
            return {...state, queue_edit: null};

        case DELETE_PRODUCTS_REQUEST:
            return {...state, fetching: true, error: ''};

        case DELETE_PRODUCTS_SUCCESS:
            const deleteProductId = action.json.id;
            return {...state, data: state.data.filter(data => data.id !== deleteProductId), fetching: false, error: ''};

        case DELETE_PRODUCTS_FAIL:
            return {...state, error: action.json, fetching: false};


        case EDIT_PRODUCTS_REQUEST:
            return {...state, fetching: true, error: ''};

        case EDIT_PRODUCTS_SUCCESS:
            const editProductId = action.json.id;
            let pos = state.data.map(function(e) { return e.id; }).indexOf(editProductId);
            let newState = JSON.parse(JSON.stringify(state.data));
            newState[pos] = action.json;
            return {...state, data:[...newState], fetching: false, error: ''};

        case EDIT_PRODUCTS_FAIL:
            return {...state, error: action.json, fetching: false};

        default:
            return state;
    }

}