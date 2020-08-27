import React, { useEffect } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useUser } from "./User";
import styled from "styled-components";
import { useRouter } from "next/router";
import CreateGroceryList from './CreateGroceryList'
import GroceryList from './GroceryList'

const GET_GROCERY_LIST = gql`
  query GET_GROCERY_LIST($id: ID!) {
    groceryToComplete: allGroceryLists(where: { author: { id: $id }, isCompleted: false }) {
      id
      ingredient {
        id
        name
      }
      amount {
        id
        name
      }
      isCompleted
      dateCompleted
    }
    groceryCompleted: allGroceryLists(where: { author: { id: $id }, isCompleted: true }) {
      id
      ingredient {
        id
        name
      }
      amount {
        id
        name
      }
      isCompleted
      dateCompleted
    }
  }
`;


const GroceryListContainer = styled.div`
  float: none;
  padding: 20px;
  box-shadow: ${(props) => props.theme.bs};
  border-radius: 22px;
  margin-left: auto;
  margin-right: auto;
  max-width: 720px;
  margin-top: 64px;
    h2{
        margin:0;
        padding: 0;
    }
  }
`;

const HorizontalDivider = styled.div`
  max-width: 680px;
  height: 1px;
  margin: 12px 0px;
  background-color: black;
`;

function Grocery() {
  const me = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!me) {
      router.push("/signin");
    }
  }, [me]);

  if (me && me.id) {
    const { loading, error, data } = useQuery(GET_GROCERY_LIST, {
      variables: { id: me.id },
    });
    if (error) return <Error error={error} />;
    if (loading) return <p>Loading...</p>;

    const { groceryToComplete } = data;
    const { groceryCompleted } = data;

    return (
      <GroceryListContainer>
        <h2>Add to Grocery List</h2>
        <CreateGroceryList id={me.id} />
        <HorizontalDivider />
        {groceryToComplete.length > 0 ? (
          <GroceryList
            groceryToComplete={groceryToComplete}
            groceryCompleted={groceryCompleted}
            me={me}
          />
        ) : (
          <div>No items on grocery list</div>
        )}
      </GroceryListContainer>
    );
  } else {
    return <div>Redirecting to login</div>;
  }
}

export default Grocery;
export { GET_GROCERY_LIST };