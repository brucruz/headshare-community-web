import styled from 'styled-components';

export const StyledSlider = styled.div`
  position: relative;
  border-radius: 3px;
  background: #dddddd;
  height: 12px;

  margin-top: 10px;
  margin-bottom: 10px;
`;

export const StyledThumb = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: relative;
  top: -4px;
  background: var(--headshare-coral);
  cursor: pointer;
`;
