import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { LikeContainer } from '../styles/components/LikeButton';

interface LikeButtonProps {
  liked?: boolean;
  likes: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ liked = false, likes }) => (
  <LikeContainer liked={liked}>
    {liked ? <MdFavorite /> : <MdFavoriteBorder />}

    <h5>{likes}</h5>
  </LikeContainer>
);

export default LikeButton;
