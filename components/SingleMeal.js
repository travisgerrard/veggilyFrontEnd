import React, { useState } from "react";
import gql from "graphql-tag";
import DatePicker from "react-datepicker";
import Router from "next/router";

import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useUser } from "./User";

import styled from "styled-components";
import Head from "next/head";
import CreateMealIngredientList from "./CreateMealIngredientList";
import {CapatlizeFirstLetter} from '../lib/helpers'
import {MY_MEALS_QUERY} from './MyMeals'

const MealLogStyles = styled.div`
  float: none;
  padding: 20px;
  box-shadow: ${(props) => props.theme.bs};
  border-radius: 22px;
  margin-left: auto;
  margin-right: auto;
  max-width: 720px;
  margin-top: 64px;
  .topOfMealLog {
    max-height: 200px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    h2 {
      align-self: end;
      line-height: 1.3;
      margin: 0;
      font-size: 3rem;
    }
    button {
      border-width: 0px;

      background: white;
      color: ${(props) => props.theme.lightBlue};
      font-size: 2rem;
      font-weight: 600;
      align-self: end;
      justify-self: end;
      margin: 0;
      &:hover {
        cursor: pointer;
      }
    }
  }
`;

const SingleMealStyles = styled.div`
  float: none;
  padding: 20px;
  box-shadow: ${(props) => props.theme.bs};
  border-radius: 22px;
  margin-left: auto;
  margin-right: auto;
  max-width: 720px;

  /* margin-left: 50px; */
  .topOfMeal {
    display: grid;
    grid-template-columns: 200px 20px auto;
  }
  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
  }
  .details {
    max-height: 200px;
    display: grid;
    grid-template-rows: 100px 75px 25px;
    h2 {
      align-self: end;
      line-height: 1.3;
      margin: 0;
      font-size: 3rem;
    }
    p {
      align-self: start;
      margin: 0;
    }
  }
  .mealOptions {
    max-width: 430px;
    display: grid;
    grid-template-columns: auto auto;
    justify-content: space-between;
  }
  .ingredients {
    h3 {
      font-size: 2.4rem;
      margin: 0px;
      padding: 0px;
    }
  }
`;

const AddButton = styled.p`
  color: ${(props) => props.theme.lightBlue};
  justify-self: start;
  font-weight: 600;
  font-size: 1.75rem;
  margin: 0;
  padding: 0;
  &:hover {
    cursor: pointer;
  }
`;

const EditButton = styled.p`
  color: ${(props) => props.theme.lightBlue};
  /* float: right; */
  justify-self: end;
  margin: 0;
  padding: 0;
  font-weight: 600;
  font-size: 1.75rem;
  &:hover {
    cursor: pointer;
  }
`;

const VerticalDivider = styled.div`
  width: 1px;
  background-color: black;
  height: 200px;
`;

const HorizontalDivider = styled.div`
  max-width: 680px;
  height: 1px;
  margin: ${props => props.MealLog ? '0px' : '22px'} 0px;
  background-color: black;
`;

const SINGLE_MEAL_QUERY = gql`
  query SINGLE_MEAL_QUERY($id: ID!) {
    Meal(where: { id: $id }) {
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

const IngredientListStyle = styled.div`
  box-shadow: ${(props) => props.theme.bs};
  border-radius: 22px;
  height: 44px;
  padding-left: 22px;
  padding-right: 22px;
  display: grid;
  grid-template-columns: auto 40px;
  margin-top: 15px;
  margin-bottom: 15px;
  p {
    margin: 0;
    padding: 0;
    font-size: 24px;
    font-weight: 600;
  }
  button {
    margin: 0;
    padding: 0;
    font-size: 22px;
    font-weight: 600;
    background-color: transparent;
    border-width: 0px;
    &:hover{
      cursor: pointer;
    }
  }
