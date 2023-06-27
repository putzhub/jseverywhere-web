// index.js
// This is the main entry point of our application

import React from 'react';
import ReactDOM from 'react-dom';

// import Apollo Client Libraries
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

// modules
import GlobalStyle from './components/GlobalStyle';
import Pages from '/pages';         //import routes

//configure our API UR & cache
const uri = process.env.API_URI;
const cache = new InMemoryCache();

//configure Apollo Client
const client = new ApolloClient({
    uri,
    cache,
    connectToDevTools: true
});

const App = () => {
    return(
        <ApolloProvider client={client}>
            <GlobalStyle />
            <Pages />
        </ApolloProvider>
    );
}

ReactDOM.render(<App />, document.querySelector("#root"));