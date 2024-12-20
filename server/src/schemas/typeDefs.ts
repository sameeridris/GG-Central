const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    game: [Game]!
  }

  type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    createdAt: String
  }

  input ThoughtInput {
    thoughtText: String!
    thoughtAuthor: String!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Game {
    id: ID!
    name: String!
    description: String!
    rating: Float
    imageUrl: String
    status: String
  }

  type Query {
    users: [User]
    user(username: String!): User
    thoughts: [Thought]!
    thought(thoughtId: ID!): Thought
    me: User
    game(gameId: ID!): Game
    searchGames(name: String!): [Game]
  }
  
  input GameInput {
    id: ID!
    name: String!
    description: String!
    rating: Float
    imageUrl: String
    status: String!
  }


  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addThought(input: ThoughtInput!): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
    addGameToLibrary(gameInput: GameInput!): Game
  }
`;

export default typeDefs;