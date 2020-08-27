import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useUser } from "./User";
import { useRouter } from "next/router";
import gql from "graphql-tag";
import styled from "styled-components";
import Meal from "./Meal";

const MY_MEALS_QUERY = gql`
  query MY_MEALS_QUERY($authorId: ID!) {
    allMealLists(where: { author: { id: $authorId }, isCompleted: false }) {
      id
      isCompleted
      meal {
        id
        name
        description
        mealImage {
          publicUrlTransformed
        }
      }
    }
  }
`;

const COMPLETE_MY_MEAL = gql`
  mutation COMPLETE_MY_MEAL($id: ID!, $dateCompleted: DateTime) {
    updateMealList(
      id: $id
      data: { isCompleted: true, dateCompleted: $dateCompleted }
    ) {
      id
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const MealsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 280px));
  justify-items: center;
  justify-content: space-evenly;
  align-items: center;
  grid-gap: 60px;
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
`;

const MadeMealButtonStyle = styled.div`
  color: ${(props) => props.theme.lightBlue};
  justify-self: end;
  align-self: end;
  text-align: right;
  font-weight: 600;
  font-size: 1.75rem;
  margin: 0;
  padding: 0;
  margin-right: 15px;
  &:hover {
    cursor: pointer;
  }
`;

function MadeMealButton({ id, authorId }) {
  const [updateMealList] = useMutation(COMPLETE_MY_MEAL, {
    variables: { id, dateCompleted: new Date() },
    refetchQueries: () => [{ query: MY_MEALS_QUERY, variables: { authorId } }],
    awaitRefetchQueries: true,
  });

  return (
    <MadeMealButtonStyle
      onClick={(e) => {
        e.stopPropagation();
        updateMealList();
        console.log("Made this meal");
      }}
    >
      Mark As Made
    </MadeMealButtonStyle>
  );
}

function MyMeals() {
  const me = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!me) {
      router.push("/signin");
    }
  }, [me]);

  if (me && me.id) {
    const { data, error, loading } = useQuery(MY_MEALS_QUERY, {
      variables: {
        authorId: me.id,
      },
    });

    console.log(data);

    return (
      <Center>
        <h1>My Meals</h1>
        {(() => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error.message}</p>;
          if (data.allMealLists.length === 0) return <p>No meals here!</p>;
          return (
            <MealsList>
              {data.allMealLists.map((meal) => (
                <div key={meal.id}>
                  <Meal meal={meal.meal} />
                  <MadeMealButton id={meal.id} authorId={me.id} />
                </div>
              ))}
            </MealsList>
          );
        })()}
      </Center>
    );
  } else {
    return <div>Redirecting to login</div>;
  }
}

export default MyMeals;
export { MY_MEALS_QUERY };
