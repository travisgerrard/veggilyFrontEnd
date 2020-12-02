import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import Meals from '../components/Meals';
import AddNewMealButton from '../components/AddNewMealButton';
import { PAGINATION_QUERY } from '../components/Pagination';

function Home({ query }) {
  const { data, loading } = useQuery(PAGINATION_QUERY);
  if (loading) return 'Loading...';
  return (
    <div>
      <Meals
      // page={parseFloat(query.page) || 1}
      // count={data._allMealsMeta.count}
      />
      <AddNewMealButton />
    </div>
  );
}

Home.propTypes = {
  query: PropTypes.shape({
    page: PropTypes.string,
    count: PropTypes.number,
  }),
};

export default Home;
