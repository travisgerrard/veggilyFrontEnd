
import UpdateMeal from '../components/UpdateMeal';

const Update = ({ query }) => (
  <div>
    <UpdateMeal id={query.id} />
  </div>
);

export default Update;