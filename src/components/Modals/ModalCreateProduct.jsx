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
import {FormCreateProduct} from '../Forms'

const propTypes = {
    dispatch: PropTypes.func,
    modals: PropTypes.object.isRequired
};

const nameModal = 'createProduct';

class ModalCreateProduct extends React.Component {

    render() {
        const { dispatch, modals } = this.props;
        let isOpen = false;

        if (!!modals[nameModal]) {
            isOpen = modals[nameModal].isOpen;
        }

        return (
            <div>
                <button className='btn btn-primary' onClick={() => dispatch(openModal(nameModal))}>
                    Create Product
                </button>
                <Modal isOpen={isOpen} onRequestHide={() => dispatch(closeModal(nameModal))}>
                    <ModalHeader>
                        <ModalClose onClick={() => dispatch(closeModal(nameModal))}/>
                        <ModalTitle>Create New Product</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <FormCreateProduct/>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

ModalCreateProduct.propTypes = propTypes;

function mapStateToProps(state) {
    return {
        modals: state.modals
    };
}


export default connect(mapStateToProps)(ModalCreateProduct);
