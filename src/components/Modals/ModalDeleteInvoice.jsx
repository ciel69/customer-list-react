import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import {openModal, closeModal} from '../../actions/ModalsActions';
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody
} from 'react-modal-bootstrap';
import {clearQueueInvoicesDelete, deleteInvoices} from '../../actions/InvoicesActions';

const propTypes = {
    dispatch: PropTypes.func,
    modals: PropTypes.object.isRequired
};

const nameModal = 'deleteInvoice';

class ModalDeleteInvoice extends React.Component {

    closeModal() {
        const {dispatch} = this.props;
        dispatch(closeModal(nameModal));
        dispatch(clearQueueInvoicesDelete());
    }

    render() {
        const {dispatch, modals, deleteInvoiceId} = this.props;
        let isOpen = false;

        if (!!modals[nameModal]) {
            isOpen = modals[nameModal].isOpen;
        }

        return (
            <div>
                <Modal isOpen={isOpen} onRequestHide={() => this.closeModal()}>
                    <ModalHeader>
                        <ModalClose onClick={() => ::this.closeModal()}/>
                        <ModalTitle>Delete Invoice</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <div>Are you sure you want to remove invoice?</div>
                        <ButtonToolbar>
                            <button className='btn btn-danger'
                                    onClick={() => {
                                        dispatch(deleteInvoices(deleteInvoiceId));
                                        this.closeModal();
                                    }}>
                                Delete
                            </button>
                            <button className='btn btn-primary' onClick={() => this.closeModal()}>
                                Not delete
                            </button>
                        </ButtonToolbar>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

ModalDeleteInvoice.propTypes = propTypes;

function mapStateToProps(state) {
    return {
        modals: state.modals
    };
}


export default connect(mapStateToProps)(ModalDeleteInvoice);
