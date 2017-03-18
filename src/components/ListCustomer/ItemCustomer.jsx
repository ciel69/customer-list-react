import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import {openModal, closeModal} from '../../actions/ModalsActions';
import {addQueueCustomerDelete, addQueueCustomerEdit} from '../../actions/CustomerActions';

const propTypes = {
    dispatch: PropTypes.func,
    modals: PropTypes.object.isRequired
};

class ItemCustomer extends React.Component {

    constructor(props) {
        super(props);

        this.listElement = this.listElement.bind(this);
    }

    listElement(customer) {
        const { dispatch } = this.props;
        return customer.map((element, i) => {
            return (
                <tr key={i}>
                    <td>{element.id}</td>
                    <td>{element.name}</td>
                    <td>{element.address}</td>
                    <td>{element.phone}</td>
                    <td>
                        <ButtonToolbar className="show-hover">
                            <button className='btn btn-link' onClick={() => {
                                dispatch(addQueueCustomerEdit(element.id));
                                dispatch(openModal('editCustomer'))
                            }}>
                                Edit
                            </button>
                            <button className='btn btn-link' onClick={() => {
                                dispatch(addQueueCustomerDelete(element.id));
                                dispatch(openModal('deleteCustomer'))
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
        const {customer} = this.props;

        return (
            <tbody>
            {this.listElement(customer)}
            </tbody>
        );
    }
}

ItemCustomer.propTypes = propTypes;

function mapStateToProps(state) {
    return {
        modals: state.modals
    };
}


export default connect(mapStateToProps)(ItemCustomer);

// export default ItemCustomer;