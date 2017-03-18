import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {updateTitle} from 'redux-title';

class Home extends React.Component {
    render() {
        const {title, updateTitle} = this.props;
        updateTitle("Home");
        return (
            <div>
                <h1>Test SPA React</h1>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        title: state.title
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({updateTitle}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);