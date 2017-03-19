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
import {FormCreateInvoices} from '../Forms'

const propTypes = {
    dispatch: PropTypes.func,
    modals: PropTypes.object.isRequired
};

const nameModal = 'createInvoice';

class ModalCreateInvoices extends React.Component {

    render() {
        const { dispatch, modals } = this.props;
        let isOpen = false;

        if (!!modals[nameModal]) {
            isOpen = modals[nameModal].isOpen;
        }

        return (
            <div>
                <button className='btn btn-primary' onClick={() => dispatch(openModal(nameModal))}>
                    Create Invoice
                </button>
                <Modal isOpen={isOpen} onRequestHide={() => dispatch(closeModal(nameModal))}>
                    <ModalHeader>
                        <ModalClose onClick={() => dispatch(closeModal(nameModal))}/>
                        <ModalTitle>Create New Invoice</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <FormCreateInvoices/>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

ModalCreateInvoices.propTypes = propTypes;

function mapStateToProps(state) {
    return {
        modals: state.modals
    };
}


export default connect(mapStateToProps)(ModalCreateInvoices);
