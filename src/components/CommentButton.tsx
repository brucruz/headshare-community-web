import { MdChatBubbleOutline } from 'react-icons/md';
import { CommentContainer } from '../styles/components/CommentButton';

interface CommentButtonProps {
  comments: number;
}

const CommentButton: React.FC<CommentButtonProps> = ({ comments }) => (
  <CommentContainer>
    <MdChatBubbleOutline />

    <h5>{comments}</h5>
  </CommentContainer>
);

export default CommentButton;
