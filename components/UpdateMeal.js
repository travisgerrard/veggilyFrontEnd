import PropTypes from "prop-types";
import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import useForm from "../lib/useForm";
import DeleteMeal from "./DeleteMeal";

const SINGLE_MEAL_UPDATE_QUERY = gql`
  query SINGLE_MEAL_UPDATE_QUERY($id: ID!) {
    Meal(where: { id: $id }) {
      id
      name
      description
    }
  }
`;

const UPDATE_MEAL = gql`
  mutation UPDATE_MEAL($name: String, $description: String, $id: ID!) {
    updateMeal(id: $id, data: { name: $name, description: $description }) {
      id
      name
      description
    }
  }
`;

function UpdateMeal({ id }) {
  const { data = {}, loading } = useQuery(SINGLE_MEAL_UPDATE_QUERY, {
    variables: {
      id,
    },
  });
  const { inputs, handleChange } = useForm(data.Meal);
  const [updateMeal, { loading: updating, error }] = useMutation(UPDATE_MEAL, {
    variables: {
      id,
      ...inputs,
    },
  });
  if (loading) return <p>Loading...</p>;
  if (!data || !data.Meal) return <p>No Meal Found for ID {id}</p>;

  return (
    <>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await updateMeal();
          console.log(res);
        }}
      >
        <Error error={error} />
        <fieldset disabled={updating} aria-busy={updating}>
          <label htmlFor="name">
            Title
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
              placeholder="Enter A Description"
              required
              value={inputs.description}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Sav{loading ? "ing" : "e"} Changes</button>
        </fieldset>
      </Form>
      <DeleteMeal id={id} />
    </>
  );
}

UpdateMeal.propTypes = {
  id: PropTypes.string.isRequired,
};

export default UpdateMeal;
export { UPDATE_MEAL };
