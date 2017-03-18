import React, {PropTypes} from 'react';
import ReactDOM from "react-dom";
import {connect} from 'react-redux';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import ControlLabel from "react-bootstrap/lib/ControlLabel";
// import {createCustomer, fetchCustomers} from '../../actions/CustomerActions';
import {createInvoices} from '../../actions/InvoicesActions';
import {closeModal} from '../../actions/ModalsActions';
import MaskedFormControl from 'react-bootstrap-maskedinput';

const propTypes = {
    dispatch: PropTypes.func,
    customers: PropTypes.object.isRequired,
};

class FormCreateInvoices extends React.Component {

    componentDidUpdate() {
        ReactDOM.findDOMNode(this.refs.formCreateInvoice).reset();
    }

    handleCreate(e) {
        e.preventDefault();
        const customer = ReactDOM.findDOMNode(this.refs.customer);
        const discount = ReactDOM.findDOMNode(this.refs.discount);
        const phone = ReactDOM.findDOMNode(this.refs.phone);
        const creds = {customer_id: customer.value.trim(), discount: discount.value.trim()};
        const {dispatch} = this.props;
        dispatch(createInvoices(creds));
        dispatch(closeModal('createInvoice'));
    }

    listCustomers() {
        const {dispatch, customers} = this.props;
        return customers.data.map(function (item, i) {
            return (
                <option key={i} value={item.id}>{item.name}</option>
            )
        })
    }

    render() {

        // customer = customer.filter(data => data.id !== customerId);
        return (
            <Form ref="formCreateInvoice" horizontal onSubmit={(event) => this.handleCreate(event)}>
                <FormGroup controlId="formControlsSelectMultiple">
                    <ControlLabel>Customer</ControlLabel>
                    <FormControl ref="customer" componentClass="select">
                        <option value="select">select customer</option>
                        {this.listCustomers()}
                    </FormControl>
                </FormGroup>

                <FormGroup controlId="formHorizontalName">
                    <Col componentClass={ControlLabel} sm={2}>
                        Discount
                    </Col>
                    <Col sm={10}>
                        <FormControl ref="discount" name="discount" type="text" placeholder="Discount" required=""/>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button type="submit">
                            Create
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}
FormCreateInvoices.propTypes = propTypes;

function mapStateToProps(state) {
    return {
        modals: state.modals,
        customers: state.customers
    };
}


export default connect(mapStateToProps)(FormCreateInvoices);