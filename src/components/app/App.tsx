import React from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';

import Header from '../common/header/Header';
import Main from '../main/Main';

interface Props extends RouteComponentProps<any> {}

class App extends React.Component<Props, object> {
    render() {
        return(
            <div className="container-fluid">
                <Header />
                <Main />
            </div>
        );
    }
}

export function mergeProps(stateProps: void, dispatchProps: void, ownProps: object): object {
    return Object.assign({}, ownProps, stateProps, dispatchProps);
}

const mapStateToProps = () => {};
const mapDispatchToProps = () => {};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps, mergeProps)(App)
);
