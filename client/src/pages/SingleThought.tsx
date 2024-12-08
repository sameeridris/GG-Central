import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList/index.tsx';
import CommentForm from '../components/CommentForm/index.tsx';

import { QUERY_SINGLE_THOUGHT } from '../utils/queries.ts';

const SingleThought = () => {
  const { thoughtId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_THOUGHT, {
    variables: { thoughtId: thoughtId },
  });
  // example data:
  const exampleGame = {
    title: "the walking dead game",
    imageURL: "https://m.media-amazon.com/images/M/MV5BNDRhZjkyNWItMjkzOS00ZjUwLTk4NDctODY2ZjZkZGE4OGY2XkEyXkFqcGc@._V1_.jpg",
    description: "the walking dead game with clem and aj lol"
  }

  const thought = data?.thought || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      {/*this is where we would put the game and its information, and below is the comments. */}
      <img src={exampleGame.imageURL} alt="" />
      <h1>{exampleGame.title}</h1>
      <p>{exampleGame.description}</p>
      <div className="my-5">
        <CommentList comments={thought.comments} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <CommentForm thoughtId={thought._id} />
      </div>
    </div>
  );
};

export default SingleThought;
