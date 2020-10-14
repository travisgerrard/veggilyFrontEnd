import SingleMeal from '../components/SingleMeal/SingleMeal';

const Item = (props) => (
  <div>
    <SingleMeal id={props.query.id} />
  </div>
);

export default Item;
