interface Game {
  _id: string;
  createdAt: string;
  commentText: string;
}

interface CommentListProps {
  comments?: Comment[];
}

const CommentList: React.FC<CommentListProps> = () => {


  return (
    <>

    </>
  );
};

export default CommentList;
