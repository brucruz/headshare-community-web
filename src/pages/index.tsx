import { Slider } from '@material-ui/core';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { useMemo, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { Link as ScrollLink } from 'react-scroll';

import Button from '../components/Button';
import { SEO } from '../components/SEO';
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

function CTALink(): JSX.Element {
  return (
    <HomeCTA>
      <NextLink href="https://link.gy/headshare" passHref>
        <a target="_blank" rel="noreferrer">
          <Button text="Sign up for early access" stretch />
        </a>
      </NextLink>
      <h4>And be informed when we launch</h4>
    </HomeCTA>
  );
}

function Home(): JSX.Element {
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
      <SEO
        title="Create and manage your own community"
        description="Create content, boost your audience communication and manage subscriptions"
      />

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
              Manage your own <span>community</span> and share what you love
            </h1>

            <h2>
              Create content, boost your audience communication and manage
              subscriptions
            </h2>
          </HeaderHero>

          <CTALink />

          <RollToNextButton>
            <ScrollLink spy to="calculator" smooth>
              <FaAngleDown />
            </ScrollLink>
          </RollToNextButton>
        </HeaderMain>
      </WhiteSection>

      <ColoredSection id="calculator">
        <CalculatorSection>
          <h2>What are you still waiting to monetize your audience?</h2>

          <CalculatorInnerSection>
            <h3>Find out how much you can earn:</h3>

            <CalculatorInputs>
              <CalculatorInput>
                <p>Monthly fee:</p>

                <Slider
                  valueLabelDisplay="off"
                  min={5}
                  max={50}
                  step={5}
                  color="secondary"
                  onChange={(e, value) =>
                    setFee(typeof value === 'number' ? value : value[0])
                  }
                  defaultValue={25}
                />
              </CalculatorInput>

              <CalculatorInput>
                <p>Subscribers:</p>

                <Slider
                  valueLabelDisplay="off"
                  min={100}
                  max={1000}
                  step={100}
                  color="secondary"
                  onChange={(e, value) =>
                    setMembers(typeof value === 'number' ? value : value[0])
                  }
                  defaultValue={500}
                />
              </CalculatorInput>
            </CalculatorInputs>

            <h4>
              By charging <strong>{fee} USD/month</strong> from{' '}
              <strong>{adjustedMembers} subscribers</strong>:
            </h4>

            <h3>{revenue} USD/month</h3>
          </CalculatorInnerSection>

          <CTALink />
        </CalculatorSection>
      </ColoredSection>

      <WhiteSection>
        <HowSection>
          <h2>
            How <span>Headshare</span> works
          </h2>

          <HowIcons>
            <HowIcon>
              <NextImage
                src="https://headshare.s3.amazonaws.com/icons/community_icon.png"
                height={200}
                width={200}
              />

              <h4>Create and manage your community</h4>
            </HowIcon>

            <HowIcon>
              <NextImage
                src="https://headshare.s3.amazonaws.com/icons/content_icon.png"
                height={200}
                width={200}
              />

              <h4>Creators and members produce text or video content</h4>
            </HowIcon>

            <HowIcon>
              <NextImage
                src="https://headshare.s3.amazonaws.com/icons/discussion_icon.png"
                height={200}
                width={200}
              />

              <h4>Promote and organize members discussions</h4>
            </HowIcon>

            <HowIcon>
              <NextImage
                src="https://headshare.s3.amazonaws.com/icons/be_free_icon.png"
                height={200}
                width={200}
              />

              <h4>You are free to publish whatever you like</h4>
            </HowIcon>

            <HowIcon>
              <NextImage
                src="https://headshare.s3.amazonaws.com/icons/members_list_icon.png"
                height={200}
                width={200}
              />

              <h4>You own your member list: use it as you wish</h4>
            </HowIcon>
          </HowIcons>

          <CTALink />
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
            <p>2021 © All rights reserved</p>
          </div>
        </FooterSection>
      </ColoredSection>
    </>
  );
}

export default Home;
