import { Schema, model, Document } from 'mongoose';

// Define an interface for the User document
interface IGame extends Document {
    id: string;
    name: string;
    description: string;
    rating: number;
    imageUrl: string;
    thoughts: Schema.Types.ObjectId[];
    status: string;
}

// Define the schema for the User document
const gameSchema = new Schema<IGame>(
    {
      id: {
        type: String,
        required: true,
        unique: true,
      },
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
        minlength: 5,
      },
      rating: {
        type: Number,
        required: true,
      },
      imageUrl: {
        type: String,
        required: true,
      },
      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought',
        },
      ],
      status: {
        type: String, 
        required: true,
      }
    },
    {
      timestamps: true,
      toJSON: { getters: true },
      toObject: { getters: true },
    }
  );

  const Game = model<IGame>('Game', gameSchema);

  export default Game;