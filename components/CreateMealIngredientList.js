import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import useForm from "../lib/useForm";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import { SINGLE_MEAL_QUERY } from "./SingleMeal";

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

const SEARCH_FOR_INGREDIENT = gql`
  query SEARCH_FOR_INGREDIENT($searchField: String) {
    allIngredients(where: { name_starts_with: $searchField }) {
      id
      name
    }
  }
`;
const SEARCH_FOR_AMOUNT = gql`
  query SEARCH_FOR_AMOUNT($searchField: String) {
    allAmounts(where: { name_starts_with: $searchField }) {
      id
      name
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
      refetchQueries: () => [
        { query: SINGLE_MEAL_QUERY, variables: { id: mealId } },
      ],
      awaitRefetchQueries: true,
    }
  );
  const [amountIsFocused, setAmountIsFocused] = useState(false);
  const [ingredientIsFocused, setIngredientIsFocused] = useState(false);

    console.log(amountIsFocused, ingredientIsFocused);

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
          onFocus={() => setAmountIsFocused(true)}
          onBlur={() => setAmountIsFocused(false)}
        />
         {amountIsFocused && (
          <AmountSearchBox searchField={inputs.amount} />
        )}
        <input
          type="text"
          name="ingredient"
          placeholder="Ingredient"
          required
          value={inputs.ingredient}
          onChange={handleChange}
          onFocus={() => setIngredientIsFocused(true)}
          onBlur={() => setIngredientIsFocused(false)}
        />
        {ingredientIsFocused && (
          <IngredientSearchBox searchField={inputs.ingredient} />
        )}
        <button type="submit">Add</button>
      </fieldset>
    </Form>
  );
}

function IngredientSearchBox({ searchField }) {
  if (searchField) {
    const { loading, error, data } = useQuery(SEARCH_FOR_INGREDIENT, {
      variables: { searchField },
    });
    // if (error) return <Error error={error} />;
    // if (loading) return <p>Loading...</p>;
    // if (!data) return <p>No Meal Found for {id}</p>;
    console.log(data);
  }
  return null;
}

function AmountSearchBox({ searchField }) {
  if (searchField) {
    const { loading, error, data } = useQuery(SEARCH_FOR_AMOUNT, {
      variables: { searchField },
    });
    // if (error) return <Error error={error} />;
    // if (loading) return <p>Loading...</p>;
    // if (!data) return <p>No Meal Found for {id}</p>;
    console.log(data);
  }
  return null;
}

export default CreateMealIngredientList;
