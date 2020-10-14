import styled from 'styled-components';

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

const TopOfMeal = styled.div`
  border-radius: 22px;
  box-shadow: ${(props) => props.theme.bs};
  position: relative;
  display: flex;
  flex-direction: column;
  transition: border-color 0.25s ease-in-out;
  padding: -20px;
  img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 22px;
  }
  .overlay {
    position: absolute;
    bottom: 0;
    background: rgb(0, 0, 0);
    background: rgba(255, 255, 255, 0.85); /* Black see-through */
    color: #f1f1f1;
    width: 100%;
    transition: 0.5s ease;
    color: black;
    font-size: 20px;
    padding: 0px;
    text-align: left;
  }
  .title {
    font-size: 26px;
    line-height: 1.6;
    font-weight: bold;
    padding: 0px;
    padding-left: 10px;
    padding-top: 5px;
    margin: 0px;
  }
  .subtitle {
    line-height: 1.6;
    font-size: 18px;
    padding: 0px;
    padding-left: 10px;
    padding-bottom: 10px;
    margin: 0px;
  }
  .mealOptions {
    /* max-width: 430px; */
    padding-left: 10px;
    padding-right: 10px;
    font-size: 22px;

    display: grid;
    grid-template-columns: auto auto;
    justify-content: space-between;
  }
`;

const SingleMealStyles = styled.div`
  float: none;
  /* padding: 20px; */
  box-shadow: ${(props) => props.theme.bs};
  border-radius: 22px;
  margin-left: auto;
  margin-right: auto;
  max-width: 600px;

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

  .ingredients {
    padding: 20px;
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
  font-size: 2rem;
  margin: 0;
  padding: 0;
  transition: 0.25s ease;
  &:hover {
    color: ${(props) => props.theme.darkBlue};
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
  font-size: 2rem;
  transition: 0.25s ease;
  &:hover {
    color: ${(props) => props.theme.darkBlue};
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
  margin: ${(props) => (props.MealLog ? '0px' : '22px')} 0px;
  background-color: black;
`;

const IngredientListStyle = styled.div`
  /* box-shadow: ${(props) => props.theme.bs}; */
  /* border-radius: 22px; */
  height: 44px;
  padding-left: 22px;
  padding-right: 22px;
  display: grid;
  grid-template-columns: auto 40px;
  /* margin-top: 15px;
  margin-bottom: 15px; */
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
    &:hover {
      cursor: pointer;
    }
  }
`;

const TrashContainer = styled.div`
  height: 42px;
  width: 42px;
  padding-left: 1px;
  background-color: gray;
  border-radius: 21px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
`;

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

  .bottomRow {
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

export {
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
};
