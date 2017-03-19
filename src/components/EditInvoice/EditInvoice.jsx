import React, {PropTypes} from 'react';
import ReactDOM from "react-dom";
import {connect} from 'react-redux';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import {fetchInvoices, editInvoices} from '../../actions/InvoicesActions';
import {fetchCustomers} from '../../actions/CustomerActions';
import {fetchInvoicesItems, createInvoicesItems} from '../../actions/InvoicesItemsActions';
import {fetchProducts} from '../../actions/ProductsActions';
import ListInvoiceItems from '../ListInvoiceItems';
import {updateTitle} from 'redux-title';
import {browserHistory} from 'react-router';

import './style.css';

const propTypes = {
    dispatch: PropTypes.func,
    customers: PropTypes.object.isRequired,
    invoices_item: PropTypes.object.isRequired,
    products: PropTypes.object.isRequired,
    invoices: PropTypes.object.isRequired
};

class EditInvoice extends React.Component {
    componentDidMount() {
        const {dispatch, params} = this.props;
        dispatch(fetchInvoices());
        dispatch(fetchCustomers());
        dispatch(fetchProducts());
        dispatch(fetchInvoicesItems(params.id));
        dispatch(updateTitle("Invoice Edit"));
    }

    handleCalcTotal() {
        const {products, invoices_item} = this.props;
        let totalPrice = 0;
        invoices_item.data.map(function (element, i) {
            let product = products.data.filter(data => data.id == element.product_id);
            if (product.length > 0) {
                totalPrice += product[0].price - (product[0].price / 100 * element.quantity);
            }
        });
        return totalPrice.toFixed(2);
    }

    handleCreate(e) {
        e.preventDefault();
        const customer = ReactDOM.findDOMNode(this.refs.customer);
        const discount = ReactDOM.findDOMNode(this.refs.discount);
        const total = ReactDOM.findDOMNode(this.refs.total);
        const creds = {customer_id: customer.value.trim(), discount: discount.value.trim(), total: total.value.trim()};
        const {dispatch, params} = this.props;
        dispatch(editInvoices(params.id, creds));
    }

    handleCreateItem() {
        const products = ReactDOM.findDOMNode(this.refs.products).value.trim();
        if (products != "def") {
            const creds = {product_id: products, quantity: ""};
            const {dispatch, params} = this.props;
            dispatch(createInvoicesItems(params.id, creds));
        }
    }

    validDecimal() {
        ReactDOM.findDOMNode(this.refs.discount).value = ReactDOM.findDOMNode(this.refs.discount).value.replace(/[^\d.]*/g, '')
            .replace(/([.])[.]+/g, '$1')
            .replace(/^[^\d]*(\d+([.,]\d{0,2})?).*$/g, '$1');
    }

    listCustomers(items) {
        return items.data.map(function (item, i) {
            return (
                <option key={i} value={item.id}>{item.name}</option>
            )
        })
    }

    render() {
        const {products, customers, invoices, invoices_item, params} = this.props;

        let invoice = invoices.data.filter(data => data.id == params.id);

        if (invoices.data.length > 0 && invoice.length == 0) {
            browserHistory.push('/invoices');
        }

        if (invoice.length > 0) {
            return (
                <div>
                    <h1>Invoice Edit</h1>
                    <Form ref="formEditInvoice" onSubmit={(event) => this.handleCreate(event)}>
                        <Row>
                            <Col xs={4}>
                                <FormGroup controlId="formHorizontalName">
                                    <Row>
                                        <Col componentClass={ControlLabel} sm={12}>
                                            Discount (%)
                                        </Col>
                                        <Col sm={12}>
                                            <FormControl ref="discount" name="discount" type="text"
                                                         placeholder="Discount" defaultValue={invoice[0].discount}
                                                         onChange={this.validDecimal.bind(this)}/>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={6}>
                                <FormGroup controlId="formControlsSelectCustomer">
                                    <Row>
                                        <Col componentClass={ControlLabel} sm={12}>
                                            Customer
                                        </Col>
                                        <Col sm={12}>
                                            <FormControl ref="customer" componentClass="select"
                                                         defaultValue={invoice[0].customer_id}>
                                                <option>select customer</option>
                                                {this.listCustomers(customers)}
                                            </FormControl>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={6}>
                                <FormGroup controlId="formControlsSelectProducts">
                                    <Col componentClass={ControlLabel} sm={12}>
                                        Products
                                    </Col>
                                    <Row>
                                        <Col sm={12}>
                                            <Row>
                                                <Col sm={8}>
                                                    <FormControl ref="products" componentClass="select">
                                                        <option value="def">select product</option>
                                                        {this.listCustomers(products)}
                                                    </FormControl>
                                                </Col>
                                                <Col sm={4}>
                                                    <button className='btn' onClick={() => this.handleCreateItem()}>
                                                        Add
                                                    </button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>

                            <Col xs={12}>
                                <ListInvoiceItems list={invoices_item.data}/>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12}>
                                <FormControl ref="total" name="total" type="hidden" defaultValue={this.handleCalcTotal()}/>
                                <div className="total-price">Total: <span>{this.handleCalcTotal()}</span></div>
                            </Col>
                        </Row>

                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <Button type="submit">
                                    Save
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            );
        } else {
            return (
                <div>not invoice</div>
            );
        }
    }
}

EditInvoice.propTypes = propTypes;

function mapStateToProps(state) {
    return {
        title: state.title,
        customers: state.customers,
        products: state.products,
        invoices_item: state.invoices_item,
        invoices: state.invoices
    };
}


export default connect(mapStateToProps)(EditInvoice);