import React from "react";
import { useQuery, gql } from "@apollo/client";

import { GET_NOTES } from "../gql/query";
import Button from "../components/Button";
import NoteFeed from "../components/NoteFeed";

const Home = () => {
    //query hook
    const { data, loading, error, fetchMore } = useQuery(GET_NOTES);
    //if the data is loading, display a loading message
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;
    //if successful
    return (
        // add a react fragment to provide a parent element
        <React.Fragment>
            <NoteFeed notes={data.noteFeed.notes} />
            {data.noteFeed.hasNextPage && (
                <Button 
                    onClick={() =>
                        fetchMore({
                            variables:{
                                cursor: data.noteFeed.cursor
                            },
                            updateQuery: (previousResult, { fetchMoreResult }) => {
                                return {
                                    noteFeed: {
                                        cursor: fetchMoreResult.noteFeed.cursor,
                                        hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                                        //combine the new results and the old
                                        notes: [
                                            ...previousResult.noteFeed.notes,
                                            ...fetchMoreResult.noteFeed.notes
                                        ],
                                        __typename: 'noteFeed'
                                    }
                                };
                            }
                        })
                    }
                >
                Load more
                </Button>
            )}
        </React.Fragment>
    );
}

export default Home;