`;





function DeleteMealIngredientList({ mealIngredientListId, ingredientId, mealId }) {
  const [deleteMealIngredientList] = useMutation(DELETE_MEAL_INGREDIENT_LIST, {
    variables: { mealIngredientListId, ingredientId, mealId },
    refetchQueries: () => [
      { query: SINGLE_MEAL_QUERY, variables: { id: mealId } },
    ],
    awaitRefetchQueries: true,
  });
  return (
    <button type="button" onClick={deleteMealIngredientList}>
      🗑
    </button>
  );
}

function IngredientList({ ingredientList, userCreatedMeal, id }) {
  if (ingredientList.length > 0) {
    return ingredientList.map((ingredient) => {
      return (
        <IngredientListStyle key={ingredient.id}>
          <p>
            {CapatlizeFirstLetter(ingredient.amount.name)} -{" "}
            {CapatlizeFirstLetter(ingredient.ingredient.name)}
          </p>
          {userCreatedMeal && <DeleteMealIngredientList mealId={id} mealIngredientListId={ingredient.id} ingredientId={ingredient.ingredient.id} />}
        </IngredientListStyle>
      );
    });
  } else {
    return <h4>No Ingredients Added To Meal Yet</h4>;
  }
}

const ADD_MEAL_TO_GROCERY_LIST = gql`
  mutation ADD_MEAL_TO_GROCERY_LIST($groceryList:[GroceryListsCreateInput], $mealId: ID!, $authorId: ID!) {
    addIngredientsToGroceryList: createGroceryLists(data: $groceryList) {
      id
    }
    addMealToMealList: createMealList(data:{meal:{connect:{id:$mealId}}, author:{connect:{id:$authorId}}}){
    id
  }
  }
`;


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
      console.log("ADD_MEAL_TO_GROCERY_LIST COMPLETE");
    },
  });

  return (
    <AddButton onClick={createGroceryLists}>Add To Grocery List</AddButton>
  );
}

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
        if(me.id === Meal.author.id) {
          userCreatedMeal = true
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
        <div className="topOfMeal">
          <img src={Meal.mealImage.publicUrlTransformed} alt={Meal.name} />
          <VerticalDivider />
          <div className="details">
            <h2>{Meal.name}</h2>
            <p>{Meal.description}</p>
            <div className="mealOptions">
              {me && <AddMealToGroceryList meal={Meal} me={me} />}
              {userCreatedMeal && (
                <EditButton
                  onClick={() =>
                    Router.push({
                      pathname: "/update",
                      query: { id: Meal.id },
                    })
                  }
                >
                  Edit
                </EditButton>
              )}
            </div>
          </div>
        </div>
        <HorizontalDivider />
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

function MealLog({mealId, authorId}) {
  const { loading, error, data } = useQuery(GET_MADE_MEALS, {
    variables: { mealId, authorId },
  });

  if (error) return <Error error={error} />;
  if (loading) return <p>Loading...</p>;
  // if (!data.MealLog) return <p>No Meal Found for {id}</p>;
  const {allMadeMeals} = data;

  return (
    <MealLogStyles>
      <div className="topOfMealLog">
        <h2>Meal Log</h2>
        <MadeMeal mealId={mealId} authorId={authorId} dateMade={dateFormatted(new Date())} />
      </div>
      <HorizontalDivider MealLog />
      <MealLogList allMadeMeals={allMadeMeals} mealId={mealId} authorId={authorId} />
    </MealLogStyles>
  );
}

function MadeMeal({mealId, authorId, dateMade}) {
  const [createMadeMeal] = useMutation(MADE_MEAL, {
    variables: { mealId, authorId, dateMade },
    refetchQueries: () => [
      { query: GET_MADE_MEALS, variables: { mealId, authorId } },
    ],
    awaitRefetchQueries: true,
  });
  return (
    <button onClick={createMadeMeal}>Made</button>
  );
}


const MealLogListEnteryNotEditingStyle = styled.div`
  margin-bottom: 44px;
  p {
    margin: 0;
    margin-top: 4px;
  }
  button {
    border-width: 0px;
    background: white;
    color: ${(props) => props.theme.lightBlue};
    font-size: 1.5rem;
    font-weight: 300;
    align-self: end;
    justify-self: end;
    margin: 0;
    padding: 0;
    &:hover {
      cursor: pointer;
    }
  }
