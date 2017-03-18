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
import {clearQueueProductsDelete, deleteProducts} from '../../actions/ProductsActions';

const propTypes = {
    dispatch: PropTypes.func,
    modals: PropTypes.object.isRequired
};

const nameModal = 'deleteProduct';

class ModalDeleteProduct extends React.Component {

    closeModal() {
        const {dispatch} = this.props;
        dispatch(closeModal(nameModal));
        dispatch(clearQueueProductsDelete());
    }

    render() {
        const {dispatch, modals, deleteProductId} = this.props;
        let isOpen = false;

        if (!!modals[nameModal]) {
            isOpen = modals[nameModal].isOpen;
        }

        return (
            <div>
                <Modal isOpen={isOpen} onRequestHide={() => this.closeModal()}>
                    <ModalHeader>
                        <ModalClose onClick={() => ::this.closeModal()}/>
                        <ModalTitle>Delete Product</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <div>Are you sure you want to remove product?</div>
                        <ButtonToolbar>
                            <button className='btn btn-danger'
                                    onClick={() => {
                                        dispatch(deleteProducts(deleteProductId));
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

ModalDeleteProduct.propTypes = propTypes;

function mapStateToProps(state) {
    return {
        modals: state.modals
    };
}


export default connect(mapStateToProps)(ModalDeleteProduct);
