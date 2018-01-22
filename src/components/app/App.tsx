import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import Header from '../common/header/Header';
import Main from '../main/Main';

class App extends React.Component {
    render() {
        return(
            <div className="container-fluid">
                <Header />
                <Main />
            </div>
        );
    }
}

function mapStateToProps() {
    return {};
}

export default withRouter(
    connect(mapStateToProps)(App)
);
