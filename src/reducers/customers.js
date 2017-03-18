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

const initialState = {
    data: [],
    fetching: false,
    error: false
};

export default function (state = initialState, action) {

    switch (action.type) {
        case GET_CUSTOMER_REQUEST:
            return {...state, fetching: true, error: ''};

        case GET_CUSTOMER_SUCCESS:
            return {...state, data: action.json, fetching: false, error: ''};

        case GET_CUSTOMER_FAIL:
            return {...state, error: action.json, fetching: false};

        case POST_CUSTOMER_REQUEST:
            return {...state, fetching: true};

        case POST_CUSTOMER_SUCCESS:
            return {...state, data: [...state.data, action.json], fetching: false, error: ''};

        case ADD_QUEUE_DELETE:
            return {...state, queue_delete: action.id};

        case CLEAR_QUEUE_DELETE:
            return {...state, queue_delete: null};

        case ADD_QUEUE_EDIT:
            return {...state, queue_edit: action.json};

        case CLEAR_QUEUE_EDIT:
            return {...state, queue_edit: null};

        case DELETE_CUSTOMER_REQUEST:
            return {...state, fetching: true, error: ''};

        case DELETE_CUSTOMER_SUCCESS:
            const customerId = action.json.id;
            return {...state, data: state.data.filter(data => data.id !== customerId), fetching: false, error: ''};

        case DELETE_CUSTOMER_FAIL:
            return {...state, error: action.json, fetching: false};


        case EDIT_CUSTOMER_REQUEST:
            return {...state, fetching: true, error: ''};

        case EDIT_CUSTOMER_SUCCESS:
            const customerEditId = action.json.id;
            let pos = state.data.map(function(e) { return e.id; }).indexOf(customerEditId);
            let newState = JSON.parse(JSON.stringify(state.data));
            newState[pos] = action.json;
            return {...state, data:[...newState], fetching: false, error: ''};

        case EDIT_CUSTOMER_FAIL:
            return {...state, error: action.json, fetching: false};

        default:
            return state;
    }

}