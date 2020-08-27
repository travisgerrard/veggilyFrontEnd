import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Title from "./styles/Title";
import MealStyles from "./styles/MealStyles";
import VerticalDivider from "./styles/VerticalDivider";
import styled from "styled-components";



export default function Meal({ meal }) {
  return (
    <Link
      href={{
        pathname: "/meal",
        query: { id: meal.id },
      }}
    >
      <MealStyles>
        {meal.mealImage && (
          <img src={meal.mealImage.publicUrlTransformed} alt={meal.name} />
        )}

        <VerticalDivider />

        <Title>
          <a>{meal.name}</a>
          <p>{meal.description}</p>
        </Title>
        
      </MealStyles>
    </Link>
  );
}

Meal.propTypes = {
  meal: PropTypes.object.isRequired,
};
