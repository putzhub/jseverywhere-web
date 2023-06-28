import React from "react";
import { useMutation } from "@apollo/client";
import { withRouter } from 'react-router-dom';

import ButtonAsLink from "./ButtonAsLink";
import { DELETE_NOTE } from "../gql/mutation";
//import queries to refetch after note deletion
import { GET_MY_NOTES, GET_NOTES } from "../gql/query";

const DeleteNote = props => {
    const [deleteNote] = useMutation(DELETE_NOTE, {
        variables: {
            id: props.noteId
        },
        //refetch the note list queries to update the (Apollo) cache
        refetchQueries: [{ query: GET_MY_NOTES, GET_NOTES}],
        onCompleted: data => {
            //redirect the user to "my notes" page
            props.history.push('/mynotes');
        }
    })
    return <ButtonAsLink onClick={deleteNote}>Delete Note</ButtonAsLink>;
}

//because we're performing a redirect with a nonroutable component
//use React Router's withRouter higher-order component
export default withRouter(DeleteNote);