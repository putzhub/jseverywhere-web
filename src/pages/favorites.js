import React, { useEffect } from "react";
import { useQuery, gql } from '@apollo/client';

import NoteFeed from "../components/NoteFeed";
// import the query
import { GET_MY_FAVORITES } from '../gql/query';

const Favorites = () => {
    useEffect(() => {
        //update the document title
        document.title = 'Favorites - Notedly';
    });

    const { loading, error, data } = useQuery(GET_MY_FAVORITES);

    if(loading) return 'Loading...';
    if(error) return `Error! ${error.message}`;

    //if the query is sucessful and there are notes, return the feed of notes
    //else if the query is successful and there aren't notes, display a message
    if(data.me.favorites.length !== 0){
        return <NoteFeed notes={data.me.favorites} />;
    } else {
        return <p>No notes yet</p>;
    }
}

export default Favorites;