
import SingleMeal from '../components/SingleMeal';

const Item = props => (
  <div>
    <SingleMeal id={props.query.id} />
  </div>
);

export default Item;