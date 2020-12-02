import gql from 'graphql-tag';

// export const GROCERY_LIST_FRAGMENT = gql`
//   fragment GroceryListFragment on GroceryList {
//     id
//     ingredient {
//       id
//       name
//       category
//     }
//     amount {
//       id
//       name
//     }
//     isCompleted
//     dateCompleted
//   }
// `;

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
  fragment GroceryListFragment on GroceryList {
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

  query GET_GROCERY_LIST($id: ID!) {
    groceryToComplete: allGroceryLists(
      where: { author: { id: $id }, isCompleted: false }
    ) {
      ...GroceryListFragment
    }
    groceryCompleted: allGroceryLists(
      where: { author: { id: $id }, isCompleted: true }
    ) {
      ...GroceryListFragment
    }
  }
`;

// CreateMealIngredientList
// CreateGrocertList

export const SEARCH_FOR_INGREDIENT = gql`
  query SEARCH_FOR_INGREDIENT($inputValue: String) {
    allIngredients(where: { name_starts_with: $inputValue }) {
      id
      name
    }
  }
`;

export const SEARCH_FOR_AMOUNT = gql`
  query SEARCH_FOR_AMOUNT($inputValue: String) {
    allAmounts(where: { name_starts_with: $inputValue }) {
      id
      name
    }
  }
`;

// CreateMealIngredientList

export const ADD_MEAL_INGREDIENT_LIST = gql`
  mutation ADD_MEAL_INGREDIENT_LIST(
    $id: ID!
    $ingredient: String!
    $amount: String!
  ) {
    addMealIngredientList(id: $id, ingredient: $ingredient, amount: $amount) {
      id
    }
  }
`;

// CreateGrocertList

export const ADD_GROCERY_LIST = gql`
  mutation ADD_GROCERY_LIST($ingredient: String!, $amount: String!) {
    addGroceryList(ingredient: $ingredient, amount: $amount) {
      id
    }
  }
`;

// Meals.JS
export const ALL_MEALS_QUERY = gql`
  query ALL_MEALS_QUERY {
    allMeals(orderBy: "createdAt_DESC") {
      id
      name
      description
      mealImage {
        publicUrlTransformed
      }
    }
  }
`;

export const SEARCH_FOR_MEALS = gql`
  query SEARCH_FOR_MEALS($searchText: String) {
    allMeals(where: { name_contains_i: $searchText }, sortBy: id_DESC) {
      ...MealFragment
    }
  }
`;
