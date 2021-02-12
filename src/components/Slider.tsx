import { useRef } from 'react';
import { StyledSlider, StyledThumb } from '../styles/Slider';

interface SliderProps {}

const Slider: React.FC<SliderProps> = ({}) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);

  const diff = useRef<number | null>(null);

  const handleMouseMove = (event: MouseEvent): void => {
    if (sliderRef.current && diff.current && thumbRef.current) {
      let newX =
        event.clientX -
        diff.current -
        sliderRef.current.getBoundingClientRect().left;

      const end = sliderRef.current.offsetWidth - thumbRef.current.offsetWidth;

      const start = 0;

      if (newX < start) {
        newX = 0;
      }

      if (newX > end) {
        newX = end;
      }
    }
  };

  const handleMouseUp = (): void => {
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mousemove', handleMouseMove);
  };

  const handleMouseDown = (
    event: MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    if (thumbRef.current) {
      diff.current =
        event.clientX - thumbRef.current.getBoundingClientRect().left;
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <>
      <StyledSlider ref={sliderRef}>
        <StyledThumb ref={thumbRef} onMouseDown={handleMouseDown} />
      </StyledSlider>
    </>
  );
};

export default Slider;
