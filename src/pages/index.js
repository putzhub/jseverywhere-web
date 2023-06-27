import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Layout from '../components/Layout';
import Home from './home';
import MyNotes from './mynotes';
import NotePage from './note';
import Favorites from './favorites';

const Pages = () => {
    return(
        <Router>
            {/* Wrap our routes within the Layout component */}
            <Layout>
                <Route exact path="/" component={Home} />
                <Route path="/mynotes" component={MyNotes} />
                <Route path="/favorites" component={Favorites} />
                <Route path="/note/:id" component={NotePage} />
            </Layout>
        </Router>
    );
}

export default Pages;