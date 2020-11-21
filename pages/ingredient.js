import SingleIngredient from '../components/SingleIngredient/SingleIngredient';

const Item = (props) => (
  <div>
    <SingleIngredient id={props.query.id} />
  </div>
);

export default Item;
