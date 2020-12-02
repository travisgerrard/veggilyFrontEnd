import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Meal from './Meal';
import Pagination from './Pagination';
import { ALL_MEALS_QUERY } from '../graphql/queries';

const Center = styled.div`
  text-align: center;
`;

export const MealsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 280px));
  justify-content: center;
  align-items: center;
  grid-gap: 60px;
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
`;

function Meals({ page, count }) {
  const { data, error, loading } = useQuery(ALL_MEALS_QUERY);
  return (
    <Center>
      {(() => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;
        if (!data) return <p>No meals here!</p>;
        return (
          <MealsList>
            {data.allMeals.map((meal) => (
              <Meal meal={meal} key={meal.id} />
            ))}
          </MealsList>
        );
      })()}
      {/* <Pagination page={page} /> */}
    </Center>
  );
}

Meals.propTypes = {
  page: PropTypes.number,
};

export default Meals;
export { ALL_MEALS_QUERY };
