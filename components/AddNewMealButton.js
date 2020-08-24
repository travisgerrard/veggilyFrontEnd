import React from "react";
import { useUser } from "./User";
import styled from "styled-components";
import Router from "next/router";

const AddMealButton = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  border-style: solid;
  border-width: 1px;
  border-color: transparent;
  box-shadow: ${(props) => props.theme.bs};
  color: ${(props) => props.theme.lightBlue};
  position: fixed;
  bottom: 44px;
  right: 44px;
  font-size: 22px;
  font-weight: 600;
  text-align: center;
  transition: box-shadow 0.5s ease-in-out;
  transition: border-color 0.5s ease-in-out;
  &:hover,
  &:focus {
    cursor: pointer;
    box-shadow: ${(props) => props.theme.bsRaised};
    border-color: ${(props) => props.theme.lightBlue};
  }
`;

function AddNewMealButton() {
  const me = useUser();

  if (me) {
    return (
      <AddMealButton
        onClick={() =>
          Router.push({
            pathname: "/addmeal",
          })
        }
      >
        +
      </AddMealButton>
    );
  } else {
    return null;
  }
}

export default AddNewMealButton;
