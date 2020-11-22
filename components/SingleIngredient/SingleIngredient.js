import React, { useState } from 'react';
import Head from 'next/head';
import { useQuery } from '@apollo/client';
import { CapatlizeFirstLetter } from '../../lib/helpers';

import Meal from '../Meal';
import { MealsList } from '../Meals';

import {
  SingleMealStyles,
  TopOfMeal,
  IngredientListStyle,
  HorizontalDivider,
} from '../SingleMeal/SingleMealStyles';

const options = [
  { value: 0, label: 'none' },
  { value: 1, label: 'produce' },
  { value: 2, label: 'bakery' },
  { value: 3, label: 'frozen' },
  { value: 4, label: 'baking & spices' },
  { value: 5, label: 'nuts, seeds & dried fruit' },
  { value: 6, label: 'rice, grains & beans' },
  { value: 7, label: 'canned & jarred goods' },
  { value: 8, label: 'oils, sauces & condiments' },
  { value: 9, label: 'ethnic' },
  { value: 10, label: 'refrigerated' },
];

import gql from 'graphql-tag';
const GET_INGREDIENT_INFO = gql`
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

  query GET_INGREDIENT_INFO($id: ID!) {
    Ingredient(where: { id: $id }) {
      name
      category
      meal {
        ...MealFragment
      }
    }
  }
`;

function SingleIngredient({ id }) {
  console.log(id);
  const { loading, error, data } = useQuery(GET_INGREDIENT_INFO, {
    variables: { id },
  });
  console.log(error);
  if (error) return <Error error={error} />;
  if (loading) return <p>Loading...</p>;
  console.log(data);
  if (!data.Ingredient) return <p>No Ingredient Found for {id}</p>;

  const { Ingredient } = data;
  console.log(Ingredient);
  const category = Ingredient.category;
  const obj = options.find((o) => o.value === category);

  function listOfMeals(meals) {
    if (meals.length === 0) {
      return <div>Ingredient is not in any meals</div>;
    } else {
      return (
        <MealsList>
          {meals.map((meal) => {
            return <Meal meal={meal} key={meal.id} />;
          })}
        </MealsList>
      );
    }
  }

  return (
    <>
      <Head>
        <title>Veggily | {Ingredient.name}</title>
      </Head>
      <h2 className="title">{CapatlizeFirstLetter(Ingredient.name)}</h2>
      <h3>Category</h3>

      {CapatlizeFirstLetter(obj.label)}
      <h3>This ingredient is in the following meals:</h3>
      {listOfMeals(Ingredient.meal)}
    </>
  );
}

export default SingleIngredient;
