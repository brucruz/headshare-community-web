import { Container } from '../../styles/components/templates/PageTitleTemplate';
import ButtonBack from '../ButtonBack';
import Footer from '../Footer';
import Header from '../Header';
import TitleSubtitle from '../TitleSubtitle';

interface PageTitleTemplateProps {
  title: string;
  subtitle?: string;
  community: {
    title: string;
    slug: string;
    creator: {
      name: string;
      surname?: string | null;
    };
  };
  backButtonUrl?: string;
}

const PageTitleTemplate: React.FC<PageTitleTemplateProps> = ({
  title,
  subtitle,
  community,
  children,
  backButtonUrl,
}) => (
  <>
    <Header communityTitle={community.title} communitySlug={community.slug} />

    <Container>
      <ButtonBack />

      <TitleSubtitle
        title={title}
        subtitle={subtitle}
        backButtonUrl={backButtonUrl}
      />
    </Container>

    {children}

    <Footer
      author={`${community.creator.name} ${
        community.creator.surname ? community.creator.surname : ''
      }`}
      communityTitle={community.title}
    />
  </>
);

export default PageTitleTemplate;
