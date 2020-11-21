import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import Downshift from 'downshift';
import {
  ADD_GROCERY_LIST,
  SEARCH_FOR_INGREDIENT,
  SEARCH_FOR_AMOUNT,
  GET_GROCERY_LIST,
} from '../graphql/queries';
import { CapatlizeFirstLetter } from '../lib/helpers';

import {
  SearchBoxStyled,
  ApolloAutocompleteMenuIngredient,
  ApolloAutocompleteMenuAmount,
} from './CreateMealIngredientList';

function CreateGroceryList({ id }) {
  const { inputs, handleChange, resetForm } = useForm({
    amount: '',
    ingredient: '',
  });
  const [amount, setAmount] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [addGroceryList, { loading, error }] = useMutation(ADD_GROCERY_LIST, {
    variables: { amount, ingredient },
    refetchQueries: () => [{ query: GET_GROCERY_LIST, variables: { id } }],
    awaitRefetchQueries: true,
  });

  return (
    <Form
      method="post"
      onSubmit={async (e) => {
        e.preventDefault();
        await addGroceryList();
        setIngredient('');
        setAmount('');
        resetForm();
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <Downshift
          id="amount-selector"
          selectedItem={amount && CapatlizeFirstLetter(amount)}
          onInputValueChange={(inputValue) => {
            setAmount(inputValue);
          }}
          style={{ width: '100%' }}
        >
          {({
            getInputProps,
            getItemProps,
            getLabelProps,
            inputValue,
            selectedItem,
            highlightedIndex,
            isOpen,
          }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Amount',
                  name: 'amount',
                })}
                required
              />
              {amount && (
                <div style={{ position: 'relative' }}>
                  {isOpen ? (
                    <SearchBoxStyled>
                      <ApolloAutocompleteMenuAmount
                        {...{
                          inputValue,
                          selectedItem,
                          highlightedIndex,
                          getItemProps,
                        }}
                      />
                    </SearchBoxStyled>
                  ) : null}
                </div>
              )}
            </div>
          )}
        </Downshift>

        <Downshift
          id="ingreident-selector"
          selectedItem={ingredient && CapatlizeFirstLetter(ingredient)}
          onInputValueChange={(inputValue) => {
            setIngredient(inputValue);
          }}
          style={{ width: '100%' }}
        >
          {({
            getInputProps,
            getItemProps,
            getLabelProps,
            inputValue,
            selectedItem,
            highlightedIndex,
            isOpen,
          }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Ingredient',
                  name: 'ingredient',
                })}
                required
              />
              {ingredient && (
                <div style={{ position: 'relative' }}>
                  {isOpen ? (
                    <SearchBoxStyled>
                      <ApolloAutocompleteMenuIngredient
                        {...{
                          inputValue,
                          selectedItem,
                          highlightedIndex,
                          getItemProps,
                        }}
                      />
                    </SearchBoxStyled>
                  ) : null}
                </div>
              )}
            </div>
          )}
        </Downshift>
        <button type="submit">Add</button>
      </fieldset>
    </Form>
  );
}

export default CreateGroceryList;
