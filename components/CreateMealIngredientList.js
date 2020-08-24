import React from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import useForm from "../lib/useForm";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import {SINGLE_MEAL_QUERY} from './SingleMeal'

const ADD_MEAL_INGREDIENT_LIST = gql`
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

function CreateMealIngredientList({ mealId }) {
  const { inputs, handleChange, resetForm } = useForm({
    id: mealId,
    amount: "",
    ingredient: "",
  });
  const [addMealIngredientList, { loading, error }] = useMutation(
    ADD_MEAL_INGREDIENT_LIST,
    {
      variables: inputs,
      refetchQueries: () => [{ query: SINGLE_MEAL_QUERY, variables: { id: mealId } }],
      awaitRefetchQueries: true
    }
  );

  return (
    <Form
      method="post"
      onSubmit={async (e) => {
        e.preventDefault();
        await addMealIngredientList();
        resetForm();
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <input
          type="text"
          name="amount"
          placeholder="Amount"
          required
          value={inputs.amount}
          onChange={handleChange}
        />
        <input
          type="text"
          name="ingredient"
          placeholder="Ingredient"
          required
          value={inputs.ingredient}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </fieldset>
    </Form>
  );
}

export default CreateMealIngredientList;
