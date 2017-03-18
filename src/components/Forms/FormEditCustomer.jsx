import React, {PropTypes} from 'react';
import ReactDOM from "react-dom";
import {connect} from 'react-redux';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import {editCustomer} from '../../actions/CustomerActions';
import {openModal, closeModal} from '../../actions/ModalsActions';
import MaskedFormControl from 'react-bootstrap-maskedinput';

const propTypes = {
    dispatch: PropTypes.func,
};

class FormEditCustomer extends React.Component {

    componentDidUpdate() {
        if(!!ReactDOM.findDOMNode(this.refs.formEditCustomer)) {
            ReactDOM.findDOMNode(this.refs.formEditCustomer).reset();
        }
    }

    handleCreate(e) {
        e.preventDefault();
        const name = ReactDOM.findDOMNode(this.refs.name);
        const address = ReactDOM.findDOMNode(this.refs.address);
        const phone = ReactDOM.findDOMNode(this.refs.phone);
        const creds = {name: name.value.trim(), address: address.value.trim(), phone: phone.value.trim()};
        const {dispatch, customer} = this.props;
        dispatch(editCustomer(customer.id, creds));
        dispatch(closeModal('editCustomer'));
    }

    render() {
        const {customer} = this.props;
        if (!!customer) {
            return (
                <Form ref="formEditCustomer" horizontal onSubmit={(event) => this.handleCreate(event)}>
                    <FormGroup controlId="formHorizontalName">
                        <Col componentClass={ControlLabel} sm={2}>
                            Name
                        </Col>
                        <Col sm={10}>
                            <FormControl ref="name" name="name" type="text" placeholder="Name" required="required"
                                         defaultValue={customer.name}/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formControlsTextarea">
                        <Col componentClass={ControlLabel} sm={2}>
                            Address
                        </Col>
                        <Col sm={10}>
                            <FormControl ref="address" name="address" componentClass="textarea" placeholder="Address"
                                         required="required" defaultValue={customer.address}/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formControlsPhone">
                        <Col componentClass={ControlLabel} sm={2}>
                            Phone
                        </Col>
                        <Col sm={10}>
                            <MaskedFormControl ref="phone" id="phone" name="phone" type='phone'
                                               placeholder='___-___-____' mask='111-111-1111' value={customer.phone}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button type="submit">
                                Save
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            );
        } else {
            return false;
        }
    }
}
FormEditCustomer.propTypes = propTypes;

function mapStateToProps(state) {
    return {
        modals: state.modals
    };
}


export default connect(mapStateToProps)(FormEditCustomer);