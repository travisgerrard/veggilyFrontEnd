import React from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { GET_GROCERY_LIST } from '../graphql/queries';

const ADD_GROCERY_LIST = gql`
  mutation ADD_GROCERY_LIST($ingredient: String!, $amount: String!) {
    addGroceryList(ingredient: $ingredient, amount: $amount) {
      id
    }
  }
`;

function CreateGroceryList({ id }) {
  const { inputs, handleChange, resetForm } = useForm({
    amount: '',
    ingredient: '',
  });
  const [addGroceryList, { loading, error }] = useMutation(ADD_GROCERY_LIST, {
    variables: inputs,
    refetchQueries: () => [
      { query: GET_GROCERY_LIST_TO_COMPLETE, variables: { id } },
    ],
    awaitRefetchQueries: true,
  });

  return (
    <Form
      method="post"
      onSubmit={async (e) => {
        e.preventDefault();
        await addGroceryList();
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

export default CreateGroceryList;
