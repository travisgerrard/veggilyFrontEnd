import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { graphql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import gql from "graphql-tag";
import useForm from "../lib/useForm";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import { SINGLE_MEAL_QUERY } from "./SingleMeal";
import Downshift from 'downshift'
import {CapatlizeFirstLetter} from '../lib/helpers'

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
  query SEARCH_FOR_INGREDIENT($inputValue: String) {
    allIngredients(where: { name_starts_with: $inputValue }) {
      id
      name
    }
  }
`;
const SEARCH_FOR_AMOUNT = gql`
  query SEARCH_FOR_AMOUNT($inputValue: String) {
    allAmounts(where: { name_starts_with: $inputValue }) {
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
  const [amount, setAmount] = useState("")
  const [ingredient, setIngredient] = useState("")
  const [addMealIngredientList, { loading, error }] = useMutation(
    ADD_MEAL_INGREDIENT_LIST,
    {
      variables: {id: mealId, amount, ingredient},
      refetchQueries: () => [
        { query: SINGLE_MEAL_QUERY, variables: { id: mealId } },
      ],
      awaitRefetchQueries: true,
    }
  );

  return (
    <Form
      method="post"
      onSubmit={async (e) => {
        e.preventDefault();
        await addMealIngredientList();
        setIngredient("");
        setAmount("");
        resetForm();
      }}
    >
      <fieldset>
        <Downshift  selectedItem={amount && CapatlizeFirstLetter(amount)} onInputValueChange={inputValue => {setAmount(inputValue)}} style={{width: '100%'}}>
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
              <input {...getInputProps({
                placeholder: 'Amount',
                name: 'amount',
              })}
              required />
              {amount && <div style={{position: 'relative'}}>
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
              </div>}
            </div>
          )}
        </Downshift>
       
        <Downshift  selectedItem={ingredient && CapatlizeFirstLetter(ingredient)} onInputValueChange={inputValue => {setIngredient(inputValue)}} style={{width: '100%'}}>
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
              <input {...getInputProps({
                placeholder: 'Ingredient',
                name: 'ingredient',
              })}
              required />
              {ingredient && <div style={{position: 'relative'}}>
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
              </div>}
            </div>
          )}
        </Downshift>
        <button type="submit">Add</button>
      </fieldset>
    </Form>
  );
}


function ApolloAutocompleteMenuAmount({
  inputValue,
  selectedItem,
  highlightedIndex,
  getItemProps,
}) {
  const { loading, error, data } = useQuery(SEARCH_FOR_AMOUNT, {
    variables: { inputValue: inputValue.toLowerCase() },
  });
  if (error) return <Error error={error} />;
  if (loading) return <p>Loading...</p>;

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <SearchBoxStyled>
      {data.allAmounts.map(({ name: item }, index) => (
        <>
        <SearchItemStyled
          highlightedIndex={highlightedIndex === index}
          selectedItem={selectedItem === item}
          {...getItemProps({
            item,
            index,
            key: item,
          })}
        >
          {CapatlizeFirstLetter(item)}
        </SearchItemStyled>
        {data.allAmounts.length-1 !== index && <HorizontalDivider />}
        </>
      ))}
    </SearchBoxStyled>
  );
}

function ApolloAutocompleteMenuIngredient({
  inputValue,
  selectedItem,
  highlightedIndex,
  getItemProps,
}) {
  const { loading, error, data } = useQuery(SEARCH_FOR_INGREDIENT, {
    variables: { inputValue: inputValue.toLowerCase() },
  });
  if (error) return <Error error={error} />;
  if (loading) return <p>Loading...</p>;

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <SearchBoxStyled>
      {data.allIngredients.map(({ name: item }, index) => (
        <>
        <SearchItemStyled
          highlightedIndex={highlightedIndex === index}
          selectedItem={selectedItem === item}
          {...getItemProps({
            item,
            index,
            key: item,
          })}
        >
          {CapatlizeFirstLetter(item)}
        </SearchItemStyled>
        {data.allIngredients.length-1 !== index && <HorizontalDivider />}
        </>
      ))}
    </SearchBoxStyled>
  );
}

const SearchBoxStyled = styled.div`
  position: absolute;
  background: rgb(255,255,255, 0.75);
  backdrop-filter: blur(4px);
  width: 100%;
  border-radius: 22px;
  box-shadow: ${(props) => props.theme.bs};
  margin-bottom: 24px;
`;

const SearchItemStyled = styled.div`
  background-color: ${(props) =>
    props.highlightedIndex ? "rgb(0,0,0, 0.05)" : "transparent"};
  font-weight: ${(props) => (props.highlightedIndex ? "600" : "300")};
  font-size: 20px;
  padding-left: 16px;
  padding-top: 4px;
  padding-bottom: 4px;

  &:hover {
    cursor: pointer;
  }
  &:first-child {
    padding-top: 8px;
    border-top-left-radius: 22px;
    border-top-right-radius: 22px;
  }
  &:last-child {
    border-bottom-left-radius: 22px;
    border-bottom-right-radius: 22px;
    padding-bottom: 8px;
    border-bottom-width: 0px;
  }
  
`;

const HorizontalDivider = styled.div`
  max-width: 96%;
  height: 1px;

  margin-left: auto;
  margin-right: auto;
  background-color: black;
`;

export default CreateMealIngredientList;
