import styled from "styled-components";
import {CapatlizeFirstLetter} from '../lib/helpers'
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { GET_GROCERY_LIST } from "./Grocery";

const COMPLETE_GROCERY_LIST = gql`
  mutation COMPLETE_GROCERY_LIST($id: ID!, $dateCompleted: DateTime, $isCompleted: Boolean) {
    updateGroceryList(id: $id, data: { isCompleted: $isCompleted, dateCompleted: $dateCompleted }) {
      id
    }
  }
`;



const IngredientListStyle = styled.div`
  box-shadow: ${(props) => props.theme.bs};
  border-radius: 22px;
  height: 44px;
  padding-left: 0px;
  padding-bottom: 2px;
  padding-right: 22px;
  /* display: grid;
  grid-template-columns: 55px auto; */
  display: flex;
  flex-direction: row;
  padding: 0px 2px;
  margin-top: 15px;
  margin-bottom: 15px;
  p {
    position: static;
    width: auto;
    height: 36px;
    left: 62px;
    top: 4px;
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: 600;
    flex: none;
    order: 1;
    align-self: center;
    margin: 16px 16px;
    color: ${props => props.isComplete ? 'rgb(0, 0, 0, 0.25)' : 'black'};

  }
`;

const CompleteGroceryListButtonStyle = styled.div`
  position: static;
  width: 50px;
  height: 50px;
  left: 2px;
  top: 0px;

  background: ${props => props.isComplete ? 'rgb(0, 0, 0, 0.25)' : '#ffffff'};
  /* Text */

  border: 3px solid ${props => props.isComplete ? 'rgb(0, 0, 0, 0.25)' : '#000000'};
  border-radius: 25px;

  /* Inside Auto Layout */

  flex: none;
  order: 0;
  align-self: center;
  margin: 16px 0px;
  transition: border-color 0.12s ease-in-out;
  transition: background 0.12s ease-in-out;
  &:hover,
  &:focus {
    cursor: pointer;
    border-color: ${(props) => props.theme.lightBlue};
  }
  &:active {
    background: ${(props) => props.theme.lightBlue};
  }
`;

const HorizontalDivider = styled.div`
  max-width: 680px;
  height: 1px;
  margin: 22px 0px;
  background-color: rgb(0, 0, 0, 0.25);
`;

const CompletedTitle = styled.h2`
  color: rgb(0, 0, 0, 0.25);

`;

const nestedSort = (prop1, prop2 = null, direction = 'asc') => (e1, e2) => {
    const a = prop2 ? e1[prop1][prop2] : e1[prop1],
        b = prop2 ? e2[prop1][prop2] : e2[prop1],
        sortOrder = direction === "asc" ? 1 : -1
    return (a < b) ? -sortOrder : (a > b) ? sortOrder : 0;
}

function CompleteGroceryListButton({ id, me, isComplete }) {
    console.log(!isComplete);
    const [updateGroceryList] = useMutation(COMPLETE_GROCERY_LIST, {
        variables: { id, dateCompleted: new Date(), isCompleted: !isComplete },
        refetchQueries: () => [
          { query: GET_GROCERY_LIST, variables: { id: me.id } },
        ],
        awaitRefetchQueries: true,
      });
  return <CompleteGroceryListButtonStyle onClick={updateGroceryList} isComplete={isComplete} />;
}

function GroceryList({ groceryToComplete, groceryCompleted, me }) {
  const sortedGroceryList = [...groceryToComplete].sort(
    nestedSort("ingredient", "name", "asc")
  );

  return (
    <div>
      {sortedGroceryList.map((grocery) => {
        return (
          <IngredientListStyle key={grocery.id}>
            <CompleteGroceryListButton id={grocery.id} me={me} isComplete={false} />
            <p>
              {CapatlizeFirstLetter(grocery.ingredient.name)} -{" "}
              {CapatlizeFirstLetter(grocery.amount.name)}
            </p>
          </IngredientListStyle>
        );
      })}
      {groceryCompleted.length > 0 && (
        <>
          <HorizontalDivider />
          <CompletedTitle>Completed</CompletedTitle>
          {groceryCompleted.map((grocery) => {
        return (
          <IngredientListStyle key={grocery.id} isComplete>
            <CompleteGroceryListButton id={grocery.id} me={me} isComplete={true} />
            <p>
              {CapatlizeFirstLetter(grocery.ingredient.name)} -{" "}
              {CapatlizeFirstLetter(grocery.amount.name)}
            </p>
          </IngredientListStyle>
        );
      })}
        </>
      )}
    </div>
  );
}

export default GroceryList;
