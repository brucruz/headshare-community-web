import Image from 'next/image';
import {
  FooterContainer,
  LegalContainer,
  PublishButton,
  ShareContainer,
  ImageWrapper,
} from '../styles/components/Footer';
import Button from './Button';

interface FooterProps {
  author: string;
  communityTitle: string;
  shareable?: boolean;
  shareObject?: 'post' | 'page';
  newContent?: boolean;
}

const Footer: React.FC<FooterProps> = ({
  author,
  communityTitle,
  shareable = true,
  shareObject = 'page',
  newContent = false,
}) => (
  <FooterContainer>
    {!newContent && shareable && (
      <ShareContainer>
        <h4>
          Gostou {shareObject === 'post' ? 'do post' : 'da página'}{' '}
          {communityTitle}?
        </h4>

        <Button priority="secondary" text="Compartilhe com seus amigos 🎉" />
      </ShareContainer>
    )}

    <LegalContainer>
      <p>© 2021 {author}</p>
      <p>
        Leia a <a href="">política de privacidade</a> e os{' '}
        <a href="">termos de serviço</a>
      </p>
    </LegalContainer>

    {!newContent && (
      <PublishButton>
        <ImageWrapper>
          <Image
            src="https://headshare.s3.amazonaws.com/logos/logo_short_127x127.png"
            alt="Logo"
            width={28}
            height={28}
          />
        </ImageWrapper>
        <p>
          Publique seu conteúdo na <strong>Headshare</strong>
        </p>
      </PublishButton>
    )}
  </FooterContainer>
);

export default Footer;
