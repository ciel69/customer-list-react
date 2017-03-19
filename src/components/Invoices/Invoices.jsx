import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {updateTitle} from 'redux-title';
import {fetchInvoices} from '../../actions/InvoicesActions';
import {fetchCustomers} from '../../actions/CustomerActions';
import ListInvoices from '../ListInvoices';
import {ModalDeleteInvoice} from '../Modals';
import {createInvoices} from '../../actions/InvoicesActions';
import {browserHistory} from 'react-router';

const propTypes = {
    dispatch: PropTypes.func,
    // customers: PropTypes.object.isRequired,
    invoices: PropTypes.object.isRequired
};

class Invoices extends React.Component {

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchCustomers());
        dispatch(fetchInvoices());
        dispatch(updateTitle("Invoices list"));
    }

    createInvoice() {
        const {dispatch, invoices} = this.props;
        const creds = {customer_id: '', discount: ''};

        let promise = new Promise((resolve, reject) => {
            resolve(dispatch(createInvoices(creds)));
        });
        return (promise.then(result => {
            browserHistory.push(`/invoices/${result.json.id}`);
        }));

    }

    render() {
        const {invoices} = this.props;
        return (
            <div>
                <h1>Invoices list</h1>
                {/*<ModalCreateInvoices/>*/}
                <button className='btn btn-primary' onClick={() => this.createInvoice()}>
                    Create Customer
                </button>
                <ListInvoices list={invoices.data}/>
                <ModalDeleteInvoice deleteInvoiceId={invoices.queue_delete}/>
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