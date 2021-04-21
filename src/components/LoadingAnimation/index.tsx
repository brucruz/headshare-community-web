import styled, { keyframes } from 'styled-components';

interface LoadingAnimationProps {
  color?: 'primary' | 'secondary';
  application: 'screen' | 'button';
}

const spin = keyframes`
  from {
    transform: rotate(0);
  }
  to{
    transform: rotate(359deg);
  }
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;

  margin: 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = styled.div<LoadingAnimationProps>`
  width: ${props => (props.application === 'button' ? '20px' : '40px')};
  height: ${props => (props.application === 'button' ? '20px' : '40px')};
  border: ${props => (props.application === 'button' ? '3px' : '4px')} solid
    ${props =>
      props.color === 'primary'
        ? 'var(--headshare-coral)'
        : 'var(--page-background)'};
  border-top: 3px solid transparent;
  border-radius: 50%;
  animation: ${spin} 0.8s linear 0s infinite;
`;

export function LoadingAnimation({
  color = 'primary',
  application,
}: LoadingAnimationProps): JSX.Element {
  return (
    <>
      {application === 'screen' && (
        <LoadingContainer>
          <Loading color={color} application={application} />
        </LoadingContainer>
      )}
      {application === 'button' && (
        <Loading color={color} application={application} />
      )}
    </>
  );
}
