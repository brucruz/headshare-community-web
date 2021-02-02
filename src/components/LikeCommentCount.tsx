import { LikeCommentContainer } from '../styles/components/LikeCommentCount';
import CommentButton from './CommentButton';
import LikeButton from './LikeButton';

interface LikeCommentCountProps {
  liked?: boolean;
  likes: number;
  comments: number;
}

const LikeCommentCount: React.FC<LikeCommentCountProps> = ({
  liked = false,
  likes,
  comments,
}) => (
  <LikeCommentContainer>
    <LikeButton liked={liked} likes={likes} />

    <CommentButton comments={comments} />
  </LikeCommentContainer>
);

export default LikeCommentCount;
