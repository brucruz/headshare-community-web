import { useState } from 'react';
import {
  FeaturesListContainer,
  FeaturesModalContainer,
  FeaturesPlanSelectionContainer,
} from '../../styles/components/FeaturesModal';
import Button from '../Button';
import Modal from '../Modal';
import { RadioButtonGroup } from '../RadioButton';

export interface FeaturesModalProps {
  communityTitle: string;
}

export function FeaturesModal({
  communityTitle = 'Headshare',
}: FeaturesModalProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Modal isOpen={isOpen} setIsOpen={() => setIsOpen} closeButton>
      <FeaturesModalContainer>
        <h2>Acesso ao conteúdo exclusivo da página {communityTitle}</h2>

        <FeaturesPlanSelectionContainer>
          <RadioButtonGroup
            elements={[
              {
                index: 0,
                length: 2,
                label: 'R$ 49,90/mês',
                name: 'month',
                selected: 'month',
                stretch: true,
              },
              {
                index: 1,
                length: 2,
                label: 'R$ 499/ano',
                name: 'annual',
                selected: 'month',
                stretch: true,
              },
            ]}
          />
        </FeaturesPlanSelectionContainer>

        <FeaturesListContainer>
          <li>Novas aulas sendo adicionadas toda semana</li>

          <li>
            Seja notificado por email quando novas aulas exclusivas para membros
            forem publicadas
          </li>

          <li>Espaço para você definir outras vantagens que preferir</li>
        </FeaturesListContainer>

        <Button text="Assinar" stretch />
      </FeaturesModalContainer>
    </Modal>
  );
}
