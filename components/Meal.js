import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import MealStyles from './styles/MealStyles';

export default function Meal({ meal }) {
  return (
    <Link
      href={{
        pathname: '/meal',
        query: { id: meal.id },
      }}
    >
      <MealStyles>
        {meal.mealImage && (
          <img
            src={
              meal.mealImage.publicUrlTransformed
                ? meal.mealImage.publicUrlTransformed
                : 'https://res.cloudinary.com/dehixvgdv/image/upload/v1598621202/veggily/5f490612c53b900a6dcdc484.png'
            }
            alt={meal.name}
          />
        )}

        <div className="overlay">
          <p className="title">{meal.name}</p>
          <p className="subtitle">{meal.description}</p>
        </div>
      </MealStyles>
    </Link>
  );
}

Meal.propTypes = {
  meal: PropTypes.object.isRequired,
};
