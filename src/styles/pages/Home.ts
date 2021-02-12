import styled from 'styled-components';
import device from '../../utils/devices';

export const WhiteSection = styled.section`
  width: 100%;
`;

export const ColoredSection = styled.section`
  width: 100%;
  background-color: var(--card-background);
`;

export const HeaderLogo = styled.header`
  margin-top: 40px;
  margin-left: 12px;
  margin-right: 12px;

  @media ${device.laptop} {
    margin-left: auto;
    margin-right: auto;
  }

  max-width: 1080px;

  div {
    height: 35.54px;
    width: 162.86px;

    @media ${device.laptop} {
      height: auto;
      width: auto;
    }
  }
`;

export const HeaderMain = styled.main`
  margin: 0 12px;

  @media ${device.laptop} {
    margin: 0 auto;
  }

  margin-top: 60px;

  @media ${device.laptop} {
    margin-top: 160px;
  }

  max-width: 1080px;
`;

export const HeaderHero = styled.div`
  text-align: center;
  margin: 0 auto;
  margin-bottom: 60px;

  h1 {
    color: var(--main-titles);
    margin: 0 10px;
    max-width: 800px;

    span {
      color: var(--headshare-coral);
    }

    @media ${device.laptop} {
      font-size: 50.5px;
      line-height: 76px;
      margin: 0 auto;
    }
  }

  h2 {
    margin: 0 auto;
    margin-top: 20px;
    color: var(--subtitles);
    max-width: 1000px;

    @media ${device.laptop} {
      font-size: 38px;
      line-height: 56px;
    }
  }
`;

export const HomeCTA = styled.div`
  margin: 0 auto;
  max-width: 600px;

  text-align: center;

  button {
    margin-bottom: 10px;

    @media ${device.laptop} {
      height: 50px;
      border-radius: 25px;

      h4 {
        font-size: 24px;
        line-height: 38px;
      }
    }
  }

  h4 {
    @media ${device.laptop} {
      font-size: 21.3px;
      line-height: 32px;
    }
  }
`;

export const RollToNextButton = styled.div`
  margin: 0 auto;
  margin-top: 60px;
  margin-bottom: 40px;
  width: fit-content;

  svg {
    width: 40px;
    height: 43.64px;

    color: var(--main-titles);

    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const CalculatorSection = styled.section`
  margin: 0 12px;

  @media ${device.laptop} {
    margin: 0 auto;
  }

  padding-top: 100px;
  padding-bottom: 100px;

  max-width: 1080px;

  text-align: center;

  h2 {
    color: var(--main-titles);
    margin: 0 auto;
    max-width: 800px;

    @media ${device.laptop} {
      font-size: 38px;
      line-height: 56px;
    }
  }
`;

export const CalculatorInnerSection = styled.section`
  margin: 50px 12px;
  max-width: 820px;

  h3 {
    color: var(--subtitles);
    margin-bottom: 40px;

    @media ${device.laptop} {
      font-size: 28.4px;
      line-height: 42.6px;
    }
  }
  @media ${device.laptop} {
    margin: 50px auto;

    h3 {
      font-size: 28.4px;
      line-height: 42.6px;
    }
  }
`;

export const CalculatorInputs = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  flex-wrap: wrap;

  max-width: 600px;
  margin: 0 auto;
  margin-bottom: 40px;
`;

export const CalculatorInput = styled.div`
  margin: 20px;
  width: 260px;

  text-align: left;

  .MuiSlider-root {
    margin-top: 10px;
  }

  .MuiSlider-rail {
    height: 10px;
    border-radius: 5px;
  }

  .MuiSlider-track {
    height: 10px;
    border-radius: 5px;
  }

  .MuiSlider-thumb {
    width: 20px;
    height: 20px;
    margin-top: -6px;
  }
`;

export const HowSection = styled.section`
  margin: 0 12px;

  @media ${device.laptop} {
    margin: 0 auto;
  }

  padding-top: 100px;
  padding-bottom: 100px;

  max-width: 1080px;

  text-align: center;

  h2 {
    color: var(--main-titles);
    margin: 0 auto;
    max-width: 800px;

    span {
      color: var(--headshare-coral);
    }

    @media ${device.laptop} {
      font-size: 38px;
      line-height: 56px;
    }
  }
`;

export const HowIcons = styled.section`
  margin: 50px auto;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
`;

export const HowIcon = styled.article`
  width: 250px;

  @media ${device.laptop} {
    width: 280px;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: 10px;

  h4 {
    margin-top: 10px;

    color: var(--subtitles);

    @media ${device.laptop} {
      font-size: 21.3px;
      line-height: 32px;
    }
  }
`;

export const FooterSection = styled.footer`
  margin: 0 12px;

  @media ${device.laptop} {
    margin: 0 auto;
  }

  padding-top: 20px;
  padding-bottom: 20px;

  max-width: 1080px;

  text-align: center;

  > div {
    width: 140px;

    @media ${device.laptop} {
      width: 180px;
    }
  }

  div + div {
    margin: 0 auto;
    margin-top: 15px;
    width: max-content;

    @media ${device.laptop} {
      margin-top: 5px;
      margin-left: 15px;

      p {
        font-size: 16px;
        line-height: 24px;
      }
    }
  }

  @media ${device.laptop} {
    display: flex;

    align-items: center;
  }
`;
