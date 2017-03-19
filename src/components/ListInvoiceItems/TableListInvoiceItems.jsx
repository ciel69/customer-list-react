import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import ItemListInvoiceItems from './ItemListInvoiceItems';

import './style.css';

class TableListInvoiceItems extends React.Component {
    render() {
        const {list} = this.props;
        if (list.length > 0) {
            return (
                <Table striped condensed hover className="table-product">
                    <thead>
                    <tr>
                        <th>name</th>
                        <th>price</th>
                        <th>qty</th>
                        <th width="200"/>
                    </tr>
                    </thead>
                    <ItemListInvoiceItems invoiceItem={list}/>
                </Table>
            );
        } else {
            return (
                <div>list is empty</div>
            )
        }
    }
}

export default TableListInvoiceItems;