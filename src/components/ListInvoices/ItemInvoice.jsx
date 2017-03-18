import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import {openModal, closeModal} from '../../actions/ModalsActions';
import {addQueueInvoicesDelete, addQueueInvoicesEdit} from '../../actions/InvoicesActions';

const propTypes = {
    dispatch: PropTypes.func,
    modals: PropTypes.object.isRequired,
    customers: PropTypes.object.isRequired
};

class ItemProduct extends React.Component {

    listElement(invoice) {
        const { dispatch, customers } = this.props;
        return invoice.map((element, i) => {
            let customer = customers.data.filter(data => data.id == element.customer_id);
            return (
                <tr key={i}>
                    <td>{element.id}</td>
                    <td>{customer[0].name}</td>
                    <td>{element.discount}</td>
                    <td>{element.total}</td>
                    <td>
                        <ButtonToolbar className="show-hover">
                            <button className='btn btn-link' onClick={() => {
                                dispatch(addQueueInvoicesEdit(element.id));
                                dispatch(openModal('editProduct'))
                            }}>
                                Edit
                            </button>
                            <button className='btn btn-link' onClick={() => {
                                dispatch(addQueueInvoicesDelete(element.id));
                                dispatch(openModal('deleteProduct'))
                            }}>
                                Delete
                            </button>
                        </ButtonToolbar>
                    </td>
                </tr>
            );
        })
    }

    render() {
        const {invoice} = this.props;

        return (
            <tbody>
            {this.listElement(invoice)}
            </tbody>
        );
    }
}

ItemProduct.propTypes = propTypes;

function mapStateToProps(state) {
    return {
        modals: state.modals,
        customers: state.customers
    };
}


export default connect(mapStateToProps)(ItemProduct);

// export default ItemCustomer;