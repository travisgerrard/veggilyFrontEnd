import React from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { ALL_MEALS_QUERY } from "./Meals";
import { PAGINATION_QUERY } from "./Pagination";
import styled from "styled-components";
import Router from "next/router";

const DeleteButton = styled.button`
  border-width: 0px;
  background: white;
  color: ${(props) => props.theme.red};
  font-size: 2rem;
  font-weight: 600;
  align-self: end;
  justify-self: end;
  margin: 0;
  margin-right: 16px;
  margin-top: 16px;
  padding: 0;
  float: right;
  &:hover {
    cursor: pointer;
  }
`;

const DELETE_MEAL_MUTATION = gql`
  mutation DELETE_MEAL_MUTATION($id: ID!) {
    deleteMeal(id: $id) {
      id
    }
  }
`;

function DeleteMeal({ id }) {
  const [deleteMeal, { error }] = useMutation(DELETE_MEAL_MUTATION, {
    variables: { id },
    awaitRefetchQueries: true,
    refetchQueries: [{ query: ALL_MEALS_QUERY }, { query: PAGINATION_QUERY }],
    onCompleted: () => {
      Router.push({
        pathname: "/",
      });
    },
  });
  return (
    <DeleteButton
      type="button"
      onClick={() => {
        if (confirm("Are you sure you want to delete this meal?")) {
          deleteMeal().catch((err) => {
            alert(err.message);
          });
        }
      }}
    >
      Delete
    </DeleteButton>
  );
}

export default DeleteMeal;
