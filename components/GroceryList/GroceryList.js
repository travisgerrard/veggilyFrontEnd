import React, { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';

import { CapatlizeFirstLetter } from '../../lib/helpers';
import {
  IngredientListStyle,
  HorizontalDivider,
  CompletedTitle,
} from './GroceryListStyle';
import { nestedSort, CompleteGroceryListButton } from './GroceryListHelpers';

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

function GroceryList({ groceryToComplete, groceryCompleted, me }) {
  const sortedGroceryList = [...groceryToComplete].sort(
    nestedSort('ingredient', 'category', 'asc')
  );

  return (
    <div>
      {sortedGroceryList.map((grocery, index) => {
        const category = grocery.ingredient.category;
        const obj = options.find((o) => o.value === category);

        let showTitle = false;
        if (index === 0) {
          showTitle = true;
        } else {
          if (
            sortedGroceryList[index].ingredient.category !==
            sortedGroceryList[index - 1].ingredient.category
          ) {
            showTitle = true;
          }
        }

        return (
          <Fragment key={index}>
            {showTitle && <div>{obj.label}</div>}
            <IngredientListStyle key={grocery.id}>
              <CompleteGroceryListButton
                id={grocery.id}
                me={me}
                isComplete={false}
                obj={obj}
              />
              <p>
                <Link href={`/ingredient?id=${grocery.ingredient.id}`}>
                  {CapatlizeFirstLetter(grocery.ingredient.name)}
                </Link>
                {''}- {CapatlizeFirstLetter(grocery.amount.name)}
              </p>
            </IngredientListStyle>
          </Fragment>
        );
      })}
      {groceryCompleted.length > 0 && (
        <>
          <HorizontalDivider />
          <CompletedTitle>Completed</CompletedTitle>
          {groceryCompleted.map((grocery) => {
            return (
              <IngredientListStyle key={grocery.id} isComplete>
                <CompleteGroceryListButton
                  id={grocery.id}
                  me={me}
                  isComplete={true}
                />
                <p>
                  <Link href={`/ingredient?id=${grocery.ingredient.id}`}>
                    {CapatlizeFirstLetter(grocery.ingredient.name)}
                  </Link>{' '}
                  - {CapatlizeFirstLetter(grocery.amount.name)}
                </p>
              </IngredientListStyle>
            );
          })}
        </>
      )}
    </div>
  );
}

export default GroceryList;
