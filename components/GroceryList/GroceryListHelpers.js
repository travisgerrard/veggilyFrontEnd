import { useMutation } from '@apollo/client';
import { COMPLETE_GROCERY_LIST, GET_GROCERY_LIST } from '../../graphql/queries';
import { CompleteGroceryListButtonStyle } from './GroceryListStyle';

export const nestedSort = (prop1, prop2 = null, direction = 'asc') => (
  e1,
  e2
) => {
  const a = prop2 ? e1[prop1][prop2] : e1[prop1],
    b = prop2 ? e2[prop1][prop2] : e2[prop1],
    sortOrder = direction === 'asc' ? 1 : -1;
  return a < b ? -sortOrder : a > b ? sortOrder : 0;
};

export function CompleteGroceryListButton({ id, me, isComplete }) {
  const [updateGroceryList] = useMutation(COMPLETE_GROCERY_LIST, {
    variables: { id, dateCompleted: new Date(), isCompleted: !isComplete },
    refetchQueries: () => [
      { query: GET_GROCERY_LIST, variables: { id: me.id } },
    ],
    awaitRefetchQueries: true,
  });
  return (
    <CompleteGroceryListButtonStyle
      onClick={updateGroceryList}
      isComplete={isComplete}
    />
  );
}
