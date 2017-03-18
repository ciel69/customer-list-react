import React, {PropTypes} from 'react';
import ReactDOM from "react-dom";
import {connect} from 'react-redux';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import {editProducts} from '../../actions/ProductsActions';
import {openModal, closeModal} from '../../actions/ModalsActions';

const propTypes = {
    dispatch: PropTypes.func,
};

class FormEditProduct extends React.Component {

    componentDidUpdate() {
        if(!!ReactDOM.findDOMNode(this.refs.formEditProduct)) {
            ReactDOM.findDOMNode(this.refs.formEditProduct).reset();
        }
    }

    handleCreate(e) {
        e.preventDefault();
        const name = ReactDOM.findDOMNode(this.refs.name);
        const price = ReactDOM.findDOMNode(this.refs.price);
        const creds = {name: name.value.trim(), price: price.value.trim()};
        const {dispatch, product} = this.props;
        dispatch(editProducts(product.id, creds));
        dispatch(closeModal('editProduct'));
    }

    validDecimal() {
        ReactDOM.findDOMNode(this.refs.price).value = ReactDOM.findDOMNode(this.refs.price).value.replace(/[^\d.]*/g, '')
            .replace(/([.])[.]+/g, '$1')
            .replace(/^[^\d]*(\d+([.,]\d{0,2})?).*$/g, '$1');
    }

    render() {
        const {product} = this.props;
        if (!!product) {
            return (
                <Form ref="formEditProduct" horizontal onSubmit={(event) => this.handleCreate(event)}>
                    <FormGroup controlId="formHorizontalName">
                        <Col componentClass={ControlLabel} sm={2}>
                            Name
                        </Col>
                        <Col sm={10}>
                            <FormControl ref="name" name="name" type="text" placeholder="Name" required="required"
                                         defaultValue={product.name}/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formControlsPrice">
                        <Col componentClass={ControlLabel} sm={2}>
                            Price
                        </Col>
                        <Col sm={10}>
                            <FormControl ref="price" name="price" type="text" placeholder="price"
                                         required="required" defaultValue={product.price} onChange={this.validDecimal.bind(this)}/>
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
FormEditProduct.propTypes = propTypes;

function mapStateToProps(state) {
    return {
        modals: state.modals
    };
}


export default connect(mapStateToProps)(FormEditProduct);