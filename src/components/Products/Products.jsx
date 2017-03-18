import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {updateTitle} from 'redux-title';
import {fetchProducts} from '../../actions/ProductsActions';
import ListProduct from '../ListProduct';
import {ModalCreateProduct, ModalDeleteProduct, ModalEditProduct} from '../Modals';

const propTypes = {
    dispatch: PropTypes.func,
    products: PropTypes.object.isRequired
};

class Products extends React.Component {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchProducts());
        dispatch(updateTitle("Products list"));
    }

    render() {
        const { products } = this.props;
        return (
            <div>
                <h1>Products list</h1>
                <ModalCreateProduct/>
                <ListProduct list={products.data}/>
                <ModalDeleteProduct deleteProductId={products.queue_delete}/>
                <ModalEditProduct product={products.queue_edit}/>
            </div>
        );
    }
}

Products.propTypes = propTypes;

function mapStateToProps(state) {
    return {
        title: state.title,
        "products": state.products
    };
}

export default connect(mapStateToProps)(Products);