import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {updateTitle} from 'redux-title';
import {fetchCustomers} from '../../actions/CustomerActions';
import TableCustomer from '../ListCustomer';
import {ModalCreateCustomer, ModalDeleteCustomer, ModalEditCustomer} from '../Modals';

const propTypes = {
    dispatch: PropTypes.func,
    customers: PropTypes.object.isRequired
};

class Customers extends React.Component {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchCustomers());
        dispatch(updateTitle("Customers list"));
    }

    render() {
        const { customers } = this.props;
        return (
            <div>
                <h1>Customers list</h1>
                <ModalCreateCustomer/>
                <TableCustomer list={customers.data}/>
                <ModalDeleteCustomer deleteCustomerId={customers.queue_delete}/>
                <ModalEditCustomer customer={customers.queue_edit}/>
            </div>
        );
    }
}

Customers.propTypes = propTypes;

function mapStateToProps(state) {
    return {
        title: state.title,
        customers: state.customers
    };
}

export default connect(mapStateToProps)(Customers);