import {
    SHOW_MODAL,
    HIDE_MODAL
} from '../constants/Modals';

let arModal = [];

function showModal(modalName) {
    arModal[modalName] = {isOpen: true};
    return {
        type: SHOW_MODAL,
        modal: arModal
    }
}
function hideModal(modalName) {
    arModal[modalName] = {isOpen: false};
    return {
        type: HIDE_MODAL,
        modal: arModal
    }
}

export function openModal(modalName) {
    return dispatch => {
        dispatch(showModal(modalName));
    }
}

export function closeModal(modalName) {
    return dispatch => {
        dispatch(hideModal(modalName));
    }
}