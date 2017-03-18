import {
    SHOW_MODAL,
    HIDE_MODAL
} from '../constants/Modals';

const initialState = {

};

export default function (state = initialState, action) {

    switch (action.type) {
        case SHOW_MODAL:
            return {...state.modals, ...action.modal};

        case HIDE_MODAL:
            return {...state.modals, ...action.modal};

        default:
            return state;
    }

}