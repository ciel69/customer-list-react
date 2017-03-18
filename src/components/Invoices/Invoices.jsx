import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {updateTitle} from 'redux-title';
import {fetchInvoices} from '../../actions/InvoicesActions';
import {fetchCustomers} from '../../actions/CustomerActions';
import ListInvoices from '../ListInvoices';
import {ModalCreateInvoices} from '../Modals';

const propTypes = {
    dispatch: PropTypes.func,
    // customers: PropTypes.object.isRequired,
    invoices: PropTypes.object.isRequired
};

class Invoices extends React.Component {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchCustomers());
        dispatch(fetchInvoices());
        dispatch(updateTitle("Invoices list"));
    }

    render() {
        const { invoices } = this.props;
        return (
            <div>
                <h1>Invoices list</h1>
                <ModalCreateInvoices/>
                <ListInvoices list={invoices.data}/>
                {/*<ModalDeleteinvoices deleteinvoicesId={invoices.queue_delete}/>*/}
                {/*<ModalEditProduct product={invoices.queue_edit}/>*/}
            </div>
        );
    }
}

Invoices.propTypes = propTypes;

function mapStateToProps(state) {
    return {
        title: state.title,
        invoices: state.invoices
    };
}

export default connect(mapStateToProps)(Invoices);