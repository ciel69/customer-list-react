import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import ItemCustomer from './ItemCustomer';

import './style.css';

class ListCustomer extends React.Component {
    render() {
        const {list} = this.props;
        if (list.length > 0) {
            return (
                <Table striped condensed hover className="table-customer">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>name</th>
                        <th>address</th>
                        <th>phone</th>
                        <th width="200"/>
                    </tr>
                    </thead>
                    <ItemCustomer customer={list}/>
                </Table>
            );
        } else {
            return (
                <div>list is empty</div>
            )
        }
    }
}

export default ListCustomer;