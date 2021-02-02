import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import {
  BackButtonTitleContainer,
  ImageContainer,
  TitleSubtitleContainer,
} from '../styles/components/TitleSubtitle';

interface TitleSubtitleProps {
  title: string;
  subtitle?: string | null;
  backButtonUrl?: string;
}

const TitleSubtitle: React.FC<TitleSubtitleProps> = ({
  title,
  subtitle,
  backButtonUrl,
}) => {
  const router = useRouter();

  const handleGoBack = useCallback(() => {
    if (backButtonUrl) {
      router.push(backButtonUrl);
    }
  }, [router, backButtonUrl]);

  return (
    <BackButtonTitleContainer>
      {backButtonUrl && (
        <ImageContainer type="button" onClick={handleGoBack}>
          <Image
            src="https://headshare.s3.amazonaws.com/assets/arrow_left.png"
            height={35}
            width={35}
          />
        </ImageContainer>
      )}

      <TitleSubtitleContainer>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </TitleSubtitleContainer>
    </BackButtonTitleContainer>
  );
};

export default TitleSubtitle;
