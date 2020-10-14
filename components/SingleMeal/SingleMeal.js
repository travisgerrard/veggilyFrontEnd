import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Router from 'next/router';
import { VscTrash } from 'react-icons/vsc';

import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { useUser } from '../User';

import Head from 'next/head';
import CreateMealIngredientList from '../CreateMealIngredientList';
import { CapatlizeFirstLetter } from '../../lib/helpers';
import { MY_MEALS_QUERY } from '../MyMeals';

import {
  MealLogStyles,
  SingleMealStyles,
  AddButton,
  EditButton,
  VerticalDivider,
  HorizontalDivider,
  IngredientListStyle,
  TrashContainer,
  MealLogListEnteryNotEditingStyle,
  MealLogListEnteryEditingStyle,
  TextArea,
  MealLogListEnteryEditingStyleButton,
  TopOfMeal,
} from './SingleMealStyles';

import {
  SINGLE_MEAL_QUERY,
  DELETE_MEAL_INGREDIENT_LIST,
  ADD_MEAL_TO_GROCERY_LIST,
  DELETE_MADE_MEAL,
  UPDATE_MADE_MEAL,
  GET_MADE_MEALS,
  MADE_MEAL,
} from './SingleMealQueries';

function SingleMeal({ id }) {
  const me = useUser();

  const { loading, error, data } = useQuery(SINGLE_MEAL_QUERY, {
    variables: { id },
  });
  if (error) return <Error error={error} />;
  if (loading) return <p>Loading...</p>;
  if (!data.Meal) return <p>No Meal Found for {id}</p>;
  const { Meal } = data;
  let userCreatedMeal = false;
  if (Meal.author) {
    if (me) {
      console.log(me);
      if (me.id) {
        if (me.id === Meal.author.id) {
          userCreatedMeal = true;
        }
      }
    }
  }

  return (
    <>
      <SingleMealStyles>
        <Head>
          <title>Veggily | {Meal.name}</title>
        </Head>
        <TopOfMeal>
          <img src={Meal.mealImage.publicUrlTransformed} alt={Meal.name} />
          <div className="overlay">
            <h2 className="title">{Meal.name}</h2>
            <p className="subtitle">{Meal.description}</p>
            <div className="mealOptions">
              {me && <AddMealToGroceryList meal={Meal} me={me} />}
              {userCreatedMeal && (
                <EditButton
                  onClick={() =>
                    Router.push({
                      pathname: '/update',
                      query: { id: Meal.id },
                    })
                  }
                >
                  Edit
                </EditButton>
              )}
            </div>
          </div>
        </TopOfMeal>
        <div className="ingredients">
          <h3>Ingredients</h3>
          {IngredientList({
            ingredientList: Meal.ingredientList,
            userCreatedMeal: userCreatedMeal,
            id: id,
          })}
          {userCreatedMeal && (
            <>
              <h3>Add Ingredients</h3>
              <CreateMealIngredientList mealId={id} />
            </>
          )}
        </div>
      </SingleMealStyles>
      {me && <MealLog mealId={id} authorId={me.id} />}
    </>
  );
}

function IngredientList({ ingredientList, userCreatedMeal, id }) {
  if (ingredientList.length > 0) {
    return ingredientList.map((ingredient) => {
      return (
        <>
          <IngredientListStyle key={ingredient.id}>
            <p>
              {CapatlizeFirstLetter(ingredient.amount.name)} -{' '}
              {CapatlizeFirstLetter(ingredient.ingredient.name)}
            </p>
            {userCreatedMeal && (
              <DeleteMealIngredientList
                mealId={id}
                mealIngredientListId={ingredient.id}
                ingredientId={ingredient.ingredient.id}
              />
            )}
          </IngredientListStyle>
          <hr />
        </>
      );
    });
  } else {
    return <h4>No Ingredients Added To Meal Yet</h4>;
  }
}

function DeleteMealIngredientList({
  mealIngredientListId,
  ingredientId,
  mealId,
}) {
  const [deleteMealIngredientList] = useMutation(DELETE_MEAL_INGREDIENT_LIST, {
    variables: { mealIngredientListId, ingredientId, mealId },
    refetchQueries: () => [
      { query: SINGLE_MEAL_QUERY, variables: { id: mealId } },
    ],
    awaitRefetchQueries: true,
  });
  return (
    <TrashContainer onClick={deleteMealIngredientList}>
      <VscTrash color="white" size="3rem" />
    </TrashContainer>
  );
}

function AddMealToGroceryList({ meal, me }) {
  const { ingredientList } = meal;
  const groceryListFormattedForMutation = ingredientList.map((ingredient) => {
    return {
      data: {
        ingredient: { connect: { id: ingredient.ingredient.id } },
        amount: { connect: { id: ingredient.amount.id } },
        author: { connect: { id: me.id } },
      },
    };
  });

  const [createGroceryLists] = useMutation(ADD_MEAL_TO_GROCERY_LIST, {
    variables: {
      groceryList: groceryListFormattedForMutation,
      mealId: meal.id,
      authorId: me.id,
    },
    refetchQueries: () => [
      { query: MY_MEALS_QUERY, variables: { authorId: me.id } },
    ],
    awaitRefetchQueries: true,
    onCompleted: () => {
      console.log('ADD_MEAL_TO_GROCERY_LIST COMPLETE');
    },
  });

  return (
    <AddButton onClick={createGroceryLists}>Add To Grocery List</AddButton>
  );
}

