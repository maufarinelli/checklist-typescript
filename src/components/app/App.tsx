import React from 'react';
import {withRouter} from 'react-router-dom';
import {RouteComponentProps} from 'react-router';
import {connect} from 'react-redux';

import Header from '../common/header/Header';
import Main from '../main/Main';

class App extends React.Component<RouteComponentProps<any>, any> {
    render() {
        return(
            <div className="container-fluid">
                <Header />
                <Main />
            </div>
        );
    }
}

export default withRouter(
    connect()(App)
);
