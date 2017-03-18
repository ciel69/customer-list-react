import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import ItemProduct from './ItemProduct';

import './style.css';

class TableProduct extends React.Component {
    render() {
        const {list} = this.props;
        if (list.length > 0) {
            return (
                <Table striped condensed hover className="table-product">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>name</th>
                        <th>price</th>
                        <th width="200"/>
                    </tr>
                    </thead>
                    <ItemProduct product={list}/>
                </Table>
            );
        } else {
            return (
                <div>list is empty</div>
            )
        }
    }
}

export default TableProduct;