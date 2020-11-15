import styled from 'styled-components';

export const IngredientListStyle = styled.div`
  box-shadow: ${(props) => props.theme.bs};
  border-radius: 22px;
  height: 44px;
  padding-left: 0px;
  padding-bottom: 2px;
  padding-right: 22px;
  /* display: grid;
  grid-template-columns: 55px auto; */
  display: flex;
  flex-direction: row;
  padding: 0px 2px;
  margin-top: 15px;
  margin-bottom: 15px;
  p {
    position: static;
    width: auto;
    height: 36px;
    left: 62px;
    top: 4px;
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: 600;
    flex: none;
    order: 1;
    align-self: center;
    margin: 16px 16px;
    color: ${(props) => (props.isComplete ? 'rgb(0, 0, 0, 0.25)' : 'black')};
  }
`;

export const CompleteGroceryListButtonStyle = styled.div`
  position: static;
  width: 50px;
  height: 50px;
  left: 2px;
  top: 0px;

  background: ${(props) =>
    props.isComplete ? 'rgb(0, 0, 0, 0.25)' : '#ffffff'};
  /* Text */

  border: 3px solid
    ${(props) => (props.isComplete ? 'rgb(0, 0, 0, 0.25)' : '#000000')};
  border-radius: 25px;

  /* Inside Auto Layout */

  flex: none;
  order: 0;
  align-self: center;
  margin: 16px 0px;
  transition: border-color 0.12s ease-in-out;
  transition: background 0.12s ease-in-out;
  &:hover,
  &:focus {
    cursor: pointer;
    border-color: ${(props) => props.theme.lightBlue};
  }
  &:active {
    background: ${(props) => props.theme.lightBlue};
  }
`;

export const HorizontalDivider = styled.div`
  max-width: 680px;
  height: 1px;
  margin: 22px 0px;
  background-color: rgb(0, 0, 0, 0.25);
`;

export const CompletedTitle = styled.h2`
  color: rgb(0, 0, 0, 0.25);
`;
