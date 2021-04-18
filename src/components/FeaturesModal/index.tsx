import { useCallback, useMemo, useState } from 'react';
import {
  MdCheck,
  MdClose,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from 'react-icons/md';
import {
  FeatureContainer,
  FeaturesListContainer,
  FeaturesModalContainer,
  FeaturesPlanSelectionContainer,
  MoreFeaturesButton,
} from '../../styles/components/FeaturesModal';
import Modal from '../Modal';
import { RadioButtonGroup } from '../RadioButton';

interface MainPlan {
  value: number;
  valueLabel: string;
  period: 'annually' | 'monthly';
}

interface Feature {
  included: boolean;
  description: string;
}
export interface FeaturesModalProps {
  communityTitle: string;
  communityMainPlans: MainPlan[];
  communityFeatures: Feature[];
  communityTrialDays?: number;
  nextPage: () => void;
  previousPage: () => void;
  isOpen: boolean;
}

export function FeaturesModal({
  communityTitle = 'Headshare',
  communityMainPlans,
  communityFeatures,
  communityTrialDays = 7,
  nextPage,
  isOpen,
}: FeaturesModalProps): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);

  const planQuantity = useMemo(() => communityMainPlans.length, [
    communityMainPlans,
  ]);

  const handleFeaturesToggle = useCallback(() => {
    setIsFeaturesOpen(!isFeaturesOpen);
  }, [isFeaturesOpen]);

  return (
    <Modal
      isOpen={isModalOpen}
      setIsOpen={() => setIsModalOpen}
      closeButton
      defaultContent={{
        title: `Acesso ao conteúdo exclusivo da página ${communityTitle}`,
        mainButton: {
          text: `Assine grátis por ${communityTrialDays} dias`,
          stretch: true,
          onClick: nextPage,
        },
      }}
    >
      <FeaturesModalContainer>
        <FeaturesPlanSelectionContainer>
          <RadioButtonGroup
            elements={communityMainPlans.map((plan, index) => ({
              index,
              length: planQuantity,
              label: plan.valueLabel,
              name: plan.period,
              selected: 'monthly',
              stretch: true,
            }))}
          />
        </FeaturesPlanSelectionContainer>

        <FeaturesListContainer>
          {isFeaturesOpen
            ? communityFeatures.map(feat => (
                <FeatureContainer>
                  {feat.included && <MdCheck />}
                  {!feat.included && <MdClose />}

                  <p>{feat.description}</p>
                </FeatureContainer>
              ))
            : communityFeatures.slice(0, 5).map(feat => (
                <FeatureContainer>
                  {feat.included && <MdCheck />}
                  {!feat.included && <MdClose />}

                  <p>{feat.description}</p>
                </FeatureContainer>
              ))}

          {communityFeatures.length > 5 && (
            <MoreFeaturesButton onClick={handleFeaturesToggle}>
              {isFeaturesOpen ? (
                <>
                  <p>Veja menos</p>

                  <MdKeyboardArrowUp />
                </>
              ) : (
                <>
                  <p>Veja mais</p>

                  <MdKeyboardArrowDown />
                </>
              )}
            </MoreFeaturesButton>
          )}
        </FeaturesListContainer>
      </FeaturesModalContainer>
    </Modal>
  );
}
