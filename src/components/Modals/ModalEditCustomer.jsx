import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {openModal, closeModal} from '../../actions/ModalsActions';
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap';
import {clearQueueCustomerEdit} from '../../actions/CustomerActions';
import {FormEditCustomer} from '../Forms'

const propTypes = {
    dispatch: PropTypes.func,
    modals: PropTypes.object.isRequired
};

const nameModal = 'editCustomer';

class ModalEditCustomer extends React.Component {

    closeModal() {
        const {dispatch} = this.props;
        dispatch(closeModal(nameModal));
        dispatch(clearQueueCustomerEdit());
    }

    render() {
        const {dispatch, modals, customer} = this.props;
        let isOpen = false;

        if (!!modals[nameModal]) {
            isOpen = modals[nameModal].isOpen;
        }

        return (
            <Modal isOpen={isOpen} onRequestHide={() => this.closeModal()}>
                <ModalHeader>
                    <ModalClose onClick={() => this.closeModal()}/>
                    <ModalTitle>Edit Customer</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <FormEditCustomer customer={customer}/>
                </ModalBody>
            </Modal>
        );
    }
}

ModalEditCustomer.propTypes = propTypes;

function mapStateToProps(state) {
    return {
        modals: state.modals
    };
}


export default connect(mapStateToProps)(ModalEditCustomer);
