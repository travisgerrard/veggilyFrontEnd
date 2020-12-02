import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';

const CURRENT_USER_QUERY = gql`
  query {
    authenticatedUser {
      id
      email
      name
      permissions
      follows {
        name
        id
      }
      followers {
        name
        id
      }
    }
  }
`;

function useUser() {
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY);
  if (data) {
    return data.authenticatedUser;
  }
}

export { CURRENT_USER_QUERY, useUser };
