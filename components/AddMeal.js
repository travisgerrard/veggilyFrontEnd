import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import Router from "next/router";
import useForm from "../lib/useForm";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import { useUser } from "./User";

import { ALL_MEALS_QUERY } from "./Meals";
import { PAGINATION_QUERY } from "./Pagination";

const CREATE_MEAL = gql`
mutation CREATE_MEAL($authorId:ID!, $name:String, $description:String, $mealImage:Upload){
  createMeal(data:{
    name:$name
    description:$description
    mealImage:$mealImage
    author:{connect:{id:$authorId}}
  }){
    id
    name
    description
    mealImage{
      publicUrlTransformed
    }
  }
}
`;

function AddMeal() {
  const me = useUser();

  const { inputs, handleChange } = useForm({
    authorId: me && me.id,
    name: "",
    description: "",
    mealImage: "",
  });
  console.log(inputs);
  const [createMeal, { loading, error }] = useMutation(CREATE_MEAL, {
    variables: inputs,
    refetchQueries: () => [{ query: ALL_MEALS_QUERY }, { query: PAGINATION_QUERY }],
  });

  return (
    <Form
      data-testid="form"
      onSubmit={async (e) => {
        // Stop the form from submitting
        e.preventDefault();
        // call the mutation
        const res = await createMeal();
        // change them to the single item page
        Router.push({
          pathname: "/meal",
          query: { id: res.data.createMeal.id },
        });
      }}
    >
        <h2>Add Meal</h2>
      <Error error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="file">
          Image
          <input
            type="file"
            id="file"
            name="mealImage"
            placeholder="Upload an image"
            required
            onChange={handleChange}
          />
        </label>

        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            required
            value={inputs.name}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="description">
          Description
          <input
                      type="text"

            id="description"
            name="description"
            placeholder="Description"
            required
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </fieldset>
    </Form>
  );
}

export default AddMeal;
