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

const initialState = {
    data: [],
    fetching: false,
    error: false
};

export default function (state = initialState, action) {

    switch (action.type) {
        case GET_INVOICES_ITEMS_REQUEST:
            return {...state, fetching: true, error: ''};

        case GET_INVOICES_ITEMS_SUCCESS:
            return {...state, data: action.json, fetching: false, error: ''};

        case GET_INVOICES_ITEMS_FAIL:
            return {...state, error: action.json, fetching: false};

        case POST_INVOICES_ITEMS_REQUEST:
            return {...state, fetching: true};

        case POST_INVOICES_ITEMS_SUCCESS:
            return {...state, data: [...state.data, action.json], fetching: false, error: ''};

        case ADD_QUEUE_DELETE:
            return {...state, queue_delete: action.id};

        case CLEAR_QUEUE_DELETE:
            return {...state, queue_delete: null};

        case ADD_QUEUE_EDIT:
            return {...state, queue_edit: action.json};

        case CLEAR_QUEUE_EDIT:
            return {...state, queue_edit: null};

        case DELETE_INVOICES_ITEMS_REQUEST:
            return {...state, fetching: true, error: ''};

        case DELETE_INVOICES_ITEMS_SUCCESS:
            const deleteInvoiceId = action.json.id;
            return {...state, data: state.data.filter(data => data.id !== deleteInvoiceId), fetching: false, error: ''};

        case DELETE_INVOICES_ITEMS_FAIL:
            return {...state, error: action.json, fetching: false};


        case EDIT_INVOICES_ITEMS_REQUEST:
            return {...state, fetching: true, error: ''};

        case EDIT_INVOICES_ITEMS_SUCCESS:
            const editInvoiceId = action.json.id;
            let pos = state.data.map(function(e) { return e.id; }).indexOf(editInvoiceId);
            let newState = JSON.parse(JSON.stringify(state.data));
            newState[pos] = action.json;
            return {...state, data:[...newState], fetching: false, error: ''};

        case EDIT_INVOICES_ITEMS_FAIL:
            return {...state, error: action.json, fetching: false};

        default:
            return state;
    }

}