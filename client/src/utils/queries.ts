import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
    }
  }
`;

export const QUERY_THOUGHTS = gql`
  query getThoughts {
    thoughts {
      _id
      thoughtText
      thoughtAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleThought($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;



export const SEARCH_GAMES = gql`
  query searchGames($name: String!) {
    searchGames(name: $name) {
      id
      name
      imageUrl
    }
  }
`;


export const QUERY_SINGLE_GAME = gql`
  query singleGame($gameId: ID!) {
    game(gameId: $gameId) {
      id
      name
      description
      rating
      imageUrl
      status # Ensure this field is fetched
    }
  }
`;


export const ADD_GAME_TO_LIBRARY = gql`
  mutation addGameToLibrary($gameInput: GameInput!) {
    addGameToLibrary(gameInput: $gameInput) {
      id
      name
      description
      rating
      imageUrl
      status 
    }
  }
`;


export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      game {
        id
        name
        description
        rating
        imageUrl
        status 
      }
    }
  }
`;
