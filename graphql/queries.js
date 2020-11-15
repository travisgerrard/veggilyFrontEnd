import gql from 'graphql-tag';

// Used in
// GroceryList.js

export const COMPLETE_GROCERY_LIST = gql`
  mutation COMPLETE_GROCERY_LIST(
    $id: ID!
    $dateCompleted: DateTime
    $isCompleted: Boolean
  ) {
    updateGroceryList(
      id: $id
      data: { isCompleted: $isCompleted, dateCompleted: $dateCompleted }
    ) {
      id
    }
  }
`;

// Used in
// Grocery.js
// GroceryListHelpers.js
// CreateGroceryList.js

export const GET_GROCERY_LIST = gql`
  query GET_GROCERY_LIST($id: ID!) {
    groceryToComplete: allGroceryLists(
      where: { author: { id: $id }, isCompleted: false }
    ) {
      id
      ingredient {
        id
        name
        category
      }
      amount {
        id
        name
      }
      isCompleted
      dateCompleted
    }
    groceryCompleted: allGroceryLists(
      where: { author: { id: $id }, isCompleted: true }
    ) {
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
