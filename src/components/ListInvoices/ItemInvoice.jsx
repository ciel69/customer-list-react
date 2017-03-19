import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import {openModal} from '../../actions/ModalsActions';
import {addQueueInvoicesDelete} from '../../actions/InvoicesActions';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';

const propTypes = {
    dispatch: PropTypes.func,
    modals: PropTypes.object.isRequired,
    customers: PropTypes.object.isRequired
};

class ItemProduct extends React.Component {

    listElement(invoice) {
        const {dispatch, customers} = this.props;
        return invoice.map((element, i) => {
            let customer = customers.data.filter(data => data.id == element.customer_id);
            customer = customer[0] || {name: ''};
            return (
                <tr key={i}>
                    <td>{element.id}</td>
                    <td>{customer.name}</td>
                    <td>{element.discount}</td>
                    <td>{element.total}</td>
                    <td>
                        <ButtonToolbar className="show-hover">
                            <LinkContainer to={"/invoices/" + element.id}>
                                <button className='btn btn-link'>
                                    Edit
                                </button>
                            </LinkContainer>
                            <button className='btn btn-link' onClick={() => {
                                dispatch(addQueueInvoicesDelete(element.id));
                                dispatch(openModal('deleteInvoice'))
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