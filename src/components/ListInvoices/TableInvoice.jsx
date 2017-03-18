import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import ItemProduct from './ItemInvoice';

import './style.css';

class TableInvoice extends React.Component {
    render() {
        const {list} = this.props;
        if (list.length > 0) {
            return (
                <Table striped condensed hover className="table-product">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>name</th>
                        <th>discount</th>
                        <th>total</th>
                        <th width="200"/>
                    </tr>
                    </thead>
                    <ItemProduct invoice={list}/>
                </Table>
            );
        } else {
            return (
                <div>list is empty</div>
            )
        }
    }
}

export default TableInvoice;