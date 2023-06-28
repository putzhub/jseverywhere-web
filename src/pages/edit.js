import React from 'react';
import { useQuery, useMutation } from '@apollo/client';

//import the Note component
import NoteForm from "../components/NoteForm";
//import the GET_NOTE query
import { GET_NOTE, GET_ME } from '../gql/query';
import { EDIT_NOTE } from '../gql/mutation';

const EditNote = props => {
    //store the id found in the url as a variable
    const id = props.match.params.id;
    //define our note query
    const { loading, error, data } = useQuery(GET_NOTE, {variables: {id}});
    //fetch the user's data
    const { data: userdata } = useQuery(GET_ME);
    //define our mutation
    const [editNote] = useMutation(EDIT_NOTE, {
        variables:{
            id
        },
        onCompleted: () => {
            props.history.push(`/note/${id}`);
        }
    })

    if(loading) return 'Loading...';
    if(error) return `Error! ${error.message}`;
    //if the current user and the author of th enote do not match
    if(userdata.me.id !== data.note.author.id) {
        return <p>You do not have access to edit this note</p>;
    }

    //if the query is sucessful and there are notes, return the feed of notes
    //else if the query is successful and there aren't notes, display a message
    return <NoteForm content={data.note.content} action={editNote} />;
}

export default EditNote;