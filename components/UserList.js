import React, { useState, Fragment } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useUser, CURRENT_USER_QUERY } from './User';
import styled, { css } from 'styled-components';

const ALL_USERS = gql`
  query ALL_USERS {
    allUsers {
      id
      name
    }
  }
`;

const START_FOLLOWING = gql`
  mutation START_FOLLOWING($id_to_change_following: ID!, $current_user: ID!) {
    startFollowUser: updateUser(
      id: $current_user
      data: { follows: { connect: { id: $id_to_change_following } } }
    ) {
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

const STOP_FOLLOWING = gql`
  mutation STOP_FOLLOWING($id_to_change_following: ID!, $current_user: ID!) {
    stopFollowUser: updateUser(
      id: $current_user
      data: { follows: { disconnect: { id: $id_to_change_following } } }
    ) {
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 50px 50px;
  grid-gap: 5px;
`;

function UserList() {
  const me = useUser();

  const { data = {}, loading } = useQuery(ALL_USERS, {});
  const { allUsers } = data;

  if (!me) return <p>not logged in</p>;
  if (!allUsers) return <p>No users</p>;

  const { followers, follows } = me;
  console.log(me);
  console.log(allUsers);
  console.log(followers, follows);

  return (
    <Grid className="UserGrid">
      <div>User</div>
      <div>Follows</div>
      <div>Following You</div>
      {allUsers.map((user) => {
        const isFollowing = follows.some((e) => e.id === user.id);

        if (user.id === me.id) {
          return null;
        }
        return (
          <Fragment key={user.id}>
            <p key={user.name}>{user.name}</p>
            <FollowCheckBox
              id_to_change_following={user.id}
              current_user={me.id}
              isFollowing={follows.some((e) => e.id === user.id)}
            />
            <input
              name="following"
              type="checkbox"
              checked={followers.some((e) => e.id === user.id)}
              readOnly
              // onChange={this.handleInputChange}
            />
          </Fragment>
        );
      })}
    </Grid>
  );
}

function FollowCheckBox({ id_to_change_following, current_user, isFollowing }) {
  const [stopFollowUser] = useMutation(STOP_FOLLOWING, {
    variables: {
      id_to_change_following,
      current_user,
    },
    refetchQueries: () => [{ query: CURRENT_USER_QUERY }],
    awaitRefetchQueries: true,
  });

  const [startFollowUser] = useMutation(START_FOLLOWING, {
    variables: {
      id_to_change_following,
      current_user,
    },
    refetchQueries: () => [{ query: CURRENT_USER_QUERY }],
    awaitRefetchQueries: true,
  });

  return (
    <input
      name="follows"
      type="checkbox"
      checked={isFollowing}
      onChange={() => {
        if (isFollowing) {
          stopFollowUser();
        } else {
          startFollowUser();
        }
      }}
    />
  );
}

export default UserList;
