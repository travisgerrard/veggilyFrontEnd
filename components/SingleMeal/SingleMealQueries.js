import gql from 'graphql-tag';

const SINGLE_MEAL_QUERY = gql`
  fragment MealFragment on Meal {
    id
    name
    description
    mealImage {
      publicUrlTransformed
    }
    author {
      id
    }
    ingredientList {
      id
      ingredient {
        id
        name
      }
      amount {
        id
        name
      }
    }
  }

  query SINGLE_MEAL_QUERY($id: ID!) {
    Meal(where: { id: $id }) {
      ...MealFragment
    }
  }
`;

const DELETE_MEAL_INGREDIENT_LIST = gql`
  mutation DELETE_MEAL_INGREDIENT_LIST(
    $mealIngredientListId: ID!
    $ingredientId: ID!
    $mealId: ID!
  ) {
    updateIngredient(
      id: $ingredientId
      data: { meal: { disconnect: { id: $mealId } } }
    ) {
      id
    }

    deleteMealIngredientList(id: $mealIngredientListId) {
      id
    }
  }
`;

const ADD_MEAL_TO_GROCERY_LIST = gql`
  mutation ADD_MEAL_TO_GROCERY_LIST(
    $groceryList: [GroceryListsCreateInput]
    $mealId: ID!
    $authorId: ID!
  ) {
    addIngredientsToGroceryList: createGroceryLists(data: $groceryList) {
      id
    }
    addMealToMealList: createMealList(
      data: {
        meal: { connect: { id: $mealId } }
        author: { connect: { id: $authorId } }
      }
    ) {
      id
    }
  }
`;

const DELETE_MADE_MEAL = gql`
  mutation DELETE_MADE_MEAL($id: ID!) {
    deleteMadeMeal(id: $id) {
      id
    }
  }
`;

const UPDATE_MADE_MEAL = gql`
  mutation UPDATE_MADE_MEAL($id: ID!, $thoughts: String, $dateMade: String) {
    updateMadeMeal(
      id: $id
      data: { thoughts: $thoughts, dateMade: $dateMade }
    ) {
      id
    }
  }
`;

const GET_MADE_MEALS = gql`
  query GET_MADE_MEALS($mealId: ID!, $authorId: ID!) {
    allMadeMeals(
      where: { author: { id: $authorId }, meal: { id: $mealId } }
      sortBy: dateMade_DESC
    ) {
      id
      dateMade
      thoughts
    }
  }
`;

const MADE_MEAL = gql`
  mutation MADE_MEAL($mealId: ID!, $authorId: ID!, $dateMade: String) {
    createMadeMeal(
      data: {
        meal: { connect: { id: $mealId } }
        author: { connect: { id: $authorId } }
        dateMade: $dateMade
      }
    ) {
      id
    }
  }
`;

export {
  SINGLE_MEAL_QUERY,
  DELETE_MEAL_INGREDIENT_LIST,
  ADD_MEAL_TO_GROCERY_LIST,
  DELETE_MADE_MEAL,
  UPDATE_MADE_MEAL,
  GET_MADE_MEALS,
  MADE_MEAL,
};
