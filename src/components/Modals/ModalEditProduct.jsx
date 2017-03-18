import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {openModal, closeModal} from '../../actions/ModalsActions';
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody
} from 'react-modal-bootstrap';
import {clearQueueProductsEdit} from '../../actions/ProductsActions';
import {FormEditProduct} from '../Forms'

const propTypes = {
    dispatch: PropTypes.func,
    modals: PropTypes.object.isRequired
};

const nameModal = 'editProduct';

class ModalEditProduct extends React.Component {

    closeModal() {
        const {dispatch} = this.props;
        dispatch(closeModal(nameModal));
        dispatch(clearQueueProductsEdit());
    }

    render() {
        const {dispatch, modals, product} = this.props;
        let isOpen = false;

        if (!!modals[nameModal]) {
            isOpen = modals[nameModal].isOpen;
        }

        return (
            <Modal isOpen={isOpen} onRequestHide={() => this.closeModal()}>
                <ModalHeader>
                    <ModalClose onClick={() => this.closeModal()}/>
                    <ModalTitle>Edit Product</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <FormEditProduct product={product}/>
                </ModalBody>
            </Modal>
        );
    }
}

ModalEditProduct.propTypes = propTypes;

function mapStateToProps(state) {
    return {
        modals: state.modals
    };
}


export default connect(mapStateToProps)(ModalEditProduct);
