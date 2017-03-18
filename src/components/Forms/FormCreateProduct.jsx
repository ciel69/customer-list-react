import React, {PropTypes} from 'react';
import ReactDOM from "react-dom";
import {connect} from 'react-redux';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import {createProducts} from '../../actions/ProductsActions';
import {closeModal} from '../../actions/ModalsActions';

const propTypes = {
    dispatch: PropTypes.func,
};

class FormCreateCustomer extends React.Component {

    handleCreate(e) {
        e.preventDefault();
        const name = ReactDOM.findDOMNode(this.refs.name);
        const price = ReactDOM.findDOMNode(this.refs.price);
        const creds = {name: name.value.trim(), price: price.value.trim()};
        const {dispatch} = this.props;
        ReactDOM.findDOMNode(this.refs.formCreateProduct).reset();
        dispatch(createProducts(creds));
        dispatch(closeModal('createProduct'));
    }

    validDecimal() {
        ReactDOM.findDOMNode(this.refs.price).value = ReactDOM.findDOMNode(this.refs.price).value.replace(/[^\d.]*/g, '')
            .replace(/([.])[.]+/g, '$1')
            .replace(/^[^\d]*(\d+([.,]\d{0,2})?).*$/g, '$1');
    }

    render() {
        return (
            <Form ref="formCreateProduct" horizontal onSubmit={(event) => this.handleCreate(event)}>
                <FormGroup controlId="formHorizontalName">
                    <Col componentClass={ControlLabel} sm={2}>
                        Name
                    </Col>
                    <Col sm={10}>
                        <FormControl ref="name" name="name" type="text" placeholder="Name" required="required"/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formControlsPrice">
                    <Col componentClass={ControlLabel} sm={2}>
                        Price
                    </Col>
                    <Col sm={10}>
                        <FormControl ref="price" name="price" type="text" placeholder="Price" required="required"
                                     onChange={this.validDecimal.bind(this)}/>
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