function MealLog({ mealId, authorId }) {
  const { loading, error, data } = useQuery(GET_MADE_MEALS, {
    variables: { mealId, authorId },
  });

  if (error) return <Error error={error} />;
  if (loading) return <p>Loading...</p>;
  // if (!data.MealLog) return <p>No Meal Found for {id}</p>;
  const { allMadeMeals } = data;

  return (
    <MealLogStyles>
      <div className="topOfMealLog">
        <h2>Meal Log</h2>
        <MadeMeal
          mealId={mealId}
          authorId={authorId}
          dateMade={dateFormatted(new Date())}
        />
      </div>
      <HorizontalDivider MealLog />
      <MealLogList
        allMadeMeals={allMadeMeals}
        mealId={mealId}
        authorId={authorId}
      />
    </MealLogStyles>
  );
}

function MadeMeal({ mealId, authorId, dateMade }) {
  const [createMadeMeal] = useMutation(MADE_MEAL, {
    variables: { mealId, authorId, dateMade },
    refetchQueries: () => [
      { query: GET_MADE_MEALS, variables: { mealId, authorId } },
    ],
    awaitRefetchQueries: true,
  });
  return <button onClick={createMadeMeal}>Made</button>;
}

function MealLogListEnteryNotEditing({ date, setIsEditing, thoughts }) {
  return (
    <MealLogListEnteryNotEditingStyle>
      <p>You made this meal on: {date}</p>
      <button onClick={setIsEditing}>
        {thoughts ? 'Edit Comment' : 'Write a Comment'}
      </button>
      {thoughts && <TextArea disabled value={thoughts} />}
    </MealLogListEnteryNotEditingStyle>
  );
}

function MealLogListEnteryEditing({
  date,
  setIsEditing,
  mealId,
  authorId,
  id,
  strartingThoughts,
}) {
  // Follow is a hack because date picker was always one day less
  const initialDate = new Date(date);
  const day = 60 * 60 * 24 * 1000;

  const [startDate, setStartDate] = useState(
    new Date(initialDate.getTime() + day)
  );
  const [thoughts, setThoughts] = useState(
    strartingThoughts ? strartingThoughts : ''
  );
  const [updateMadeMeal] = useMutation(UPDATE_MADE_MEAL, {
    variables: { id, thoughts, dateMade: dateFormatted(startDate) },
    refetchQueries: [
      { query: GET_MADE_MEALS, variables: { mealId, authorId } },
    ],
    awaitRefetchQueries: true,
    onCompleted: () => {
      setIsEditing();
    },
  });

  const [deleteMadeMeal] = useMutation(DELETE_MADE_MEAL, {
    variables: { id },
    refetchQueries: () => [
      { query: GET_MADE_MEALS, variables: { mealId, authorId } },
    ],
    awaitRefetchQueries: true,
    onCompleted: () => {
      setIsEditing();
    },
  });

  return (
    <MealLogListEnteryEditingStyle>
      <div className="topOfMealEditingLog">
        <p>You made this meal on:</p>

        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </div>

      <TextArea
        placeholder="Thoughts on meal and life?"
        name="thoughts"
        value={thoughts}
        onChange={(e) => {
          if (e.target.value.length <= 140) {
            setThoughts(e.target.value);
          }
        }}
      />
      <div className="bottomRow">
        <div className="buttonCollection">
          <MealLogListEnteryEditingStyleButton onClick={updateMadeMeal}>
            Save
          </MealLogListEnteryEditingStyleButton>
          <MealLogListEnteryEditingStyleButton onClick={setIsEditing}>
            Cancel
          </MealLogListEnteryEditingStyleButton>
          <MealLogListEnteryEditingStyleButton delete onClick={deleteMadeMeal}>
            Delete
          </MealLogListEnteryEditingStyleButton>
        </div>
        <p>Characters Left: {140 - thoughts.length}</p>
      </div>
    </MealLogListEnteryEditingStyle>
  );
}

function MealLogListItem({ madeMeal, mealId, authorId }) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <MealLogListEnteryEditing
        date={madeMeal.dateMade}
        setIsEditing={() => setIsEditing(!isEditing)}
        mealId={mealId}
        authorId={authorId}
        id={madeMeal.id}
        strartingThoughts={madeMeal.thoughts}
      />
    );
  } else {
    return (
      <MealLogListEnteryNotEditing
        date={madeMeal.dateMade}
        setIsEditing={() => setIsEditing(!isEditing)}
        thoughts={madeMeal.thoughts}
      />
    );
  }
}

function MealLogList({ allMadeMeals, mealId, authorId }) {
  if (allMadeMeals.length > 0) {
    return allMadeMeals.map((madeMeal) => {
      return (
        <MealLogListItem
          madeMeal={madeMeal}
          key={madeMeal.id}
          mealId={mealId}
          authorId={authorId}
        />
      );
    });
  } else {
    return <h4>You haven't made this meal yet</h4>;
  }
}

function dateFormatted(today) {
  var d = today.getDate();
  var m = today.getMonth() + 1; //Months are zero based
  var y = today.getFullYear();
  var dateString = `${y}-${m <= 9 ? '0' + m : m}-${d <= 9 ? '0' + d : d}`;
  return dateString;
}

export default SingleMeal;