`;

const MealLogListEnteryEditingStyle = styled.div`
  padding: 16px;
  box-shadow: ${(props) => props.theme.bs};
  border-radius: 22px;
  margin-bottom: 44px;
  margin-top: 22px;
  max-width: 600px;
  .topOfMealEditingLog {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-content: center;
    p {
      margin: 0;
    }
    .react-datepicker-wrapper {
      justify-self: start;
      width: 70px;
      input {
        border-width: 0px;
        font-size: 1.5rem;
        font-family: Helvetica;
        color: ${(props) => props.theme.lightBlue};
        background-color: transparent;
        &:focus {
          outline: 0;
        }
        &:hover {
          cursor: pointer;
        }
      }
    }
  }

  .bottomRow{
    margin: 0px;
    padding: 0;
    display: grid;
    grid-template-columns: auto 1fr;
    p {
      margin: 0;
      justify-self: end;
    }
  }
`;

const TextArea = styled.textarea`
    margin-top: 16px;
    margin-bottom: 8px;
    border-radius: 0px;
    border-color: transparent;
    box-shadow: ${(props) => props.theme.bs};
    border-radius: 22px;
    padding: 12px;
    font-size: 1.5rem;
    width: 90%;
    /* height: 80px; */
    resize: none; 
    read
`;

const MealLogListEnteryEditingStyleButton = styled.button`
  border-width: 0px;
  background: white;
  color: ${(props) => (props.delete ? props.theme.red : props.theme.lightBlue)};
  font-size: 1.5rem;
  font-weight: 300;
  align-self: end;
  justify-self: end;
  margin: 0;
  margin-right: 16px;
  padding: 0;
  &:hover {
    cursor: pointer;
  }
`;


function MealLogListEnteryNotEditing({ date, setIsEditing, thoughts }) {
  return (
    <MealLogListEnteryNotEditingStyle>
      <p>
        You made this meal on: {date}
      </p>
      <button onClick={setIsEditing}>{thoughts ? "Edit Comment" : "Write a Comment"}</button>
      {thoughts && <TextArea disabled value={thoughts} />}
    </MealLogListEnteryNotEditingStyle>
  );
}

function MealLogListEnteryEditing({ date, setIsEditing, mealId, authorId, id, strartingThoughts }) {
  // Follow is a hack because date picker was always one day less
  const initialDate = new Date(date);
  const day = 60 * 60 * 24 * 1000;
  
  const [startDate, setStartDate] = useState(new Date(initialDate.getTime() + day));
  const [thoughts, setThoughts] = useState(strartingThoughts ? strartingThoughts : "");
  const [updateMadeMeal] = useMutation(UPDATE_MADE_MEAL, {
    variables: { id, thoughts, dateMade: dateFormatted(startDate) },
    refetchQueries: [
      { query: GET_MADE_MEALS, variables: { mealId, authorId } },
    ],
    awaitRefetchQueries: true,
    onCompleted: () => {setIsEditing()}
  });

  const [deleteMadeMeal] = useMutation(DELETE_MADE_MEAL, {
    variables: { id },
    refetchQueries: () => [
      { query: GET_MADE_MEALS, variables: { mealId, authorId } },
    ],
    awaitRefetchQueries: true,
    onCompleted: () => {setIsEditing()}
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
            setThoughts(e.target.value)}
          }
        }
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
      return <MealLogListItem madeMeal={madeMeal} key={madeMeal.id} mealId={mealId} authorId={authorId} />;
    });
  } else {
    return <h4>You haven't made this meal yet</h4>;
  }
}

function dateFormatted(today) {
  var d = today.getDate();
  var m = today.getMonth() + 1; //Months are zero based
  var y = today.getFullYear();
  var dateString = `${y}-${m<=9 ? '0' + m : m}-${d <= 9 ? '0' + d : d}`
  return dateString;
}

const MADE_MEAL = gql`
  mutation MADE_MEAL($mealId:ID!, $authorId:ID!,$dateMade:String){
	createMadeMeal(
    data:{
      meal:{
        connect:{
          id:$mealId
        }
      }
      author:{
        connect:{
          id:$authorId
        }
      }
      dateMade:$dateMade
    }){
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
    allMadeMeals(where: { author: { id: $authorId }, meal: { id: $mealId } }, sortBy: dateMade_DESC ) {
      id
      dateMade
      thoughts
    }
  }
`;

export default SingleMeal;
export { SINGLE_MEAL_QUERY };
