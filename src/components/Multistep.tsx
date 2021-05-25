/* eslint-disable react/no-array-index-key */
import { ReactElement, useState } from 'react';
import Button from './Button';

interface MultiStepProps {
  children: ReactElement[];
  submitText?: string;
  submitButtonDisabled?: boolean;
}

const MultiStep: React.FC<MultiStepProps> = ({
  children,
  submitText,
  submitButtonDisabled = false,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const numberOfSteps = children.length;

  function handleNextStep(): void {
    if (currentStep === numberOfSteps - 1) {
      return;
    }

    setCurrentStep(currentStep + 1);
  }

  function handlePreviousStep(): void {
    if (currentStep === 0) {
      return;
    }

    setCurrentStep(currentStep - 1);
  }

  return (
    <div>
      <div>
        {children.map((step, index) => (
          <div key={`step_${index}`} hidden={currentStep !== index}>
            {step}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {/* {currentStep !== 0 && ( */}
        <Button
          text="Anterior"
          disabled={currentStep === 0}
          type="button"
          priority="tertiary"
          onClick={handlePreviousStep}
        />
        {/* )} */}
        {/* {currentStep !== numberOfSteps - 1 && ( */}
        <Button
          text="Próximo"
          disabled={currentStep === numberOfSteps - 1}
          type="button"
          priority="tertiary"
          onClick={handleNextStep}
        />
        {/* )} */}
      </div>

      <Button
        text={submitText || 'Cadastrar'}
        type="submit"
        stretch
        disabled={submitButtonDisabled}
      />
    </div>
  );
};

export default MultiStep;
