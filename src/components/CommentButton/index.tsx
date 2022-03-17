import { MdChatBubbleOutline } from 'react-icons/md';
import { CommentContainer } from '../../styles/components/CommentButton';

export interface CommentButtonProps {
  comments: number;
}

function CommentButton({ comments }: CommentButtonProps): JSX.Element {
  return (
    <CommentContainer>
      <MdChatBubbleOutline />

      <h5>{comments}</h5>
    </CommentContainer>
  );
}

export default CommentButton;
