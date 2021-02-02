import { useCallback, useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import {
  PublishOptionButton,
  PublishOptionContainer,
  PublishOptionHeader,
  PublishOptionNumber,
  PublishOptionPanel,
} from '../styles/components/PublishOption';

interface PublishOptionProps {
  index: number;
  title: string;
}

const PublishOption: React.FC<PublishOptionProps> = ({
  index,
  title,
  children,
}) => {
  const [isActive, setIsActive] = useState(false);

  const togglePublishOption = useCallback(() => {
    setIsActive(!isActive);
  }, [isActive]);

  return (
    <PublishOptionContainer>
      <PublishOptionButton
        type="button"
        onClick={togglePublishOption}
        isActive={isActive}
      >
        <PublishOptionHeader>
          <PublishOptionNumber>
            <h4>{index}</h4>
          </PublishOptionNumber>

          <h4>{title}</h4>
        </PublishOptionHeader>

        {isActive ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
      </PublishOptionButton>
      <PublishOptionPanel isActive={isActive}>{children}</PublishOptionPanel>
    </PublishOptionContainer>
  );
};

export default PublishOption;
