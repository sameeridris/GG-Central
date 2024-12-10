import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import ThoughtList from '../components/CommentList/index.js';
import ThoughtForm from '../components/CommentForm/index.js';
import { QUERY_SINGLE_GAME } from '../utils/queries';

const SingleGame = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_GAME, {
    variables: { gameId: id },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const game = data?.game || {};
  console.log(game)
  return (
    <div className="my-3">
      <img src={game.imageURL} alt="" />
      <h1>{game.title}</h1>
      <p>{game.description}</p>
      <div
        className="col-12 col-md-10 mb-3 p-3"
        style={{ border: '1px dotted #1a1a1a' }}
      >
        <ThoughtForm />
      </div>
      <div className="col-12 col-md-8 mb-3">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ThoughtList
            thoughts={thoughts}
            title="Comment(s) on this game..."
          />
        )}
      </div>
    </div>
  );
};

// const SingleThought = () => {
//   const { loading, data } = useQuery(QUERY_THOUGHTS);
//   const thoughts = data?.thoughts || [];


//   // example data:
//   const exampleGame = {
//     title: "the walking dead game",
//     imageURL: "https://m.media-amazon.com/images/M/MV5BNDRhZjkyNWItMjkzOS00ZjUwLTk4NDctODY2ZjZkZGE4OGY2XkEyXkFqcGc@._V1_.jpg",
//     description: "the walking dead game with clem and aj lol",
//     thoughts: thoughts
//   }

//   const thought = data?.thought || {};

//   if (loading) {
//     return <div>Loading...</div>;
//   }
//   return (
//     <div className="my-3">
//       {/*this is where we would put the game and its information, and below is the comments. */}
//       <img src={exampleGame.imageURL} alt="" />
//       <h1>{exampleGame.title}</h1>
//       <p>{exampleGame.description}</p>
//       <div
//         className="col-12 col-md-10 mb-3 p-3"
//         style={{ border: '1px dotted #1a1a1a' }}
//       >
//         <ThoughtForm />
//       </div>
//       <div className="col-12 col-md-8 mb-3">
//         {loading ? (
//           <div>Loading...</div>
//         ) : (
//           <ThoughtList
//             thoughts={thoughts}
//             title="Comment(s) on this game..."
//           />
//         )}
//       </div>
//     </div>
//   );
// };

export default SingleGame;
