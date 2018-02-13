import React from 'react';
import {Link, Prompt, withRouter} from 'react-router-dom';
import './header.css';

class Header extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            shouldShowPrompt: false
        };
    }

    componentDidMount() {
        this.handlePrompt();
    }

    componentDidUpdate(prevProps: any) {
        if (this.props.location !== prevProps.location) {
            this.handlePrompt();
        }
    }

    handlePrompt() {
        const CHECKLIST_PATH = '/checklist';
        const LIST_PATH = '/list';
        const HOME_PATH = '/';

        if (this.props.location.pathname === HOME_PATH || this.props.location.pathname === LIST_PATH) {
            this.setState({shouldShowPrompt: false});
        } else if (this.props.location.pathname === CHECKLIST_PATH) {
            this.setState({shouldShowPrompt: true});
        }
    }

    render() {
        return (<header>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/checklist">Add CheckList</Link></li>
                    <li><Link to="/list">See All</Link></li>
                </ul>
            </nav>
            <Prompt
                when={this.state.shouldShowPrompt}
                message={'You did not save this checklist yet. If you leave this page, you loose everything. Are you sure you want to leave?'}
            />
        </header>);
    }
}

export default withRouter(Header);
