import React from 'react';
import {Link} from 'react-router-dom';
import './home.css';

const HomePage = () => (
    <div className="jumbotron home">
        <h1>CheckList</h1>
        <Link to="/checklist" className="btn btn-primary btn-lg">Add CheckList</Link>
        <Link to="/list" className="btn btn-primary btn-lg">See All</Link>
    </div>
);

export default HomePage;