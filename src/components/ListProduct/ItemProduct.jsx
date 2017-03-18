import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import {openModal, closeModal} from '../../actions/ModalsActions';
import {addQueueProductsDelete, addQueueProductsEdit} from '../../actions/ProductsActions';

const propTypes = {
    dispatch: PropTypes.func,
    modals: PropTypes.object.isRequired
};

class ItemProduct extends React.Component {

    constructor(props) {
        super(props);

        this.listElement = this.listElement.bind(this);
    }

    listElement(product) {
        const { dispatch } = this.props;
        return product.map((element, i) => {
            return (
                <tr key={i}>
                    <td>{element.id}</td>
                    <td>{element.name}</td>
                    <td>{element.price}</td>
                    <td>
                        <ButtonToolbar className="show-hover">
                            <button className='btn btn-link' onClick={() => {
                                dispatch(addQueueProductsEdit(element.id));
                                dispatch(openModal('editProduct'))
                            }}>
                                Edit
                            </button>
                            <button className='btn btn-link' onClick={() => {
                                dispatch(addQueueProductsDelete(element.id));
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
        const {product} = this.props;

        return (
            <tbody>
            {this.listElement(product)}
            </tbody>
        );
    }
}

ItemProduct.propTypes = propTypes;

function mapStateToProps(state) {
    return {
        modals: state.modals
    };
}


export default connect(mapStateToProps)(ItemProduct);

// export default ItemCustomer;