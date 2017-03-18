import React, {PropTypes} from 'react';
import ReactDOM from "react-dom";
import {connect} from 'react-redux';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import {createCustomer} from '../../actions/CustomerActions';
import {closeModal} from '../../actions/ModalsActions';
import MaskedFormControl from 'react-bootstrap-maskedinput';

const propTypes = {
    dispatch: PropTypes.func,
};

class FormCreateCustomer extends React.Component {

    componentDidUpdate(){
        ReactDOM.findDOMNode(this.refs.formCreateCustomer).reset();
        ReactDOM.findDOMNode(this.refs.phone).value = "";
    }

    handleCreate(e) {
        e.preventDefault();
        const name = ReactDOM.findDOMNode(this.refs.name);
        const address = ReactDOM.findDOMNode(this.refs.address);
        const phone = ReactDOM.findDOMNode(this.refs.phone);
        const creds = {name: name.value.trim(), address: address.value.trim(), phone: phone.value.trim()};
        const {dispatch} = this.props;
        dispatch(createCustomer(creds));
        dispatch(closeModal('createCustomer'));
    }

    render() {
        return (
            <Form ref="formCreateCustomer" horizontal onSubmit={(event) => this.handleCreate(event)}>
                <FormGroup controlId="formHorizontalName">
                    <Col componentClass={ControlLabel} sm={2}>
                        Name
                    </Col>
                    <Col sm={10}>
                        <FormControl ref="name" name="name" type="text" placeholder="Name" required="required"/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formControlsTextarea">
                    <Col componentClass={ControlLabel} sm={2}>
                        Address
                    </Col>
                    <Col sm={10}>
                        <FormControl ref="address" name="address" componentClass="textarea" placeholder="Address"
                                     required="required"/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formControlsPhone">
                    <Col componentClass={ControlLabel} sm={2}>
                        Address
                    </Col>
                    <Col sm={10}>
                        <MaskedFormControl ref="phone" name="phone" type='text' placeholder='___-___-____' mask='111-111-1111' />
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
FormCreateCustomer.propTypes = propTypes;

function mapStateToProps(state) {
    return {
        modals: state.modals
    };
}


export default connect(mapStateToProps)(FormCreateCustomer);