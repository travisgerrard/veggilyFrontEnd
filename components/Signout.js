import React, { Component } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';
import Router from "next/router";

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    unauthenticateUser {
      success
    }
  }
`;

function Signout() {
  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    onCompleted: () => {
      Router.push({
        pathname: "/",
      });
    },
  });
  return (
    <button type="button" onClick={signout}>
      Sign Out
    </button>
  );
}
export default Signout;