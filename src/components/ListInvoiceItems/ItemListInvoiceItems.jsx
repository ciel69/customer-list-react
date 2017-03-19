import React, {PropTypes} from 'react';
import ReactDOM from "react-dom";
import {connect} from 'react-redux';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import FormControl from 'react-bootstrap/lib/FormControl';
import {openModal, closeModal} from '../../actions/ModalsActions';
import {addQueueInvoicesDelete, addQueueInvoicesEdit} from '../../actions/InvoicesActions';
import {deleteInvoicesItems, editInvoicesItems} from '../../actions/InvoicesItemsActions';

const propTypes = {
    dispatch: PropTypes.func,
    modals: PropTypes.object.isRequired,
    products: PropTypes.object.isRequired
};

class ItemListInvoiceItems extends React.Component {

    handleEditItems(invoice_id, product_id, element_id) {
        const quantity = ReactDOM.findDOMNode(this.refs.quantity).value.trim();
        if (!!quantity) {
            const creds = {product_id: product_id, quantity: quantity};
            const {dispatch} = this.props;
            dispatch(editInvoicesItems(invoice_id, element_id, creds));
        }
    }

    listElement(invoiceItem) {
        const {dispatch, products} = this.props;

        return invoiceItem.map((element, i) => {

            let product = products.data.filter(data => data.id == element.product_id);

            product = product[0] || {name: ''};

            return (
                <tr key={i}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>
                        <FormControl pattern="\d+(\.\d{2})?" ref="quantity" name="quantity" type="text" placeholder="Discount"
                                     defaultValue={element.quantity}
                                     onChange={() => this.handleEditItems(element.invoice_id, element.product_id, element.id)}/>

                    </td>
                    <td>
                        <ButtonToolbar className="show-hover">
                            <button className='btn btn-link' onClick={() => {
                                dispatch(deleteInvoicesItems(element.invoice_id, element.id))
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
        const {invoiceItem} = this.props;

        return (
            <tbody>
            {this.listElement(invoiceItem)}
            </tbody>
        );
    }
}

ItemListInvoiceItems.propTypes = propTypes;

function mapStateToProps(state) {
    return {
        modals: state.modals,
        products: state.products
    };
}


export default connect(mapStateToProps)(ItemListInvoiceItems);