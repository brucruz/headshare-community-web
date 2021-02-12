import { Slider } from '@material-ui/core';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { useMemo, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { Link as ScrollLink } from 'react-scroll';

import Button from '../components/Button';
// import Slider from '../components/Slider';
import {
  HeaderHero,
  HeaderLogo,
  HeaderMain,
  WhiteSection,
  HomeCTA,
  RollToNextButton,
  ColoredSection,
  CalculatorSection,
  CalculatorInnerSection,
  CalculatorInputs,
  CalculatorInput,
  HowSection,
  HowIcons,
  HowIcon,
  FooterSection,
} from '../styles/pages/Home';

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  const [fee, setFee] = useState(25);
  const [members, setMembers] = useState(100);

  const adjustedMembers = useMemo(() => {
    const adjusted = members.toLocaleString();

    return adjusted;
  }, [members]);

  const revenue = useMemo(() => {
    const adjusted = (fee * members).toLocaleString();

    return adjusted;
  }, [fee, members]);

  return (
    <>
      <WhiteSection>
        <HeaderLogo>
          <NextImage
            src="https://headshare.s3.amazonaws.com/logos/logo_full_916x200.png"
            height={50}
            width={229.14}
          />
        </HeaderLogo>

        <HeaderMain>
          <HeaderHero>
            <h1>
              Crie sua própria <span>comunidade</span> e compartilhe o que te
              move
            </h1>

            <h2>
              Produza conteúdo, incentive conversas entre sua audiência e
              gerencie assinaturas
            </h2>
          </HeaderHero>

          <HomeCTA>
            <NextLink href="https://link.gy/headshare" passHref>
              <a target="_blank" rel="noreferrer">
                <Button text="Entre na lista de espera" stretch />
              </a>
            </NextLink>
            <h4>E seja avisado quando lançarmos</h4>
          </HomeCTA>

          <RollToNextButton>
            <ScrollLink spy to="calculator" smooth>
              <FaAngleDown />
            </ScrollLink>
          </RollToNextButton>
        </HeaderMain>
      </WhiteSection>

      <ColoredSection id="calculator">
        <CalculatorSection>
          <h2>O que você ainda está esperando para monetizar sua audiência?</h2>

          <CalculatorInnerSection>
            <h3>Descubra o quanto você pode faturar:</h3>

            <CalculatorInputs>
              <CalculatorInput>
                <p>Assinatura mensal:</p>

                <Slider
                  valueLabelDisplay="off"
                  min={5}
                  max={50}
                  step={5}
                  color="secondary"
                  onChange={(e, value) => setFee(value)}
                  defaultValue={25}
                />
              </CalculatorInput>

              <CalculatorInput>
                <p>Assinantes:</p>

                <Slider
                  valueLabelDisplay="off"
                  min={100}
                  max={1000}
                  step={100}
                  color="secondary"
                  onChange={(e, value) => setMembers(value)}
                  defaultValue={500}
                />
              </CalculatorInput>
            </CalculatorInputs>

            <h4>
              Ao cobrar <strong>R${fee}/mês</strong> de{' '}
              <strong>{adjustedMembers} assinantes</strong>:
            </h4>

            <h3>R$ {revenue}/mês</h3>
          </CalculatorInnerSection>

          <HomeCTA>
            <NextLink href="https://link.gy/headshare">
              <a target="_blank" rel="noreferrer">
                <Button text="Entre na lista de espera" stretch />
              </a>
            </NextLink>
            <h4>E seja avisado quando lançarmos</h4>
          </HomeCTA>
        </CalculatorSection>
      </ColoredSection>

      <WhiteSection>
        <HowSection>
          <h2>
            Como a <span>Headshare</span> funciona
          </h2>

          <HowIcons>
            <HowIcon>
              <NextImage
                src="https://headshare.s3.amazonaws.com/icons/community_icon.png"
                height={200}
                width={200}
              />

              <h4>Crie e gerencie sua comunidade</h4>
            </HowIcon>

            <HowIcon>
              <NextImage
                src="https://headshare.s3.amazonaws.com/icons/content_icon.png"
                height={200}
                width={200}
              />

              <h4>Produza conteúdo em texto ou vídeo</h4>
            </HowIcon>

            <HowIcon>
              <NextImage
                src="https://headshare.s3.amazonaws.com/icons/discussion_icon.png"
                height={200}
                width={200}
              />

              <h4>Fomente e organize discussões entre os membros</h4>
            </HowIcon>

            <HowIcon>
              <NextImage
                src="https://headshare.s3.amazonaws.com/icons/be_free_icon.png"
                height={200}
                width={200}
              />

              <h4>Seja livre para publicar sobre o que quiser</h4>
            </HowIcon>

            <HowIcon>
              <NextImage
                src="https://headshare.s3.amazonaws.com/icons/members_list_icon.png"
                height={200}
                width={200}
              />

              <h4>Utilize a lista de membros como preferir</h4>
            </HowIcon>
          </HowIcons>

          <HomeCTA>
            <NextLink href="https://link.gy/headshare">
              <a target="_blank" rel="noreferrer">
                <Button text="Entre na lista de espera" stretch />
              </a>
            </NextLink>
            <h4>E seja avisado quando lançarmos</h4>
          </HomeCTA>
        </HowSection>
      </WhiteSection>

      <ColoredSection>
        <FooterSection>
          <NextImage
            src="https://headshare.s3.amazonaws.com/logos/logo_black_180x39916x200_.png"
            height={39.28}
            width={180}
          />

          <div>
            <p>2021 © Todos os direitos reservados</p>
          </div>
        </FooterSection>
      </ColoredSection>
    </>
  );
};

export default Home;
