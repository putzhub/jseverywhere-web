import React, { useEffect } from "react";
import { useMutation, useApolloClient, gql } from "@apollo/client";
import UserForm from "../components/UserForm";

const SIGNUP_USER = gql`
mutation signUp($email: String!, $username: String!, $password: String!){
    signUp(email: $email, username: $username, password: $password)
}
`

//include the props passed to the component for later use
const SignUp = props => {
    useEffect(() => {
        //update the document title
        document.title = "Sign Up - Notedly";
    });

    const client = useApolloClient();
    //mutation hook
    const [signUp, {loading, error}] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
            //store the JWT into local storage
            localStorage.setItem('token', data.signUp);
            //update the local cache
            client.writeData({ data: { isLoggedIn: true }});
            //redirect to home page
            props.history.push('/');
        }
    });

    return(
        <React.Fragment>
            <UserForm action={signUp} formType="signup" />
            {loading && <p>Loading...</p>}
            {error && <p>Error creating an account!</p>}
        </React.Fragment>
    );
};

export default SignUp;