
import { Thought, User, Game } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';
import { fetchGameData, searchGamesByName } from '../services/igdbServices.js';

interface AddUserArgs {
  input: {
    username: string;
    email: string;
    password: string;
  };
}

interface LoginUserArgs {
  email: string;
  password: string;
}

interface UserArgs {
  username: string;
}

interface ThoughtArgs {
  thoughtId: string;
}

interface AddThoughtArgs {
  input: {
    thoughtText: string;
    thoughtAuthor: string;
  };
}

interface AddCommentArgs {
  thoughtId: string;
  commentText: string;
}

interface RemoveCommentArgs {
  thoughtId: string;
  commentId: string;
}

interface GameArgs {
  gameId: string;
}

interface AddGameArgs {
  input: {
    id: string;
    name: string;
    description: string;
    rating: number;
    imageUrl: string;
    status: string;
  }
}

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('thoughts');
    },
    user: async (_parent: any, { username }: UserArgs) => {
      return User.findOne({ username }).populate('thoughts');
    },
    usergames: async () => {
      return User.find().populate({
        path: 'games.pressStart games.loading games.wellPlayed',
        populate: { path: 'games' },
      });
    },
    thoughts: async () => {
      return await Thought.find().sort({ createdAt: -1 });
    },
    thought: async (_parent: any, { thoughtId }: ThoughtArgs) => {
      return await Thought.findOne({ _id: thoughtId });
    },
    me: async (_parent: any, _args: any, context: any) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
          .populate('thoughts')
          .populate('games.pressStart')
          .populate('games.loading')
          .populate('games.wellPlayed');
      }
      throw new AuthenticationError('Could not authenticate user.');
    },
    game: async (_parent: any, { gameId }: GameArgs) => {
      try {
        console.log(`Resolver fetching game with ID: ${gameId}`);
        const gameData = await fetchGameData(gameId);
        if (gameData) {
          return {
            id: gameData.id,
            name: gameData.name,
            description: gameData.summary,
            rating: gameData.rating,
            imageUrl: gameData.cover
              ? `https:${gameData.cover.url.replace('t_thumb', 't_1080p')}`
              : null,
          };
        } else {
          return null;
        }
      } catch (error) {
        console.error('Error in game resolver:', error);
        throw new Error('Failed to fetch game data');
      }
    },
    
    searchGames: async (_parent: any, { name }: { name: string }) => {
      try {
        console.log(`Resolver received search query for: ${name}`);
        const games = await searchGamesByName(name);
        return games.map((game: any) => ({
          id: game.id,
          name: game.name,
          description: game.summary,
          rating: game.rating,
          imageUrl: game.cover ? game.cover.url : null,
        }));
      } catch (error) {
        console.error('Error in searchGames resolver:', error);
        throw new Error('Failed to search games');
      }
    },
  },
  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      const user = await User.create({ ...input });
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Could not authenticate user.');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Could not authenticate user.');
      }
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
    addThought: async (_parent: any, { input }: AddThoughtArgs, context: any) => {
      if (context.user) {
        const thought = await Thought.create({ ...input });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { thoughts: thought._id } }
        );
        return thought;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (
      _parent: any,
      { thoughtId, commentText }: AddCommentArgs,
      context: any
    ) => {
      if (context.user) {
        return Thought.findOneAndUpdate(
          { _id: thoughtId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          { new: true, runValidators: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeThought: async (_parent: any, { thoughtId }: ThoughtArgs, context: any) => {
      if (context.user) {
        const thought = await Thought.findOneAndDelete({
          _id: thoughtId,
          thoughtAuthor: context.user.username,
        });
        if (!thought) {
          throw new AuthenticationError('Thought not found');
        }
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { thoughts: thought._id } }
        );
        return thought;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeComment: async (
      _parent: any,
      { thoughtId, commentId }: RemoveCommentArgs,
      context: any
    ) => {
      if (context.user) {
        return Thought.findOneAndUpdate(
          { _id: thoughtId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addGame: async (_parent: any, { input }: AddGameArgs, context: any) => {
      if (context.user) {
        const game = await Game.create({ ...input });
        let updateField = '';
        switch (input.status) {
          case 'Press Start':
            updateField = 'games.pressStart';
            break;
          case 'Loading':
            updateField = 'games.loading';
            break;
          case 'Well Played':
            updateField = 'games.wellPlayed';
            break;
          default:
            throw new Error('Invalid game status');
        }
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { [updateField]: game._id } }
        );
        return game;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeGame: async (_parent: any, { gameId }: GameArgs, context: any) => {
      if (context.user) {
        const game = await Game.findOneAndDelete({
          _id: gameId,
          name: context.user.username,
        });
        if (!game) {
          throw new AuthenticationError('Thought not found');
        }
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { games: game._id } }
        );
        return game;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};


export default resolvers;
